
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
        transition: .25s ease-out; 
        border-radius: 8px;
        /* backdrop-filter: blur(10px) */
    }

    button:hover {
        scale: 105%;
        backdrop-filter: blur(100px) brightness(40%);
    }

    button:active {
        transition: 0s;
        scale: 100%;
    }
    
    .primary {
        color: var(--primary-text);
        border: 1px solid var(--primary-text);
        background: rgba(0, 0, 0, 0);
    }

    .secondary {
        color: var(--secondary-text);
        border: 1px solid var(--secondary-text);
        background: rgba(0, 0, 0, 0);
    }
</style>