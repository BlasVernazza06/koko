<script>
  import { Sun, Moon } from '@lucide/svelte';
  
  let theme = $state('dark');

  // Initialize theme on mount
  $effect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      theme = savedTheme;
    } else {
      theme = systemPrefersDark ? 'dark' : 'light';
    }
    
    document.documentElement.setAttribute('data-theme', theme);
  });

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
</script>

<button
  onclick={toggleTheme}
  class="relative flex items-center justify-between w-16 h-9 p-1 rounded-full bg-bg-surface border border-border-subtle cursor-pointer hover:border-text-muted/30 transition-colors duration-200"
  aria-label="Toggle dark mode"
>
  <!-- Sliding indicator bubble -->
  <div 
    class="absolute w-7 h-7 rounded-full bg-brand-primary shadow-md transition-transform duration-300 ease-out"
    class:translate-x-0={theme === 'light'}
    class:translate-x-7={theme === 'dark'}
  ></div>

  <!-- Sun Icon -->
  <span class="z-10 pl-1.5 flex items-center justify-center text-text-muted transition-colors duration-200" class:text-text-main={theme === 'light'}>
    <Sun size={15} strokeWidth={2.5} />
  </span>

  <!-- Moon Icon -->
  <span class="z-10 pr-1 flex items-center justify-center text-text-muted transition-colors duration-200" class:text-text-main={theme === 'dark'}>
    <Moon size={15} strokeWidth={2.5} />
  </span>
</button>
