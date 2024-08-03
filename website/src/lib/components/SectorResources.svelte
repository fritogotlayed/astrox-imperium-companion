<script lang="ts">
  export let label: string;
  export let resources: {
    name: string,
    size: number | string,
  }[];
</script>
<div class="{$$props.class}">
  <h4 class="h4">{label}</h4>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {#each resources as resource}
      <div class="card p-2">
        <h5 class="h5 flex justify-center">{resource.name}</h5>
        <div class="flex justify-center">
          <span class="text-sm">Size: {resource.size}</span>
        </div>
      </div>
    {/each}
  </div>
</div>