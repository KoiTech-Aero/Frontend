import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex h-screen bg-gray-200 justify-center items-center">
      <Outlet />
    </div>
  );
}