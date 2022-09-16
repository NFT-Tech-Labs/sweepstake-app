import React from "react";
import Container from "../container/container";

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
