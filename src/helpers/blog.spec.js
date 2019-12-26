'use strict';

import { formatPost, formatDate, getPostDate, getPostSlug } from './blog';

describe('blog utils tests', () => {
  it('it formats date', () => {

    const date = new Date('2019-10-01');
    const formatted = formatDate(date);
    expect(formatted).toBe('1/10/2019');
  });

  it('it gets a valid post date based on the file name', () => {

    const name = '2017-12-31-post-name.md';
    expect(getPostDate(name)).toBe('31/12/2017');
  });

  it('it gets a null post date based on the file name', () => {

    expect(getPostDate('2017-12-32-post-name.md')).toBeNull();
    expect(getPostDate('post-name.md')).toBeNull();
  });

  it('it gets a valid post slug base on the file name', () => {

    expect(getPostSlug('2017-12-31-this-is-a-post-name.md')).toBe('2017-12-31-this-is-a-post-name');
  });

  it('it formats the post', () => {

    const name = '2017-12-31-this-is-a-post-name.md';
    const post = {
      html: '<p>html</p>',
      attributes: {
        title: 'title',
        slug: '2017-12-31-this-is-a-post-name-2',
        date: '1/12/2017',
        author: 'The Author'
      }
    };

    const validPost = {
      html: '<p>html</p>',
      title: 'title',
      slug: '2017-12-31-this-is-a-post-name-2',
      date: '1/12/2017',
      author: 'The Author'
    };

    const formatted = formatPost(name)(post);
    expect(formatted).toEqual(validPost);
  });

  it('it formats the post with empty values', () => {

    const name = '2017-12-31-this-is-a-post-name.md';
    const post = {
      html: '<p>html</p>',
      attributes: {
        title: 'title',
      }
    };

    const validPost = {
      html: '<p>html</p>',
      title: 'title',
      slug: '2017-12-31-this-is-a-post-name',
      date: '31/12/2017',
      author: 'JA Samitier'
    };

    const formatted = formatPost(name)(post);
    expect(formatted).toEqual(validPost);
  });
});
