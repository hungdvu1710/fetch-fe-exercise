import React from "react";
import { GlobalContextProvider } from "../Context/store";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div><GlobalContextProvider>{children}</GlobalContextProvider></div>;
};

export default layout;
