'use strict';

import { getFiles, isMarkdown } from './utils';
import { compose, head, chain, map, pipe, maybeToNullable, splitOn, take, joinWith, parseDate, filter, sort, reverse } from 'sanctuary';

import config from '../config';
const { author: postAuthor } = config;

const findPosts = pipe([
    filter(isMarkdown),
    sort,
    reverse
]);

const posts = compose(findPosts)(getFiles);

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


export { posts, formatPost, formatDate, getPostDate, getPostSlug };
