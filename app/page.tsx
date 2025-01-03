import CropImage from "./crop-image/page";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="md:mb-2">
        <h2 className="text-center font-bold text-2xl">Welcome to Cropify!</h2>
        <p className="text-gray-400">
          Start cropping your images in just a few clicks.
        </p>
      </div>
      <CropImage />
    </div>
  );
}
