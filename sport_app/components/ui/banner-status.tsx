const BannerStatus = ({ status }: { status: boolean }) => {
  return (
    <span
      className={`${
        !status ? "bg-red-500" : "bg-blue-500"
      } hover:opacity-55 inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-white`}
    >
      {status ? "Active" : "No active"}
    </span>
  );
};

export default BannerStatus;
