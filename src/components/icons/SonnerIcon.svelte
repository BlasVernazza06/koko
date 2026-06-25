<script lang="ts">
  let { isActive = false } = $props<{ isActive?: boolean }>();
</script>

<svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="6" width="16" height="5" rx="1.5" class={isActive ? 'text-white' : 'text-current'} />
  <path d="M6 15h12M8 19h8" opacity="0.6" class={isActive ? 'text-white' : 'text-current'} />
</svg>
