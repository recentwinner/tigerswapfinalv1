import React from "react";
import styled from "styled-components";
// import { useLocation } from "react-router-dom";
import { useRouter } from 'next/router';
import { SvgProps } from "../../components/Svg";
import * as IconModule from "./icons";
import Accordion from "./Accordion";
import { MenuEntry, LinkLabel } from "./MenuEntry";
// import MenuItems from "../../components/MenuItems/MenuItems";
// import { SubMenuItems } from "../../components/SubMenuItems";
import Dropdown from "../../components/Dropdown/Dropdown";
import MenuLink from "./MenuLink";
import Link from 'next/link';
// import Link from "../../components/Link/Link";
import { sidelinks } from "./config";
import { PanelProps, PushedProps } from "./types";




interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
  href: string;
}

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`;

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, href }) => {
  const { pathname } = useRouter()
  const isHttpLink = href?.startsWith("http");

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;

  return (
    <Container>
      {sidelinks.map((entry) => {
        const Icon = Icons[entry.icon];
        const iconElement = <Icon width="24px" mr="8px" />;
        // const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;

        if (entry.items) {
          return (
            <Accordion
              key={entry.label}
              isPushed={isPushed}
              pushNav={pushNav}
              icon={iconElement}
              label={entry.label}
              // initialOpenState={entry.initialOpenState}
              // className={calloutClass}
            >
              {isPushed &&
                entry.items.map((item) => (
                  <MenuEntry  key={item.href} secondary isActive={item.href ===  pathname ||  isHttpLink } onClick={handleClick}>
                     { item.href ===  pathname ? 
                    <Link href={item.href}>{item.label}</Link>
                    :
                    <a href={item.href} >{item.label}</a>

                     }
                  </MenuEntry>
                ))} 
            </Accordion>
          );
        }

        return (
          <MenuEntry key={entry.label} isActive={entry.href ===  pathname ||  isHttpLink} >

             {iconElement}

           {entry.href ===  pathname ? 
            
            <Link href={entry.href} onClick={handleClick} >
              <LinkLabel isPushed={isPushed}> {entry.label} </LinkLabel>
            </Link>
            
            :

            <a  href={entry.href} onClick={handleClick} >
            <LinkLabel isPushed={isPushed}> {entry.label} </LinkLabel>
            </a> 

            }
            
          </MenuEntry>
        );
      })}

    </Container>
  );
};

export default PanelBody;
