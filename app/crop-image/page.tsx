"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUp, Trash2 } from "lucide-react";
import Image from "next/image";

import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

type ISteps = "step-1" | "step-2" | "step-3" | "step-4";

const CropImage = () => {
  const [imageURL, setImageURL] = useState("");
  const [downloadImageURL, setDownloadImageURL] = useState("");
  const [steps, setSteps] = useState<ISteps>("step-1");

  const cropperRef = useRef<ReactCropperElement>(null);

  const onCrop = async () => {
    if (typeof cropperRef?.current?.cropper !== "undefined") {
      try {
        const file = await createFile();
        const fileURL = file && URL.createObjectURL(file);
        if (fileURL) setDownloadImageURL(fileURL);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const createFile = async () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const dataUrl = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL("image/png");
      // .toDataURL(`image/jpeg`, 0.8)

      // Convert Data URL to Blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Create a new File object with the specified extension
      const fileName = `image.png`;
      const fileType = blob.type;
      const file = new File([blob], fileName, { type: fileType });

      return file;
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const fileUrl = file && URL.createObjectURL(file);
    if (!!file && fileUrl) {
      setSteps("step-2");
      setImageURL(fileUrl ?? "");
    }
  };

  const onClickDeleteImage = () => {
    setSteps("step-1");
    setImageURL("");
  };

  const handleDownload = () => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = downloadImageURL;

    // Set the download attribute with the desired file name
    link.download = "unknown-image.png";

    // Programmatically click the link to trigger the download
    link.click();
  };

  const onReset = () => {
    setImageURL("");
    setSteps("step-1");
  };

  return (
    <div className="">
      {steps === "step-1" && (
        <label
          htmlFor="imageFile"
          className="relative w-96 h-96 flex justify-center items-center bg-[#FFFDF2] border-dashed border-2 border-gray-300 text-black rounded-3xl cursor-pointer hover:bg-[#FFFDF2]/80 hover:border-opacity-60 transition"
        >
          <input
            type="file"
            id="imageFile"
            className="absolute top-0 left-0 h-full w-full opacity-0 hidden cursor-pointer"
            onChange={onChange}
          />
          <FileUp className="size-16 text-gray-400" />
        </label>
      )}

      {steps === "step-2" && (
        <div className="relative w-96 h-96 flex justify-center items-center bg-[#FFFDF2] border-dashed border-2 border-gray-300 text-black rounded-3xl cursor-pointer hover:bg-[#FFFDF2]/80 hover:border-opacity-60 transition">
          <Image
            src={imageURL}
            width={100}
            height={100}
            alt="cropify-image"
            className="w-full h-full object-cover rounded-3xl"
          />
          <Button
            variant="secondary"
            className="absolute top-3 right-3 w-10 h-10 rounded-full"
            onClick={onClickDeleteImage}
          >
            <Trash2 className="text-red-600 !size-5" />
          </Button>
        </div>
      )}

      {steps === "step-3" && (
        <div className="relative w-96 h-96 flex justify-center items-center bg-[#FFFDF2] border-dashed border-2 border-gray-300 text-black rounded-3xl cursor-pointer hover:bg-[#FFFDF2]/80 hover:border-opacity-60 transition">
          <Cropper
            className="rounded-3xl"
            src={imageURL}
            style={{ height: 400, width: "100%" }}
            // Cropper.js options
            initialAspectRatio={16 / 9}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
          />
        </div>
      )}

      {steps === "step-2" && (
        <div
          className="flex items-center justify-end py-3"
          onClick={() => setSteps("step-3")}
        >
          <Button>Get Started</Button>
        </div>
      )}

      {steps === "step-3" && (
        <div className="flex justify-end items-center py-3 gap-2">
          <Button onClick={onReset} variant="secondary">
            Go to back
          </Button>
          <Button onClick={handleDownload}>Download Cropped Image</Button>
        </div>
      )}
    </div>
  );
};

export default CropImage;
