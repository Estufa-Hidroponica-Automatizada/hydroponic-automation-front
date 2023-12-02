import dayjs from "dayjs";

export const handleDownload = (extension: string, content: string | null) => {
  if (!content) {
    return;
  }
  const a = document.createElement("a");
  a.href = content ?? "";
  a.download = `${dayjs().format("DD-MM-YYYY-hhmm")}.${extension}`;
  a.click();
};
