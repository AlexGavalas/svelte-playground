<header>
    <a href="/">Home</a>
    <nav>
        <ul>
            <li>
                <a sveltekit:prefetch href="/blog">Blog</a>
            </li>
            <li>
                <a sveltekit:prefetch href="/poker">Poker</a>
            </li>
            <li>
                <a sveltekit:prefetch href="/todos">Todos</a>
            </li>
            <li>
                <a sveltekit:prefetch href="/about">About</a>
            </li>
        </ul>
    </nav>
</header>

<style>
    header {
        padding: 1rem;
        background: lightskyblue;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    ul {
        margin: 0;
        list-style-type: none;
        display: flex;
        gap: 1rem;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
</style>
