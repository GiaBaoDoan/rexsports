import Dashboard from "@/components/admin/dashboard/Dashboard";

const DashboardPage = () => {
  const formatter = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <article>
        <h1 className="font-semibold text-2xl">Xin chào! 👋</h1>
        <p className="text-sm mt-2">{formatter.format(new Date())}</p>
      </article>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
