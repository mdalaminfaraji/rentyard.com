import { PropertyForm } from "@/components/property-form/property-form";

/**
 * Home page component
 * Renders the property form as the main content
 */
export default function Home() {
  return (
    <main className="min-h-screen  py-5">
      <PropertyForm />
    </main>
  );
}
