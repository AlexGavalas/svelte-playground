<script lang="ts">
    export let data: { postMarkup: string; title: string; date: string };
</script>

<article>
    <h1>{data.title}</h1>
    <p>Published: {data.date}</p>
    <p>{@html data.postMarkup}</p>
</article>
