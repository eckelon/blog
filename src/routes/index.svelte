 <script context="module">
    let content;

    const updateContent = (c) => { content = c };
    export function preload({ params, query }) {
        return this.fetch('index.json')
        .then((r) => r.json())
        .then(updateContent);
    }
</script>

<style>
    h1, figure {
        margin: 0 auto;
    }

    h1 {
        text-align: center;
        font-size: 1.8em;
        font-weight: 700;
        margin: 0 0 0.5em 0;
    }

    figure {
        text-align: center;
        margin: 0 0 1em 0;
    }

    img {
        width: 100%;
        max-width: 400px;
        margin: 0 0 1em 0;
    }

    @media (min-width: 480px) {
        h1 {
            font-size: 2.5em;
        }
    }
</style>

<svelte:head>
    <title>Soy JA Samitier</title>
</svelte:head>


<figure>
    <img alt='JA (el autor) en la playa de Gijón' src='main_guetzli.jpg'>
</figure>

<h1 id="soy-jesús-ángel-samitier">{content.title}</h1>
{@html content.html}


