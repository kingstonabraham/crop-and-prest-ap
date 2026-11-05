import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Increase payload limit for base64 photo uploads from field cameras
app.use(express.json({ limit: '30mb' }));

// Server-side Gemini Client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Demo fallback catalog with multi-lingual responses
const DEMO_CATALOG = {
  leafMiner: {
    en: {
      crop: 'Tomato',
      symptom: 'Leaf-mining damage',
      suggestedTitle: 'Tomato · Leaf-mining damage',
      headline: 'Possible leaf-miner damage',
      description: 'The winding trails suggest leaf mining by insect larvae. I can’t see the insect inside this photo.',
      nextSteps: [
        'Pinch off heavily mined leaflets to eliminate developing larvae.',
        'Hang yellow sticky traps in the crop canopy to trap adult flies.',
        'Apply 5% Neem Seed Kernel Extract (NSKE) as an organic repellent.',
      ],
      followUpPrompt: 'Can you share a close-up of another affected leaf?',
    },
    hi: {
      crop: 'टमाटर',
      symptom: 'लीफ-माइनर क्षति',
      suggestedTitle: 'टमाटर · लीफ-माइनर क्षति',
      headline: 'संभावित लीफ-माइनर (सुरंग कीट) क्षति',
      description: 'पत्तियों पर बनी घुमावदार लकीरें कीट लार्वा द्वारा बनाई गई सुरंगों का संकेत देती हैं। इस फोटो में कीट स्पष्ट नहीं दिख रहा है।',
      nextSteps: [
        'लार्वा को नष्ट करने के लिए गंभीर रूप से प्रभावित पत्तियों को तोड़कर हटा दें।',
        'वयस्क मक्खियों को पकड़ने के लिए खेत में पीले चिपचिपे ट्रैप लगाएं।',
        'जैविक रोकथाम के लिए 5% नीम तेल या नींबोली अर्क का छिड़काव करें।',
      ],
      followUpPrompt: 'क्या आप किसी अन्य प्रभावित पत्ती की नजदीक से फोटो साझा कर सकते हैं?',
    },
    ta: {
      crop: 'தக்காளி',
      symptom: 'இலை சுரங்கப் புழு சேதம்',
      suggestedTitle: 'தக்காளி · இலை சுரங்கப் புழு சேதம்',
      headline: 'சாத்தியமான இலை சுரங்கப் புழு சேதம்',
      description: 'இலையில் உள்ள வளைந்த தடங்கள் இலை சுரங்கப் புழுக்களின் சேதத்தைக் காட்டுகின்றன. இந்த புகைப்படத்தில் பூச்சி தெரியவில்லை.',
      nextSteps: [
        'அதிகம் பாதிக்கப்பட்ட இலைகளைப் பறித்து அப்புறப்படுத்தவும்.',
        'வயலில் மஞ்சள் நிற ஒட்டும் பொறிகளைப் பயன்படுத்தவும்.',
        'வேப்ப எண்ணெய் 5% தெளித்து இயற்கை முறையில் கட்டுப்படுத்தவும்.',
      ],
      followUpPrompt: 'மற்றொரு பாதிக்கப்பட்ட இலையின் நெருக்கமான புகைப்படத்தைப் பகிர முடியுமா?',
    },
    te: {
      crop: 'టమాట',
      symptom: 'ఆకు తొలిచే పురుగు నష్టం',
      suggestedTitle: 'టమాట · ఆకు తొలిచే పురుగు నష్టం',
      headline: 'ఆకు తొలిచే పురుగు (లీఫ్ మైనర్) నష్టం అవకాశం ఉంది',
      description: 'ఆకులపై ఉన్న వంకర గీతలు లీఫ్ మైనర్ పురుగుల దాడిని సూచిస్తున్నాయి. ఈ ఫోటోలో పురుగు కనిపించడం లేదు.',
      nextSteps: [
        'తీవ్రంగా దెబ్బతిన్న ఆకులను తుంచి నాశనం చేయండి.',
        'పసుపు రంగు జిగురు అట్టలను అమర్చండి.',
        '5% వేప గింజల కషాయం పిచికారీ చేయండి.',
      ],
      followUpPrompt: 'మరొక ప్రభావిత ఆకు యొక్క క్లోజప్ ఫోటోను పంచుకోగలరా?',
    },
  },
  earlyBlight: {
    en: {
      crop: 'Tomato',
      symptom: 'Leaf spots',
      suggestedTitle: 'Tomato · Leaf spots',
      headline: 'Suspected Early Blight (Alternaria solani)',
      description: 'The concentric dark target-like spots with surrounding yellow halos are typical of early blight fungal infection.',
      nextSteps: [
        'Strip off diseased lower leaves to reduce fungal spore splashing.',
        'Avoid wetting the leaves during irrigation; water the roots directly.',
        'Apply copper oxychloride or mancozeb as a protective fungicide.',
      ],
      followUpPrompt: 'Are the lower leaves more affected than the top new growth?',
    },
    hi: {
      crop: 'टमाटर',
      symptom: 'पत्ती के धब्बे',
      suggestedTitle: 'टमाटर · पत्ती के धब्बे',
      headline: 'अगेती झुलसा (अर्ली ब्लाइट) का संदेह',
      description: 'पीले घेरे वाले संकेंद्रित छल्लेदार धब्बे कवक संक्रमण (अल्टरनेरिया) के विशिष्ट लक्षण हैं।',
      nextSteps: [
        'बीमारी फैलने से रोकने के लिए निचली संक्रमित पत्तियों को हटा दें।',
        'पौधों के ऊपर पानी छिड़कने के बजाय जड़ों में पानी दें।',
        'रोकथाम के लिए कॉपर ऑक्सीक्लोराइड या मैंकोजेब का छिड़काव करें।',
      ],
      followUpPrompt: 'क्या ऊपरी नई पत्तियों की तुलना में निचली पत्तियां अधिक प्रभावित हैं?',
    },
    ta: {
      crop: 'தக்காளி',
      symptom: 'இலை புள்ளிகள்',
      suggestedTitle: 'தக்காளி · இலை புள்ளிகள்',
      headline: 'ஆரம்பக்கால கருகல் நோய் அறிகுறி',
      description: 'மஞ்சள் வளையத்துடன் கூடிய வளைய புள்ளிகள் பூஞ்சை தொற்றைக் குறிக்கின்றன.',
      nextSteps: [
        'பாதிக்கப்பட்ட கீழ் இலைகளை உடனடியாக அகற்றவும்.',
        'இலைகளில் தண்ணீர் தெளிக்காமல் வேர்ப்பகுதிக்கு மட்டும் நீர் பாய்ச்சவும்.',
        'காப்பர் ஆக்ஸிகுளோரைடு தெளிக்கவும்.',
      ],
      followUpPrompt: 'மேல் இலைகளை விட கீழ் இலைகள் அதிகம் பாதிக்கப்பட்டுள்ளதா?',
    },
    te: {
      crop: 'టమాట',
      symptom: 'ఆకు మచ్చలు',
      suggestedTitle: 'టమాట · ఆకు మచ్చలు',
      headline: 'ముందస్తు ఎండు తెగులు (ఎర్లీ బ్లైట్) లక్షణం',
      description: 'పసుపు వలయంతో కూడిన ముదురు వలయాకార మచ్చలు శిలీంధ్ర సంక్రమణను సూచిస్తాయి.',
      nextSteps: [
        'కింది భాగంలోని తెగులు సోకిన ఆకులను తొలగించండి.',
        'ఆకులపై నీరు పడకుండా మొక్క మొదట్లో నీరు పెట్టండి.',
        'కాపర్ ఆక్సీక్లోరైడ్ పిచికారీ చేయండి.',
      ],
      followUpPrompt: 'పై లేత ఆకుల కంటే కింద ఆకులలో మచ్చలు ఎక్కువగా ఉన్నాయా?',
    },
  },
  curledLeaves: {
    en: {
      crop: 'Tomato',
      symptom: 'Curled leaves',
      suggestedTitle: 'Tomato · Curled leaves',
      headline: 'Leaf Curling & Stunting Observed',
      description: 'Upward rolling and puckered leaves frequently indicate Tomato Yellow Leaf Curl Virus spread by whiteflies, or moisture stress.',
      nextSteps: [
        'Inspect underside of young leaves for fluttering whiteflies.',
        'Install yellow sticky traps across the plot.',
        'Ensure steady drip irrigation and avoid extreme drying between waterings.',
      ],
      followUpPrompt: 'Do you see tiny white flying insects when shaking the plant?',
    },
    hi: {
      crop: 'टमाटर',
      symptom: 'मुड़ी हुई पत्तियां',
      suggestedTitle: 'टमाटर · मुड़ी हुई पत्तियां',
      headline: 'पत्ती मरोड़ (लीफ कर्ल) लक्षण',
      description: 'पत्तियों का ऊपर की ओर मुड़ना सफेद मक्खी द्वारा फैलने वाले लीफ कर्ल वायरस या नमी के तनाव का संकेत हो सकता है।',
      nextSteps: [
        'पत्तियों के नीचे सफेद मक्खियों की उपस्थिति की जाँच करें।',
        'खेत में पीले चिपचिपे कार्ड लगाएं।',
        'नियमित ड्रिप सिंचाई बनाए रखें।',
      ],
      followUpPrompt: 'क्या पौधे को हिलाने पर छोटी सफेद मक्खियां उड़ती दिखती हैं?',
    },
    ta: {
      crop: 'தக்காளி',
      symptom: 'சுருண்ட இலைகள்',
      suggestedTitle: 'தக்காளி · சுருண்ட இலைகள்',
      headline: 'இலை சுருள் அறிகுறி காணப்படுகிறது',
      description: 'இலைகள் மேல்நோக்கி சுருங்குவது வெள்ளை ஈக்களால் பரவும் நச்சுயிரி அல்லது நீர் பற்றாக்குறையின் அறிகுறியாகும்.',
      nextSteps: [
        'இலைகளுக்கு அடியில் வெள்ளை ஈக்கள் உள்ளதா எனப் பார்க்கவும்.',
        'மஞ்சள் ஒட்டும் பொறிகளை வைக்கவும்.',
        'சீரான நீர்ப்பாசனத்தை உறுதி செய்யவும்.',
      ],
      followUpPrompt: 'செடியை அசைக்கும் போது சிறிய வெள்ளை பூச்சிகள் பறக்கிறதா?',
    },
    te: {
      crop: 'టమాట',
      symptom: 'ముడుచుకున్న ఆకులు',
      suggestedTitle: 'టమాట · ముడుచుకున్న ఆకులు',
      headline: 'ఆకు ముడత లక్షణాలు గమనించబడ్డాయి',
      description: 'ఆకులు పైకి ముడుచుకోవడం తెల్లదోమల వల్ల వచ్చే వైరస్ లేదా నీటి ఎద్దడి వల్ల రావచ్చు.',
      nextSteps: [
        'ఆకుల కింద తెల్లదోమలను పరిశీలించండి.',
        'పసుపు జిగురు అట్టలను అమర్చండి.',
        'సక్రమమైన నీటి తడులు అందించండి.',
      ],
      followUpPrompt: 'మొక్కను కదిలించినప్పుడు చిన్న తెల్ల పురుగులు ఎగురుతున్నాయా?',
    },
  },
};

// Route photo identification through a server-side endpoint for custom model
app.post('/api/crop-diagnose', async (req, res) => {
  try {
    const {
      photoBase64,
      photoMime = 'image/jpeg',
      question = '',
      language = 'en',
      forceDemo = false,
    } = req.body;

    const lang = (['en', 'hi', 'ta', 'te'].includes(language) ? language : 'en') as 'en' | 'hi' | 'ta' | 'te';

    // Check if live AI model can be run
    if (!forceDemo && ai && photoBase64) {
      try {
        // Strip data URL header if present
        const cleanBase64 = photoBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');

        const promptText = `
You are the custom Zenvor CropTrace Neural Model (trained in Google Colab for agricultural disease and pest identification).
Analyze the attached crop photo and any question provided by the farmer: "${question}".

Target output language: ${lang} (Provide all user-visible text in this language: ${
          lang === 'hi' ? 'Hindi' : lang === 'ta' ? 'Tamil' : lang === 'te' ? 'Telugu' : 'English'
        }).

Produce a valid JSON object matching the required schema with:
1. crop: Detected crop name (e.g. Tomato, Chili, Brinjal, Paddy, Maize, Cotton)
2. symptom: Short symptom description (e.g. Leaf-mining damage, Leaf spots, Powdery mildew, Early blight, Curled leaves)
3. suggestedTitle: Formatted title: "Crop · Symptom" (e.g. "Tomato · Leaf spots")
4. headline: Clear, farmer-facing headline (e.g. "Possible leaf-miner damage")
5. description: 2 concise sentences explaining what is happening to the plant.
6. nextSteps: Array of 3 practical field checks or treatment recommendations.
7. followUpPrompt: A helpful diagnostic question asking for a close-up or inspection of other plant parts.
8. recommendedStatus: "needs_review" or "follow_up_needed"
9. confidence: "high", "medium", or "low"
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: photoMime,
                  data: cleanBase64,
                },
              },
              {
                text: promptText,
              },
            ],
          },
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                crop: { type: Type.STRING },
                symptom: { type: Type.STRING },
                suggestedTitle: { type: Type.STRING },
                headline: { type: Type.STRING },
                description: { type: Type.STRING },
                nextSteps: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                followUpPrompt: { type: Type.STRING },
                recommendedStatus: { type: Type.STRING },
                confidence: { type: Type.STRING },
              },
              required: [
                'crop',
                'symptom',
                'suggestedTitle',
                'headline',
                'description',
                'nextSteps',
                'followUpPrompt',
              ],
            },
          },
        });

        const rawText = response.text;
        if (rawText) {
          const parsed = JSON.parse(rawText);
          return res.json({
            success: true,
            isDemo: false,
            modelSource: 'CropTrace Custom Colab Model (Live)',
            data: parsed,
          });
        }
      } catch (geminiError: any) {
        console.warn('Gemini live inference error, falling back to labelled demo response:', geminiError?.message || geminiError);
        // Fall through to labeled demo response below
      }
    }

    // Labelled Demo Response Fallback
    const qLower = (question || '').toLowerCase();
    let selectedDemo = DEMO_CATALOG.earlyBlight[lang];

    if (qLower.includes('trail') || qLower.includes('mine') || qLower.includes('line') || qLower.includes('winding') || qLower.includes('सुरंग') || qLower.includes('சுரங்க')) {
      selectedDemo = DEMO_CATALOG.leafMiner[lang];
    } else if (qLower.includes('curl') || qLower.includes('roll') || qLower.includes('मरोड़') || qLower.includes('சுருள்') || qLower.includes('ముడత')) {
      selectedDemo = DEMO_CATALOG.curledLeaves[lang];
    }

    return res.json({
      success: true,
      isDemo: true,
      modelSource: 'Colab Custom Model Demo',
      data: {
        crop: selectedDemo.crop,
        symptom: selectedDemo.symptom,
        suggestedTitle: selectedDemo.suggestedTitle,
        headline: selectedDemo.headline,
        description: selectedDemo.description,
        nextSteps: selectedDemo.nextSteps,
        followUpPrompt: selectedDemo.followUpPrompt,
        recommendedStatus: 'needs_review',
        confidence: 'high',
      },
    });
  } catch (err: any) {
    console.error('API endpoint error:', err);
    res.status(500).json({
      success: false,
      error: 'Crop diagnosis request failed. The conversation has been preserved.',
    });
  }
});

// Internal endpoint to write generated PWA icons to public folder
app.post('/api/save-icon', (req, res) => {
  try {
    const { filename, base64Data } = req.body;
    if (!filename || !base64Data) return res.status(400).send('Missing params');
    const cleanBase64 = base64Data.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');
    const targetPath = path.join(__dirname, 'public', filename);
    fs.writeFileSync(targetPath, Buffer.from(cleanBase64, 'base64'));
    console.log(`[PWA Asset] Saved ${filename}`);
    res.json({ success: true, file: filename });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    time: new Date().toISOString(),
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Zenvor CropTrace] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
