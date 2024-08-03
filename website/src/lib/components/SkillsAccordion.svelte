<script lang="ts">
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

  export let skills: {
    id: string;
    name: string;
    description: string;
    characterName: string;
    characterLevel: number;
  }[];
</script>

<h3 class="h3">Skills</h3>
<Accordion>
  {#each skills as skill}
    <AccordionItem>
      <svelte:fragment slot="summary">
        <div class="grid grid-cols-12">
          <div class="col-span-11">{skill.name}</div>
          <div>
            <span class="variant-filled badge float-right">
              {#if skill.characterLevel}
                {skill.characterLevel}
              {/if}
            </span>
          </div>
        </div>
      </svelte:fragment>
      <svelte:fragment slot="content">
        {#if skill.characterName}
          <div class="variant-filled btn-group">
            <a href="/characters/{skill.characterName}/skills/{skill.id}" class="btn-icon">
              <i class="fa-solid fa-school"></i>
            </a>
          </div>
        {/if}
        <p class="text-sm">
          {skill.description}
        </p>
      </svelte:fragment>
    </AccordionItem>
  {/each}
</Accordion>
