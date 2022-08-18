import * as React from "react";
import { Outlet } from "react-router-dom";

import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

const PublicLayout = () => {
  return (
    <>
      <PublicHeader />
      <Outlet />
      <PublicFooter />
    </>
  );
};
export default PublicLayout;
