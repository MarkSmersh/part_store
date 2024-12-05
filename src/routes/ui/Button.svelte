
<script lang="ts">
	import type { Snippet } from "svelte";

    type ButtonStyle = "primary" | "secondary"

    interface ButtonProps {
        onClick: () => void,
        children: Snippet,
        style?: ButtonStyle,
        type?: "submit" | null
    }

    let { onClick, children, style = "primary", type = null }: ButtonProps = $props()
</script>

<button
    onclick={() => onClick()}
    class={style}
    type={type}
>
    {@render children()}
</button>


<style>
    button {
        cursor: pointer;
        font-size: 16px;
        padding: 8px 16px;
        transition: .1s ease-out; 
        box-shadow: 0px 0px black;
        border-radius: 8px;
    }

    button:hover {
        box-shadow: 3px 3px black;
        scale: 105%;
    }

    button:active {
        transition: 0s;
        box-shadow: 0px 0px black;
        scale: 100%;
    }
    

    .primary {
        background-color: var(--primary);
        color: var(--primary-text);
    }

    .secondary {
        background-color: var(--secondary);
        color: var(--secondary-text);
    }
</style>