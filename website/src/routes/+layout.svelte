<script>
  import '../app.css';
  import { AppBar } from '@skeletonlabs/skeleton';
</script>

<div class="grid grid-rows-[auto_1fr_auto]">
  <!-- Header -->
  <header class="p-4">
    <AppBar>
      <svelte:fragment slot="lead"></svelte:fragment>
      Astrox Imperium Companion
      <svelte:fragment slot="trail">
        <a href="/" class="anchor">
          <i class="fa-solid fa-house"></i>
        </a>
        <a href="/characters" class="anchor">
          <i class="fa-solid fa-users"></i>
        </a>
        <a href="/settings" class="anchor">
          <i class="fa-solid fa-gear"></i>
        </a>
      </svelte:fragment>
    </AppBar>
  </header>
  <!-- Page -->
  <div class="container mx-auto grid grid-cols-1 xl:grid-cols-[200px_minmax(0px,_1fr)_200px]">
    <!-- Sidebar (Left) -->
    <!-- NOTE: hidden in smaller screen sizes -->
    <!--    <aside class="sticky top-0 col-span-1 hidden h-screen bg-yellow-500 p-4 xl:block">(sidebar)</aside>-->
    <!-- Main -->
    <main class="col-span-1 space-y-4 p-4">
      <slot />
    </main>
    <!-- Sidebar (Right) -->
    <!-- NOTE: hidden in smaller screen sizes -->
    <!--    <aside class="sticky top-0 col-span-1 hidden h-screen bg-green-500 p-4 xl:block">(sidebar)</aside>-->
  </div>
  <!-- Footer -->
  <footer class="p-4"><!-- placeholder --></footer>
</div>

<style>
  .anchor > i {
    color: white;
  }
</style>
