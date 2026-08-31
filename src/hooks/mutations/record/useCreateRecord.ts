import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { postCreateRecord, postImagesUpload } from "../../../api/record";
import type { CreateRecordRequest } from "../../../types/report/creatRcord.type";
import type { ImageUploadResponse } from "../../../types/report/imageUpload.type";

export function useCreateRecord() {
  return useMutation({
    mutationFn: async ({
      bookId,
      content,
      emotion,
      imageFiles,
    }: {
      bookId: number;
      content: CreateRecordRequest["content"];
      emotion: CreateRecordRequest["emotion"];
      imageFiles: File[];
    }) => {
      let imageKeys: string[] = [];

      if (imageFiles.length > 0) {
        let imageTypes: ("image/jpeg" | "image/png" | "image/webp")[] =
          imageFiles.map((file) => {
            if (file.type === "image/jpeg") return "image/jpeg";
            if (file.type === "image/png") return "image/png";
            if (file.type === "image/webp") return "image/webp";
            throw new Error(`Unsupported image type: ${file.type}`);
          });
        console.log("imageTypes:", imageTypes);

        let uploadImageUrls: ImageUploadResponse[] = [];
        uploadImageUrls = await postImagesUpload(imageTypes);

        const uploadPromises = imageFiles.map(async (file, index) => {
          const { imageUrl, key } = uploadImageUrls[index];
          await axios.put(imageUrl, file, {
            headers: {
              "Content-Type": file.type,
            },
          });
          console.log(`Image uploaded successfully: ${key}`);
          return key; // 성공하면 key 반환
        });

        imageKeys = await Promise.all(uploadPromises);
      }
      console.log("총 이미지 갯수:", imageKeys.length);

      const data: CreateRecordRequest = {
        content,
        emotion,
        imageKeys,
      };

      return postCreateRecord(bookId, data);
    },
  });
}

// 이미지 url과 key배열 받은 후, 각 이미 url로 put 요청 보내기. 그리고 마지막에 postCreateRecord 호출
