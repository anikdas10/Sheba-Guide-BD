import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Services from "./pages/services.jsx";
import ServiceDetails from "./pages/serviceDetails.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/services" element={<Services />} />

        <Route path="/services/:id" element={<ServiceDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
