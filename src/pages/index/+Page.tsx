import React, { useState } from 'react';
import {
  HOME_BUTTON_MAIN,
  HOME_BUTTON_RESIZABLE_BAR,
  HOME_BUTTON_TEXT,
  HomeContainer,
} from './HomePage.styled';

const Home: React.FC = () => {
  type HomeButtonProps = {
    to: string;
    label: string;
  };

  const HOME_BUTTON: React.FC<HomeButtonProps> = ({ to, label }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isClicked) {
        e.preventDefault();
        return;
      }
      setIsClicked(true);
      setTimeout(() => {
        window.location.href = to;
      }, 200);
    };

    return (
      <a href={to} onClick={handleClick} style={{ textDecoration: 'none' }}>
        <HOME_BUTTON_MAIN $isClicked={isClicked}>
          <HOME_BUTTON_RESIZABLE_BAR $isClicked={isClicked} />
          <HOME_BUTTON_TEXT $isClicked={isClicked}>{label}</HOME_BUTTON_TEXT>
        </HOME_BUTTON_MAIN>
      </a>
    );
  };

  return (
    <HomeContainer>
      <HOME_BUTTON to="/work" label="WORK" />
      <HOME_BUTTON to="/photography" label="PHOTOGRAPHY" />
      <HOME_BUTTON to="/info" label="INFO" />
      <HOME_BUTTON to="/contact" label="CONTACTS" />
      <HOME_BUTTON to="/about" label="ABOUT ME" />
    </HomeContainer>
  );
};
export default Home;
