import { map, ap as S } from 'sanctuary';
import postList from './_content/';
import { formatPost } from '../../utils/blog';

const getRawPost = (name) => require(`./_content/${name}`);
const getPost = S(formatPost)(getRawPost);
const posts = map(getPost)(postList);

export { getPost, posts };
