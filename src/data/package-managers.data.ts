import type { PackageManager } from '@/types/package-managers.types';

export const packageManagers: PackageManager[] = [
  {
    id: 'bun',
    name: 'bun',
    command: 'bun add koko-app',
    logo: '/logos/bun.svg',
    activeColor: 'text-rose-400 bg-rose-400/10 border-rose-400/30'
  },
  {
    id: 'pnpm',
    name: 'pnpm',
    command: 'pnpm add koko-app',
    logo: '/logos/pnpm.svg',
    activeColor: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
  },
  {
    id: 'npm',
    name: 'npm',
    command: 'npm install koko-app',
    logo: '/logos/npm.svg',
    activeColor: 'text-red-400 bg-red-400/10 border-red-400/30'
  },
  {
    id: 'go',
    name: 'go',
    command: 'go install github.com/BlasVernazza06/koko-cli@latest',
    logo: '/logos/go.svg',
    activeColor: 'text-[#00ADD8] bg-[#00ADD8]/10 border-[#00ADD8]/30'
  }
];
