<script lang="ts">
  let { isActive = false } = $props<{ isActive?: boolean }>();
</script>

<svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" class={isActive ? 'text-white' : 'text-current'} />
  <polyline points="12 22 12 12 22 8.5" class={isActive ? 'text-white' : 'text-current'} />
  <polyline points="2 8.5 12 12 22 8.5" class={isActive ? 'text-white' : 'text-current'} />
</svg>
