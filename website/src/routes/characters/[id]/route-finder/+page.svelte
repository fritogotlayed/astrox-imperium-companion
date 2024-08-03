<script lang="ts">
  import type { DataSector } from '$lib/infrastructure/repo';

  export let data;

  const sectors = data.sectors;

  let fromSector: DataSector;
  let toSector: DataSector;
</script>

<form method="POST" action="?/findRoute">
  <input type="hidden" name="characterName" value={data.characterName} />

  <label class="label">
    <span>From</span>
    <select class="select" bind:value={fromSector} id="fromSector" name="fromSector">
      {#each sectors ?? [] as sector}
        <option value={sector.id}>{sector.name}</option>
      {/each}
    </select>
  </label>

  <label class="label">
    <span>To</span>
    <select class="select" bind:value={toSector} id="toSector" name="toSector">
      {#each sectors ?? [] as sector}
        <option value={sector.id}>{sector.name}</option>
      {/each}
    </select>
  </label>

  <button class="variant-filled btn" type="submit">Find Route</button>
</form>
