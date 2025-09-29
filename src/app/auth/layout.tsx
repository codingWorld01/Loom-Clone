import React from "react";

type props = {
  children: React.ReactNode;
};

const layout = ({ children }: props) => {
  return <div className="container h-screen flex justify-center items-center">
    {children}
  </div>;
};

export default layout;
