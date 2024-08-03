<script lang="ts">
  export let data;
  let skillFilter: string;
</script>

<form method="POST" action="?/filter">
  <label class="label" for="skillFilter">
    <span></span>
  </label>
  <div class="input-group input-group-divider grid-cols-[1fr_auto]">
    <input
      id="skillFilter"
      name="skillFilter"
      type="text"
      bind:value={skillFilter}
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
      {#each data.skills as skill}
        <tr>
          <td>
            <a class="anchor" href="/characters/{data.characterName}/skills/{skill.id}">
              {skill.name}
            </a>
          </td>
          <td>{skill.type}</td>
          <td>{skill.class}</td>
          <td>
            <a
              href="/characters/{data.characterName}/skills/{skill.id}/stations"
              class="variant-filled btn-icon"
            >
              <i class="fa-solid fa-school"></i>
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
