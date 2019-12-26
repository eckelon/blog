import { posts } from './_posts.js';

export function get({ query: { page } }, res) {

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(posts(page)));
}
