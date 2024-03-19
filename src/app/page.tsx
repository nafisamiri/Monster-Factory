"use client";

import generateMask from "@/util/mask";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [monsterImageUrl, setMonsterImageUrl] = useState<MonsterImageURL>();

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  useEffect(() => {
    if (!selectedImage) return;
    setMonsterImageUrl(undefined);
    setLoading(true);
    generateMonsterImage(selectedImage)
      .then((monsterImage) => {
        setMonsterImageUrl(monsterImage);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedImage]);
  return (
    <main className="w-full h-full">
      <div className="w-full h-full flex flex-col md:flex-row justify-between p-4 gap-4">
        <div className="w-full h-full flex">
          <div className="bg-white border-2 border-gray-300 w-full h-full rounded-xl flex flex-col justify-center items-center">
            {selectedImage && (
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Image"
                className="w-1/2"
                width={100}
                height={100}
                fill={false}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-52"
            />
          </div>
        </div>
        <div className="w-full h-full flex">
          <div className=" bg-white border-2 border-gray-300 w-full h-full rounded-xl flex flex-col justify-center items-center">
            {monsterImageUrl && (
              <Image
                src={monsterImageUrl}
                alt={"AI generated monster image"}
                className="w-1/2"
                width={100}
                height={100}
                fill={false}
              />
            )}
            {loading && <p>Loading...</p>}
          </div>
        </div>
      </div>
    </main>
  );
}

async function generateMonsterImage(
  selectedImage: File
): Promise<MonsterImageURL> {
  const mask = await generateMask(selectedImage);
  const response = await postDallEVariationsApi(selectedImage, mask);
  if (!response.ok) {
    throw new Error(`Error getting variations: ${await response.json()}`);
  }
  const responseBody = await response.json();
  return responseBody.data[0]?.url;
}

async function postDallEVariationsApi(
  selectedImage: File,
  maskPicture: Blob
): Promise<Response> {
  const formData = new FormData();
  formData.append("image", selectedImage);
  formData.append("mask", maskPicture);
  formData.append(
    "prompt",
    "with respect to copy right edit the given image to look like a monster character from the monster inc animation from pixar BUT CONSIDER THE CONTENT OF THE ORIGINAL IMAGE SO IT LOOKS LIKE THE ORIGINAL."
  );

  return fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    body: formData,
  });
}

type MonsterImageURL = string;
