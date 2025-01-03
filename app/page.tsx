import CropImage from "../components/crop-image/crop-image";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center p-5">
      <div className="md:mb-2 mb-1">
        <h2 className="text-center font-bold text-2xl">Welcome to Cropify!</h2>
        <p className="text-gray-400 text-sm">
          Start cropping your images in just a few clicks.
        </p>
      </div>
      <CropImage />
    </div>
  );
}
