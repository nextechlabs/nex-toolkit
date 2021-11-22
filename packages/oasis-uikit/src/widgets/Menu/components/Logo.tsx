import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Flex from "../../../components/Box/Flex";
import { LogoIcon } from "../../../components/Svg";

interface Props {
  isDark: boolean;
  href: string;
}

const blink = keyframes`
  0%,  100% { transform: scaleY(1); } 
  50% { transform:  scaleY(0.1); } 
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  .mobile-icon {
    width: 32px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    height: 80%;
    width: 50px;
    display: none;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: block;
    }
  }
  .right-eye {
    animation-delay: 20ms;
  }
  &:hover {
    .left-eye,
    .right-eye {
      transform-origin: center 60%;
      animation-name: ${blink};
      animation-duration: 350ms;
      animation-iteration-count: 1;
    }
  }
  .cls-1 {
    fill: #eaf6ea;
  }
  .cls-2 {
    fill: #e5f4e5;
  }
  .cls-3 {
    fill: #f9fcf9;
  }
  .cls-4 {
    fill: #f2f9f2;
  }
  .cls-5 {
    fill: #eff8ef;
  }
  .cls-6 {
    fill: #f6fbf6;
  }
  .cls-7 {
    fill: #f4faf4;
  }
  .cls-8 {
    fill: #e3f3e3;
  }
  .cls-9 {
    fill: #e0f2e0;
  }
  .cls-10 {
    fill: #ddf0de;
  }
  .cls-11 {
    fill: #d9eed9;
  }
  .cls-12 {
    fill: #d3ebd3;
  }
  .cls-13 {
    fill: #cfeacf;
  }
  .cls-14 {
    fill: #cce9cd;
  }
  .cls-15 {
    fill: #c8e7c8;
  }
  .cls-16 {
    fill: #c2e4c3;
  }
  .cls-17 {
    fill: #bae1bb;
  }
  .cls-18 {
    fill: #b5dfb5;
  }
  .cls-19 {
    fill: #aedcae;
  }
  .cls-20 {
    fill: #a4d8a5;
  }
  .cls-21 {
    fill: #9ad59b;
  }
  .cls-22 {
    fill: #92d292;
  }
  .cls-23 {
    fill: #84cf85;
  }
  .cls-24 {
    fill: #67c868;
  }
  .cls-25 {
    fill: #79ca7a;
  }
  .cls-26 {
    fill: #5dc45e;
  }
  .cls-27 {
    fill: #4abc4b;
  }
  .cls-28 {
    fill: #38b43a;
  }
  .cls-29 {
    fill: #d6e1d2;
  }
  .cls-30 {
    fill: #fefffe;
  }
`;

const Logo: React.FC<Props> = ({ isDark, href }) => {
  const isAbsoluteUrl = href.startsWith("http");
  const innerLogo = (
    <>
      <LogoIcon className="mobile-icon" isDark={isDark} />
      <LogoIcon className="desktop-icon" isDark={isDark} />
    </>
  );

  return (
    <Flex>
      {isAbsoluteUrl ? (
        <StyledLink as="a" href={href} aria-label="Oasis home page">
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink to={href} aria-label="Oasis home page">
          {innerLogo}
        </StyledLink>
      )}
    </Flex>
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
