<script>
  import CharacterSummaryCard from '$lib/components/CharacterSummaryCard.svelte';
  import CharacterSkillsPanel from '$lib/components/CharacterSkillsPanel.svelte';
  export let data;
</script>

<CharacterSummaryCard
  name={data.name}
  xp={data.xp}
  previousLevelXp={data.previousLevelXp}
  nextLevelXp={data.nextLevelXp}
  credits={data.credits}
  level={data.level}
  avatarImage={data.avatarImage}
/>


<div class="mt-1 grid grid-cols-1">
  <CharacterSkillsPanel
    skills={data.skills.map((s) => ({
      ...s.skill,
      characterLevel: s.level,
      characterName: data.name
    }))}
  />
</div>
