<script lang="ts">
  import SkillDetails from '$lib/components/SkillDetails.svelte';
  import type { DataSkill } from '$lib/infrastructure/repo';

  export let data: {
    characterId: string;
    characterSkillLevel: number | undefined;
    skill: DataSkill;
  };
</script>

<ol class="breadcrumb">
  <li class="crumb">
    <a class="anchor" href="/characters/{data.characterId}">{data.characterId}</a>
  </li>
  <li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
  <li class="crumb">{data.skill.name}</li>
</ol>

<div class="card mt-1 p-2">
  <SkillDetails
    skill={data.skill}
    characterSkillLevel={data.characterSkillLevel}
    characterId={data.characterId}
  />
</div>
