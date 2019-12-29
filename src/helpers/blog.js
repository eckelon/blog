'use strict';

import { getFiles, isMarkdown } from './utils';
import { compose, head, chain, map, pipe, maybeToNullable, splitOn, take, joinWith, parseDate, filter, sort, reverse, ifElse, gte, flip as C, ap as S, encase, drop, size, Just, rights, div, range, add } from 'sanctuary';

import config from '../config';
const { author: postAuthor, pageSize, contentDir } = config;

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


const takeUpTo = (x) => ifElse (compose(gte(x))(size)) (take(x)) (Just);

const insert = (field) => (object) => (value) => ({ ...object, [field]: value });

const getRawPost = encase((name) => require(`../routes/blog/_content/${name}`));
const getPost = S(compose(map)(formatPost))(getRawPost);

const findPosts = pipe([
    filter(isMarkdown),
    sort,
    reverse
]);

const getPosts = compose(findPosts)(getFiles);
const posts = getPosts(contentDir);

const getAllPosts = () => compose(rights)(map(getPost))(posts);
const getTotalPages = () => pipe([size, div(pageSize), Math.ceil, range(0), map(add(1))])(posts);

const paginate = C(({ page, pageSize }) => pipe([
    drop((page - 1) * pageSize),
    chain(takeUpTo(pageSize)),
    maybeToNullable
]));

const getPage =  pipe([
  insert('page')({ pageSize }),
  paginate(posts),
  map(getPost),
  rights
]);

export { getPage, getTotalPages, getAllPosts, getPost };
