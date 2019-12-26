import { rights, flip as C, encase, pipe, drop, chain, take, maybeToNullable, compose, size, Just, ifElse, gte, map, ap as S } from 'sanctuary';
import postList from './_content/';
import { formatPost } from '../../helpers/blog';
import config from '../../config';
const { pageSize } = config;

const takeUpTo = (x) => ifElse (compose(gte(x))(size)) (take(x)) (Just);

const paginate = ({ page, pageSize }) => pipe([
    drop((page - 1) * pageSize),
    chain(takeUpTo(pageSize)),
    maybeToNullable
]);

const flipPaginate = C(paginate);

const insert = (field) => (object) => (value) => ({ ...object, [field]: value });

const getRawPost = encase((name) => require(`./_content/${name}`));

const getPost = S(compose(map)(formatPost))(getRawPost);

const posts = pipe([
  insert('page')({ pageSize }),
  flipPaginate(postList),
  map(getPost),
  rights
]);

export { getPost, posts };
