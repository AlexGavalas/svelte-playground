<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { tweened } from 'svelte/motion'
	
	import { UserStore } from './store';
	
	import Modal from './modal.svelte';
	import Content from './modal-content.svelte';
	
	const value = tweened(0);

	let showModal = false;
	let items = [];

	const toggleModal = () => {
		// showModal = !showModal
		items = [{ name: 'hey' + items.length }, ...items];
		value.set(0.4);
	};

	const handleUser = (e) => {
		items = [e.detail, ...items];
		showModal = false;
	};
</script>

<Modal {showModal} on:click={toggleModal}>
	<Content on:user={handleUser} />
</Modal>

<main>
	<progress value={$value} />
	<button on:click={toggleModal}>Show modal</button>
	<div>
		{#each items as item (item.name)}
			<div in:fade animate:flip={{ duration: 500 }}>
				<p>{item.name}</p>
				<button on:click={() => items = items.filter(v => v !== item)}>Delete item</button>
			</div>
		{:else}
			<p>No items</p>
		{/each}
	</div>
	{#if $UserStore}
		<p>Hello {$UserStore.username}</p>
	{:else}
		<p>No user</p>
	{/if}
</main>

<style>
	main {
		height: 100%;
		display: grid;
		place-content: center;
	}
</style>
