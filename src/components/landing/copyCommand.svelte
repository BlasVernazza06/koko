<script>
    import { Check, Copy } from '@lucide/svelte';
    let isCopied = $state(false);

    function copyInstallCommand() {
    navigator.clipboard.writeText('go install github.com/BlasVernazza06/claw@latest');
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 2000);
  }
</script>

<div class="w-full mx-auto my-8 font-sans">
    <div class="flex items-center justify-between p-4 mb-6 bg-bg-surface/70 backdrop-blur-md border border-border-subtle rounded-xl shadow-sm">
        <div class="flex items-center gap-2.5">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/30"></span>
          <code class="text-xs sm:text-sm font-mono text-text-main font-medium font-semibold">go install github.com/BlasVernazza06/claw@latest</code>
        </div>
        <button 
          onclick={copyInstallCommand}
          class="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-bg-base border border-border-subtle hover:bg-bg-surface text-text-main transition-all duration-200 shadow-xs cursor-pointer"
        >
          {#if isCopied}
            <Check size={14} class="text-emerald-500" />
            <span class="text-emerald-500 font-medium">Copied!</span>
          {:else}
            <Copy size={14} class="text-text-muted" />
          {/if}
        </button>
    </div>
</div>