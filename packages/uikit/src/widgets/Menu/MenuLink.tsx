import React, { AnchorHTMLAttributes, useContext } from "react";
import { NavLink } from "react-router-dom";


const MenuLink: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, ...otherProps }) => {
  // const { linkComponent } = useContext(MenuContext);
  const isHttpLink = href?.startsWith("http");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag: any = isHttpLink ? "a" :  NavLink;
  const props = isHttpLink ? { href } : { to: href };
  return <Tag {...props} {...otherProps} />;
};

export default MenuLink;
