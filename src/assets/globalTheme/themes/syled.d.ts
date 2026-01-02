import 'styled-components';
import { ThemeType } from './index';

declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeType {}
}
