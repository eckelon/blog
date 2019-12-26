'use strict';

const isDev = process.env.NODE_ENV === 'development';

export default {
    siteUrl: isDev ? 'http://localhost:3000' : 'https://vibrant-almeida-56d6d4.netlify.com',
    blogUrl: isDev ? 'http://localhost:3000/blog' : 'https://vibrant-almeida-56d6d4.netlify.com/blog',
    blogTitle: 'Blog de JA Samitier',
    author: 'JA Samitier',
    email: 'contacto [at] jasamitier [.] com',
    pageSize: 4,
    social: {
        twitter: 'https://twitter.com/eckelon',
        github: 'https://github.com/eckelon',
        linkedin: 'https://www.linkedin.com/in/jesús-ángel-samitier-05451296',
    }
};
