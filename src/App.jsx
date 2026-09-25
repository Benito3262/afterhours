import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Markets from "./pages/Markets";
import Asset from "./pages/Asset";
import Clock from "./pages/Clock";
import Issuers from "./pages/Issuers";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/asset/:id" element={<Asset />} />
          <Route path="/clock" element={<Clock />} />
          <Route path="/issuers" element={<Issuers />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
