import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
