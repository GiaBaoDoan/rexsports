import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// convert single file to bas64
export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject("Failed to read file");
      }
    };

    reader.onerror = () => reject("Error reading file");
  });
};

// convert mutiple files to bas64
export const convertMultipleToBase64 = (files: FileList) => {
  const filePromises = Array.from(files).map((file) => convertToBase64(file));
  return Promise.all(filePromises);
};
