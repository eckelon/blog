'use strict';

import { readdirSync } from 'fs';

const getFiles = (dir) => readdirSync(dir);
const isMarkdown = (x) => x.includes('.md');

export { getFiles, isMarkdown };
