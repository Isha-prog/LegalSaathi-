function fmtParty(extracted, lang) {
  if (extracted?.party?.length) return extracted.party[0];
  return lang === "hi" ? "[संबंधित पक्ष]" : "[Other Party's Name]";
}
function fmtAmount(extracted, lang) {
  if (extracted?.amount?.length) return extracted.amount[0];
  return lang === "hi" ? "[राशि]" : "[Amount]";
}

export function buildDocument(categoryKey, extracted, user, lang) {
  const party = fmtParty(extracted, lang);
  const amount = fmtAmount(extracted, lang);
  const name = user?.name || (lang === "hi" ? "[आपका नाम]" : "[Your Name]");
  const today = new Date().toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { year: "numeric", month: "long", day: "numeric" });

  const templates = {
    tenancy: {
      en: {
        title: "Legal Notice — Return of Security Deposit",
        to: `To,\n${party}`,
        subject: `Subject: Demand for Refund of Security Deposit of ${amount}`,
        body: [
          `Dear ${party},`,
          `I am writing regarding the security deposit of ${amount} paid by me under our rental agreement for the property I have vacated.`,
          `Despite completing my tenancy in accordance with the agreed notice period and leaving the property in good condition, the deposit has not been refunded to date.`,
          `I request that the full deposit amount be refunded within 15 days of receiving this notice. If the amount is not refunded within this period, I will be compelled to approach the Rent Authority / Rent Control Court for redressal, along with a claim for applicable interest.`,
          `I trust this matter will be resolved amicably and promptly.`,
        ],
      },
      hi: {
        title: "कानूनी नोटिस — जमा राशि की वापसी",
        to: `सेवा में,\n${party}`,
        subject: `विषय: ${amount} की जमा राशि वापसी की मांग`,
        body: [
          `प्रिय ${party},`,
          `मैं अपने किराया समझौते के तहत जमा की गई ${amount} की सुरक्षा राशि के संबंध में लिख रहा/रही हूं, जो मैंने खाली किए गए मकान के लिए जमा की थी।`,
          `निर्धारित सूचना अवधि के अनुसार किरायेदारी पूर्ण करने और मकान को अच्छी स्थिति में छोड़ने के बावजूद, आज तक जमा राशि वापस नहीं की गई है।`,
          `मैं अनुरोध करता/करती हूं कि इस नोटिस की प्राप्ति के 15 दिनों के भीतर पूरी जमा राशि वापस की जाए। यदि निर्धारित अवधि में राशि वापस नहीं की जाती, तो मुझे किराया प्राधिकरण / किराया न्यायालय में उचित ब्याज सहित शिकायत दर्ज करनी पड़ेगी।`,
          `आशा है यह मामला शीघ्र और सौहार्दपूर्ण ढंग से सुलझ जाएगा।`,
        ],
      },
    },
    consumer: {
      en: {
        title: "Consumer Complaint Letter",
        to: `To,\nCustomer Grievance Cell, ${party}`,
        subject: `Subject: Complaint Regarding Defective Product / Deficient Service`,
        body: [
          `Dear Sir/Madam,`,
          `I am writing to formally complain about a product/service purchased from ${party}, which was found to be defective / not as described.`,
          `Despite bringing this to your attention, I have not received a satisfactory refund, replacement, or resolution.`,
          `Under the Consumer Protection Act, 2019, I am entitled to a refund, replacement, or compensation for this deficiency. I request that this be resolved within 15 days of this letter, failing which I will file a formal complaint with the District Consumer Disputes Redressal Commission.`,
          `I look forward to your prompt response.`,
        ],
      },
      hi: {
        title: "उपभोक्ता शिकायत पत्र",
        to: `सेवा में,\nग्राहक शिकायत प्रकोष्ठ, ${party}`,
        subject: `विषय: दोषपूर्ण उत्पाद / सेवा में कमी संबंधी शिकायत`,
        body: [
          `महोदय/महोदया,`,
          `मैं ${party} से खरीदे गए उत्पाद/सेवा के संबंध में औपचारिक शिकायत दर्ज कर रहा/रही हूं, जो दोषपूर्ण पाया गया / विवरण के अनुरूप नहीं था।`,
          `इस बारे में सूचित करने के बावजूद, मुझे अभी तक संतोषजनक धनवापसी, प्रतिस्थापन या समाधान नहीं मिला है।`,
          `उपभोक्ता संरक्षण अधिनियम, 2019 के तहत, मैं इस कमी के लिए धनवापसी, प्रतिस्थापन या मुआवज़े का हकदार/हकदार हूं। मैं अनुरोध करता/करती हूं कि इस पत्र के 15 दिनों के भीतर समाधान किया जाए, अन्यथा मुझे जिला उपभोक्ता विवाद निवारण आयोग में औपचारिक शिकायत दर्ज करनी होगी।`,
          `आपके शीघ्र उत्तर की प्रतीक्षा रहेगी।`,
        ],
      },
    },
    rti: {
      en: {
        title: "First Appeal Under Section 19, RTI Act, 2005",
        to: `To,\nThe First Appellate Authority,\n${party || "[Concerned Department]"}`,
        subject: `Subject: First Appeal Against Non-Receipt of Information under RTI Act, 2005`,
        body: [
          `Sir/Madam,`,
          `I had filed an RTI application seeking information, which was duly received by your department. As per Section 7(1) of the RTI Act, 2005, a response was due within 30 days.`,
          `It has now been more than 30 days and I have not received any response or the requested information.`,
          `I hereby file this First Appeal under Section 19(1) of the RTI Act, 2005, requesting that the information be provided immediately, and that appropriate action be taken regarding the delay.`,
          `I look forward to a prompt resolution.`,
        ],
      },
      hi: {
        title: "धारा 19, RTI अधिनियम 2005 के तहत प्रथम अपील",
        to: `सेवा में,\nप्रथम अपीलीय प्राधिकारी,\n${party || "[संबंधित विभाग]"}`,
        subject: `विषय: RTI अधिनियम 2005 के तहत सूचना न मिलने पर प्रथम अपील`,
        body: [
          `महोदय/महोदया,`,
          `मैंने सूचना प्राप्त करने हेतु RTI आवेदन दायर किया था, जो आपके विभाग को विधिवत प्राप्त हुआ। RTI अधिनियम 2005 की धारा 7(1) के अनुसार, 30 दिनों के भीतर जवाब देना अनिवार्य था।`,
          `अब 30 दिनों से अधिक समय बीत चुका है और मुझे कोई जवाब या मांगी गई सूचना प्राप्त नहीं हुई है।`,
          `मैं RTI अधिनियम 2005 की धारा 19(1) के तहत यह प्रथम अपील दायर करता/करती हूं, जिसमें अनुरोध है कि सूचना तुरंत उपलब्ध कराई जाए और देरी के संबंध में उचित कार्रवाई की जाए।`,
          `शीघ्र समाधान की आशा है।`,
        ],
      },
    },
    employment: {
      en: {
        title: "Wage Claim Notice",
        to: `To,\n${party}`,
        subject: `Subject: Notice for Recovery of Unpaid Wages`,
        body: [
          `Dear Sir/Madam,`,
          `This is to bring to your attention that wages amounting to ${amount} due to me remain unpaid as of this date.`,
          `Under the Payment of Wages Act, 1936, I am entitled to timely payment of wages earned. I request that the outstanding amount be cleared within 15 days of this notice.`,
          `Should this not be resolved, I will be compelled to file a claim with the Labour Commissioner's office.`,
        ],
      },
      hi: {
        title: "वेतन दावा सूचना",
        to: `सेवा में,\n${party}`,
        subject: `विषय: अवैतनिक वेतन की वसूली हेतु सूचना`,
        body: [
          `महोदय/महोदया,`,
          `यह आपके ध्यान में लाना चाहता/चाहती हूं कि मुझे देय ${amount} का वेतन अभी तक अवैतनिक है।`,
          `वेतन भुगतान अधिनियम, 1936 के तहत, मुझे अर्जित वेतन का समय पर भुगतान पाने का अधिकार है। मैं अनुरोध करता/करती हूं कि इस सूचना के 15 दिनों के भीतर बकाया राशि का भुगतान किया जाए।`,
          `समाधान न होने पर, मुझे श्रम आयुक्त कार्यालय में दावा दायर करना होगा।`,
        ],
      },
    },
    general: {
      en: {
        title: "Formal Grievance Letter",
        to: `To,\n${party}`,
        subject: `Subject: Formal Notice Regarding Unresolved Grievance`,
        body: [
          `Dear Sir/Madam,`,
          `I am writing to formally raise a grievance that remains unresolved.`,
          `I request that this be addressed within a reasonable time. If not resolved, I may seek further legal or administrative recourse.`,
        ],
      },
      hi: {
        title: "औपचारिक शिकायत पत्र",
        to: `सेवा में,\n${party}`,
        subject: `विषय: अनसुलझी शिकायत के संबंध में औपचारिक सूचना`,
        body: [
          `महोदय/महोदया,`,
          `मैं एक ऐसी शिकायत औपचारिक रूप से उठाना चाहता/चाहती हूं जो अभी तक अनसुलझी है।`,
          `मैं अनुरोध करता/करती हूं कि इसे उचित समय के भीतर हल किया जाए। समाधान न होने पर, मुझे आगे कानूनी या प्रशासनिक कदम उठाने पड़ सकते हैं।`,
        ],
      },
    },
  };

  const tpl = (templates[categoryKey] || templates.general)[lang];
  return { ...tpl, date: today, signOff: lang === "hi" ? `भवदीय,\n${name}` : `Sincerely,\n${name}` };
}
