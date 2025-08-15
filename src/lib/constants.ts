export const APP_CONFIG = {
  name: "Raphaël Jerusalmy",
  description: "Official website of author Raphaël Jerusalmy",
  url: "https://raphaeljerusalmy.com",
  locale: {
    default: "en",
    supported: ["en", "fr"],
  },
  port: {
    development: 3000,
    production: 3002,
  },
} as const;

export const ROUTES = {
  home: "/",
  about: "/about",
  books: "/books",
  blog: "/blog",
  events: "/events",
  contact: "/contact",
  newsletter: "/newsletter",
} as const;

export const EXTERNAL_LINKS = {
  manuelBleu: "https://manuelbleu.com",
  github: "https://github.com/Darkamui/raphael-jerusalmy",
} as const;

export const IMAGE_SIZES = {
  hero: { width: 600, height: 400 },
  bookCover: { width: 400, height: 600 },
  avatar: { width: 200, height: 200 },
} as const;

export const ANIMATION_DURATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.8,
} as const;