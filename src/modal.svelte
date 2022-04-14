<script lang="ts">
	export let showModal = false;
</script>

{#if showModal}	
	<div class="backdrop" on:click|self>
		<div class="modal">
			<slot />
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: absolute;
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
