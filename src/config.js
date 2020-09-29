"use strict";

import { resolve } from "path";

const contentDir = resolve("./src/routes/blog/_content");
const isDev = process.env.NODE_ENV === "development";

export default {
  siteUrl: isDev ? "http://localhost:3000" : "https://eckelon.net",
  blogUrl: isDev ? "http://localhost:3000/blog" : "https://eckelon.net/blog",
  blogTitle: "Blog de JA Samitier",
  author: "JA Samitier",
  email: "contacto [at] jasamitier [.] com",
  contentDir,
  pageSize: 10,
  social: {
    twitter: "https://twitter.com/eckelon",
    github: "https://github.com/eckelon",
    linkedin: "https://www.linkedin.com/in/jesús-ángel-samitier-05451296",
  },
};
