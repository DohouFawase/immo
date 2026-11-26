export type DashboardProperty = {
  id: string;
  title: string;
  category: "Maison" | "Appartement" | "Chambre" | "Parcelle";
  operation: "Vente" | "Location";
  location: string;
  neighborhood: string;
  price: number;
  period?: string;
  area: number;
  bedrooms?: number;
  availableRooms?: number;
  livingRooms?: number;
  bathrooms?: number;
  toilets?: number;
  roomKind?: string;
  sanitary?: string;
  entrance?: string;
  kitchen?: string;
  furnished?: boolean;
  fenced?: boolean;
  landTitle?: string;
  subdivision?: string;
  access?: string;
  utilities: string[];
  description: string;
  photos: string[];
  agentName: string;
  agentPhone: string;
  createdAt: string;
};

const storageKey = "immogest-dashboard-properties";

export function readDashboardProperties(): DashboardProperty[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? (JSON.parse(stored) as DashboardProperty[]) : [];
  } catch {
    return [];
  }
}

export function saveDashboardProperty(property: DashboardProperty): void {
  const properties = readDashboardProperties();
  window.localStorage.setItem(storageKey, JSON.stringify([property, ...properties]));
}

export function deleteDashboardProperty(id: string): void {
  const properties = readDashboardProperties().filter((property) => property.id !== id);
  window.localStorage.setItem(storageKey, JSON.stringify(properties));
}
