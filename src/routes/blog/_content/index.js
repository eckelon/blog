'use strict';
import { filter, sort, reverse, pipe } from 'sanctuary';
const { readdirSync } = require('fs');

const getFiles = (dir) => readdirSync(dir);
const isMarkdown = (x) => x.includes('.md');

const posts = pipe([
    getFiles,
    filter(isMarkdown),
    sort,
    reverse
]);

export default posts('./src/routes/blog/_content/');
