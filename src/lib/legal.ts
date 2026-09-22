import type { LegalSection } from "@/components/LegalDoc";

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "overview",
    title: "1. Overview",
    blocks: [
      { type: "p", text: "agro Bridge (\u201cwe\u201d, \u201cus\u201d, \u201cour\u201d) operates as a digital agricultural marketplace connecting smallholder farmers to verified buyers across Ghana. This Privacy Policy explains what personal information we collect from farmers, buyers, and visitors who use our website and services." },
      { type: "p", text: "By registering on agro Bridge or using our platform, you agree to the practices described in this policy. If you do not agree, please do not use our services." },
      { type: "p", text: "This policy applies to all information collected through our website pages, SMS services, and any related services offered by agro Bridge." },
    ],
  },
  {
    id: "collect",
    title: "2. What We Collect",
    blocks: [
      { type: "h3", text: "When you register as a farmer" },
      { type: "ul", items: ["Full name — to identify you on the platform", "Phone number — to send SMS match notifications and contact you when a buyer is found", "Region — to match you with buyers in or near your area", "Crop type — to match you with buyers looking for your produce", "Quantity and price — to display your listing accurately", "Pickup location — to help buyers plan logistics", "Account type — whether you self-manage or let agro Bridge manage your listing"] },
      { type: "h3", text: "When you register as a buyer" },
      { type: "ul", items: ["Full name and phone number", "Business name (optional)", "Region", "Crop needed and quantity"] },
      { type: "h3", text: "When you contact us" },
      { type: "ul", items: ["Your name, phone number, and message content from our contact form"] },
      { type: "h3", text: "Technical information" },
      { type: "ul", items: ["We do not collect IP addresses, cookies, or tracking data beyond what our hosting provider automatically logs for security", "We do not use advertising trackers or analytics that identify individual users"] },
    ],
  },
  {
    id: "use",
    title: "3. How We Use It",
    blocks: [
      { type: "p", text: "We use the information we collect for the following purposes only:" },
      { type: "ul", items: ["Matching farmer listings and buyer requests by crop type, region, and quantity", "Sending SMS notifications when a match is found", "Platform management — reviewing registrations and managing the matching process", "Responding to questions and resolving issues", "Sending occasional seasonal announcements (you can opt out)", "Improving the platform using aggregated, anonymised data"] },
      { type: "p", text: "We do not use your information for advertising, profiling, automated decision-making, or any purpose not listed above." },
    ],
  },
  {
    id: "share",
    title: "4. Who We Share It With",
    blocks: [
      { type: "h3", text: "With matched parties" },
      { type: "p", text: "When a match is confirmed, we share the farmer's phone number with the buyer and the buyer's phone number with the farmer. This is the core purpose of the platform." },
      { type: "h3", text: "With service providers" },
      { type: "ul", items: ["Supabase — our database provider, storing your data securely", "Hubtel — our Ghanaian SMS provider, used solely to deliver notifications", "Vercel — our hosting provider, with no access to registered data"] },
      { type: "h3", text: "With partners" },
      { type: "p", text: "We may share anonymised, aggregated statistics (e.g. \u2018450 tomato farmers registered in Ashanti\u2019) with partners such as MoFA Ghana, NGOs, or researchers. This does not identify any individual." },
      { type: "note", text: "We never sell your personal data to any third party for any reason, including advertising." },
    ],
  },
  {
    id: "storage",
    title: "5. Data Storage",
    blocks: [
      { type: "p", text: "Your data is stored in a secure Supabase database with the following protections:" },
      { type: "ul", items: ["Row Level Security (RLS) restricts access to authorised parties", "Admin access requires authenticated login", "All data is transmitted over HTTPS", "Databases are encrypted at rest"] },
      { type: "p", text: "We retain your registration data while your account is active. If you request deletion, we remove your information within 14 days." },
    ],
  },
  {
    id: "rights",
    title: "6. Your Rights",
    blocks: [
      { type: "p", text: "As a registered user you have the right to:" },
      { type: "ul", items: ["Access a copy of the personal information we hold", "Correct inaccurate information", "Delete your account and associated data", "Opt out of SMS (note: you will not receive match notifications)", "Request your data in a readable format"] },
      { type: "p", text: "To exercise any of these rights, contact us using the details in Section 10. We respond within 14 days." },
    ],
  },
  {
    id: "sms",
    title: "7. SMS Communications",
    blocks: [
      { type: "p", text: "By providing your phone number, you consent to receiving SMS messages from agro Bridge, including match notifications, listing confirmations, and infrequent seasonal announcements." },
      { type: "p", text: "To opt out, reply \u201cSTOP\u201d to any agro Bridge SMS or contact us directly. Opting out means you will need to check your listing status manually on the Farmer Portal." },
    ],
  },
  {
    id: "children",
    title: "8. Children",
    blocks: [
      { type: "p", text: "agro Bridge is not intended for use by persons under 18. We do not knowingly collect information from minors. If you believe a minor has registered, contact us and we will remove the account." },
    ],
  },
  {
    id: "changes",
    title: "9. Policy Changes",
    blocks: [
      { type: "p", text: "We may update this policy as our platform evolves. Significant changes will update the \u201cLast updated\u201d date and, for registered users, be notified via SMS. Continued use constitutes acceptance." },
    ],
  },
  {
    id: "contact",
    title: "10. Contact Us",
    blocks: [
      { type: "p", text: "Questions about this Privacy Policy? Contact agro Bridge in Accra, Ghana — phone 0544823484, or via the contact form. We resolve privacy concerns promptly and transparently." },
    ],
  },
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "1. Acceptance",
    blocks: [
      { type: "p", text: "By registering on agro Bridge, using our website, or receiving our SMS services, you (\u201cUser\u201d) agree to be bound by these Terms of Service. If you do not agree, you must not use agro Bridge." },
      { type: "p", text: "These Terms form a legal agreement between you and agro Bridge. If registering on behalf of a business, you represent that you have authority to bind that entity." },
      { type: "p", text: "We may update these Terms at any time. Significant changes are communicated via SMS. Continued use constitutes acceptance." },
    ],
  },
  {
    id: "platform",
    title: "2. The Platform",
    blocks: [
      { type: "p", text: "agro Bridge is a digital marketplace connecting smallholder farmers with buyers of agricultural produce in Ghana. The platform allows farmers to list produce, buyers to register interest, agro Bridge to facilitate matches, and delivery coordination between matched parties." },
      { type: "note", text: "agro Bridge is a marketplace intermediary only. We are not a party to any transaction and never take ownership of produce. All transactions are directly between farmers and buyers." },
      { type: "p", text: "We do not guarantee that a listing results in a match, that a match results in a completed transaction, or that produce will be of a specific quality, quantity, or condition." },
    ],
  },
  {
    id: "accounts",
    title: "3. User Accounts",
    blocks: [
      { type: "h3", text: "Eligibility" },
      { type: "p", text: "You must be at least 18 years old to register. By registering, you confirm you meet this requirement." },
      { type: "h3", text: "Accuracy of information" },
      { type: "p", text: "You agree to provide accurate, current, and complete information. Providing false information is grounds for immediate removal from the platform." },
      { type: "h3", text: "Phone number" },
      { type: "p", text: "Your phone number is your primary identifier. You must register with a number you own and control." },
    ],
  },
  {
    id: "farmers",
    title: "4. Farmer Terms",
    blocks: [
      { type: "p", text: "As a farmer using agro Bridge, you agree that:" },
      { type: "ul", items: ["All produce you list is legally yours to sell", "Crop type, quantity, price, and condition are accurate at listing time", "You will promptly update or remove listings when details change", "You will respond to agro Bridge and matched buyers in a timely manner", "You will not list unsafe, rotten, or misrepresented produce", "You are responsible for quantity and quality when produce leaves your farm"] },
      { type: "note", text: "Listing produce you do not have, false quantities, or deceiving buyers results in permanent removal and may be reported to authorities." },
    ],
  },
  {
    id: "buyers",
    title: "5. Buyer Terms",
    blocks: [
      { type: "p", text: "As a buyer using agro Bridge, you agree that:" },
      { type: "ul", items: ["You have a genuine intention to purchase when you register interest", "You will respond to match notifications in a timely manner", "You will not register false interest to gather market information", "You will inspect produce before final payment and raise disputes within 24 hours", "You will treat farmers with respect and negotiate in good faith", "You are responsible for confirming payment once a deal is agreed"] },
    ],
  },
  {
    id: "fees",
    title: "6. Fees & Payments",
    blocks: [
      { type: "h3", text: "Platform fees" },
      {
        type: "table",
        head: ["Service", "Fee"],
        rows: [
          ["Farmer registration", "Free"],
          ["Buyer registration", "Free"],
          ["Listing a crop", "Free"],
          ["Match notifications (SMS)", "Free (carrier SMS charges may apply)"],
          ["Transaction fee on completed deal", "1–2% of value, charged to the buyer at payment"],
          ["Delivery fee", "Variable by distance and quantity"],
        ],
      },
      { type: "p", text: "The 1–2% fee is payable upon completion of a deal. agro Bridge reserves the right to adjust its fee structure with 30 days' notice." },
      { type: "note", text: "Payments between farmers and buyers are made directly. agro Bridge does not hold, process, or guarantee payment, and is not liable for payment disputes." },
    ],
  },
  {
    id: "delivery",
    title: "7. Delivery",
    blocks: [
      { type: "p", text: "agro Bridge offers delivery coordination as an optional add-on service. When you request delivery:" },
      { type: "ul", items: ["We coordinate with third-party logistics providers or drivers", "Delivery fees are quoted in advance, separate from the transaction fee", "agro Bridge acts as a coordinator only; the provider is responsible for safe, timely delivery", "The farmer must package produce and have it ready for pickup", "The buyer must be available to receive goods at the agreed time"] },
    ],
  },
  {
    id: "prohibited",
    title: "8. Prohibited Conduct",
    blocks: [
      { type: "p", text: "You must not use agro Bridge to:" },
      { type: "ul", items: ["Create false, misleading, or fraudulent listings or registrations", "Impersonate another person or organisation", "Harass, threaten, or abuse other users or staff", "List produce illegal to sell in Ghana", "Use the platform for money laundering or illegal activity", "Scrape, copy, or redistribute user data", "Spam users after receiving their contact details through a match"] },
      { type: "p", text: "Violations result in immediate removal and, where applicable, may be reported to relevant authorities." },
    ],
  },
  {
    id: "disputes",
    title: "9. Disputes",
    blocks: [
      { type: "p", text: "agro Bridge facilitates connections but is not a party to transactions. We are committed to helping resolve disputes fairly." },
      { type: "h3", text: "How to raise a dispute" },
      { type: "ol", items: ["Contact agro Bridge within 24 hours of receiving goods", "Provide your phone number, match reference, and a description", "agro Bridge will contact both parties and mediate within 48 hours"] },
      { type: "p", text: "Mediation decisions are made in good faith but are not legally binding. For legal disputes, seek resolution through Ghana's courts or the appropriate regulatory body." },
    ],
  },
  {
    id: "liability",
    title: "10. Liability",
    blocks: [
      { type: "p", text: "To the maximum extent permitted by Ghanaian law, agro Bridge shall not be liable for loss or damage to produce, payment disputes, failed SMS delivery, losses from inaccurate listings, or indirect/consequential losses." },
      { type: "p", text: "Our total liability for any claim shall not exceed the transaction fee we received from that specific transaction. The platform is provided \u201cas is\u201d." },
    ],
  },
  {
    id: "termination",
    title: "11. Termination",
    blocks: [
      { type: "h3", text: "By you" },
      { type: "p", text: "You may stop using agro Bridge at any time. To remove your account and data, contact us; we deactivate and delete personal data within 14 days." },
      { type: "h3", text: "By agro Bridge" },
      { type: "p", text: "We may suspend or terminate access if you violate these Terms, engage in prohibited conduct, are involved in fraud, or where required by law." },
    ],
  },
  {
    id: "governing",
    title: "12. Governing Law",
    blocks: [
      { type: "p", text: "These Terms are governed by the laws of the Republic of Ghana, and disputes are subject to the exclusive jurisdiction of the courts of Ghana." },
      { type: "p", text: "If any provision is found invalid, it will be limited to the minimum extent necessary, and the remaining provisions continue in full force." },
    ],
  },
  {
    id: "contact",
    title: "13. Contact",
    blocks: [
      { type: "p", text: "Questions about these Terms? Contact agro Bridge in Accra, Ghana — phone / WhatsApp 0544823484, or via the contact form." },
    ],
  },
];
