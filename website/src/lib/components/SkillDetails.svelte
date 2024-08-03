<script lang="ts">
  import type { DataSkill } from '$lib/infrastructure/repo';

  export let skill: DataSkill;
  export let characterSkillLevel: number | undefined;
  export let characterId: string | undefined;
</script>

<div class="flex flex-row flex-wrap">
  <div class="flex-initial">
    <img class="w-32" src={skill.skillImage} alt="" />
  </div>
  <div class="flex-1">
    <div class="mb-1">Description</div>
    <div class="ml-2 text-sm">{skill.description}</div>
  </div>
</div>

{#if characterSkillLevel !== undefined}
  <div class="grid grid-cols-12">
    <div class="col-span-12">
      <progress value={characterSkillLevel} max={skill.maxLevel} />
    </div>
    <div class="col-span-12 text-center">Level: {characterSkillLevel}</div>
  </div>
{/if}

<div class="table-container">
  <table class="table">
    <thead />
    <tbody>
      <tr>
        <td>Skill Points</td>
        <td>{skill.skillPoints}</td>
      </tr>
      <tr>
        <td>Train Time</td>
        <td>{skill.trainTime}s</td>
      </tr>
      <tr>
        <td>Base Price</td>
        <td>{new Intl.NumberFormat().format(skill.basePrice)}</td>
      </tr>
      <tr>
        <td>Max Level</td>
        <td>{skill.maxLevel}</td>
      </tr>
      <tr>
        <td>Type</td>
        <td>{skill.type}</td>
      </tr>
      <tr>
        <td>Class</td>
        <td>{skill.class}</td>
      </tr>
      <tr>
        <td>Sub-Class</td>
        <td>{skill.subClass ?? ''}</td>
      </tr>
    </tbody>
    <tfoot />
  </table>
</div>

{#if characterSkillLevel !== undefined}
  <div class="mt-2 grid place-content-end">
    <div class="variant-filled btn-group">
      <a href="/characters/{characterId}/skills/{skill.id}/stations" class="btn-icon">
        <i class="fa-solid fa-school"></i>
      </a>
    </div>
  </div>
{/if}
