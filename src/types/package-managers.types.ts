export type PackageManagerId = 'bun' | 'pnpm' | 'npm' | 'go';

export interface PackageManager {
  id: PackageManagerId;
  name: string;
  command: string;
  logo: string;
  activeColor: string;
}
