import { LearnArticle } from '../types';

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    id: 'tomato-early-blight',
    category: 'diseases',
    badgeIcon: 'Leaf',
    cropPreset: 'leafSpots',
    thumbnailUrl: '/assets/aistudio/image_3838ae6d.png',
    categoryLabel: {
      en: 'Disease',
      hi: 'रोग',
      ta: 'நோய்',
      te: 'వ్యాధి',
    },
    title: {
      en: 'Tomato early blight',
      hi: 'टमाटर का अगेती झुलसा',
      ta: 'தக்காளி ஆரம்பக்கால கருகல்',
      te: 'టమాట ముందస్తు ఎండు తెగులు',
    },
    summary: {
      en: 'Fungal disease caused by Alternaria solani, characterized by dark concentric ring spots on older leaves.',
      hi: 'अल्टरनेरिया सोलानी कवक के कारण होने वाला रोग, जिसमें पत्तियों पर गाढ़े छल्लेदार धब्बे दिखाई देते हैं।',
      ta: 'ஆல்டர்னேரியா சோலனி பூஞ்சையால் ஏற்படும் நோய், இலைகளில் வளைய புள்ளிகளாக தோன்றும்.',
      te: 'ఆల్టర్నేరియా సోలానీ శిలీంద్రం వల్ల వచ్చే వ్యాధి, ఆకులపై గుండ్రని మచ్చలు కనిపిస్తాయి.',
    },
    visibleSigns: {
      en: [
        'Brown to black spots with concentric rings resembling a target board.',
        'Yellow halos (chlorosis) surrounding the dark necrotic lesions.',
        'Starts on lower, older leaves and works upwards through the foliage.',
        'Stem lesions that are dark, slightly sunken, and circular to elongated.',
      ],
      hi: [
        'निशाने के बोर्ड जैसे संकेंद्रित छल्लों वाले भूरे से काले धब्बे।',
        'धब्बों के चारों ओर पीले रंग का घेरा (क्लोरोसिस)।',
        'पौधे के निचले, पुराने पत्तों से शुरू होकर ऊपर की ओर फैलता है।',
        'तने पर गहरे, थोड़े धंसे हुए लंबे या गोल धब्बे।',
      ],
      ta: [
        'வளைய வடிவ பழுப்பு மற்றும் கருப்பு புள்ளிகள்.',
        'புள்ளிகளைச் சுற்றி மஞ்சள் நிற வளையம்.',
        'கீழ் இலைகளில் தொடங்கி மேல்நோக்கி பரவும் தன்மை.',
        'தண்டுகளில் கருமையான, உட்புகுந்த புள்ளிகள்.',
      ],
      te: [
        'వలయాకార ముదురు గోధుమ లేదా నల్లటి మచ్చలు.',
        'మచ్చల చుట్టూ పసుపు రంగు వలయం.',
        'దిగువ ముసలి ఆకుల నుండి మొదలై పైకి వ్యాపిస్తుంది.',
        'కాండంపై ముదురు రంగులో ఉండే మచ్చలు.',
      ],
    },
    whatToCheckNext: {
      en: [
        'Check the undersides of the leaves for fungal velvety spore growth in high humidity.',
        'Inspect stems near the soil line for collar rot symptoms.',
        'Examine fruit calyxes and shoulders for dark, leathery, sunken spots.',
        'Review recent weather for warm, wet conditions (24-29°C with high relative humidity).',
      ],
      hi: [
        'उच्च आर्द्रता में पत्तियों के निचले हिस्से पर मखमली कवक बीजाणुओं की जाँच करें।',
        'मिट्टी के पास के तनों पर कॉलर सड़न के लक्षणों की जाँच करें।',
        'टमाटर के फल के ऊपरी हिस्से पर काले, चमड़े जैसे धब्बों की जाँच करें।',
        '24-29°C तापमान और नमी वाले मौसम की स्थिति का आकलन करें।',
      ],
      ta: [
        'அதிக ஈரப்பதத்தில் இலைகளின் அடிப்பகுதியில் பூஞ்சை வளர்ச்சியைச் சரிபார்க்கவும்.',
        'மண்ணுக்கு அருகிலுள்ள தண்டுப்பகுதியை ஆய்வு செய்யவும்.',
        'பழங்களின் மேல் பகுதியில் கருமையான தழும்புகள் உள்ளதா எனப் பார்க்கவும்.',
        'ஈரப்பதம் மற்றும் வெப்பநிலையைக் கண்காணிக்கவும்.',
      ],
      te: [
        'ఆకుల కింద బూజు లాంటి శిలీంధ్రం ఉందో లేదో పరిశీలించండి.',
        'నేల దగ్గర కాండం కుళ్ళిపోయిందేమో చూడండి.',
        'కాయల పైభాగంలో నల్లటి మచ్చలు ఉన్నాయా గమనించండి.',
        'వాతావరణ తేమ మరియు ఉష్ణోగ్రతను అంచనా వేయండి.',
      ],
    },
    photoTips: {
      en: [
        'Frame an individual infected leaf showing both the concentric rings and the green healthy border.',
        'Take a wider shot showing the canopy height where symptoms start (lower third).',
        'Avoid harsh midday shadows by shading the leaf with your hand or body.',
      ],
      hi: [
        'एक ऐसी पत्ती की फोटो लें जिसमें संकेंद्रित छल्ले और स्वस्थ किनारा दोनों दिखाई दें।',
        'पूरे पौधे की एक फोटो लें जिससे पता चले कि संक्रमण निचले हिस्से में है।',
        'कड़ी धूप में अपनी छाया बनाकर फोटो लें ताकि धब्बे साफ दिखें।',
      ],
      ta: [
        'புள்ளிகள் மற்றும் ஆரோக்கியமான இலை விளிம்பு தெரியும்படி புகைப்படம் எடுக்கவும்.',
        'செடியின் கீழ் பகுதி இலைகளையும் காட்டும் அகன்ற கோண புகைப்படம் எடுக்கவும்.',
        'நேரடி சூரிய ஒளி நிழல் விழாமல் பார்த்துக் கொள்ளவும்.',
      ],
      te: [
        'మచ్చలు మరియు ఆరోగ్యకరమైన ఆకు భాగం స్పష్టంగా కనిపించేలా ఫోటో తీయండి.',
        'మొక్క దిగువ భాగం కనిపించేలా ఒక ఫోటో తీయండి.',
        'ఎండ నీడలు పడకుండా చూసుకోండి.',
      ],
    },
    referenceLink: {
      title: 'University Extension Guide - Tomato Early Blight Management',
      url: 'https://extension.umn.edu/diseases/early-blight-tomato',
    },
    sampleSymptomPrompt: 'I have dark spots with concentric rings on my lower tomato leaves. Is this early blight?',
  },
  {
    id: 'leaf-miner-damage',
    category: 'pests',
    badgeIcon: 'Bug',
    cropPreset: 'leafMiner',
    thumbnailUrl: '/assets/aistudio/image_58ce8d7a.png',
    categoryLabel: {
      en: 'Pest damage',
      hi: 'कीट क्षति',
      ta: 'பூச்சி சேதம்',
      te: 'తెగులు నష్టం',
    },
    title: {
      en: 'Leaf-miner damage',
      hi: 'लीफ-माइनर (सुरंग कीट) क्षति',
      ta: 'இலை சுரங்கப் புழு சேதம்',
      te: 'లీఫ్ మైనర్ (ఆకు తొలుచు పురుగు) నష్టం',
    },
    summary: {
      en: 'Winding, serpentine whitish or translucent trails tunnelled through leaf tissue by dipteran larvae (Liriomyza spp.).',
      hi: 'पत्तियों के भीतर लार्वा द्वारा बनाई गई सफेद या पारदर्शी घुमावदार सुरंगें।',
      ta: 'இலைகளுக்குள் லார்வாக்களால் தோண்டப்படும் வளைந்த, வெண்மையான சுரங்கப்பாதைகள்.',
      te: 'ఆకులలో లార్వాలు తొలిచిన తెల్లటి లేదా పారదర్శక వంకరటింకర సొరంగాలు.',
    },
    visibleSigns: {
      en: [
        'Whitish to pale yellow serpentine, irregular winding mines across the leaf surface.',
        'Black frass (insect fecal pellets) dotted inside the transparent trails.',
        'Small white feeding punctures or "stipples" made by female adult flies.',
        'Heavy infestations lead to premature leaf desiccation and sunscald on fruits.',
      ],
      hi: [
        'पत्ती की सतह पर सफेद या हल्के पीले रंग की अनियमित घुमावदार सुरंगें।',
        'सुरंगों के अंदर काले छोटे मल के कण दिखाई देना।',
        'वयस्क मक्खियों द्वारा पत्तियों पर बनाए गए छोटे सफेद बिंदु।',
        'अधिक संक्रमण होने पर पत्तियां सूख जाती हैं और फल झुलस जाते हैं।',
      ],
      ta: [
        'இலையின் மேற்பரப்பில் வெண்மையான அல்லது வெளிர் மஞ்சள் வளைந்த தடங்கள்.',
        'தடங்களின் உள்ளே கருப்பு நிற பூச்சி எச்சங்கள் காணப்படுதல்.',
        'பெண் பூச்சிகளால் ஏற்படுத்தப்படும் சிறிய வெள்ளை துளைகள்.',
        'அதிக பாதிப்பினால் இலைகள் காய்ந்து உதிர்ந்து விடும்.',
      ],
      te: [
        'ఆకు ఉపరితలంపై తెల్లటి లేదా లేత పసుపు రంగు వంకరటింకర గీతలు.',
        'సొరంగాల లోపల నల్లటి విసర్జిత చుక్కలు కనిపించడం.',
        'తల్లి పురుగులు ఆకులపై చేసే చిన్న తెల్లటి రంధ్రాలు.',
        'తీవ్రత పెరిగితే ఆకులు ఎండిపోయి రాలిపోతాయి.',
      ],
    },
    whatToCheckNext: {
      en: [
        'Hold the leaf up to sunlight to spot the small yellow-white larva actively feeding at the end of a trail.',
        'Check underside for pupae hanging by a thread or dropped onto topsoil.',
        'Inspect new shoots to see if recent flushes are still protected.',
        'Look for parasitoid wasp activity (natural predators like Diglyphus isaea).',
      ],
      hi: [
        'पत्ती को धूप की ओर उठाकर देखें कि क्या सुरंग के अंत में पीला-सफेद लार्वा मौजूद है।',
        'पत्ती के नीचे या मिट्टी पर प्यूपा की जाँच करें।',
        'नए अंकुरों की जाँच करें कि क्या वे सुरक्षित हैं।',
        'प्राकृतिक शिकारी ततैयों (पैरासिटॉइड वास्प) की उपस्थिति देखें।',
      ],
      ta: [
        'சூரிய ஒளியில் இலையைப் பிடித்து, சுரங்கத்தின் முடிவில் சிறிய லார்வா உள்ளதா எனப் பார்க்கவும்.',
        'இலையின் கீழ் அல்லது மண்ணில் கூட்டுப்புழுக்களை சரிபார்க்கவும்.',
        'புதிய தளிர்களில் சேதம் உள்ளதா எனப் பார்க்கவும்.',
        'இயற்கையான ஒட்டுண்ணி குளவிகள் இருப்பதை கவனிக்கவும்.',
      ],
      te: [
        'ఆకును సూర్యరశ్మికి ఎదురుగా ఉంచి సొరంగం చివర చిన్న పురుగు ఉందేమో చూడండి.',
        'ఆకు వెనుక లేదా నేలపై కోశస్థ దశ పురుగులను గమనించండి.',
        'కొత్త చిగుళ్ళపై దాడి ఉందో లేదో చూడండి.',
        'సహజ మిత్ర పురుగుల ఉనికిని పరిశీలించండి.',
      ],
    },
    photoTips: {
      en: [
        'Capture a close-up where the winding trails and black frass are in crisp focus.',
        'Include at least one whole leaf to show percentage of photosynthetic area affected.',
        'Take a photo of both upper and lower leaf surface.',
      ],
      hi: [
        'एक क्लोज-अप फोटो लें जिसमें घुमावदार सुरंगें और काले दाने साफ दिखें।',
        'पूरी पत्ती की फोटो लें ताकि पता चले कि कितना हिस्सा प्रभावित है।',
        'पत्ती के ऊपर और नीचे दोनों तरफ की फोटो लें।',
      ],
      ta: [
        'சுரங்கப்பாதைகள் தெளிவாகத் தெரியும்படி நெருக்கமான புகைப்படம் எடுக்கவும்.',
        'முழு இலையையும் படம் பிடித்து சேதத்தின் அளவைக் காட்டவும்.',
        'இலையின் மேல் மற்றும் கீழ் பகுதிகளைப் புகைப்படம் எடுக்கவும்.',
      ],
      te: [
        'గీతలు మరియు నల్లటి చుక్కలు స్పష్టంగా కనిపించేలా క్లోజప్ ఫోటో తీయండి.',
        'ఎంత శాతం ఆకు దెబ్బతిందో తెలియజేసేలా పూర్తి ఆకు ఫోటో తీయండి.',
        'ఆకు పైభాగం మరియు వెనుక భాగాన్ని ఫోటో తీయండి.',
      ],
    },
    referenceLink: {
      title: 'UC IPM Pest Management Guidelines - Leafminers on Tomato',
      url: 'https://ipm.ucanr.edu/agriculture/tomato/leafminers/',
    },
    sampleSymptomPrompt: 'My leaves have winding white trails that look like tunnels with black dots. What is this?',
  },
  {
    id: 'take-clearer-crop-photo',
    category: 'photo_tips',
    badgeIcon: 'Camera',
    cropPreset: 'phonePhotoTip',
    thumbnailUrl: '/assets/aistudio/image_93756638.png',
    categoryLabel: {
      en: 'Photo tip',
      hi: 'फोटो सुझाव',
      ta: 'புகைப்பட குறிப்பு',
      te: 'ఫోటో చిట్కా',
    },
    title: {
      en: 'Take a clearer crop photo',
      hi: 'फसल की बेहतर फोटो कैसे लें',
      ta: 'தெளிவான பயிர் புகைப்படம் எடுப்பது எப்படி',
      te: 'మంచి స్పష్టమైన పంట ఫోటో తీయడం ఎలా',
    },
    summary: {
      en: 'Field photography best practices to help the CropTrace AI model give instant, high-confidence diagnoses.',
      hi: 'खेत में फोटो खींचने के बेहतरीन तरीके ताकि एआई मॉडल सटीक और त्वरित पहचान कर सके।',
      ta: 'AI மாதிரி விரைவான மற்றும் துல்லியமான கணிப்பை வழங்க உதவும் களப் புகைப்பட வழிகாட்டுதல்கள்.',
      te: 'AI మోడల్ వేగంగా మరియు కచ్చితంగా వ్యాధులను గుర్తించడానికి ఫీల్డ్ ఫోటోగ్రఫీ చిట్కాలు.',
    },
    visibleSigns: {
      en: [
        'Hold the camera 10–20 cm away from the affected leaf or fruit.',
        'Tap your phone screen directly on the diseased area to lock focus and exposure.',
        'Include transition zones where damaged tissue meets healthy green tissue.',
        'Avoid blurry motion by stabilizing your wrists against your body or knee.',
      ],
      hi: [
        'कैमरे को प्रभावित पत्ती या फल से 10-20 सेमी दूर रखें।',
        'फोकस और रोशनी सेट करने के लिए फोन स्क्रीन पर रोगग्रस्त हिस्से को टैप करें।',
        'ऐसी फोटो लें जिसमें खराब और स्वस्थ हिस्सा दोनों दिखाई दें।',
        'हाथ कांपने से बचाने के लिए अपने हाथ को स्थिर रखें ताकि फोटो धुंधली न हो।',
      ],
      ta: [
        'கேமராவை பாதிக்கப்பட்ட இலை அல்லது காயிலிருந்து 10-20 செ.மீ தூரத்தில் வைக்கவும்.',
        'ஃபோகஸ் செய்ய பாதிக்கப்பட்ட பகுதியின் மீது திரையைத் தொடவும்.',
        'ஆரோக்கியமான மற்றும் பாதிக்கப்பட்ட பகுதி இரண்டும் தெரியும்படி படம் எடுக்கவும்.',
        'படம் தெளிவற்றதாக மாறாமல் இருக்க கைகளை அசையாமல் வைத்திருக்கவும்.',
      ],
      te: [
        'కెమెరాను ఆకు లేదా కాయ నుండి 10-20 సెం.మీ దూరంలో ఉంచండి.',
        'ఫోకస్ కోసం స్క్రీన్‌పై తెగులు ఉన్న భాగంపై ట్యాప్ చేయండి.',
        'మచ్చతో పాటు ఆరోగ్యకరమైన భాగం కూడా కనిపించేలా చేయండి.',
        'ఫోటో అస్పష్టంగా రాకుండా చేతులను నిలకడగా ఉంచండి.',
      ],
    },
    whatToCheckNext: {
      en: [
        'Check that the sun is behind you or overhead, not shining straight into the camera lens.',
        'Wipe dust and sweat off your camera lens with a soft cloth before shooting.',
        'If the wind is blowing, gently hold the petiole (leaf stalk) steady behind the leaf.',
        'Take a sequence: 1 close-up of symptom + 1 view of whole branch + 1 view of the plant.',
      ],
      hi: [
        'ध्यान रखें कि सूरज आपके पीछे या ऊपर हो, कैमरे के लेंस पर सीधे धूप न पड़े।',
        'फोटो लेने से पहले फोन के कैमरे के लेंस को साफ कपड़े से पोंछ लें।',
        'यदि हवा चल रही है, तो पत्ती के डंठल को पीछे से धीरे से पकड़कर स्थिर करें।',
        'क्रम में फोटो लें: 1 लक्षण का क्लोज-अप + 1 पूरी शाखा + 1 पूरा पौधा।',
      ],
      ta: [
        'சூரிய ஒளி கேமரா லென்ஸில் நேரடியாக விழாமல் பார்த்துக் கொள்ளுங்கள்.',
        'படம் எடுப்பதற்கு முன் லென்ஸை மெல்லிய துணியால் துடைக்கவும்.',
        'காற்று அடித்தால் இலைக்காம்பை மெதுவாகப் பிடித்து படம் எடுக்கவும்.',
        'அறிகுறியின் நெருக்கமான படம் + கிளைப் படம் என வரிசையாக எடுக்கவும்.',
      ],
      te: [
        'సూర్యకాంతి నేరుగా కెమెరాపై పడకుండా వెనుక నుండి వచ్చేలా చూసుకోండి.',
        'ఫోటో తీసే ముందు కెమెరా లెన్స్‌ను మెత్తని గుడ్డతో శుభ్రం చేయండి.',
        'గాలి వీస్తుంటే ఆకు తొడిమను మెల్లగా పట్టుకుని స్థిరంగా ఉంచండి.',
        'లక్షణం క్లోజప్ మరియు పూర్తి కొమ్మ కనిపించేలా రెండు ఫోటోలు తీయండి.',
      ],
    },
    photoTips: {
      en: [
        'Natural overcast daylight provides the best diffuse lighting without harsh shadows.',
        'Clean dirt splatters off the leaf if they mask fungal spots.',
        'Use the built-in gallery button if you took high-resolution photos earlier with your camera app.',
      ],
      hi: [
        'हल्के बादलों वाले दिन की प्राकृतिक रोशनी सबसे अच्छी होती है क्योंकि इसमें परछाई नहीं बनती।',
        'यदि पत्ती पर मिट्टी लगी हो, तो उसे हल्के से हटा लें ताकि लक्षण साफ दिखें।',
        'यदि आपने पहले ही अच्छी फोटो ली है, तो गैलरी बटन से सीधे अपलोड करें।',
      ],
      ta: [
        'மேகமூட்டமான பகல் வெளிச்சம் தெளிவான படங்களை எடுக்க மிகவும் சிறந்தது.',
        'இலையில் படிந்திருக்கும் மண்ணைத் துடைத்துவிட்டு படம் எடுக்கவும்.',
        'ஏற்கனவே எடுத்த நல்ல படங்கள் இருந்தால் கேலரி பட்டனைப் பயன்படுத்தவும்.',
      ],
      te: [
        'తేలికపాటి మేఘావృతమైన పగటి వెలుతురులో ఫోటోలు చాలా స్పష్టంగా వస్తాయి.',
        'ఆకుపై మట్టి ఉంటే సున్నితంగా తుడవండి.',
        'మీ గ్యాలరీలో ఉన్న స్పష్టమైన ఫోటోలను కూడా నేరుగా అప్‌లోడ్ చేయవచ్చు.',
      ],
    },
    referenceLink: {
      title: 'Digital Crop Diagnostics - Plant Health Image Quality Standard',
      url: 'https://www.fao.org/plant-health-diagnostics',
    },
    sampleSymptomPrompt: 'How do I take the best picture of my crop for accurate identification?',
  },
  {
    id: 'tomato-leaf-curl-virus',
    category: 'diseases',
    badgeIcon: 'Leaf',
    cropPreset: 'curledLeaves',
    thumbnailUrl: '/assets/aistudio/image_dc5b85f4.png',
    categoryLabel: {
      en: 'Disease',
      hi: 'रोग',
      ta: 'நோய்',
      te: 'వ్యాధి',
    },
    title: {
      en: 'Tomato yellow leaf curl',
      hi: 'टमाटर का पीला पत्ती मरोड़ रोग (लीफ कर्ल)',
      ta: 'தக்காளி மஞ்சள் இலை சுருள் நச்சுயிரி',
      te: 'టమాట ఆకు ముడత తెగులు',
    },
    summary: {
      en: 'Severe viral disease transmitted by the whitefly (Bemisia tabaci) causing upward cupping and severe stunting.',
      hi: 'सफेद मक्खी द्वारा फैलने वाला गंभीर विषाणु रोग जिसके कारण पत्तियां ऊपर की ओर मुड़ जाती हैं और पौधे का विकास रुक जाता है।',
      ta: 'வெள்ளை ஈக்களால் பரவும் கடுமையான வைரஸ் நோய், இலைகள் மேல்நோக்கி சுருண்டு செடி வளர்ச்சி குன்றும்.',
      te: 'తెల్లదోమ ద్వారా వ్యాపించే తీవ్రమైన వైరస్ తెగులు, ఆకులు పైకి ముడుచుకుపోయి మొక్క ఎదుగుదల ఆగిపోతుంది.',
    },
    visibleSigns: {
      en: [
        'Upward curling and cupping of leaflets.',
        'Interveinal chlorosis (yellowing between leaf veins).',
        'Marked reduction in leaflet size and crinkled leaf margins.',
        'Stunted, erect, bushy plant habit with flower abscission.',
      ],
      hi: [
        'पत्तियों का ऊपर की ओर मुड़ना और कटोरी जैसा आकार लेना।',
        'पत्तियों की नसों के बीच पीलापन।',
        'पत्तियों का आकार छोटा होना और किनारों का मुड़ना।',
        'पौधों का कद छोटा रह जाना और फूलों का झड़ जाना।',
      ],
      ta: [
        'இலைகள் மேல்நோக்கி கிண்ணம் போல சுருங்குதல்.',
        'இலை நரம்புகளுக்கு இடையே மஞ்சள் நிறமாதல்.',
        'இலைகளின் அளவு சுருங்குதல்.',
        'செடியின் வளர்ச்சி குன்றி பூக்கள் உதிர்ந்து போதல்.',
      ],
      te: [
        'ఆకులు పైకి దోనెలా ముడుచుకుపోవడం.',
        'ఈనెల మధ్య పసుపు రంగులోకి మారడం.',
        'ఆకుల పరిమాణం తగ్గి ముడతలు పడటం.',
        'మొక్క ఎదగకపోవడం మరియు పూత రాలిపోవడం.',
      ],
    },
    whatToCheckNext: {
      en: [
        'Gently shake the top foliage to check for tiny whiteflies fluttering underneath.',
        'Check yellow sticky traps in the field to monitor vector population.',
        'Inspect surrounding weeds (like nightshade or datura) that harbor the begomovirus.',
        'Protect non-infected younger crops using reflective silver mulches.',
      ],
      hi: [
        'पत्तियों को धीरे से हिलाकर देखें कि क्या सफेद मक्खियाँ उड़ रही हैं।',
        'सफेद मक्खियों की संख्या जानने के लिए पीले चिपचिपे ट्रैप की जाँच करें।',
        'खेत के आसपास के खरपतवारों की जाँच करें।',
        'स्वस्थ पौधों को बचाने के लिए सुरक्षात्मक उपाय करें।',
      ],
      ta: [
        'இலைகளை லேசாக அசைத்து வெள்ளை ஈக்கள் பறக்கிறதா எனப் பார்க்கவும்.',
        'மஞ்சள் ஒட்டும் பொறிகளை வயலில் அமைத்து கண்காணிக்கவும்.',
        'வயலைச் சுற்றியுள்ள களைகளை அகற்றவும்.',
        'பாதிக்கப்படாத இளம் பயிர்களைப் பாதுகாக்கவும்.',
      ],
      te: [
        'పై ఆకులను కదిలించి తెల్లదోమలు ఎగురుతున్నాయేమో చూడండి.',
        'పసుపు రంగు జిగురు అట్టలను పరిశీలించండి.',
        'చేను గట్లపై ఉన్న కలుపు మొక్కలను తొలగించండి.',
        'ఆరోగ్యకరమైన లేత పంటలను కాపాడుకోండి.',
      ],
    },
    photoTips: {
      en: [
        'Focus on the topmost growing tip where curling is most pronounced.',
        'Photograph the underside of young leaves showing the prominent veins.',
      ],
      hi: [
        'पौधे के सबसे ऊपरी हिस्से की फोटो लें जहाँ पत्तियां सबसे ज्यादा मुड़ी हुई हों।',
        'नई पत्तियों के निचले हिस्से की फोटो लें ताकि नसें साफ दिखें।',
      ],
      ta: [
        'சுருக்கம் அதிகம் காணப்படும் செடியின் மேல் நுனிப்பகுதியை படம் எடுக்கவும்.',
        'இளந்தளிர்களின் அடிப்பகுதியைப் படம் பிடிக்கவும்.',
      ],
      te: [
        'ముడత ఎక్కువగా ఉన్న మొక్క పైభాగాన్ని ఫోటో తీయండి.',
        'లేత ఆకుల వెనుక వైపు కనిపించేలా ఫోటో తీయండి.',
      ],
    },
    referenceLink: {
      title: 'CABI PlantwisePlus - Tomato Yellow Leaf Curl Virus Knowledge Bank',
      url: 'https://plantwiseplusknowledgebank.org',
    },
    sampleSymptomPrompt: 'My tomato plant has curled, crinkled leaves that curve upward like a cup. What could it be?',
  },
];
