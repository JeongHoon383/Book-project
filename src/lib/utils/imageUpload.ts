import imageCompression from "browser-image-compression";
import { auth, storage } from "@/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  UploadMetadata,
} from "firebase/storage";

const MAX_WIDTH = 512;
const MAX_HEIGHT = 512;
const MAX_FILE_SIZE_MB = 1;
const WEBP_QUALITY = 0.3;

const convertToWebP = async (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Unable to get canvas context"));
          return;
        }

        const targetWidth = Math.min(MAX_WIDTH, img.width);
        const targetHeight = Math.min(MAX_HEIGHT, img.height);
        const scale = Math.min(
          targetWidth / img.width,
          targetHeight / img.height
        );
        const width = img.width * scale;
        const height = img.height * scale;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (webpBlob: Blob | null) => {
            if (!webpBlob) {
              reject(new Error("Failed to create WebP Blob"));
              return;
            }
            resolve(webpBlob);
          },
          "image/webp",
          WEBP_QUALITY
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

export const uploadImage = async (
  file: File
): Promise<{ original: string; webp: string } | null> => {
  if (!file) return null;

  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const originalFileName = `${Date.now()}_${file.name}`;
  const originalStorageRef = ref(
    storage,
    `products/original/${originalFileName}`
  );

  const webpFileName = `${Date.now()}_${file.name.split(".")[0]}.webp`;
  const webpStorageRef = ref(storage, `products/webp/${webpFileName}`);

  const idToken = await user.getIdToken();

  const metadata: UploadMetadata = {
    contentType: file.type,
    cacheControl: "public, max-age=31536000",
    customMetadata: { token: idToken },
  };

  await uploadBytes(originalStorageRef, file, metadata);
  const originalUrl = await getDownloadURL(originalStorageRef);

  const compressdFile: File = await imageCompression(file, {
    maxSizeMB: MAX_FILE_SIZE_MB,
    maxWidthOrHeight: Math.max(MAX_WIDTH, MAX_HEIGHT),
    useWebWorker: true,
  });

  const optimizedFile: Blob = await convertToWebP(compressdFile);

  const webpMetadata: UploadMetadata = {
    contentType: "image/webp",
    cacheControl: "public, max-age=31536000",
    customMetadata: { token: idToken },
  };

  await uploadBytes(webpStorageRef, optimizedFile, webpMetadata);
  const webpUrl = await getDownloadURL(webpStorageRef);

  return {
    original: originalUrl,
    webp: webpUrl,
  };
};
