import dayjs from "dayjs";

export const getDate = (dateTime: string | Date) =>
  dayjs(dateTime).format("DD/MM/YYYY - HH:mm:ss");
