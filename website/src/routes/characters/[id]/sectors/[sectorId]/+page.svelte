<script lang="ts">
  import {Accordion, AccordionItem} from "@skeletonlabs/skeleton";
  import SectorResources from "$lib/components/SectorResources.svelte";

  export let data;

  console.log('Characater ID:', data.selectedCharacterId);
  console.log('Sector ID:', data.selectedSectorId);
  console.log('Sector:', data.sectorDetails.sector.name);

  function getResource(resourceId: number) {
    return data.sectorDetails.items.find(item => item.id === resourceId);
  }

</script>

<div class="card p-2">
  <h2 class="h2 flex justify-center mb-4 lg:mb-8">
    {data.sectorDetails.sector.name}
    {#if data.sectorDetails.sector.isExplored}
      <i class="fa-solid fa-check ml-2 mt-1"></i>
    {:else}
      <i class="fa-solid fa-question ml-2 mt-1"></i>
    {/if}
  </h2>
  <div class="flex flex-start justify-center gap-2 pl-4">
    <div class="flex flex-col">
      <h3 class="h3">Level</h3>
      <div class="flex justify-center">{data.sectorDetails.sector.level}</div>
    </div>
    <div class="flex flex-col justify-center">
      <h3 class="h3">Faction</h3>
      <div class="flex justify-center">{data.sectorDetails.sector.faction}</div>
    </div>
    <div class="flex flex-col justify-center">
      <h3 class="h3">Stations</h3>
      <div class="flex justify-center">{data.sectorDetails.stations.length}</div>
    </div>
    <div class="flex flex-col justify-center">
      <h3 class="h3">Warp Gates</h3>
      <div class="flex justify-center">{data.sectorDetails.warpGates.length}</div>
    </div>
  </div>
</div>

<div>
  <Accordion>
    <AccordionItem>
      <svelte:fragment slot="summary">
        <h3 class="h3"> Resources </h3>
      </svelte:fragment>
      <svelte:fragment slot="content">
        <div class="m-2">
          <SectorResources label="Clusters" resources={
          data.sectorDetails.availableResources
            .filter(resource => resource.numberOfResources !== undefined)
            .map(resource => ({
              name: data.sectorDetails.items.find(i => i.id === resource.resourceId)?.name ?? 'UNKNOWN',
              size: resource.numberOfResources ?? -1
            }))
          } />
          <SectorResources class="mt-4" label="Asteroids" resources={
    data.sectorDetails.availableResources.filter(resource => resource.currentValue !== undefined)
    .map(resource => ({
              name: data.sectorDetails.items.find(i => i.id === resource.resourceId)?.name ?? 'UNKNOWN',
      size: resource.currentValue ?? -1
          }))
           } />
        </div>
      </svelte:fragment>
    </AccordionItem>
    <AccordionItem>
      <svelte:fragment slot="summary">
        <h3 class="h3"> Neighbor Systems </h3>
      </svelte:fragment>
      <svelte:fragment slot="content">
        <div class="m-2">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {#each data.sectorDetails.warpGates.map(gate => ({
              destinationSectorId: gate.destinationSectorId,
              destinationSectorName: gate.destinationSectorName,
            })) as gate}
              <div class="card p-2">
                <h5 class="h5 flex justify-center">{gate.destinationSectorName}</h5>
                <div class="flex justify-center">
                  <a
                    class="anchor"
                    href="/characters/{data.selectedCharacterId}/sectors/{gate.destinationSectorId}"
                   >
                    <i class="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </svelte:fragment>
    </AccordionItem>
  </Accordion>
</div>
