
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background">
      {/* 
        This layout is intentionally isolated.
        No Sidebar, No Topbar. Just the content.
       */}
      {children}
    </div>
  );
}
