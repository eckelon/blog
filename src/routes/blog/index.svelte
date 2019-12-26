<script context="module">
    import { singleton } from 'sanctuary';
    export function preload({ params, query: { page } }) {
        return this.fetch(`blog.json?page=${page || 1}`)
            .then(r => r.json())
            .then(singleton('posts'));
    }
</script>

<script>
    import PostFooter from '../../components/PostFooter.svelte';
    export let posts;
    import config from '../../config.js';
    const { blogTitle } = config;
</script>

<style>
    .post {
        border-bottom: 1px solid black;
        padding: 2.5rem 0;
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
            <PostFooter date={post.date} author={post.author}/>
        </div>
    {/each}
</div>
