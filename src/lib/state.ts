import { writable } from "svelte/store";

export const isMenu = writable<boolean>(false);
export const isSearch = writable<boolean>(false);