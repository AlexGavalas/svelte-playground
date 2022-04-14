<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	import { UserStore } from './store';

	let dispatch = createEventDispatcher();

	let fields = {
		name: '',
		mark: [],
		age: 22,
	};

	const handleSubmit = () => {
		UserStore.set({ username: 'Alex' });
		dispatch('user', fields);
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<input bind:value={fields.name} placeholder="Name" />
	<input bind:value={fields.age} placeholder="Age" type="number" />
	<br />
	<label>
		Check me!
		<input bind:group={fields.mark} value="test" type="checkbox" />
	</label>
	<br />
	<label>
		Select me
		<select bind:value={fields.option}>
			<option value="A">A</option>
			<option value="B">B</option>
		</select>
	</label>
	<br />
	<button>Save</button>
</form>
