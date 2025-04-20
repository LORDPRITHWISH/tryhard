import { DarkSidebar } from "@/components/DarkSidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <div className="mx-auto">
      <DarkSidebar>{children}</DarkSidebar>
    </div>
  );
}
