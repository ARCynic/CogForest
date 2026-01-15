import React, { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";

import { findWriting } from "../../data/forest/index.js";
import WritingsPage from "../../components/forest/WritingsPage.jsx";

import { FOREST_VISUALS, FOREST_VISUALS_DEFAULT } from "../../data/forest/visuals.js";

function pickRandom(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return arr[(Math.random() * arr.length) | 0];
}

export default function Writing() {
  const { section, slug } = useParams();

  // 1. Always call Hooks first (Order must not change)
  const writing = useMemo(() => findWriting(section, slug), [section, slug]);
  
  const visuals = FOREST_VISUALS[section] ?? FOREST_VISUALS_DEFAULT;

  const bgImage = useMemo(() => pickRandom(visuals?.writingBgs), [visuals]);

  // 2. Conditional return happens AFTER hooks
  if (!writing) return <Navigate to={`/${section}`} replace />;

  const viewModel = {
    id: writing.id,
    title: writing.title,
    author: writing.author,
    date: writing.date,
    section: writing.section ?? section,
    slug: writing.slug ?? slug,
    content: writing.content ?? "",
    img: writing.img ?? null,
  };

  return (
    <WritingsPage
      mode="single"
      writings={[viewModel]}
      selectedId={viewModel.id}
      iridescenceColor={visuals.palette.iridescenceColor}
      iridescenceOpacity={visuals.palette.iridescenceOpacity}
      bgImage={bgImage}
      headingFontClass={visuals.fonts?.headingClass}
      bodyFontClass={visuals.fonts?.bodyClass}
    />
  );
}