import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { usePageContext } from 'vike-react/usePageContext';
import LogoIcon from '../../assets/icons/logo-portfolio.svg';
import BurgerMenu from '../MobileMenu/MobileMenu';
import {
  HeaderWrapper,
  Logo,
  NavbarContainer,
  NavItem,
  NavList,
  StyledNavLink,
} from './Header.styled';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 3000 });
    AOS.refresh();
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMobile = useMediaQuery({ query: '(max-width: 773px)' });
  const pageContext = usePageContext();

  return (
    <NavbarContainer $isScrolled={isScrolled}>
      <HeaderWrapper>
        <Logo href="/">
          <img src={LogoIcon} alt="Logo" />
        </Logo>
        <NavList>
          {isMobile ? (
            <BurgerMenu />
          ) : (
            <>
              {/* <NavItem>
              <StyledNavLink href="/home" className={pageContext.urlPathname === '/home' ? 'active' : ''}>WELCOME</StyledNavLink>
            </NavItem> */}
              <NavItem>
                <StyledNavLink
                  href="/work"
                  className={
                    pageContext.urlPathname === '/work' ? 'active' : ''
                  }
                >
                  WORK
                </StyledNavLink>
              </NavItem>{' '}
              <NavItem>
                <StyledNavLink
                  href="/photography"
                  className={
                    pageContext.urlPathname === '/photography' ? 'active' : ''
                  }
                >
                  PHOTOGRAPHY
                </StyledNavLink>
              </NavItem>{' '}
              <NavItem>
                <StyledNavLink
                  href="/info"
                  className={
                    pageContext.urlPathname === '/info' ? 'active' : ''
                  }
                >
                  INFO
                </StyledNavLink>
              </NavItem>{' '}
              <NavItem>
                <StyledNavLink
                  href="/contact"
                  className={
                    pageContext.urlPathname === '/contact' ? 'active' : ''
                  }
                >
                  CONTACTS
                </StyledNavLink>
              </NavItem>{' '}
              <NavItem>
                <StyledNavLink
                  href="/about"
                  className={
                    pageContext.urlPathname === '/about' ? 'active' : ''
                  }
                >
                  ABOUT ME
                </StyledNavLink>
              </NavItem>
            </>
          )}
        </NavList>
      </HeaderWrapper>
    </NavbarContainer>
  );
};

export default Header;
