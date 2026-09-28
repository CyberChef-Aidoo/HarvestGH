import type { LegalSection } from "@/components/LegalDoc";

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "overview",
    title: "1. Overview",
    blocks: [
      { type: "p", text: "Agrobridge (“we”, “us”, “our”) operates a marketplace that matches farmer-based organisations to verified buyers before harvest. The pilot is in the Eastern Region. This Privacy Policy explains what personal information we collect from farmers, buyers, and visitors who use our website and services." },
      { type: "p", text: "By registering on Agrobridge or using our platform, you agree to the practices described in this policy. If you do not agree, please do not use our services." },
      { type: "p", text: "This policy applies to all information collected through our website pages, SMS services, and any related services offered by Agrobridge." },
    ],
  },
  {
    id: "collect",
    title: "2. What We Collect",
    blocks: [
      { type: "h3", text: "When you register as an FBO or farmer" },
      { type: "ul", items: ["Full name and group details to identify you on the platform", "Phone number to send SMS match notifications and contact you when an order is placed", "Region to coordinate collection logistics", "Crop type, quantity and price to display your listing accurately", "Pickup location to plan farm collection"] },
      { type: "h3", text: "When you register as a buyer" },
      { type: "ul", items: ["Full name and phone number", "Business name (optional)", "Delivery address for the pilot trade", "Crops or protein needed, grade, and typical quantities"] },
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
      { type: "ul", items: ["Listing expected FBO supply and coordinating pre-orders with verified buyers", "Sending SMS or WhatsApp notifications at each stage: order confirmed, collected from farm, out for delivery", "Platform management — reviewing registrations and verifying FBO groups", "Responding to questions and resolving issues", "Sending occasional seasonal harvest updates (you can opt out)", "Keeping a farm-to-buyer record of each completed trade", "Improving platform operations using aggregated, anonymised data"] },
      { type: "p", text: "We do not use your information for advertising, profiling, automated decision-making, or any purpose not listed above." },
    ],
  },
  {
    id: "share",
    title: "4. Who We Share It With",
    blocks: [
      { type: "h3", text: "With matched parties" },
      { type: "p", text: "When an order is confirmed, we communicate details between farmer and buyer to ensure accurate collection and delivery." },
      { type: "h3", text: "With service providers" },
      { type: "ul", items: ["Our Django backend and database, which store and process registration data", "Hubtel — our Ghanaian SMS provider, used solely to deliver notifications", "Paystack — our payment partner, for escrow processing", "Hosting and infrastructure providers, only as needed to operate the service"] },
      { type: "h3", text: "With partners" },
      { type: "p", text: "We may share anonymised, aggregated statistics with partners such as MoFA Ghana, NGOs, or researchers. This does not identify any individual." },
      { type: "note", text: "We never sell your personal data to any third party for any reason, including advertising." },
    ],
  },
  {
    id: "storage",
    title: "5. Data Storage",
    blocks: [
      { type: "p", text: "Your data is stored by the Agrobridge Django backend with the following protections:" },
      { type: "ul", items: ["Admin access requires authenticated login", "All data is transmitted over HTTPS", "Database access is restricted to the application and authorised administrators"] },
      { type: "p", text: "We retain your registration data while your account is active. If you request deletion, we remove your information within 14 days." },
    ],
  },
  {
    id: "rights",
    title: "6. Your Rights",
    blocks: [
      { type: "p", text: "As a registered user you have the right to:" },
      { type: "ul", items: ["Access a copy of the personal information we hold", "Correct inaccurate information", "Delete your account and associated data", "Opt out of SMS (note: you will not receive order notifications)", "Request your data in a readable format"] },
      { type: "p", text: "To exercise any of these rights, contact us using the details in Section 10. We respond within 14 days." },
    ],
  },
  {
    id: "sms",
    title: "7. SMS Communications",
    blocks: [
      { type: "p", text: "By providing your phone number, you consent to receiving SMS messages from Agrobridge, including order notifications and listing confirmations." },
      { type: "p", text: "To opt out, reply \u201cSTOP\u201d to any Agrobridge SMS or contact us directly. Opting out means you will need to check your listing status manually on the Farmer Portal." },
    ],
  },
  {
    id: "children",
    title: "8. Children",
    blocks: [
      { type: "p", text: "Agrobridge is not intended for use by persons under 18. We do not knowingly collect information from minors. If you believe a minor has registered, contact us and we will remove the account." },
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
      { type: "p", text: "Questions about this Privacy Policy? Contact Agrobridge — call or WhatsApp 054 411 4198, or use the contact form. We resolve privacy concerns promptly and transparently." },
    ],
  },
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "1. Acceptance",
    blocks: [
      { type: "p", text: "By registering on Agrobridge, using our website, or receiving our SMS services, you (\u201cUser\u201d) agree to be bound by these Terms of Service. If you do not agree, you must not use Agrobridge." },
      { type: "p", text: "These Terms form a legal agreement between you and Agrobridge. If registering on behalf of a business, you represent that you have authority to bind that entity." },
      { type: "p", text: "We may update these Terms at any time. Significant changes are communicated via SMS. Continued use constitutes acceptance." },
    ],
  },
  {
    id: "platform",
    title: "2. The Platform",
    blocks: [
      { type: "p", text: "Agrobridge matches farmer-based organisations with verified buyers before harvest. The pilot is in the Eastern Region. FBOs list expected supply, buyers pre-order, payment is held in escrow until delivery, and each cleared trade is stored as farm-to-buyer history." },
      { type: "note", text: "Agrobridge operates as an escrow-backed marketplace coordinator. We coordinate collection, delivery, and payment release to ensure fair trade between farmers and buyers." },
      { type: "p", text: "We do not guarantee that a listing results in an immediate order or that produce matches unstated expectations outside the listing specifications." },
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
    title: "4. Farmer and FBO Terms",
    blocks: [
      { type: "p", text: "As an FBO or farmer using Agrobridge, you agree that:" },
      { type: "ul", items: ["All produce listed is legally yours to sell", "Crop type, quantity, price, and condition are accurate at listing time", "You will promptly inform your Agrobridge agent when stock changes", "You will respond to Agrobridge phone confirmations in a timely manner", "You will not list unsafe or rotten produce", "You are responsible for having produce packed for collection at the farm"] },
      { type: "note", text: "Listing produce you do not have or deceiving buyers results in removal from the platform." },
    ],
  },
  {
    id: "buyers",
    title: "5. Buyer Terms",
    blocks: [
      { type: "p", text: "As a buyer using Agrobridge, you agree that:" },
      { type: "ul", items: ["You have a genuine intention to purchase when you place an order", "You will pay into escrow by bank transfer or Mobile Money before farm pickup", "You will give a delivery address the pilot can serve", "You will inspect produce upon arrival and confirm receipt promptly", "You will raise any disputes within 24 hours of delivery"] },
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
          ["FBO registration by agent", "Free"],
          ["Buyer registration", "Free"],
          ["Listing crops on the board", "Free"],
          ["SMS updates", "Free"],
          ["Platform fee on completed deal", "2% of order value, charged to the buyer when the trade clears"],
          ["FBO leader share", "1% on qualifying group volume"],
        ],
      },
      { type: "p", text: "Buyer payment is held in escrow (bank or Mobile Money). When the buyer confirms delivery, payment is released to the farmer, less the 2% buyer fee and the 1% FBO leader share." },
    ],
  },
  {
    id: "delivery",
    title: "7. Delivery",
    blocks: [
      { type: "p", text: "Agrobridge coordinates collection from the farm and delivery for pilot trades in the Eastern Region. When an order is placed:" },
      { type: "ul", items: ["We confirm availability with the farmer by phone, SMS, or WhatsApp", "Produce is collected from the farm", "Delivery is made to the buyer's specified address", "The buyer receives an update when goods are out for delivery", "The completed trade is stored with a transaction ID"] },
    ],
  },
  {
    id: "prohibited",
    title: "8. Prohibited Conduct",
    blocks: [
      { type: "p", text: "You must not use Agrobridge to:" },
      { type: "ul", items: ["Create false, misleading, or fraudulent listings or registrations", "Impersonate another person or organisation", "Harass, threaten, or abuse other users or staff", "List produce illegal to sell in Ghana", "Use the platform for illegal activity", "Scrape, copy, or redistribute user data"] },
      { type: "p", text: "Violations result in immediate removal and, where applicable, may be reported to relevant authorities." },
    ],
  },
  {
    id: "disputes",
    title: "9. Disputes & Escrow Releases",
    blocks: [
      { type: "p", text: "Because funds are held in escrow, buyer and seller are protected in the event of an issue." },
      { type: "h3", text: "How to raise a dispute" },
      { type: "ol", items: ["Contact Agrobridge within 24 hours of receiving goods", "Provide your phone number, order reference, and description of the issue", "Agrobridge will mediate and determine whether a refund or replacement is required before releasing escrow funds"] },
    ],
  },
  {
    id: "liability",
    title: "10. Liability",
    blocks: [
      { type: "p", text: "To the maximum extent permitted by Ghanaian law, Agrobridge shall not be liable for indirect or consequential losses resulting from delays or weather disruptions." },
      { type: "p", text: "Our total liability for any claim shall not exceed the platform fee received from that specific transaction." },
    ],
  },
  {
    id: "termination",
    title: "11. Termination",
    blocks: [
      { type: "h3", text: "By you" },
      { type: "p", text: "You may stop using Agrobridge at any time. To remove your account and data, contact us; we delete personal data within 14 days." },
      { type: "h3", text: "By Agrobridge" },
      { type: "p", text: "We may suspend or terminate access if you violate these Terms, engage in prohibited conduct, or provide false listings." },
    ],
  },
  {
    id: "governing",
    title: "12. Governing Law",
    blocks: [
      { type: "p", text: "These Terms are governed by the laws of the Republic of Ghana, and disputes are subject to the jurisdiction of the courts of Ghana." },
    ],
  },
  {
    id: "contact",
    title: "13. Contact",
    blocks: [
      { type: "p", text: "Questions about these Terms? Contact Agrobridge — call or WhatsApp 054 411 4198, or use the contact form." },
    ],
  },
];
