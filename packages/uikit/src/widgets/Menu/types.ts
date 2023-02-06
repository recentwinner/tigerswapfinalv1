import { ElementType, ReactElement, ReactNode } from "react";
import { FooterLinkType } from "../../components/Footer/types";
import { MenuItemsType } from "../../components/MenuItems/types";
import { SubMenuItemsType } from "../../components/SubMenuItems/types";
import { Colors } from "../../theme/types";

export interface Language {
  code: string;
  language: string;
  locale: string;
}

export interface LinkStatus {
  text: string;
  color: keyof Colors;
}


// export interface LangType {
//   code: string;
//   language: string;
// }

// export interface Profile {
//   username?: string;
//   image?: string;
//   profileLink: string;
//   noProfileLink: string;
//   showPip?: boolean;
// }

export interface PushedProps {
  isPushed: boolean;
  // isMobile: boolean;
  pushNav: (isPushed: boolean) => void;
}

// export interface NavTheme {
//   background: string;
//   hover: string;
// }

export interface MenuSubEntry {
  label: string;
  href: string;
  calloutClass?: string;
}

export interface MenuEntry {
  label: string;
  icon: string;
  items?: MenuSubEntry[];
  href: string;
  calloutClass?: string;
  initialOpenState?: boolean;
}

export interface PanelProps {
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
  cakePriceUsd?: number;
  currentLang: string;
  langs: Language[];
  setLang: (lang: Language) => void;
  sidelinks: Array<MenuEntry>;
  href: string;
  priceLink: string;
  subLinks?: Array<SubMenuItemsType>;
  activeItem?: string;
  activeSubItem?: string;
}

export interface NavProps extends PanelProps {
  linkComponent?: ElementType;
  links: Array<MenuItemsType>;
  rightSide?: ReactNode;
  banner?: ReactElement;
  footerLinks: Array<FooterLinkType>;
  buyCakeLabel: string;
}

