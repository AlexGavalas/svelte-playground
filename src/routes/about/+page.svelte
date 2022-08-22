<script lang="ts">
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import Modal from '$lib/components/Modal.svelte';

    let showModal = false;
    let items: { name: string; key: string }[] = [];

    const toggleModal = () => {
        showModal = !showModal;
    };

    const addItem = () => {
        items = [
            {
                name: `Item #${items.length + 1}`,
                // Key should be unique, Math.random is used for demo purposes
                key: (Math.random() * 10000).toString(),
            },
            ...items,
        ];
    };
</script>

<Modal {showModal} on:click={toggleModal}>
    <p>Hey I am a modal!</p>
</Modal>

<button on:click={toggleModal}>Open modal</button>
<button on:click={addItem}>Add an item</button>

<div>
    {#each items as item (item.key)}
        <div in:fade animate:flip={{ duration: 500 }}>
            <p>{item.name}</p>
            <button on:click={() => (items = items.filter((v) => v !== item))}> Delete item</button>
        </div>
    {:else}
        <p>No items</p>
    {/each}
</div>
