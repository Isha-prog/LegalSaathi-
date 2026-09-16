// Central mock "knowledge base" the classifier, guidance engine, and document
// generator all read from. In the connected-backend version, this is replaced
// by the actual RAG retrieval layer described in the synopsis.

export const CATEGORIES = {
  tenancy: {
    key: "tenancy",
    label: { en: "Tenancy & Rental Deposit Dispute", hi: "किराया एवं जमा राशि विवाद" },
    confidence: 92,
    level: "high",
    statute: {
      en: "Model Tenancy Act, 2021, Section 10 — the landlord must refund the security deposit within a specified period after the tenant vacates, less any lawful deductions.",
      hi: "मॉडल किरायेदारी अधिनियम, 2021, धारा 10 — किरायेदार के मकान खाली करने के बाद मकान मालिक को निर्धारित अवधि में जमा राशि लौटानी होगी, वैध कटौतियों को छोड़कर।",
    },
    authority: { en: "Rent Authority / Rent Control Court (state-specific)", hi: "किराया प्राधिकरण / किराया न्यायालय (राज्य अनुसार)" },
    fee: { en: "₹0 – ₹500 (varies by state)", hi: "₹0 – ₹500 (राज्य अनुसार भिन्न)" },
    deadline: { en: "Ideally within 30 days of vacating", hi: "मकान खाली करने के 30 दिनों के भीतर आदर्श रूप से" },
    steps: [
      { en: "Send a written deposit-return demand to your landlord by email or registered post, keeping a copy.", hi: "मकान मालिक को जमा राशि वापसी की लिखित मांग ईमेल या पंजीकृत डाक से भेजें, एक प्रति अपने पास रखें।" },
      { en: "Wait 15 days for a response. If none arrives, this becomes your evidence of a documented request.", hi: "जवाब के लिए 15 दिन प्रतीक्षा करें। कोई जवाब न आने पर यह आपके लिखित अनुरोध का प्रमाण बन जाता है।" },
      { en: "File a complaint with your state's Rent Authority or approach the Rent Control Court with your rental agreement and payment proof.", hi: "अपने राज्य के किराया प्राधिकरण में शिकायत दर्ज करें या किराया समझौते और भुगतान प्रमाण के साथ किराया न्यायालय जाएं।" },
      { en: "Attend the hearing (if scheduled) with all correspondence and photos of the property's condition at move-out.", hi: "सुनवाई (यदि निर्धारित हो) में सभी पत्राचार और मकान खाली करते समय की तस्वीरों के साथ उपस्थित रहें।" },
    ],
  },
  consumer: {
    key: "consumer",
    label: { en: "Consumer Complaint", hi: "उपभोक्ता शिकायत" },
    confidence: 89,
    level: "high",
    statute: {
      en: "Consumer Protection Act, 2019, Section 2(9) & 35 — a consumer may seek a refund, replacement, or compensation for defective goods or deficient services before the District Consumer Commission.",
      hi: "उपभोक्ता संरक्षण अधिनियम, 2019, धारा 2(9) एवं 35 — दोषपूर्ण वस्तु या सेवा में कमी के लिए उपभोक्ता जिला उपभोक्ता आयोग में धनवापसी, प्रतिस्थापन या मुआवज़ा माँग सकता है।",
    },
    authority: { en: "District Consumer Disputes Redressal Commission / National Consumer Helpline", hi: "जिला उपभोक्ता विवाद निवारण आयोग / राष्ट्रीय उपभोक्ता हेल्पलाइन" },
    fee: { en: "₹0 – ₹200 for claims up to ₹5 lakh", hi: "₹5 लाख तक के दावे के लिए ₹0 – ₹200" },
    deadline: { en: "File within 2 years of the purchase/incident", hi: "खरीद/घटना के 2 वर्षों के भीतर दायर करें" },
    steps: [
      { en: "Raise the issue with the seller in writing (email or their complaint portal) and keep the response, if any.", hi: "विक्रेता को लिखित में समस्या बताएं (ईमेल या उनके शिकायत पोर्टल पर) और मिले जवाब को सुरक्षित रखें।" },
      { en: "Call the National Consumer Helpline (1915) or file online at edaakhil.nic.in for free initial guidance.", hi: "राष्ट्रीय उपभोक्ता हेल्पलाइन (1915) पर कॉल करें या मुफ़्त प्रारंभिक सलाह के लिए edaakhil.nic.in पर ऑनलाइन शिकायत करें।" },
      { en: "If unresolved in 30 days, file a formal complaint with the District Consumer Commission with your invoice and evidence.", hi: "30 दिनों में समाधान न होने पर, बिल और सबूत के साथ जिला उपभोक्ता आयोग में औपचारिक शिकायत दर्ज करें।" },
      { en: "Attend the hearing; commissions increasingly allow video appearance for small claims.", hi: "सुनवाई में उपस्थित रहें; छोटे दावों के लिए आयोग अक्सर वीडियो उपस्थिति की अनुमति देते हैं।" },
    ],
  },
  rti: {
    key: "rti",
    label: { en: "RTI Delay / Non-Response", hi: "RTI में देरी / अनुत्तर" },
    confidence: 95,
    level: "high",
    statute: {
      en: "Right to Information Act, 2005, Section 7(1) requires a reply within 30 days; Section 19 provides a First Appeal if this deadline is missed.",
      hi: "सूचना का अधिकार अधिनियम, 2005, धारा 7(1) के अनुसार 30 दिनों में जवाब देना अनिवार्य है; समय सीमा चूकने पर धारा 19 के तहत प्रथम अपील का प्रावधान है।",
    },
    authority: { en: "First Appellate Authority of the concerned public department", hi: "संबंधित लोक विभाग के प्रथम अपीलीय प्राधिकारी" },
    fee: { en: "Usually free for the appeal", hi: "अपील के लिए सामान्यतः निःशुल्क" },
    deadline: { en: "File appeal within 30 days of the missed deadline", hi: "समय सीमा चूकने के 30 दिनों के भीतर अपील दायर करें" },
    steps: [
      { en: "Confirm 30 days have passed since your RTI application was received by the department.", hi: "पुष्टि करें कि विभाग को आपका RTI आवेदन प्राप्त हुए 30 दिन बीत चुके हैं।" },
      { en: "Draft a First Appeal addressed to the First Appellate Authority of the same department, citing Section 19.", hi: "उसी विभाग के प्रथम अपीलीय प्राधिकारी को संबोधित करते हुए धारा 19 का हवाला देकर प्रथम अपील तैयार करें।" },
      { en: "Submit it in person, by post, or online via the RTI Online Portal (for central departments).", hi: "इसे व्यक्तिगत रूप से, डाक द्वारा, या RTI ऑनलाइन पोर्टल (केंद्रीय विभागों के लिए) के माध्यम से जमा करें।" },
      { en: "If no response in 30–45 days, a Second Appeal can be filed with the State/Central Information Commission.", hi: "30–45 दिनों में जवाब न मिलने पर राज्य/केंद्रीय सूचना आयोग में द्वितीय अपील दायर की जा सकती है।" },
    ],
  },
  employment: {
    key: "employment",
    label: { en: "Wage / Employment Dispute", hi: "वेतन / नौकरी विवाद" },
    confidence: 74,
    level: "medium",
    statute: {
      en: "Payment of Wages Act, 1936 and Industrial Disputes Act, 1947 govern wage recovery and wrongful termination claims — the exact process depends on your employment terms and state rules.",
      hi: "वेतन भुगतान अधिनियम, 1936 और औद्योगिक विवाद अधिनियम, 1947 वेतन वसूली और गलत बर्खास्तगी से जुड़े मामलों को नियंत्रित करते हैं — सटीक प्रक्रिया आपकी नौकरी की शर्तों और राज्य नियमों पर निर्भर करती है।",
    },
    authority: { en: "Labour Commissioner's Office (state-specific)", hi: "श्रम आयुक्त कार्यालय (राज्य अनुसार)" },
    fee: { en: "Usually free to file", hi: "दाखिल करना सामान्यतः निःशुल्क" },
    deadline: { en: "Wage claims: within 12 months of the amount falling due", hi: "वेतन दावा: राशि बकाया होने के 12 महीनों के भीतर" },
    steps: [
      { en: "Gather your appointment letter, payslips, and any written communication about the unpaid wages or termination.", hi: "अपना नियुक्ति पत्र, वेतन पर्ची और अवैतनिक वेतन या बर्खास्तगी संबंधी लिखित संचार इकट्ठा करें।" },
      { en: "Send a written wage claim to your employer, giving them 15 days to respond.", hi: "नियोक्ता को लिखित वेतन दावा भेजें और जवाब के लिए 15 दिन दें।" },
      { en: "If unresolved, file a claim with your state's Labour Commissioner's office.", hi: "समाधान न होने पर, अपने राज्य के श्रम आयुक्त कार्यालय में दावा दायर करें।" },
    ],
  },
  general: {
    key: "general",
    label: { en: "General Grievance — Needs Review", hi: "सामान्य शिकायत — समीक्षा आवश्यक" },
    confidence: 48,
    level: "low",
    statute: {
      en: "This issue doesn't clearly match a specific statute we have on file. It may fall under a specialized law, or may need a fuller description to classify accurately.",
      hi: "यह समस्या हमारे पास मौजूद किसी विशेष कानून से स्पष्ट रूप से मेल नहीं खाती। यह किसी विशेष कानून के अंतर्गत आ सकती है, या सटीक वर्गीकरण के लिए अधिक विवरण की आवश्यकता हो सकती है।",
    },
    authority: { en: "To be determined", hi: "अभी निर्धारित नहीं" },
    fee: { en: "—", hi: "—" },
    deadline: { en: "—", hi: "—" },
    steps: [
      { en: "Consider adding more detail to your description — dates, amounts, and who is involved help narrow this down.", hi: "अपने विवरण में और जानकारी जोड़ें — तारीखें, राशि और शामिल पक्ष इसे सटीक बनाने में मदद करते हैं।" },
      { en: "This is a good candidate for a quick consultation with a lawyer or legal-aid clinic before proceeding.", hi: "आगे बढ़ने से पहले किसी वकील या विधिक सहायता क्लीनिक से त्वरित सलाह लेना उचित रहेगा।" },
    ],
  },
};

export function classify(extracted) {
  if (!extracted || !extracted.issueKeys || extracted.issueKeys.length === 0) {
    return CATEGORIES.general;
  }
  return CATEGORIES[extracted.issueKeys[0]] || CATEGORIES.general;
}
