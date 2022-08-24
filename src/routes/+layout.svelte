<script lang="ts">
    import { fade } from 'svelte/transition';
    import { navigating } from '$app/stores';
    import Header from '$lib/components/Header.svelte';
    import '$lib/styles/style.css';

    $: changed = $navigating?.from !== $navigating?.to;
</script>

<Header />

{#key changed}
    <main in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
        <slot />
    </main>
{/key}
