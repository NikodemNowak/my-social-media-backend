import cloudinary from "../config/cloudinary";
import { UploadApiResponse } from "cloudinary";

export class CloudinaryService {

    static async uploadImage(imageBase64: string, folder: string): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(imageBase64, {
                folder, resource_type: 'image', transformation: [
                    { width: 250, height: 250, crop: 'fill' }
                ]
            }, (error, result) => {
                if (error) {
                    reject(error);
                }
                if (!result) return reject(new Error('Upload failed'));
                resolve(result);
            });
        });
    }

    static getImageUrl(publicId: string, options = {}): string {
        return cloudinary.url(publicId, options);
    }

    static async getImagesFromFolder(
        folder: string = 'avatars',
        maxResults: number = 100
    ): Promise<any> {
        try {
            const result = await cloudinary.search
                .expression(`folder:${folder}`)
                .max_results(maxResults)
                .execute();
            return result;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to get images from folder: ${error.message}`);
            } else {
                throw new Error('Failed to get images from folder: Unknown error');
            }
        }
    }

    static async deleteImage(publicId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
        });
    }

    static getSignedUrl(publicId: string, options = {}): string {
        return cloudinary.url(publicId, {
            ...options,
            sign_url: true,
            secure: true
        });
    }
}