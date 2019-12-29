<script>
	export let totalPages;
	export let url;
</script>

<style>
	.page-number {
		display: inline-block;
		padding: .5rem;
		margin: .5rem;
		border: 1px solid black;
	}

	.page-number a {
		text-decoration: none;
	}
</style>

<div class="blog-paginator">
	{#each totalPages as page}
		{#if page === 1}
			<div class="page-number"><a href="{url}">{page}</a></div>
		{:else}
			<div class="page-number"><a href="{url}/page/{page}">{page}</a></div>
		{/if}
	{/each}
</div>
