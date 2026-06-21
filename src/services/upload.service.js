import cloudinary from "../config/cloudinary.js";

export const uploadImageService = (
  fileBuffer
) => {
  return new Promise(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "restaurant",
          },
          (error, result) => {
            if (error)
              return reject(error);

            resolve(result);
          }
        )
        .end(fileBuffer);
    }
  );
};