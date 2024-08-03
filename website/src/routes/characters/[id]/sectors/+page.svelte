<script lang="ts">
  import type {PageData} from "./+page.server";

  export let data: PageData;

</script>

<h2 class="h2">Sectors</h2>

<div class="grid grid-cols-1 gap-1">
  {#each data.sectors as sector, i}
    <div>
      {i + 1}.
      <a class="anchor" href="/characters/{data.characterId}/sectors/{sector.id}">{sector.name}</a>
    </div>
  {/each}
</div>