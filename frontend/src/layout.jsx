import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";

export default function Layout() {
  return (
    <div className="flex flex-col  bg-white text-black min-h-screen">
      <Header />
      <main className="flex-grow p-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
