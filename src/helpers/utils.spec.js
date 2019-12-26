'use strict';

import { getFiles, isMarkdown } from './utils';

describe('test utils', () => {

  it('get an array with the files of a directory', () => {
    const files = getFiles('./src/helpers');
    expect(files.length).toBe(4);
  });

  it('detects if the filename provided is from a md file', () => {
    expect(isMarkdown('foo.md')).toBe(true);
    expect(isMarkdown('foo.js')).toBe(false);
  });
});
