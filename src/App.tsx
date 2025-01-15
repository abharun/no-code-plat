import "./App.css";
import { Dashboard, ExecutePage, LoginPage } from "./pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PATH } from "./consts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.INTERFACE} element={<Navigate to={PATH.BUILDER} />} />
        <Route path={PATH.LOGIN} element={<LoginPage />} />
        <Route path={PATH.BUILDER} element={<Dashboard />} />
        <Route path={PATH.EXECUTE} element={<ExecutePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
