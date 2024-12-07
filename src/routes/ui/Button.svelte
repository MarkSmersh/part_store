
<script lang="ts">
	import type { Snippet } from "svelte";

    type ButtonStyle = "primary" | "danger"

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
        backdrop-filter: blur(10px);
    }

    button:active {
        transition: 0s;
        scale: 100%;
    }
    
    .primary {
        color: var(--secondary);
        border: 1px solid var(--secondary);
        background: rgba(0, 0, 0, 0);
    }

    .primary:hover {
        background: var(--secondary);
        color: var(--primary);
    }

    .danger {
        color: red;
        border: 1px solid red;
        background: rgba(0, 0, 0, 0);
    }

    .danger:hover {
        background: rgba(255, 0, 0, .2);
        color: var(--primary-text);
    }
</style>