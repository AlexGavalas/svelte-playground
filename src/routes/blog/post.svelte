<script>
    // This is an md layout used by `mdsvex` and cannot yet parse TS
    // Issue: https://github.com/pngwn/MDsveX/issues/357
    export let title = '';
    export let date = '';
</script>

<svelte:head>
    <title>My blog - {title}</title>
    <meta property="og:title" content={title} />
</svelte:head>

<article>
    <h1>{title}</h1>
    <p>Published: {date}</p>
    <slot />
</article>
