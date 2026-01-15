export const FOREST_VISUALS = {
  fables: {
    palette: {
      iridescenceColor: [0.0, 0.9, 1.0],
      iridescenceOpacity: 0.18,
      accent: "#00e5ff",
    },
    // Tailwind font classes (you can swap later)
    fonts: {
      headingClass: "font-serif",
      bodyClass: "font-serif",
    },
    writingBgs: [
      "/forest/writing-bg/fables/0.png",
      "/forest/writing-bg/fables/1.png",
      "/forest/writing-bg/fables/2.png",
      "/forest/writing-bg/fables/3.png",
      "/forest/writing-bg/fables/4.png",
      "/forest/writing-bg/fables/5.png",
 
    ],
  },

  satire: {
    palette: {
      iridescenceColor: [1.0, 0.2, 0.8],
      iridescenceOpacity: 0.18,
      accent: "#ff3bd4",
    },
    fonts: {
      headingClass: "font-serif",
      bodyClass: "font-serif",
    },
    writingBgs: [
      "/forest/writing-bg/satire/1.png",
      "/forest/writing-bg/satire/2.png",
      "/forest/writing-bg/satire/3.png",
      "/forest/writing-bg/satire/4.png",
      "/forest/writing-bg/satire/5.png",
    ],
  },

  language: {
    palette: {
      iridescenceColor: [0.18, 0.85, 0.65],
      iridescenceOpacity: 0.18,
      accent: "#2dd4bf",
    },
    fonts: {
      headingClass: "font-serif",
      bodyClass: "font-serif",
    },
    writingBgs: [
      "/forest/writing-bg/language/1.png",
      "/forest/writing-bg/language/2.png",
      "/forest/writing-bg/language/3.png",
      "/forest/writing-bg/language/4.png",
      "/forest/writing-bg/language/5.png",
    ],
  },

  "music-as-regulation": {
    palette: {
      iridescenceColor: [0.55, 0.35, 1.0],
      iridescenceOpacity: 0.18,
      accent: "#8b5cf6",
    },
    fonts: {
      headingClass: "font-serif",
      bodyClass: "font-serif",
    },
    writingBgs: [
      "/forest/writing-bg/music/1.png",
      "/forest/writing-bg/music/2.png",
      "/forest/writing-bg/music/3.png",
      "/forest/writing-bg/music/4.png",
      "/forest/writing-bg/music/5.png",
    ],
  },

  fragments: {
    palette: {
      iridescenceColor: [0.55, 0.55, 0.55],
      iridescenceOpacity: 0.16,
      accent: "#a3a3a3",
    },
    fonts: {
      headingClass: "font-serif",
      bodyClass: "font-serif",
    },
    writingBgs: [
      "/forest/writing-bg/fragments/1.png",
      "/forest/writing-bg/fragments/2.png",
      "/forest/writing-bg/fragments/3.png",
      "/forest/writing-bg/fragments/4.png",
      "/forest/writing-bg/fragments/5.png",
      "/forest/writing-bg/fragments/6.png",
    ],
  },
};

// Optional fallback (if section missing)
export const FOREST_VISUALS_DEFAULT = {
  palette: {
    iridescenceColor: [0.0, 0.9, 1.0],
    iridescenceOpacity: 0.18,
    accent: "#00e5ff",
  },
  fonts: {
    headingClass: "font-serif",
    bodyClass: "font-serif",
  },
  writingBgs: ["/forest/writing-bg/satire/1.png"],
};