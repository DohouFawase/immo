type Category = "Tous" | "Maisons" | "Appartements" | "Chambres" | "Parcelles";
export type Listing = {
  id: number;
  category: Exclude<Category, "Tous">;
  title: string;
  location: string;
  price: number;
  period?: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  furnished?: boolean;
  access?: string;
  utilities?: string[];
  image: string;
  photos?: string[];
  roomKind?: string;
  roomDescription?: string;
  availableRooms?: number;
  floor?: string;
  security?: string;
  sanitary?: string;
  entrance?: string;
  kitchen?: string;
  livingRooms?: number;
  toilets?: number;
  independentEntry?: boolean;
  fenced?: boolean;
};

export const demoListings: Listing[] = [
  {
    id: 1,
    category: "Appartements",
    title: "Appartement lumineux de 3 pièces",
    location: "Fidjrossè, Cotonou",
    price: 280000,
    period: "/ mois",
    area: 92,
    bedrooms: 2,
    livingRooms: 1,
    bathrooms: 2,
    toilets: 2,
    independentEntry: true,
    furnished: true,
    utilities: ["Eau", "Électricité"],
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    category: "Maisons",
    title: "Maison familiale avec cour",
    location: "Agla, Cotonou",
    price: 65000000,
    area: 240,
    bedrooms: 4,
    livingRooms: 2,
    bathrooms: 3,
    toilets: 3,
    independentEntry: true,
    fenced: true,
    utilities: ["Cour", "Parking"],
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    category: "Chambres",
    title: "Chambre-salon ordinaire meublée",
    location: "Akpakpa, Cotonou",
    price: 95000,
    period: "/ mois",
    area: 24,
    bedrooms: 1,
    livingRooms: 1,
    bathrooms: 1,
    toilets: 1,
    independentEntry: true,
    furnished: true,
    photos: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1400&q=85",
    ],
    roomKind: "Chambre-salon ordinaire",
    roomDescription: "Chambre-salon meublée avec rangements et espace de vie séparé.",
    availableRooms: 2,
    floor: "Rez-de-chaussée",
    security: "Portail sécurisé",
    sanitary: "Sanitaire privé",
    entrance: "Entrée indépendante",
    kitchen: "Cuisine partagée",
    utilities: ["Wi-Fi", "Eau"],
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 7,
    category: "Chambres",
    title: "Chambre ordinaire avec sanitaire partagé",
    location: "Zogbo, Cotonou",
    price: 55000,
    period: "/ mois",
    area: 16,
    bedrooms: 1,
    livingRooms: 0,
    bathrooms: 1,
    toilets: 1,
    independentEntry: false,
    furnished: false,
    photos: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=85",
    ],
    roomKind: "Chambre ordinaire",
    roomDescription: "Chambre simple et non meublée, avec sanitaires partagés.",
    availableRooms: 1,
    floor: "1er étage",
    security: "Cour commune avec portail",
    sanitary: "Sanitaire partagé",
    entrance: "Entrée commune",
    utilities: ["Eau", "Électricité"],
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    category: "Parcelles",
    title: "Parcelle d’habitation de 500 m²",
    location: "Kpanroun, Abomey-Calavi",
    price: 18000000,
    area: 500,
    access: "Accès praticable",
    fenced: false,
    utilities: ["Eau à proximité", "Électricité à proximité"],
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    category: "Appartements",
    title: "Appartement 2 chambres, grand séjour",
    location: "Tokpota, Porto-Novo",
    price: 220000,
    period: "/ mois",
    area: 78,
    bedrooms: 2,
    livingRooms: 1,
    bathrooms: 1,
    toilets: 1,
    independentEntry: false,
    furnished: false,
    utilities: ["Balcon", "Eau"],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    category: "Parcelles",
    title: "Terrain à bâtir proche de la voie",
    location: "Godomey, Abomey-Calavi",
    price: 12500000,
    area: 350,
    access: "Voie bitumée",
    fenced: true,
    utilities: ["Électricité à proximité"],
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
  },
];

