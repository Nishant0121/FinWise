import backgroud from "../assets/fintech_bg.jpg";
import { useAppContext } from "../context";

export default function Home() {
  const { user } = useAppContext();

  console.log(user);

  return (
    <div className="relative min-h-screen bg-gray-900 flex items-center justify-center">
      {/* Content */}
      <div className="h-full w-full bg-white-900 py-3 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  text-center z-10 text-white">
        <h1 className="text-4xl font-bold">
          The best tool to track your expenses and manage your budget
        </h1>
        <p className="mt-4 text-lg">
          Simplify your financial life with FinWise, your personal budgeting
          assistant.{" "}
        </p>
      </div>

      {/* Watermark */}
      <div className="absolute h-full w-full top-0 text-blue-500">
        <img
          src={backgroud}
          alt="Watermark Icon"
          className=" h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
