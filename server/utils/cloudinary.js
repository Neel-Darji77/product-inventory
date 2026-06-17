import { v2 as cloudinary } from "cloudinary";

const isCloudinaryConfigured = !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
} else {
    console.warn("⚠️ Cloudinary environment variables not fully configured. Using base64 fallback for uploads.");
}

export const uploadStream = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        if (!isCloudinaryConfigured) {
            reject(new Error("Cloudinary not configured"));
            return;
        }

        const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        stream.end(fileBuffer);
    });
};

export { isCloudinaryConfigured };
