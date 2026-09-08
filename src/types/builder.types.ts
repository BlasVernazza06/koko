export interface TechOption {
  id: string;
  name: string;
  desc: string;
  hoverColor?: string;
  activeColor?: string;
  iconComponent?: any;
  isNone?: boolean;
  default?: boolean;
}

export interface Layer {
  key: string;
  label: string;
  step: string;
  icon: any;
  colorClass: string;
  options: TechOption[];
}

export interface InfraOption {
  id: string;
  title: string;
  description: string;
  iconComponent?: any;
  lucideIcon?: any;
  bindingKey: string;
  default?: boolean;
  isLocked?: boolean;
}

export interface KokoTemplateConfig {
  selectedFront: string;
  selectedNativeFront: string;
  selectedBack: string;
  selectedDb: string;
  selectedAuth: string;
  selectedPackageManager: string;
  selectedTools: string;
  selectedPayments: string;
  selectedEmail: string;
  withDocker: boolean;
  withTurborepo: boolean;
  selectedRuntime?: string;
  withCi?: boolean;
  withLinter?: boolean;
  withTesting?: boolean;
}

export interface KokoTemplate {
  id: string;
  nameEs: string;
  nameEn: string;
  descEs: string;
  descEn: string;
  icon: string;
  config: KokoTemplateConfig;
}
