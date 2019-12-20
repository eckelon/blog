import { compose, map } from 'sanctuary';
import postList from './_content/';

const getRawPost = (name) => require(`./_content/${name}`);
const formatPost = ({ attributes: { title, slug }, html }) => ({ title, slug, html });
const getPost = compose(formatPost)(getRawPost);

const posts = map(getPost)(postList);

export { posts, formatPost };
