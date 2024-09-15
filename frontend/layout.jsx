import { Outlet } from "react-router-dom";
import Header from "./components/header";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen p-3">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
