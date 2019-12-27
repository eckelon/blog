import { getPage } from '../../helpers/blog';

export function get({ query: { page } }, res) {

    const pageContent = getPage(page);

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(pageContent));
}
