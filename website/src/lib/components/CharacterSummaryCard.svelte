<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton';

  export let name: string;
  export let level: number;
  export let xp: number;
  export let previousLevelXp: number | null | undefined;
  export let nextLevelXp: number;
  export let credits: number;
  export let avatarImage: string;

  let currentLevelXp = (xp ?? 0) - (previousLevelXp ?? 0);

  let formattedCredits = 'N/A';
  try {
    formattedCredits = new Intl.NumberFormat().format(credits);
  } catch {
    // NOTE intentionally left blank
  }

  let avatarProps = {};
  if (avatarImage) {
    avatarProps = { src: avatarImage };
  } else {
    avatarProps = { initials: name };
  }
</script>

<div class="card mt-1 p-4">
  <div class="grid grid-cols-2">
    <div class="col-span-2 flex justify-start">
      <div>
        <Avatar {...avatarProps} rounded="rounded-full" />
      </div>
      <div class="ml-4 content-center">
        <h3 class="h3">
          {name}
        </h3>
      </div>
    </div>
    <div>Level: {level}</div>
    <div>
      <span class="float-right">
        Credits: {formattedCredits}
      </span>
    </div>
    <div class="col-span-2">
      <progress class="progress" value={currentLevelXp} max={nextLevelXp} />
      <div class="text-center">{xp} / {nextLevelXp}</div>
    </div>
  </div>

  <slot />
</div>
