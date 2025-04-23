const Status = ({ status }: { status: boolean }) => {
  return (
    <span
      className={`hover:opacity-55 inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-white ${
        status ? "bg-blue-600" : "bg-red-600"
      } `}
    >
      {status ? "Công khai" : "Ẩn danh"}
    </span>
  );
};

export default Status;
