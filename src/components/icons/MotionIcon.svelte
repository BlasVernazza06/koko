<script lang="ts">
  let { isActive = false } = $props<{ isActive?: boolean }>();
</script>

<svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
  <path d="M4 0h16l-8 8H4zm0 8h8l8 8H4zm8 8h8l-8 8z" fill={isActive ? '#FFFFFF' : 'currentColor'} />
</svg>
