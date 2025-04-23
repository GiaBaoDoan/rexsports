import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import imageCompression from "browser-image-compression";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert single file to base64 after compressing
export const convertToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    })
      .then((compressedFile) => {
        reader.readAsDataURL(compressedFile);
      })
      .catch((error) => reject("Image compression failed: " + error));

    // Khi quá trình đọc file hoàn tất
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
