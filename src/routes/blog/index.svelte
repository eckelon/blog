<script context="module">
    export function preload({ params, query }) {
        return this.fetch(`blog.json`)
            .then(r => r.json());
    }
</script>

<script>
    export let posts;
    export let totalPages;

    import Paginator from '../../components/Paginator.svelte';

    import config from '../../config.js';
    const { blogUrl, blogTitle } = config;
</script>

<style>
</style>

<svelte:head>
    <title>{blogTitle}</title>
</svelte:head>

<h1>{blogTitle}</h1>

<div class="blog">
    {#each posts as post}
        <ul>
            <li> <a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></li>
        </ul>
    {/each}
    <Paginator url={blogUrl} totalPages={totalPages} />
</div>
