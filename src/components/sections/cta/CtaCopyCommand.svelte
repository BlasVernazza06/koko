<script lang="ts">
  import { Copy, Check } from '@lucide/svelte';

  interface Props {
    command?: string;
    class?: string;
  }

  let { command = 'koko init my-project', class: className = '' }: Props = $props();
  let copied = $state(false);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(command);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy command:', err);
    }
  }
</script>

<button
  type="button"
  onclick={copyToClipboard}
  class={`w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-2.5 px-4 py-2.5 rounded-full bg-bg-surface hover:bg-bg-surface/90 border border-border-subtle hover:border-brand-primary/40 text-text-main text-xs font-mono shadow-xs transition-all duration-150 cursor-pointer group shrink-0 ${className}`}
  title="Copiar comando"
>
  <span class="text-brand-secondary font-bold select-none">›_</span>
  <span class="font-semibold text-text-main">{command}</span>
  
  {#if copied}
    <span class="text-[11px] text-emerald-500 font-bold inline-flex items-center gap-1 animate-in fade-in zoom-in-95 duration-150">
      <Check size={13} />
    </span>
  {:else}
    <span class="p-1 rounded-md text-text-muted group-hover:text-text-main transition-colors">
      <Copy size={13} />
    </span>
  {/if}
</button>
