<script lang="ts">
    import { fade } from 'svelte/transition';

    export let showModal = false;
</script>

{#if showModal}
    <div
        class="backdrop"
        in:fade={{ duration: 150, delay: 150 }}
        out:fade={{ duration: 150 }}
        on:click|self
        on:keypress|self
    >
        <div class="modal">
            <slot />
        </div>
    </div>
{/if}

<style>
    .backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        width: 50%;
        background: white;
        border-radius: 10px;
        padding: 1em;
    }
</style>
