<script lang="ts">
  export let data;
  let itemFilter: string;
</script>

<form method="POST" action="?/filter">
  <label class="label" for="itemFilter">
    <span></span>
  </label>
  <div class="input-group input-group-divider grid-cols-[1fr_auto]">
    <input
      id="itemFilter"
      name="itemFilter"
      type="text"
      bind:value={itemFilter}
      autocomplete="off"
    />
    <button type="submit" class="variant-filled-secondary">Filter</button>
  </div>
</form>

<div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Class</th>
        <th>Sub-Class</th>
      </tr>
    </thead>
    <tbody>
      {#each data.items as item}
        <tr>
          <td>
            <a class="anchor" href="/characters/{data.characterName}/items/{item.id}">
              {item.name}
            </a>
          </td>
          <td>{item.type}</td>
          <td>{item.class}</td>
          <td>
            <a
              href="/characters/{data.characterName}/items/{item.id}/stations"
              class="variant-filled btn-icon"
            >
              <i class="fa-solid fa-shop"></i>
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
