import React from "react";
import { Routes, Route } from "react-router-dom";

import ForestLayout from "./routes/forest/ForestLayout.jsx";
import ForestIndex from "./routes/forest/index.jsx";
import ForestEntry from "./routes/forest/Writing.jsx";

import FablesIndex from "./routes/forest/fables/index.jsx";
import SatireIndex from "./routes/forest/satire/index.jsx";
import LanguageIndex from "./routes/forest/language/index.jsx";
import MusicAsRegulationIndex from "./routes/forest/music-as-regulation/index.jsx";
import FragmentsIndex from "./routes/forest/fragments/index.jsx";

export default function App() {
  return (
    <Routes>
      {/* Redirect old root to the forest home */}

      
      {/* Forest shell with navbar/pills/background */}
      <Route element={<ForestLayout />}>
        <Route index element={<ForestIndex />} />

        {/* Sections */}
        <Route path="fables" element={<FablesIndex />} />
        <Route path="satire" element={<SatireIndex />} />
        <Route path="language" element={<LanguageIndex />} />
        <Route path="music-as-regulation" element={<MusicAsRegulationIndex />} />
        <Route path="fragments" element={<FragmentsIndex />} />

        {/* Reading route: changed from /forest/:section/:slug to /:section/:slug */}
        <Route path=":section/:slug" element={<ForestEntry />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-semibold text-white">404</h1>
      <p className="mt-2 text-white/70">This page doesn’t exist (yet).</p>
    </div>
  );
}