<script>
  export let data;

  let modDir = data.modDirectory;
  let progressValue = 0;
</script>

<form method="POST" action="?/setModPath">
  <label class="label" for="modPath">
    <span>Game MOD directory path</span>
  </label>
  <div class="input-group input-group-divider grid-cols-[1fr_auto]">
    <input id="modPath" name="modPath" type="text" bind:value={modDir} autocomplete="off" />
    <button type="submit" class="variant-filled-secondary">Save</button>
  </div>
</form>

<form class="pt-4" method="POST" action="?/refreshAllData">
  <progress class="progress" value={progressValue} max="100"></progress>
  <button type="submit" class="variant-filled-primary btn float-right">Refresh all data</button>
</form>
