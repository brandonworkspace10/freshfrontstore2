export const mockUser = {
  id: "usr_001",
  name: "Marcus Rivera",
  email: "marcus@metrocutsbarbershop.com",
  avatarInitials: "MR",
  businessName: "Metro Cuts Barbershop",
  businessAddress: "248 W 125th St",
  borough: "Manhattan",
  businessType: "Barbershop",
  phone: "(212) 555-0192",
  preferredContact: "Text",
  plan: "Medium Business",
  planPrice: 250,
  frequency: "Monthly",
  nextBillingDate: "April 1, 2026",
  memberSince: "March 2025",
  loyaltyMonths: 9,
  paymentMethod: { type: "Visa", last4: "4242" },
  isOnboarded: true,
  unreadMessages: 2,
};

export const mockNextService = {
  date: "Thursday, March 12",
  time: "9:00 AM",
  serviceType: "Full Storefront Wash",
  techName: "Jordan T.",
  status: "confirmed",
};

export const mockServices = [
  {
    id: "svc_graffiti",
    name: "Graffiti Removal",
    duration: "~1–2 hrs",
    description: "Chemical treatment and removal of spray paint or marker from walls, gates, roll-down shutters, and surfaces.",
    price: "Quote-based",
    icon: "eraser",
  },
  {
    id: "svc_alley",
    name: "Alley & Rear Cleaning",
    duration: "~45 min",
    description: "Scrub down your rear entrance, dumpster area, and alley floor — areas your monthly plan doesn't cover.",
    price: "Add-on service",
    icon: "trash2",
  },
  {
    id: "svc_gum",
    name: "Gum & Stain Removal",
    duration: "~30 min",
    description: "Targeted treatment for embedded gum, rust stains, oil spots, and other stubborn sidewalk marks.",
    price: "Add-on service",
    icon: "droplets",
  },
  {
    id: "svc_deep",
    name: "Full Deep Clean",
    duration: "~2 hrs",
    description: "A thorough top-to-bottom exterior clean including grout scrubbing, pressure washing, and hard surface treatment.",
    price: "Add-on service",
    icon: "zap",
  },
];

export const mockCalendarEvents = [
  {
    id: "evt_001",
    date: "2026-03-12",
    serviceType: "Full Storefront Wash",
    time: "9:00 AM",
    techName: "Jordan T.",
    status: "confirmed",
  },
  {
    id: "evt_002",
    date: "2026-03-19",
    serviceType: "Sidewalk & Curb",
    time: "10:30 AM",
    techName: "Maria C.",
    status: "scheduled",
  },
  {
    id: "evt_003",
    date: "2026-02-12",
    serviceType: "Full Storefront Wash",
    time: "9:00 AM",
    techName: "Jordan T.",
    status: "completed",
  },
  {
    id: "evt_004",
    date: "2026-01-12",
    serviceType: "Full Storefront Wash",
    time: "9:00 AM",
    techName: "Jordan T.",
    status: "completed",
  },
  {
    id: "evt_005",
    date: "2025-12-12",
    serviceType: "Full Storefront Wash + Window Detail",
    time: "9:00 AM",
    techName: "Maria C.",
    status: "completed",
  },
];

export const mockInvoices = [
  {
    id: "INV-2026-003",
    date: "March 1, 2026",
    service: "Monthly Service — Medium Business",
    amount: 250,
    status: "upcoming",
    dueDate: "April 1, 2026",
  },
  {
    id: "INV-2026-002",
    date: "February 1, 2026",
    service: "Monthly Service — Medium Business",
    amount: 250,
    status: "paid",
    paidDate: "February 1, 2026",
  },
  {
    id: "INV-2026-001",
    date: "January 1, 2026",
    service: "Monthly Service — Medium Business",
    amount: 250,
    status: "paid",
    paidDate: "January 1, 2026",
  },
  {
    id: "INV-2025-012",
    date: "December 1, 2025",
    service: "Monthly Service — Medium Business + Window Detail Add-on",
    amount: 310,
    status: "paid",
    paidDate: "December 1, 2025",
  },
  {
    id: "INV-2025-011",
    date: "November 1, 2025",
    service: "Monthly Service — Medium Business",
    amount: 250,
    status: "paid",
    paidDate: "November 1, 2025",
  },
  {
    id: "INV-2025-010",
    date: "October 1, 2025",
    service: "Monthly Service — Medium Business",
    amount: 250,
    status: "failed",
    failedDate: "October 1, 2025",
  },
];

export const mockMessages = [
  {
    id: "msg_001",
    from: "FreshFront Team",
    fromInitials: "FF",
    subject: "Your March service is confirmed ✓",
    preview: "Hi Marcus — just a heads up that your March 12th service is locked in. Jordan will be there at 9 AM.",
    body: `Hi Marcus,\n\nJust a heads up — your March 12th service is confirmed and locked in.\n\nJordan T. will arrive at 9:00 AM for your Full Storefront Wash. No need to be present, but please ensure the front is accessible.\n\nQuestions? Reply here anytime.\n\n— The FreshFront Team`,
    date: "Mar 5, 2026",
    unread: true,
    isSystem: false,
  },
  {
    id: "msg_002",
    from: "FreshFront Team",
    fromInitials: "FF",
    subject: "Payment received — February invoice",
    preview: "Your payment of $250 for the February service has been received. Receipt attached.",
    body: `Hi Marcus,\n\nThis is a confirmation that your payment of $250.00 has been received for the February 2026 service.\n\nInvoice: INV-2026-002\nDate: February 1, 2026\nAmount: $250.00\n\nThank you for being a FreshFront customer!\n\n— FreshFront Billing`,
    date: "Feb 1, 2026",
    unread: true,
    isSystem: true,
  },
  {
    id: "msg_003",
    from: "FreshFront Team",
    fromInitials: "FF",
    subject: "Running about 10 minutes early today",
    preview: "Hey! Our crew is finishing up their previous stop and will be at your location around 8:50 AM.",
    body: `Hey Marcus,\n\nJust wanted to let you know — our crew is wrapping up early and will be at Metro Cuts around 8:50 AM instead of 9:00 AM.\n\nHope that works! If not, reply and we'll hold off.\n\n— Jordan T.`,
    date: "Feb 12, 2026",
    unread: false,
    isSystem: false,
  },
  {
    id: "msg_004",
    from: "FreshFront Team",
    fromInitials: "FF",
    subject: "Welcome to FreshFront, Marcus!",
    preview: "We're thrilled to have Metro Cuts Barbershop as a FreshFront customer. Here's what to expect for your first visit.",
    body: `Hi Marcus,\n\nWelcome to FreshFront! We're so excited to have Metro Cuts Barbershop as part of our family.\n\nYour first service is coming up and Jordan T. will be your dedicated technician. They'll introduce themselves and walk you through everything.\n\nHere's what to expect:\n- We'll arrive within the scheduled window\n- The service takes approximately 45 minutes\n- We'll clean up fully before leaving\n\nFirst impressions, every month.\n\n— The FreshFront Team`,
    date: "Mar 1, 2025",
    unread: false,
    isSystem: false,
  },
];

export const mockPlans = [
  {
    id: "small",
    name: "Small Business",
    price: 150,
    perMonth: "$150/month",
    includes: ["Banner cleaning", "Window cleaning", "Concrete/sidewalk"],
    ideal: "Ideal for small retail, bodegas, salons",
    popular: false,
  },
  {
    id: "medium",
    name: "Medium Business",
    price: 250,
    perMonth: "$250/month",
    includes: ["Banner cleaning", "Window cleaning", "Concrete/sidewalk", "Priority scheduling"],
    ideal: "Ideal for barbershops, restaurants, mid-size retail",
    popular: true,
  },
  {
    id: "large",
    name: "Large / Restaurant",
    price: null,
    perMonth: "$400–$600/month",
    includes: ["Banner cleaning", "Window cleaning", "Concrete/sidewalk", "Priority scheduling", "Custom service plan"],
    ideal: "Ideal for large restaurants, multi-window storefronts",
    popular: false,
    contactForQuote: true,
  },
];

export const frequencyOptions = [
  { id: "monthly", label: "Monthly", multiplier: 1 },
  { id: "biweekly", label: "Bi-Weekly", multiplier: 2 },
  { id: "bimonthly", label: "Bi-Monthly", multiplier: 0.5 },
];

export const boroughs = [
  "Manhattan",
  "Brooklyn",
  "Queens",
  "The Bronx",
  "Staten Island",
];

export const businessTypes = [
  "Restaurant",
  "Retail Store",
  "Salon",
  "Barbershop",
  "Bodega",
  "Other",
];

export const timeSlots = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM",
];
