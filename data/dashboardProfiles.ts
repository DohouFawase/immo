import type { WorkspaceRole } from "@/components/agents/shared/Sidebar";

export type DashboardProfile = {
  fullName: string;
  email: string;
  phone: string;
  commune: string;
  agency: string;
  businessId: string;
  searchZones: string;
  paymentPhone: string;
  portfolioDescription: string;
};

const storageKey = "immogest-dashboard-profiles";

export function readDashboardProfile(role: WorkspaceRole): DashboardProfile {
  const empty: DashboardProfile = {
    fullName: "",
    email: "",
    phone: "",
    commune: "",
    agency: "",
    businessId: "",
    searchZones: "",
    paymentPhone: "",
    portfolioDescription: "",
  };
  if (typeof window === "undefined") return empty;
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) || "{}") as Partial<Record<WorkspaceRole, DashboardProfile>>;
    return { ...empty, ...saved[role] };
  } catch {
    return empty;
  }
}

export function saveDashboardProfile(role: WorkspaceRole, profile: DashboardProfile) {
  const saved = JSON.parse(window.localStorage.getItem(storageKey) || "{}") as Partial<Record<WorkspaceRole, DashboardProfile>>;
  window.localStorage.setItem(storageKey, JSON.stringify({ ...saved, [role]: profile }));
}
