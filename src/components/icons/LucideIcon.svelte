<script lang="ts">
  let { isActive = false } = $props<{ isActive?: boolean }>();
</script>

<svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 3v18M3 12h18M12 3l3 3M12 21l-3-3M3 12l3-3M21 12l-3 3" class={isActive ? 'text-white' : 'text-current'} />
</svg>
