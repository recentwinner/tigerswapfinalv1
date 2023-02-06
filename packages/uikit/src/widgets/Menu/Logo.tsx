import React, { useContext } from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import { MenuContext } from "./context";
import { LogoIcon } from "../../components/Svg";
import Flex from "../../components/Flex/Flex";
import { HamburgerIcon, HamburgerCloseIcon, LogoIcon as LogoWithText } from "./icons";
import MenuButton from "./MenuButton";

interface Props {
  isPushed: boolean;
  isDark: boolean;
  togglePush: () => void;
  href: string;
}

const StyledLink = styled("a")`
  display: flex;
  align-items: center;
  .mobile-icon {
    width: 32px;
    ${({ theme }) => theme.mediaQueries.lg} {
      display: none;
    }
  }
  .desktop-icon {
    width: 156px;
    display: none;
    ${({ theme }) => theme.mediaQueries.lg} {
      display: block;
    }
  }
`;

const Logo: React.FC<Props> = ({ isPushed, togglePush, isDark, href }) => {
   const { linkComponent } = useContext(MenuContext);
  const isAbsoluteUrl = href.startsWith("http");
  const innerLogo = (
    <>
      <LogoIcon className="mobile-icon" />
      <LogoWithText className="desktop-icon" isDark={isDark} />
    </>
  );

  return (
    <Flex>
      <MenuButton aria-label="Toggle menu" onClick={togglePush} mr="24px">
        {isPushed ? (
          <HamburgerCloseIcon width="24px" color="textSubtle" />
        ) : (
          <HamburgerIcon width="24px" color="textSubtle" />
        )}
      </MenuButton>
      {isAbsoluteUrl ? (
        <StyledLink as="a" href={href} aria-label="home page">
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink href={href} as={linkComponent} aria-label="home page">
          {innerLogo}
        </StyledLink>
      )}
    </Flex>
  );
};

export default Logo;
