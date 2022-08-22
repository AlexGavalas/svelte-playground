<script lang="ts">
    import { fade } from 'svelte/transition';
    import Header from '$lib/components/Header.svelte';
    import '$lib/styles/style.css';

    // currentRoute used as key helps animate transition through routes in this layout
    export let data: { currentRoute: string };
</script>

<Header />

{#key data.currentRoute}
    <main in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
        <slot />
    </main>
{/key}
