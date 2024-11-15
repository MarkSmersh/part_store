<script lang="ts">
    import type { INotify } from "$lib/notify";
	import { notify } from "$lib/notify";
	import { blur } from "svelte/transition";

    let notifications: INotify[] | undefined = $state([]);

    let sexy= $derived(notifications);

    notify.subscribe((no) => notifications = no)
    
    $inspect(notifications);
</script>

<div class="notifications">
    {#if notifications}
        {#each notifications as n}
        <!-- svelte-ignore
            a11y_click_events_have_key_events,
            a11y_no_static_element_interactions (nah id click)
        -->
            <div
                transition:blur
                class="notification"
                onclick={() => notify.update((no) => no.filter((v) => v.id !== n.id))}
                >
                {#if n.status && n.statusText}
                    <h3
                        class="{n.status >= 200 && n.status < 300 ? "success" : "error"}"
                    >{n.statusText} - {n.status}</h3>
                {/if}
                <p>{n.message}</p>
            </div>
        {/each}
    {/if}
</div>

<style>
    .notifications {
        position: fixed;
        top: 0;
        right: 0;
        margin: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;

    }

    .notification {
        display: flex;
        background-color: white;
        flex-direction: column;
        padding: 20px;
        cursor: pointer;
        border: 1px solid gray;
        user-select: none;
    }

    .success {
        color: green;
    }

    .error {
        color: red
    }
</style>