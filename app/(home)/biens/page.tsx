import PropertySection from "@/components/home/contents/PropertySection";

export const metadata = {
  title: "Tous les biens — ImmoGest",
  description: "Parcourez les maisons, appartements, chambres et parcelles disponibles.",
};

export default function AllPropertiesPage() {
  return (
    <main>
      <PropertySection />
    </main>
  );
}
