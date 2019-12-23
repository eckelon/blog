import index from './index.md';
const { attributes: { title }, html } = index;

export function get(req, res) {
    res.writeHead(200, {
        'content-type': 'application/json'
    });

    res.end(JSON.stringify({ title, html }));
}

