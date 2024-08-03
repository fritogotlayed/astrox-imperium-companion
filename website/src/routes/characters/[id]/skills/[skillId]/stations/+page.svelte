<script lang="ts">
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

  export let data;

  let skill = data.skill;
  let characterId = data.character.name;
</script>

<!-- breadcrumbs -->
<ol class="breadcrumb">
  <li class="crumb"><a class="anchor" href="/characters/{characterId}">{characterId}</a></li>
  <li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
  <li class="crumb">
    <a class="anchor" href="/characters/{characterId}/skills/{skill.id}">{skill.name}</a>
  </li>
</ol>

<div class="grid grid-cols-1">
  <div>
    <div class="mb-1">Description</div>
    <div class="ml-2 text-sm">{skill.description}</div>
  </div>
</div>

{#each data.sectors as sector}
  <Accordion title={sector.name}>
    <AccordionItem>
      <svelte:fragment slot="lead"></svelte:fragment>
      <svelte:fragment slot="content">
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Station</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {#each data.sectorStationLookup[sector.id] as station}
                <tr>
                  <td>{station.name}</td>
                  <td>
                    <div>
                      <!-- TODO: align items to the right -->
                      <a
                        href="/characters/{characterId}/route-finder/-1/to/{sector.id}"
                        class="variant-filled btn"
                      >
                        <span><i class="fa-solid fa-route"></i></span>
                        <span></span>
                      </a>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
            <tfoot />
          </table>
        </div>
      </svelte:fragment>
      <svelte:fragment slot="summary">{sector.name}</svelte:fragment>
    </AccordionItem>
  </Accordion>
{/each}
