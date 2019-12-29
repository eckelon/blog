<script context="module">
    export function preload({ params: { page }, query }) {
        return this.fetch(`blog.json?page=${page}`)
            .then(r => r.json())
            .then(json => ({...json, page}));
    }
</script>

<script>
    export let page;
    export let posts;
    export let totalPages;

    import PostFooter from '../../../components/PostFooter.svelte';
    import Paginator from '../../../components/Paginator.svelte';
    import config from '../../../config.js';
    const { blogUrl, blogTitle } = config;
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

<h1>{blogTitle} - Página {page}</h1>

<div class="blog">
    {#each posts as post}
        <div class="post">
            <h2><a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></h2>
            {@html post.html}
            <PostFooter date={post.date} author={post.author}/>
        </div>
    {/each}
    <Paginator url={blogUrl} totalPages={totalPages} />
</div>
