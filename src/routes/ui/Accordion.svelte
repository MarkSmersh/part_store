<script lang="ts">
	import type { Snippet } from "svelte";
	import { draw, fly, slide } from "svelte/transition";

    interface AccordionsProps {
        title: string,
        children: Snippet
    }

    let { title, children }: AccordionsProps = $props();
    let isActive = $state(false);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="accordion">
    <div class="head" onclick={() => isActive = !isActive}>
        <h3 class="title">📋 {title}</h3>
        <h3 class="sign" class:active={isActive}>{">"}</h3>
    </div>
    {#if isActive}
        <div transition:fly={{ duration: 100 }} class="separator"></div>
        <div transition:slide class="content">
            {@render children()}
        </div>
    {/if}
</div>

<style>
    .accordion {
        display: flex;
        flex-direction: column;
        padding: 16px;
        border: 1px solid var(--primary-text);
        border-radius: 8px;
        gap: 16px;
    }

    .head {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
    }

    .separator {
        height: 1px;
        background-color: var(--primary-text);
    }

    .sign {
        transform: rotate(-90deg);
        transition: .5s;
    }

    .active {
        transform: rotate(90deg);
    }

    .content {
        display: flex;
        padding: 0px 16px;
    }
</style>

