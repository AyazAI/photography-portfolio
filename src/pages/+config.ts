import vikeReact from 'vike-react/config';
import type { Config } from 'vike/types';
import favicon from '../assets/icons/logo-portfolio.svg';

export default {
  // Vike's favicon setting
  favicon,

  // Extend the Vike React config
  extends: [vikeReact],
} satisfies Config;
