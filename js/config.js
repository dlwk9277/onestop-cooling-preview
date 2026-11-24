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

  // WhatsApp number (same format as above). Leave it empty to hide the
  // WhatsApp buttons.
  whatsappNumber: "6588285392",
  whatsappMessage: "Hi OneStop Cooling, I'd like to book an aircon service.",
  whatsappMessageZh: "你好 OneStop Cooling，我想预约冷气保养。",   // used when the visitor reads the Chinese page

  // Opening hours. Set hoursConfirmed to true once the owner confirms them.
  hours: "Mon to Sun, 10:30am to 6pm",
  hoursConfirmed: false,

  address: "172C Sengkang East Drive, #10-172, Singapore 543172",
  mapQuery: "172C Sengkang East Drive, Singapore 543172",
  since: 2021,

  // Areas covered: add names between the quotes to replace the placeholder.
  // Example: ["Sengkang", "Punggol", "Hougang"]
  areas: [],

  // Real customer reviews (e.g. from Google). Leave empty until the owner
  // gives permission. Example: { name: "Mei", text: "On time and tidy." }
  reviews: [],

  // ---------- Prices (dollars) ----------
  // Normal service, one time. The five numbers are for 1, 2, 3, 4, 5 units.
  servicing: [
    { label: "Others",              prices: [60, 90, 110, 140, 170] },
    { label: "Samsung/Fujitsu",    prices: [90, 170, 250, 330, 410] }
  ],
  cbdSurcharge: 15,                       // extra for CBD addresses

  // Chemical overhaul, price for ONE unit. More units = price x units.
  overhaul: [
    { label: "9,000 to 12,000 BTU", price: 160 },
    { label: "18,000 BTU",          price: 210 },
    { label: "24,000 BTU",          price: 260 }
  ],
  // Multi-unit discount for overhaul, in %, for 1, 2, 3, 4, 5 units.
  // All 0 = no discount. Example: [0, 5, 10, 15, 20]
  overhaulDiscount: [0, 0, 0, 0, 0],

  gas: [
    { name: "R410", price: "$130 to $150" },
    { name: "R22",  price: "$100 to $130" },
    { name: "R32",  price: "$150 to $200" }
  ],
  addons: [
    { name: "Condenser chemical cleaning", price: "$130" },
    { name: "High pressure steamer",       price: "$100" },
    { name: "High pressure wash",          price: "$110" }
  ],
  // Transport to the customer's place, e.g. to inspect a fault
  transport: 60,
  transportCovered: true,    // true = the fee is covered by (deducted from) the service if the customer goes ahead

  // Quick-message buttons under "Aircon repair" (they open WhatsApp)
  problems: ["Not cold", "Leaking water", "Noisy", "Smells bad", "Won't turn on"]
};
