// Edit this file to add, remove or rename permission groups. Role IDs come from your Discord server.
export const groups = {
  owner: { label: "Directive Team", roles: ["1573037360097271809"] },
  executive: { label: "Head of Staff", roles: ["1573843427580190871"] },
  management: { label: "Management (SHR)", roles: ["1573037360080228407"] },
  hr: { label: "Human Resources (Supervisors)", roles: ["1573037360080228402"] },
  ia: { label: "Internal Affairs", roles: ["1573037360071844045"] },
  staff: { label: "Staff Team", roles: ["1573037360059383873", "1573037360059383868", "1573037360030032073"] },
  member: { label: "Member", roles: ["1573037359988219906"] },
} as const;

export type GroupKey = keyof typeof groups;
export const allRoleIds: string[] = Object.values(groups).flatMap((g) => [...g.roles]);

export const groupsOf = (roles: string[]): GroupKey[] =>
  (Object.keys(groups) as GroupKey[]).filter((k) => groups[k].roles.some((r) => roles.includes(r)));

// The owner group can open everything. Everyone else needs one of the listed groups.
export const can = (roles: string[], allow: GroupKey[]) => {
  const mine = groupsOf(roles);
  return mine.includes("owner") || allow.some((a) => mine.includes(a));
};

// Dashboards. Add a new one by adding a line here.
export const areas: Record<string, { title: string; allow: GroupKey[]; plan: string[] }> = {
  owner: { title: "Ownership Dashboard", allow: ["owner"], plan: ["Website overview", "Role and permission management", "Integration status", "Audit logs"] },
  executive: { title: "Executive Dashboard", allow: ["executive"], plan: ["Executive announcements", "Department overview", "Staff management tools"] },
  management: { title: "Management Dashboard", allow: ["management"], plan: ["Management resources", "Staff reports", "Department information"] },
  hr: { title: "Human Resources Dashboard", allow: ["hr"], plan: ["Application management", "Staff records", "Promotions and transfers"] },
  ia: { title: "Internal Affairs Dashboard", allow: ["ia"], plan: ["Case records", "Evidence references", "Investigation status"] },
  staff: { title: "Staff Dashboard", allow: ["staff"], plan: ["Staff announcements", "Moderation documentation", "Support request queue"] },
};
