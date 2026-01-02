import { icons } from 'lucide-react-native';

export interface IconProps {
  name: keyof typeof icons;
  color?: string;
  size?: number;
}
