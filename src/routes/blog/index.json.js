import { getPage, getTotalPages } from '../../helpers/blog';

export function get({ query: { page } }, res) {

    const info = {
        posts: getPage(page || 1),
        totalPages: getTotalPages()
    };

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(info));
}
