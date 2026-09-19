export const COMPANY = {
  legalName: "Artics Decorr",
  tradingName: "Artics Decorr",

  address:
    "A4/3/15, South Side, G.T. Road, Industrial Area, Vijay Nagar, Ghaziabad – 201009, Uttar Pradesh, India",

  email: "articsdecorr@gmail.com",

  phone: "+91 8860166301",
  phoneHref: "+918860166301",

  website: "https://www.articsdecorr.com",

  paymentProcessor: "Razorpay",
  currency: "Indian Rupee (INR)",

  // Policy settings
  coolingOffDays: 7,
  returnWindowDays: 14,
  refundDays: 10,
  transitClaimHours: 48,

  dispatchTime: "5–10 business days",

  // India / Artics Decorr shipping settings
  freeShippingThreshold: "",
  flatShippingFee: "",

  lastUpdated: "10 September 2026",
};

export const fmtList = (arr) =>
  arr.filter(Boolean).join(", ");