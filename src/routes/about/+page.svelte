<script lang="ts">
    import Modal from '$lib/components/Modal.svelte';

    let showModal = false;

    const toggleModal = () => {
        showModal = !showModal;
    };
</script>

<Modal {showModal} on:click={toggleModal}>
    <p>Hey I am a modal!</p>
</Modal>

<button on:click={toggleModal}>Open modal</button>
