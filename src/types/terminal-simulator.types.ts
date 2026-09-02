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
  welcome: string;
  projectNamePrompt: string;
  typeInit: string;
  flowChoice: string;
  flowRapido: string;
  flowManual: string;
  recipeChoice: string;
  recipeSaas: string;
  analyzing: string;
  downloading: string;
  injecting: string;
  done: string;
}
