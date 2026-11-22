export const site = {
  name: "California State Roleplay",
  short: "CARP",
  tagline: "Professionalism • Integrity • Service",
  discord: process.env.NEXT_PUBLIC_DISCORD_INVITE || "https://discord.gg/yeQWqk7Bj",
  tiktok: "https://www.tiktok.com/@carp_456",
  erlc: { owner: "thomaskarag (Timothy)", code: "CASRRP" },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/departments", label: "Departments" },
  { href: "/staff", label: "Staff Team" },
  { href: "/applications", label: "Applications" },
  { href: "/rules", label: "Rules" },
  { href: "/server-info", label: "Server Info" },
  { href: "/support", label: "Support" },
];

export const departments = [
  { slug: "lapd", name: "Los Angeles Police Department", short: "LAPD", text: "Patrol, traffic enforcement and investigations across Los Angeles." },
  { slug: "lasd", name: "Los Angeles County Sheriff's Department", short: "LASD", text: "County-wide law enforcement, patrol and specialised units." },
  { slug: "lafd", name: "Los Angeles Fire Department", short: "LAFD", text: "Fire suppression, rescue and emergency medical response." },
  { slug: "civ", name: "Civilian Operations", short: "CIV", text: "Build a character, hold a job, own a home or run a business." },
];

export const rules = [
  ["Display Names", "You are required to have your Discord display name the same as your Roblox username. You will be automatically loaded in-game if you do not link your account."],
  ["Respect Others", "Remain respectful to both members and staff inside of our community. We will moderate you if we find you being disrespectful."],
  ["Hate Speech", "Using racist, homophobic or genderphobia comments are prohibited, we ask that you keep these comments outside of our community."],
  ["NSFW Content", "Sharing content made for adults will result in a permanent ban. We do not condone this inside of our community."],
  ["Self Promotion", "DM advertising or advertising inside of our channels will result in a ban from our communications."],
  ["Rule Enforcement", "Staff reserve the right to moderate you in the event you violate our servers regulations."],
  ["Language", "Our community is English only. You are only permitted to speak English within our channels."],
  ["Alt Accounts", "You are allowed one account per-person inside of our server. If you are found to have multiple accounts inside of our server we will remove all accounts."],
  ["Common Sense", "Just because a rule is not written down does not mean that we do not moderate it. You were given a brain for a reason, please use it."],
  ["Voice Chat", "Do not abuse soundboards, voice calls or voice filters inside of our calls."],
  ["Causing Drama", "We ask that you keep all drama outside of our server. This keeps our community clean without having outside drama constantly being brought to our chats."],
  ["Terms of Service", "You are required to follow Discords Terms of Service at all times whilst on our community."],
  ["Direct Message Moderation", "We do not moderate members DMs unless it violates ToS or something that we do not side with. If these DMs are with a hired staff member, that is when we would initiate a further investigation."],
];
