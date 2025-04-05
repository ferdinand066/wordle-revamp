import "animate.css";
import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PageContainer from "./components/layouts/LayoutContainer";
import { routes } from "./routes/route";

const App: FC = () => {
  return (
    <PageContainer>
      <Routes>
        {routes.map((route) => (
          <Route {...route} />
        ))}
        <Route path="*" element={<Navigate to={"/wordle"} />} />
      </Routes>
      <ToastContainer />
    </PageContainer>
  );
};

export default App;
