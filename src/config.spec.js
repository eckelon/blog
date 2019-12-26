'use strict';

const mockedEnv = require('mocked-env');

describe('test development configs', () => {

    let restore;

    beforeEach(() => {
        jest.resetModules()
        restore = mockedEnv({ NODE_ENV: 'development' });
    });

    test('shoud get valid urls', () => {

        const { default: { siteUrl, blogUrl } } = require('./config');
        expect(siteUrl).toBe('http://localhost:3000');
        expect(blogUrl).toBe('http://localhost:3000/blog');
    });

    afterEach(() => restore());

});

describe('test production configs', () => {

    let restore;

    beforeEach(() => {

        jest.resetModules()
        restore = mockedEnv({ NODE_ENV: 'production' });
    });

    test('shoud get valid urls', () => {

        const { default: { siteUrl, blogUrl } } = require('./config');

        expect(siteUrl).toBe('https://vibrant-almeida-56d6d4.netlify.com');
        expect(blogUrl).toBe('https://vibrant-almeida-56d6d4.netlify.com/blog');
    });

    afterEach(() => restore());

});
