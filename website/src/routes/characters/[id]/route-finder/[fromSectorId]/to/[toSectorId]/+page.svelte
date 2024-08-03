<script lang="ts">
  import type {DataSector} from "$lib/infrastructure/repo";

  export let data;

  let characterId = data.id;
  let fromSectorId = data.fromSectorId;
  let toSectorId = data.toSectorId;
  let route = data.route;

  const fromSector: DataSector | undefined = route.length === 0 ? undefined : route[0];
  const toSector: DataSector | undefined = route.length === 0 ? undefined : route[route.length - 1];
</script>

<!-- breadcrumbs -->
<ol class="breadcrumb">
  <li class="crumb"><a class="anchor" href="/characters/{characterId}">{characterId}</a></li>
  <!--  <li class="crumb-separator" aria-hidden="true">&rsaquo;</li>-->
  <!--  <li class="crumb"><a class="anchor" href="/characters/{characterId}/route-finder/{fromSectorId}/to/{toSectorId}">Route Finder</a></li>-->
</ol>

<div>
  <div class="mb-1">Route Finder</div>
  {#if route.length !== 0}
    <div class="ml-2 text-sm">
      Found the best route from {fromSector?.name} to {toSector?.name} consisting of {route.length} jumps.
    </div>
  {/if}
</div>
<div>
  {#if route.length === 0}
    <div class="mt-1">No route found. Are you already in the destination sector?</div>
  {:else}
    <div class="mt-1">Route:</div>
    <div class="ml-2 text-sm">
      {#each route as sector, i}
        <div>
          {i + 1}. {sector.name}
        </div>
      {/each}
    </div>
  {/if}
</div>
