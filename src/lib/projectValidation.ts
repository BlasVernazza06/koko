/**
 * Validates and sanitizes project names for the Koko CLI Scaffolding Engine.
 */

const WINDOWS_RESERVED_NAMES = new Set([
  'con', 'prn', 'aux', 'nul',
  'com1', 'com2', 'com3', 'com4', 'com5', 'com6', 'com7', 'com8', 'com9',
  'lpt1', 'lpt2', 'lpt3', 'lpt4', 'lpt5', 'lpt6', 'lpt7', 'lpt8', 'lpt9'
]);

const LINUX_UNIX_RESERVED_NAMES = new Set([
  'root', 'bin', 'boot', 'dev', 'etc', 'home', 'lib', 'lib64', 'media',
  'mnt', 'opt', 'proc', 'run', 'sbin', 'srv', 'sys', 'tmp', 'usr', 'var',
  'lost+found', 'node_modules', '.git', 'favicon.ico'
]);

export interface ValidationResult {
  valid: boolean;
  error?: string;
  sanitized: string;
}

export function sanitizeProjectName(name: string): string {
  if (!name) return 'my-koko-app';
  
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')
    .replace(/^-+|-+$/g, '') || 'my-koko-app';
}

export function validateProjectName(name: string, lang: string = 'es'): ValidationResult {
  const isEn = lang === 'en';
  const trimmed = name?.trim() || '';
  const sanitized = sanitizeProjectName(name);

  if (!trimmed) {
    return {
      valid: false,
      error: isEn ? 'Project name cannot be empty.' : 'El nombre del proyecto no puede estar vacío.',
      sanitized: 'my-koko-app'
    };
  }

  const lower = trimmed.toLowerCase();

  if (WINDOWS_RESERVED_NAMES.has(lower)) {
    return {
      valid: false,
      error: isEn 
        ? `"${trimmed}" is a reserved OS device name (Windows).` 
        : `"${trimmed}" es un nombre reservado del sistema operativo (Windows).`,
      sanitized
    };
  }

  if (LINUX_UNIX_RESERVED_NAMES.has(lower)) {
    return {
      valid: false,
      error: isEn 
        ? `"${trimmed}" is a reserved directory or system name in Linux/Unix environments.` 
        : `"${trimmed}" es un directorio o nombre reservado en entornos Linux/Unix.`,
      sanitized
    };
  }

  if (/^[.-]/.test(trimmed)) {
    return {
      valid: false,
      error: isEn 
        ? 'Project name cannot start with a dot (.) or hyphen (-).' 
        : 'El nombre no puede comenzar con un punto (.) o un guión (-).',
      sanitized
    };
  }

  if (/[^a-zA-Z0-9-_]/.test(trimmed)) {
    return {
      valid: false,
      error: isEn 
        ? 'Only alphanumeric characters, hyphens (-), and underscores (_) are allowed.' 
        : 'Solo se permiten caracteres alfanuméricos, guiones (-) y guiones bajos (_).',
      sanitized
    };
  }

  if (trimmed.length > 100) {
    return {
      valid: false,
      error: isEn 
        ? 'Project name cannot exceed 100 characters.' 
        : 'El nombre no puede exceder los 100 caracteres.',
      sanitized: sanitized.slice(0, 100)
    };
  }

  return {
    valid: true,
    sanitized: trimmed
  };
}

export interface CliCommandOptions {
  projectName: string;
  commandType: 'wrapper' | 'binary' | 'go';
  packageManager?: 'pnpm' | 'npm' | 'yarn' | 'bun';
  framework?: string;
  database?: string;
  orm?: string;
  auth?: string;
  tailwind?: boolean;
}

export function formatCliCommand(options: CliCommandOptions): string {
  const cleanName = sanitizeProjectName(options.projectName);
  const pm = options.packageManager || 'pnpm';
  
  const flags: string[] = [];
  if (options.framework) flags.push(`--template ${options.framework}`);
  if (options.database && options.database !== 'none') flags.push(`--db ${options.database}`);
  if (options.orm && options.orm !== 'none') flags.push(`--orm ${options.orm}`);
  if (options.auth && options.auth !== 'none') flags.push(`--auth ${options.auth}`);
  if (options.tailwind) flags.push('--tailwind');

  const flagsStr = flags.length > 0 ? ` ${flags.join(' ')}` : '';

  switch (options.commandType) {
    case 'binary':
      return `koko init ${cleanName}${flagsStr}`;
    case 'go':
      return `go run github.com/BlasVernazza06/koko-cli@latest init ${cleanName}${flagsStr}`;
    case 'wrapper':
    default:
      if (pm === 'npm') return `npx create-koko-app ${cleanName}${flagsStr}`;
      if (pm === 'yarn') return `yarn create koko-app ${cleanName}${flagsStr}`;
      if (pm === 'bun') return `bun create koko-app ${cleanName}${flagsStr}`;
      return `pnpm create koko-app ${cleanName}${flagsStr}`;
  }
}
