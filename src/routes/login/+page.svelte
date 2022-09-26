<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';

    export let form: ActionData;
</script>

<form method="post" use:enhance>
    {#if form?.missing}<p class="error">The username field is required</p>{/if}
    {#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}
    <label for="username">Username</label>
    <input name="username" value={form?.username ?? ''} />

    <br />
    <br />

    <label for="password">Password</label>
    <input type="password" name="password" id="password" />

    <button type="submit">Login</button>
</form>
