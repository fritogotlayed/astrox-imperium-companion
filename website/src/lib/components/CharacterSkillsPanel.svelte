<script lang="ts">
  export let skills: {
    id: number;
    name: string;
    description: string;
    characterName: string;
    characterLevel: number;
  }[];

  const sortedSkills = skills.map((skill) => ({ ...skill }));
  sortedSkills.sort((a, b) => a.name.localeCompare(b.name));
</script>

{#each sortedSkills as skill}
  <a class="m-1" href="/characters/{skill.characterName}/skills/{skill.id}">
    <div class="grid grid-cols-12">
      <div class="mr-1">
        <span class="variant-filled badge float-right">
          {#if skill.characterLevel}
            {skill.characterLevel}
          {/if}
        </span>
      </div>
      <div class="col-span-11">{skill.name}</div>
    </div>
  </a>
{/each}
