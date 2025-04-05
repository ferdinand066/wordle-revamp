import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

type LayoutContainerProps = {
  children: ReactNode;
};

const LayoutContainer: FC<LayoutContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 h-full flex flex-col py-4">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default LayoutContainer;
