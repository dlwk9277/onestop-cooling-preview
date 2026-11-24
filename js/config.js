/* =====================================================================
   OneStop Cooling: website settings
   ---------------------------------------------------------------------
   The ONE file to edit for phone, WhatsApp, hours, prices, areas and
   reviews. Change the text or numbers, save, refresh the page.
   Keep the quotes " " and commas , exactly as they are.
   ===================================================================== */

window.SITE = {
  name: "OneStop Cooling",
  tagline: "Aircon Servicing and Repair",

  // Shown on the page + used for the Call button
  phoneDisplay: "8828 5392",
  phoneIntl: "6588285392",          // country code + number, no spaces or "+"

  // WhatsApp number (same format as above). LEAVE EMPTY until the owner
  // confirms it: the WhatsApp buttons then show as "to confirm".
  whatsappNumber: "6588285392",
  whatsappMessage: "Hi OneStop Cooling, I'd like to book an aircon service.",

  // Opening hours. Set hoursConfirmed to true once the owner confirms them.
  hours: "Mon to Sun, 10:30am to 6pm",
  hoursConfirmed: false,

  address: "172C Sengkang East Drive, #10-172, Singapore 543172",
  mapQuery: "172C Sengkang East Drive #10-172, Singapore 543172",
  since: 2021,

  // Areas covered: add names between the quotes to replace the placeholder.
  // Example: ["Sengkang", "Punggol", "Hougang"]
  areas: [],

  // Real customer reviews (e.g. from Google). Leave empty until the owner
  // gives permission. Example: { name: "Mei", text: "On time and tidy." }
  reviews: [],

  // ---------- Prices (dollars) ----------
  // Chemical overhaul, one time. Index 0 to 4 = 1 to 5 fan coils.
  overhaul: [
    { label: "9,000 to 12,000 BTU", prices: [150, 285, 405, 510, 600] },
    { label: "18,000 BTU",          prices: [180, 342, 486, 612, 720] },
    { label: "24,000 BTU",          prices: [200, 380, 540, 680, 800] }
  ],
  overhaulDiscount: [0, 5, 10, 15, 20],   // % off for 1 to 5 fan coils

  // Standard (residential) servicing, one time. 1 to 5 fan coils.
  servicing: [
    { label: "All models", prices: [40, 70, 100, 130, 160] },
    { label: "Fujitsu",    prices: [60, 110, 160, 210, 260] }
  ],
  cbdSurcharge: 15,                       // extra for CBD addresses

  addons: [
    { name: "Condenser chemical cleaning", price: "$120" },
    { name: "High pressure steamer",       price: "$80" },
    { name: "High pressure wash",          price: "$60" },
    { name: "Top-up gas (R410)",           price: "$80 to $120" },
    { name: "Top-up gas (R22)",            price: "$60 to $80" },
    { name: "Checking fee",                price: "$40", note: "offset against the service" }
  ]
};
