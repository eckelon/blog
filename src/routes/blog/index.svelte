<script context="module">
    import { singleton } from 'sanctuary';
    export function preload({ params, query }) {
        return this.fetch('blog.json')
            .then(r => r.json())
            .then(singleton('posts'));
    }
</script>

<script>
    export let posts;
    import config from '../../config.js';
    const { blogTitle } = config;
</script>

<style>
    .post {
        border-bottom: 1px solid black;
        padding: 1rem 0;
    }
</style>

<svelte:head>
    <title>{blogTitle}</title>
</svelte:head>

<h1>{blogTitle}</h1>

<div class="blog">
    {#each posts as post}
        <div class="post">
            <h2><a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></h2>
            {@html post.html}
            Publicado el {post.date} por {post.author}
        </div>
    {/each}
</div>
