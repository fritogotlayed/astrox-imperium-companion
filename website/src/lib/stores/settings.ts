import { writable } from 'svelte/store';

function createModDirectoryStore() {
  const { subscribe, set, update } = writable<string>('');

  return {
    subscribe,
    set,
    update
  };
}

export const modDirectory = createModDirectoryStore();
