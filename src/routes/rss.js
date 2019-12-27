import { getAllPosts } from '../helpers/blog';
import config from '../config'
const { blogTitle, blogUrl } = config;
const posts = getAllPosts();

const renderFeed = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
    <title><![CDATA[${blogTitle}]]></title>
    <link>${blogUrl}</link>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${posts.map(({ title, slug, description, date, html }) => `
          <item>
              <title>${title}</title>
        <link>${blogUrl}/${slug}</link>
        <guid isPermaLink="false">${blogUrl}/${slug}</guid>
              <description><![CDATA[${description || ''}]]></description>
              <pubDate>${ date || '' }</pubDate>
              <content:encoded><![CDATA[${html || ''}]]></content:encoded>
          </item>
      `).join('\n')}
</channel>
</rss>`;

export function get(req, res) {

  res.writeHead(200, {
    'Cache-Control': `max-age=0, s-max-age=${3600}`,
    'Content-Type': 'application/rss+xml;charset=UTF-8'
  });

  const feed = renderFeed(posts);
  res.end(feed);

}
