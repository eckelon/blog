'use strict';

import { head, chain, map, pipe, maybeToNullable, splitOn, take, joinWith, parseDate } from 'sanctuary';

import config from '../config';
const { author: postAuthor } = config;

const formatDate = (date) => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

const getPostDate = pipe([
  splitOn('-'),
  take(3),
  map(joinWith('-')),
  chain(parseDate),
  map(formatDate),
  maybeToNullable
]);

const getPostSlug = pipe([
  splitOn('.'),
  head,
  maybeToNullable
]);

const formatPost = (name) => ({ attributes: { title, slug, date, author }, html }) => ({
  title,
  html,
  author: author || postAuthor,
  slug: slug || getPostSlug(name),
  date: date || getPostDate(name)
});


export { formatPost, formatDate, getPostDate, getPostSlug };
