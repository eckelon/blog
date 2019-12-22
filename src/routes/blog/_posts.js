import { head, chain, compose, map, pipe, maybeToNullable, splitOn, take, joinWith, parseDate } from 'sanctuary';

import postList from './_content/';

const getPostDate = pipe([
  splitOn('-'),
  take(3),
  map(joinWith('-')),
  chain(parseDate),
  maybeToNullable,
]);

const getPostSlug = pipe([
  splitOn('.'),
  head,
  maybeToNullable
]);

const getRawPost = (name) => require(`./_content/${name}`);
const formatPost = (name) => ({ attributes: { title, slug, date }, html }) => ({
  title,
  slug: slug || getPostSlug(name),
  html,
  date: date || getPostDate(name)
});

const getPost = (name) => compose(formatPost(name))(getRawPost)(name);


const posts = map(getPost)(postList);

export { posts, getPost };
