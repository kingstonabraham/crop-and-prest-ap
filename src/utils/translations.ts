import { Language, CaseStatus, LearnCategory } from '../types';

export const TRANSLATIONS: Record<Language, {
  appName: string;
  tagline: string;
  checkYourCrop: string;
  identifySub: string;
  scanCropBtn: string;
  fieldInspection: string;
  knowledgeLibrary: string;
  recentCases: string;
  chatBannerPrompt: string;
  
  // Navigation
  navHome: string;
  navCases: string;
  navLearn: string;
  navAgent: string;
  
  // Cases page
  myCasesTitle: string;
  myCasesSub: string;
  searchCasesPlaceholder: string;
  noCasesFound: string;
  filterAll: string;
  filterNeedsReview: string;
  filterReviewed: string;
  filterFollowUp: string;
  
  // Status labels
  statusNeedsReview: string;
  statusReviewed: string;
  statusFollowUp: string;
  markAsReviewed: string;
  markAsFollowUp: string;
  markAsNeedsReview: string;
  
  // AI Agent Chat
  agentTitle: string;
  agentSubtitle: string;
  initialPrompt: string;
  typeMessagePlaceholder: string;
  addPhotoBtn: string;
  saveToCasesBtn: string;
  savedToCasesAlert: string;
  newChatBtn: string;
  demoModelBadge: string;
  liveModelBadge: string;
  errorRetryPrompt: string;
  retryBtn: string;
  renameCase: string;
  renamePrompt: string;
  cancel: string;
  save: string;
  analyzingPhoto: string;
  cameraAccessPrompt: string;
  galleryUpload: string;
  takeCameraPhoto: string;
  
  // Learn Page
  learnTitle: string;
  learnSubtitle: string;
  searchLearnPlaceholder: string;
  catAll: string;
  catDiseases: string;
  catPests: string;
  catPhotoTips: string;
  visibleSigns: string;
  whatToCheckNext: string;
  photoTipsHeading: string;
  referenceLinkHeading: string;
  scanSimilarBtn: string;
  backBtn: string;
  articlesCount: string;
  
  // PWA Install
  installAppBtn: string;
  installAppSub: string;
  iosInstallTitle: string;
  iosStep1: string;
  iosStep2: string;
  closeBtn: string;
  offlineBanner: string;
}> = {
  en: {
    appName: 'Zenvor CropTrace',
    tagline: 'Crop disease & pest help',
    checkYourCrop: 'Check your crop',
    identifySub: 'Identify crop diseases and pests.',
    scanCropBtn: 'Scan crop',
    fieldInspection: 'Field inspection',
    knowledgeLibrary: 'Knowledge library',
    recentCases: 'Recent cases',
    chatBannerPrompt: 'Chat with the agent and share a crop photo.',
    
    navHome: 'Home',
    navCases: 'My Cases',
    navLearn: 'Learn',
    navAgent: 'AI Agent',
    
    myCasesTitle: 'My Cases',
    myCasesSub: 'Review your scans and follow up.',
    searchCasesPlaceholder: 'Search cases',
    noCasesFound: 'No cases found matching your filter.',
    filterAll: 'All',
    filterNeedsReview: 'Needs review',
    filterReviewed: 'Reviewed',
    filterFollowUp: 'Follow-up needed',
    
    statusNeedsReview: 'Needs review',
    statusReviewed: 'Reviewed',
    statusFollowUp: 'Follow-up needed',
    markAsReviewed: 'Mark as Reviewed',
    markAsFollowUp: 'Mark as Follow-up needed',
    markAsNeedsReview: 'Mark as Needs review',
    
    agentTitle: 'CropTrace AI Agent',
    agentSubtitle: 'Crop disease & pest help',
    initialPrompt: 'Share a clear photo of the affected plant.',
    typeMessagePlaceholder: 'Type a message',
    addPhotoBtn: 'Add photo',
    saveToCasesBtn: 'Save to My Cases',
    savedToCasesAlert: 'Case saved and synced with My Cases!',
    newChatBtn: 'New chat',
    demoModelBadge: 'Colab Custom Model Demo',
    liveModelBadge: 'CropTrace Neural Model Live',
    errorRetryPrompt: 'Network or model response issue. Tap retry to re-analyze without losing conversation.',
    retryBtn: 'Retry scan',
    renameCase: 'Rename Case',
    renamePrompt: 'Enter a custom name for this case:',
    cancel: 'Cancel',
    save: 'Save',
    analyzingPhoto: 'Analyzing crop photo with CropTrace model...',
    cameraAccessPrompt: 'Take photo using camera',
    galleryUpload: 'Upload photo from gallery',
    takeCameraPhoto: 'Camera',
    
    learnTitle: 'Learn',
    learnSubtitle: 'Recognise crop symptoms and pests.',
    searchLearnPlaceholder: 'Search the knowledge library',
    catAll: 'All',
    catDiseases: 'Diseases',
    catPests: 'Pests',
    catPhotoTips: 'Photo tips',
    visibleSigns: 'Visible signs',
    whatToCheckNext: 'What to check next',
    photoTipsHeading: 'Photo tips',
    referenceLinkHeading: 'Reference link',
    scanSimilarBtn: 'Scan a similar symptom',
    backBtn: 'Back',
    articlesCount: 'articles',
    installAppBtn: 'Install App',
    installAppSub: 'Fast access & offline diagnostics on your phone.',
    iosInstallTitle: 'Install on iPhone / iPad',
    iosStep1: '1. Tap the Share button in Safari toolbar.',
    iosStep2: '2. Scroll down and tap "Add to Home Screen".',
    closeBtn: 'Close',
    offlineBanner: 'Offline Mode — Saved cases & knowledge library available.',
  },
  hi: {
    appName: 'Zenvor CropTrace',
    tagline: 'फसल रोग और कीट सहायता',
    checkYourCrop: 'अपनी फसल की जांच करें',
    identifySub: 'फसल के रोगों और कीटों की तुरंत पहचान करें।',
    scanCropBtn: 'फसल स्कैन करें',
    fieldInspection: 'खेत निरीक्षण',
    knowledgeLibrary: 'ज्ञान पुस्तकालय',
    recentCases: 'हाल के मामले',
    chatBannerPrompt: 'एजेंट से चैट करें और फसल की फोटो साझा करें।',
    
    navHome: 'होम',
    navCases: 'मेरे मामले',
    navLearn: 'सीखें',
    navAgent: 'एआई एजेंट',
    
    myCasesTitle: 'मेरे मामले',
    myCasesSub: 'अपने स्कैन की समीक्षा करें और आगे की कार्रवाई करें।',
    searchCasesPlaceholder: 'मामले खोजें',
    noCasesFound: 'इस फ़िल्टर से मेल खाता कोई मामला नहीं मिला।',
    filterAll: 'सभी',
    filterNeedsReview: 'समीक्षा आवश्यक',
    filterReviewed: 'समीक्षित',
    filterFollowUp: 'अनुवर्ती आवश्यक',
    
    statusNeedsReview: 'समीक्षा आवश्यक',
    statusReviewed: 'समीक्षित',
    statusFollowUp: 'अनुवर्ती आवश्यक',
    markAsReviewed: 'समीक्षित के रूप में चिह्नित करें',
    markAsFollowUp: 'अनुवर्ती आवश्यक चिह्नित करें',
    markAsNeedsReview: 'समीक्षा आवश्यक चिह्नित करें',
    
    agentTitle: 'CropTrace एआई एजेंट',
    agentSubtitle: 'फसल रोग व कीट सहायता',
    initialPrompt: 'प्रभावित पौधे की एक स्पष्ट फोटो साझा करें।',
    typeMessagePlaceholder: 'संदेश लिखें...',
    addPhotoBtn: 'फोटो जोड़ें',
    saveToCasesBtn: 'मेरे मामलों में सहेजें',
    savedToCasesAlert: 'मामला सहेजा गया और मेरे मामलों में अपडेट हुआ!',
    newChatBtn: 'नई चैट',
    demoModelBadge: 'Colab मॉडल डेमो',
    liveModelBadge: 'CropTrace न्यूरल मॉडल लाइव',
    errorRetryPrompt: 'मॉडल से उत्तर प्राप्त करने में समस्या। बातचीत खोए बिना पुनः प्रयास करें।',
    retryBtn: 'पुनः प्रयास करें',
    renameCase: 'मामले का नाम बदलें',
    renamePrompt: 'इस मामले का नया नाम दर्ज करें:',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    analyzingPhoto: 'फसल फोटो का विश्लेषण किया जा रहा है...',
    cameraAccessPrompt: 'कैमरे से फोटो लें',
    galleryUpload: 'गैलरी से फोटो अपलोड करें',
    takeCameraPhoto: 'कैमरा',
    
    learnTitle: 'सीखें',
    learnSubtitle: 'फसल के लक्षण और कीटों को पहचानें।',
    searchLearnPlaceholder: 'ज्ञान पुस्तकालय में खोजें',
    catAll: 'सभी',
    catDiseases: 'रोग',
    catPests: 'कीट',
    catPhotoTips: 'फोटो सुझाव',
    visibleSigns: 'दृश्य लक्षण',
    whatToCheckNext: 'आगे क्या जांचें',
    photoTipsHeading: 'फोटो सुझाव',
    referenceLinkHeading: 'संदर्भ लिंक',
    scanSimilarBtn: 'समान लक्षण स्कैन करें',
    backBtn: 'वापस',
    articlesCount: 'लेख',
    installAppBtn: 'ऐप इंस्टॉल करें',
    installAppSub: 'होम स्क्रीन से तेज़ पहुंच और ऑफ़लाइन निदान।',
    iosInstallTitle: 'iPhone / iPad पर इंस्टॉल करें',
    iosStep1: '1. सफारी टूलबार में शेयर बटन पर टैप करें।',
    iosStep2: '2. नीचे स्क्रॉल करें और "Add to Home Screen" चुनें।',
    closeBtn: 'बंद करें',
    offlineBanner: 'ऑफ़लाइन मोड — सहेजे गए मामले और पुस्तकालय उपलब्ध हैं।',
  },
  ta: {
    appName: 'Zenvor CropTrace',
    tagline: 'பயிர் நோய் மற்றும் பூச்சி உதவி',
    checkYourCrop: 'உங்கள் பயிரை சோதிக்கவும்',
    identifySub: 'பயிர் நோய்கள் மற்றும் பூச்சிகளை அடையாளம் காணவும்.',
    scanCropBtn: 'பயிரை ஸ்கேன் செய்',
    fieldInspection: 'வயல் ஆய்வு',
    knowledgeLibrary: 'அறிவு நூலகம்',
    recentCases: 'சமீபத்திய வழக்குகள்',
    chatBannerPrompt: 'ஏஜென்ட்டுடன் பேசி பயிர் புகைப்படத்தை பகிருங்கள்.',
    
    navHome: 'முகப்பு',
    navCases: 'என் வழக்குகள்',
    navLearn: 'அறிவோம்',
    navAgent: 'AI ஏஜென்ட்',
    
    myCasesTitle: 'என் வழக்குகள்',
    myCasesSub: 'உங்கள் ஸ்கேன்களை மதிப்பாய்வு செய்து பின்தொடரவும்.',
    searchCasesPlaceholder: 'வழக்குகளைத் தேடுங்கள்',
    noCasesFound: 'எந்த வழக்குகளும் காணப்படவில்லை.',
    filterAll: 'அனைத்தும்',
    filterNeedsReview: 'மதிப்பாய்வு தேவை',
    filterReviewed: 'மதிப்பாய்வு செய்யப்பட்டது',
    filterFollowUp: 'பின்தொடர்தல் தேவை',
    
    statusNeedsReview: 'மதிப்பாய்வு தேவை',
    statusReviewed: 'மதிப்பாய்வு செய்யப்பட்டது',
    statusFollowUp: 'பின்தொடர்தல் தேவை',
    markAsReviewed: 'மதிப்பாய்வு செய்யப்பட்டதாகக் குறிக்கவும்',
    markAsFollowUp: 'பின்தொடர்தல் தேவை எனக் குறிக்கவும்',
    markAsNeedsReview: 'மதிப்பாய்வு தேவை எனக் குறிக்கவும்',
    
    agentTitle: 'CropTrace AI ஏஜென்ட்',
    agentSubtitle: 'பயிர் நோய் & பூச்சி உதவி',
    initialPrompt: 'பாதிக்கப்பட்ட பயிரின் தெளிவான புகைப்படத்தை பகிரவும்.',
    typeMessagePlaceholder: 'செய்தியை உள்ளிடவும்...',
    addPhotoBtn: 'புகைப்படம் சேர்',
    saveToCasesBtn: 'என் வழக்குகளில் சேமி',
    savedToCasesAlert: 'வழக்கு வெற்றிகரமாக சேமிக்கப்பட்டது!',
    newChatBtn: 'புதிய உரையாடல்',
    demoModelBadge: 'Colab மாதிரி டெமோ',
    liveModelBadge: 'CropTrace நரம்பியல் மாதிரி நேரலை',
    errorRetryPrompt: 'இணைப்பு பிழை. உரையாடலை இழக்காமல் மீண்டும் முயற்சிக்கவும்.',
    retryBtn: 'மீண்டும் முயற்சி செய்',
    renameCase: 'பெயர் மாற்றம்',
    renamePrompt: 'புதிய பெயரை உள்ளிடவும்:',
    cancel: 'ரத்து',
    save: 'சேமி',
    analyzingPhoto: 'பயிர் படம் ஆய்வு செய்யப்படுகிறது...',
    cameraAccessPrompt: 'கேமராவில் படம் எடுக்கவும்',
    galleryUpload: 'கேலரியில் இருந்து படம் பதிவேற்றவும்',
    takeCameraPhoto: 'கேமரா',
    
    learnTitle: 'அறிவோம்',
    learnSubtitle: 'பயிர் அறிகுறிகளையும் பூச்சிகளையும் அடையாளம் காணுங்கள்.',
    searchLearnPlaceholder: 'அறிவு நூலகத்தில் தேடவும்',
    catAll: 'அனைத்தும்',
    catDiseases: 'நோய்கள்',
    catPests: 'பூச்சிகள்',
    catPhotoTips: 'புகைப்பட குறிப்புகள்',
    visibleSigns: 'புலப்படும் அறிகுறிகள்',
    whatToCheckNext: 'அடுத்து என்ன சரிபார்க்க வேண்டும்',
    photoTipsHeading: 'புகைப்பட குறிப்புகள்',
    referenceLinkHeading: 'குறிப்பு இணைப்பு',
    scanSimilarBtn: 'இதே போன்ற அறிகுறியை ஸ்கேன் செய்க',
    backBtn: 'பின்செல்',
    articlesCount: 'கட்டுரைகள்',
    installAppBtn: 'செயலியை நிறுவு',
    installAppSub: 'முகப்புத் திரையில் இருந்து விரைவான அணுகல் மற்றும் ஆஃப்லைன் சேவை.',
    iosInstallTitle: 'iPhone / iPad இல் நிறுவவும்',
    iosStep1: '1. சஃபாரி டூல்பாரில் பகிர் (Share) பொத்தானைத் தட்டவும்.',
    iosStep2: '2. கீழே உருட்டி "Add to Home Screen" என்பதைத் தேர்ந்தெடுக்கவும்.',
    closeBtn: 'மூடு',
    offlineBanner: 'ஆஃப்லைன் முறை — சேமிக்கப்பட்ட வழக்குகளும் நூலகமும் கிடைக்கின்றன.',
  },
  te: {
    appName: 'Zenvor CropTrace',
    tagline: 'పంట తెగుళ్ళు & పురుగుల సహాయం',
    checkYourCrop: 'మీ పంటను తనిఖీ చేయండి',
    identifySub: 'పంట వ్యాధులు మరియు తెగుళ్ళను గుర్తించండి.',
    scanCropBtn: 'పంటను స్కాన్ చేయండి',
    fieldInspection: 'క్షేత్ర తనిఖీ',
    knowledgeLibrary: 'జ్ఞాన గ్రంథాలయం',
    recentCases: 'ఇటీవలి కేసులు',
    chatBannerPrompt: 'ఏజెంట్‌తో చాట్ చేసి పంట ఫోటోను పంచుకోండి.',
    
    navHome: 'హోమ్',
    navCases: 'నా కేసులు',
    navLearn: 'తెలుసుకోండి',
    navAgent: 'AI ఏజెంట్',
    
    myCasesTitle: 'నా కేసులు',
    myCasesSub: 'మీ స్కాన్‌లను సమీక్షించండి మరియు ఫాలో అప్ చేయండి.',
    searchCasesPlaceholder: 'కేసులను వెతకండి',
    noCasesFound: 'కేసులు ఏవీ కనిపించలేదు.',
    filterAll: 'అన్నీ',
    filterNeedsReview: 'సమీక్ష అవసరం',
    filterReviewed: 'సమీక్షించబడింది',
    filterFollowUp: 'ఫాలో-అప్ అవసరం',
    
    statusNeedsReview: 'సమీక్ష అవసరం',
    statusReviewed: 'సమీక్షించబడింది',
    statusFollowUp: 'ఫాలో-అప్ అవసరం',
    markAsReviewed: 'సమీక్షించబడినట్లుగా గుర్తించు',
    markAsFollowUp: 'ఫాలో-అప్ అవసరమని గుర్తించు',
    markAsNeedsReview: 'సమీక్ష అవసరమని గుర్తించు',
    
    agentTitle: 'CropTrace AI ఏజెంట్',
    agentSubtitle: 'పంట వ్యాధి & తెగులు సహాయం',
    initialPrompt: 'ప్రభావిత మొక్క యొక్క స్పష్టమైన ఫోటోను పంచుకోండి.',
    typeMessagePlaceholder: 'సందేశాన్ని టైప్ చేయండి...',
    addPhotoBtn: 'ఫోటో జోడించు',
    saveToCasesBtn: 'నా కేసులలో భద్రపరచు',
    savedToCasesAlert: 'కేసు భద్రపరచబడింది!',
    newChatBtn: 'కొత్త చాట్',
    demoModelBadge: 'Colab మోడల్ డెమో',
    liveModelBadge: 'CropTrace న్యూరల్ మోడల్ లైవ్',
    errorRetryPrompt: 'కనెక్షన్ సమస్య. సంభాషణను కోల్పోకుండా మళ్ళీ ప్రయత్నించండి.',
    retryBtn: 'మళ్ళీ ప్రయత్నించండి',
    renameCase: 'కేసు పేరు మార్చండి',
    renamePrompt: 'ఈ కేసుకు కొత్త పేరును నమోదు చేయండి:',
    cancel: 'రద్దు చేయి',
    save: 'భద్రపరచు',
    analyzingPhoto: 'పంట ఫోటో విశ్లేషించబడుతోంది...',
    cameraAccessPrompt: 'కెమెరాతో ఫోటో తీయండి',
    galleryUpload: 'గ్యాలరీ నుండి ఫోటో ఎంచుకోండి',
    takeCameraPhoto: 'కెమెరా',
    
    learnTitle: 'తెలుసుకోండి',
    learnSubtitle: 'పంట లక్షణాలు మరియు తెగుళ్ళను గుర్తించండి.',
    searchLearnPlaceholder: 'జ్ఞాన గ్రంథాలయంలో శోధించండి',
    catAll: 'అన్నీ',
    catDiseases: 'వ్యాధులు',
    catPests: 'తెగుళ్ళు',
    catPhotoTips: 'ఫోటో చిట్కాలు',
    visibleSigns: 'కనిపించే లక్షణాలు',
    whatToCheckNext: 'తర్వాత ఏమి తనిఖీ చేయాలి',
    photoTipsHeading: 'ఫోటో చిట్కాలు',
    referenceLinkHeading: 'రిఫరెన్స్ లింక్',
    scanSimilarBtn: 'ఇలాంటి లక్షణాన్ని స్కాన్ చేయండి',
    backBtn: 'వెనుకకు',
    articlesCount: 'వ్యాసాలు',
    installAppBtn: 'యాప్‌ను ఇన్‌స్టాల్ చేయండి',
    installAppSub: 'హోమ్ స్క్రీన్ నుండి వేగవంతమైన యాక్సెస్ & ఆఫ్‌లైన్ ఉపయోగం.',
    iosInstallTitle: 'iPhone / iPad లో ఇన్‌స్టాల్ చేయండి',
    iosStep1: '1. సఫారీ టూల్‌బార్‌లో షేర్ చిహ్నాన్ని నొక్కండి.',
    iosStep2: '2. క్రిందికి స్క్రోల్ చేసి "Add to Home Screen" ఎంచుకోండి.',
    closeBtn: 'మూసివేయి',
    offlineBanner: 'ఆఫ్‌లైన్ మోడ్ — సేవ్ చేసిన కేసులు మరియు లైబ్రరీ అందుబాటులో ఉన్నాయి.',
  },
};

export const LANGUAGE_OPTIONS: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
];
