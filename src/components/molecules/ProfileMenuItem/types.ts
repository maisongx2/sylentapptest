import { LucideIcon } from 'lucide-react-native';

export type ProfileMenuVariant = 'default' | 'danger';

export interface ProfileMenuItemProps {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
  variant?: ProfileMenuVariant;
}

export type Variant = 'default' | 'danger';

export interface VariantProps {
  variant?: Variant;
}
