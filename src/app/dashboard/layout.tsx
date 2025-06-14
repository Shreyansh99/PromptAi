export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-layout min-h-screen">
      {children}
    </div>
  )
}
