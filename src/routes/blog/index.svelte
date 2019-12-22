<script context="module">
    export function preload({ params, query }) {
	return this.fetch('blog.json').then(r => r.json()).then(posts => ({ posts }));
    }
</script>

<script>
    export let posts;
    import config from '../../config.js';
    const { blogTitle } = config;
</script>

<style>
    ul {
        margin: 0 0 1em 0;
        line-height: 1.5;
    }
</style>

<svelte:head>
    <title>{blogTitle}</title>
</svelte:head>

<h1>Entradas</h1>

<ul>
    {#each posts as post}
        <!-- we're using the non-standard `rel=prefetch` attribute to
                tell Sapper to load the data for the page as soon as
                the user hovers over the link or taps it, instead of
                waiting for the 'click' event -->
        <li><a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></li>
    {/each}
</ul>
