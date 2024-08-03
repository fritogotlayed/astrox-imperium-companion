<script lang="ts">
  export let data;

  const { selectedCharacterId } = data;
</script>

<div class="app-bar flex flex-col bg-surface-100-800-token space-y-4 p-4 {$$props.class}">
  <div class="mt-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
    <div>
      <a href="/characters/{selectedCharacterId}/sectors/" class="variant-filled btn w-full">
        <span><i class="fa-solid fa-map"></i></span>
        <span>Sectors</span>
      </a>
    </div>
    <div>
      <a href="/characters/{selectedCharacterId}/skills/" class="variant-filled btn w-full">
        <span><i class="fa-solid fa-school"></i></span>
        <span>Skill Market</span>
      </a>
    </div>
    <div>
      <a href="/characters/{selectedCharacterId}/items/" class="variant-filled btn w-full">
        <span><i class="fa-solid fa-shop"></i></span>
        <span>Item Market</span>
      </a>
    </div>
  </div>
</div>

<slot />