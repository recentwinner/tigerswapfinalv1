import { useIsMounted } from "@pancakeswap/hooks";
import { AtomBox } from "@pancakeswap/ui/components/AtomBox";
// import Overlay from "../../components/Overlay/Overlay";
import Overlay from "./components/Overlay/Overlay";
import throttle from "lodash/throttle";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import BottomNav from "../../components/BottomNav";
import { Box } from "../../components/Box";
import Flex from "../../components/Box/Flex";
// import CakePrice from "../../components/CakePrice/CakePrice";
// import Footer from "../../components/Footer";
// import LangSelector from "../../components/LangSelector/LangSelector";
// import MenuItems from "../../components/MenuItems/MenuItems";
import { SubMenuItems } from "../../components/SubMenuItems";
import { useMatchBreakpoints } from "../../contexts";
import Logo from "./Logo";
import { MENU_HEIGHT, MOBILE_MENU_HEIGHT, TOP_BANNER_HEIGHT, TOP_BANNER_HEIGHT_MOBILE, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "./config";
import { MenuContext } from "./context";
import { NavProps } from "./types";
import Panel from "./Panel";


const Wrapper = styled.div`
 position: relative;
 width: 100%;
`;

const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ theme }) => theme.nav.background};
  border-bottom: solid 2px rgba(133, 133, 133, 0.1);
  z-index: 20;
  transform: translate3d(0, 0, 0);
`;

// const FixedContainer = styled.div<{ showMenu: boolean; height: number }>`
//   position: fixed;
//   top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
//   left: 0;
//   transition: top 0.2s;
//   height: ${({ height }) => `${height}px`};
//   width: 100%;
//   z-index: 20;
// `;

const TopBannerContainer = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  min-height: ${({ height }) => `${height}px`};
  max-height: ${({ height }) => `${height}px`};
  width: 100%;
`;


const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  margin-top: ${({ showMenu }) => (showMenu ? "0.01px" : 0)};
  transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0);
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
  }
`;

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`;

const Menu: React.FC<React.PropsWithChildren<NavProps>> = ({
  linkComponent = "a",
  href,
  banner,
  rightSide,
  isDark,
  toggleTheme,
  currentLang,
  setLang,
  cakePriceUsd,
  sidelinks,
  links,
  subLinks,
  footerLinks,
  activeItem,
  activeSubItem,
  langs,
  buyCakeLabel,
  priceLink,
  children,
}) => {
  const { isMobile } = useMatchBreakpoints();
  const isMounted = useIsMounted();
  const [showMenu, setShowMenu] = useState(true);
  // const refPrevOffset = useRef(typeof window === "undefined" ? 0 : window.pageYOffset);
  // const { isXl } = useMatchBreakpoints();
  // const isMobile = isXl === false;
  const [isPushed, setIsPushed] = useState(!isMobile);
  const refPrevOffset = useRef(window.pageYOffset);

  const topBannerHeight = isMobile ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT;

  const totalTopMenuHeight = isMounted && banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT;


  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentOffset = window.pageYOffset;
  //     const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
  //     const isTopOfPage = currentOffset === 0;
  //     // Always show the menu when user reach the top
  //     if (isTopOfPage) {
  //       setShowMenu(true);
  //     }
  //     // Avoid triggering anything at the bottom because of layout shift
  //     else if (!isBottomOfPage) {
  //       if (currentOffset < refPrevOffset.current) {
  //         // Has scroll up
  //         setShowMenu(true);
  //       } else {
  //         // Has scroll down
  //         setShowMenu(false);
  //       }
  //     }
  //     refPrevOffset.current = currentOffset;
  //   };
  //   const throttledHandleScroll = throttle(handleScroll, 200);

  //   window.addEventListener("scroll", throttledHandleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", throttledHandleScroll);
  //   };
  // }, []);


  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [totalTopMenuHeight]);

  // Find the home link if provided
  // const homeLink = links.find((link) => link.label === "Home");
  const homeLink = links.find((link) => link.label === "Home");

  const subLinksWithoutMobile = subLinks?.filter((subLink) => !subLink.isMobileOnly);
  const subLinksMobileOnly = subLinks?.filter((subLink) => subLink.isMobileOnly);

  return (
    <MenuContext.Provider value={{ linkComponent }}>
      {/* <AtomBox
        asChild
        minHeight={{
          xs: "auto",
          md: "100vh",
        }}
      > */}
        <Wrapper>
         
            {banner && isMounted && <TopBannerContainer height={topBannerHeight}>{banner}</TopBannerContainer>}
            <StyledNav showMenu={showMenu}>
               <Logo
                    isPushed={isPushed}
                    togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
                    isDark={isDark}
                    href={homeLink?.href ?? "/"}
                />
              <Flex>
                {/* <Logo href={homeLink?.href ?? "/"} /> */}
                {/* <AtomBox display={{ xs: "none", md: "block" }}>
                  <MenuItems items={links} activeItem={activeItem} activeSubItem={activeSubItem} ml="24px" />
                </AtomBox> */}
              </Flex>
              <Flex alignItems="center" height="100%">
                {/* <AtomBox mr="12px" display={{ xs: "none", lg: "block" }}>
                  <CakePrice showSkeleton={false} cakePriceUsd={cakePriceUsd} />
                </AtomBox> */}
                {/* <Box mt="4px">
                  <LangSelector
                    currentLang={currentLang}
                    langs={langs}
                    setLang={setLang}
                    buttonScale="xs"
                    color="textSubtle"
                    hideLanguage
                  />
                </Box> */}
                {rightSide}
              </Flex>
            </StyledNav>
{/*          
          {subLinks ? (
            <Flex justifyContent="space-around" overflow="hidden">
              <SubMenuItems
                items={subLinksWithoutMobile}
                mt={`${totalTopMenuHeight + 1}px`}
                activeItem={activeSubItem}
              />

              {subLinksMobileOnly && subLinksMobileOnly?.length > 0 && (
                <SubMenuItems
                  items={subLinksMobileOnly}
                  mt={`${totalTopMenuHeight + 1}px`}
                  activeItem={activeSubItem}
                  isMobileOnly
                />
              )}
            </Flex>
          ) : (
            <div/>
          )} */}
          {/* <BodyWrapper mt={!subLinks ? `${totalTopMenuHeight + 1}px` : "0"}>
            <Inner>{children}</Inner>
          </BodyWrapper> */}
          <BodyWrapper>
              <Panel
                isPushed={isPushed}
                isMobile={isMobile}
                showMenu={showMenu}
                isDark={isDark}
                toggleTheme={toggleTheme}
                langs={langs}
                setLang={setLang}
                currentLang={currentLang}
                href={href}
                cakePriceUsd={cakePriceUsd}
                pushNav={setIsPushed}
                sidelinks={sidelinks}
                priceLink={priceLink}
              />
              <Inner isPushed={isPushed} showMenu={showMenu}>
                 
          {subLinks ? (
            <Flex justifyContent="space-around" overflow="hidden">
              <SubMenuItems
                items={subLinksWithoutMobile}
                mt={`${totalTopMenuHeight + 1}px`}
                activeItem={activeSubItem}
              />

              {subLinksMobileOnly && subLinksMobileOnly?.length > 0 && (
                <SubMenuItems
                  items={subLinksMobileOnly}
                  mt={`${totalTopMenuHeight + 1}px`}
                  activeItem={activeSubItem}
                  isMobileOnly
                />
              )}
            </Flex>
          ) : (
            <div/>
          )}

              {children}

              </Inner>
        <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
       </BodyWrapper>
          
        </Wrapper>
      {/* </AtomBox> */}
      {/* <Footer
        items={footerLinks}
        isDark={isDark}
        toggleTheme={toggleTheme}
        langs={langs}
        setLang={setLang}
        currentLang={currentLang}
        cakePriceUsd={cakePriceUsd}
        buyCakeLabel={buyCakeLabel}
        mb={[`${MOBILE_MENU_HEIGHT}px`, null, "0px"]}
      /> */}
      {/* <AtomBox display={{ xs: "block", md: "none" }}>
        <BottomNav items={links} activeItem={activeItem} activeSubItem={activeSubItem} />
      </AtomBox> */}
    </MenuContext.Provider>
  );
};

export default Menu;
