<script>
  import CharacterSummaryCard from '$lib/components/CharacterSummaryCard.svelte';

  export let data;
</script>

{#each data.characters as character}
  <a href="/characters/{encodeURIComponent(character.name)}">
    <CharacterSummaryCard
      name={character.name}
      level={character.level}
      xp={character.xp}
      previousLevelXp={character.previousLevelXp}
      nextLevelXp={character.nextLevelXp}
      credits={character.credits}
      avatarImage={character.avatarImage}
    />
  </a>
{/each}
