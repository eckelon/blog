import { compose, fromEither } from 'sanctuary';

const isEmptyObject = (obj) => Object.entries(obj).length === 0 && obj.constructor === Object;

import { getPost } from './../../helpers/blog';

export function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;
  const post = compose(fromEither({}))(getPost)(`${slug}.md`);

  if(!post || isEmptyObject(post)) {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
      message: `Not found`
    }));

    return;
  }

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify(post));
}
