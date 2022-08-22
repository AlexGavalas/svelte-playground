<script lang="ts">
    export let disabled = false;
</script>

<button on:click {disabled}>
    <slot />
</button>

<style>
    button {
        border: none;
        padding: 0.5rem 1rem;
        background-color: rgba(255, 255, 255, 0.7);
        min-height: 2rem;
        border-radius: 5px;
    }
</style>
