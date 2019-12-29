import { getPage, getTotalPages } from '../../../helpers/blog';

export function get({ params: { page } }, res) {

  const info = {
    page,
    posts: getPage(page),
    totalPages: getTotalPages()
  };

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify(info));
}
