import { Outlet } from "react-router-dom";
import { Header } from "../../pages/Header";

export const GuestLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
