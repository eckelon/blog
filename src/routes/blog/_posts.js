import { head, chain, map, pipe, maybeToNullable, splitOn, take, joinWith, parseDate, ap as S } from 'sanctuary';
import postList from './_content/';
import config from '../../config';
const { author: postAuthor } = config;

const formatDate = (date) => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
const getRawPost = (name) => require(`./_content/${name}`);

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
  author: postAuthor || author,
  slug: slug || getPostSlug(name),
  date: date || getPostDate(name)
});

const getPost = S(formatPost)(getRawPost);
const posts = map(getPost)(postList);

export { getPost, posts };
