export interface SidebarFileItem {
  id: string;
  name: string;
  type: 'dir' | 'file';
  indent: number;
  visible: boolean;
  isOpen?: boolean;
  highlight?: boolean;
}

export interface TerminalTranslation {
  creatingProject: string;
  projectNameLabel: string;
  chooseModeLabel: string;
  quickModeLabel: string;
  quickModeHint: string;
  manualModeLabel: string;
  manualModeHint: string;
  frontendTitle: string;
  backendTitle: string;
  apiTitle: string;
  pmTitle: string;
  dbTitle: string;
  ormTitle: string;
  authTitle: string;
  addonsTitle: string;
  gitTitle: string;
  stepGenMemory: string;
  stepWritingDisk: string;
  stepInitGit: string;
  stepManifest: string;
  scaffoldingInProgress: string;
  projectCreatedSuccess: string;
  nextSteps: string;
}
