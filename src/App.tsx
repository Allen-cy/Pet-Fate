/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import Home from "./pages/Home";
import Question from "./pages/Question";
import Report from "./pages/Report";
import ShareCard from "./pages/ShareCard";
import Destiny from "./pages/Destiny";
import Layout from "./components/Layout";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore - key is required by AnimatePresence but not in RoutesProps */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="question" element={<Question />} />
          <Route path="report" element={<Report />} />
          <Route path="destiny" element={<Destiny />} />
          <Route path="share" element={<ShareCard />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
