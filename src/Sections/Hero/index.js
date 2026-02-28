import styled, { keyframes } from "styled-components";

import pinkBlob from "../../assets/blobPink.png";
import purpleBlob from "../../assets/blob purple.png";
import whiteBlob from "../../assets/blob white.png";
import arrow from "../../assets/Arrow Right.svg";
import Mobile from "../../assets/mobile.svg";

const move = keyframes`
  0% { transform: translateY(-5px)  }
  50% { transform: translateY(10px) }
  100% { transform: translateY(-5px) }
`;

const HomeSection = styled.section`
  width: 100%;
  min-height: 80vh; 
  background-color: #0a0b10;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden; 

  @media only screen and (max-width: 48em) {
    flex-direction: column;
    padding: 5rem 0; /* Balanced padding for mobile */
    height: auto;
  }
`;

const Blobs = styled.div`
  width: 100%;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  @media only screen and (max-width: 48em) {
    opacity: 0.5;
  }
`;

const PinkBlob = styled.div`
  width: calc(15% + 15vw);
  position: absolute;
  right: -5%;
  top: calc(2rem + 5vw);
  z-index: 6;
  img { width: 100%; height: auto; }
`;

const PurpleBlob = styled.div`
  width: calc(10% + 10vw);
  position: absolute;
  right: 0;
  bottom: 10%;
  img { width: 100%; height: auto; }
`;

const WhiteBlob = styled.div`
  width: calc(20% + 20vw);
  position: absolute;
  right: calc(2rem + 2vw);
  top: calc(1rem + 2vw);
  z-index: 5;
  img { width: 100%; height: auto; }
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  z-index: 10;

  @media only screen and (max-width: 48em) {
    flex-direction: column;
    width: 90vw;
    justify-content: center;
  }
`;

const MobileSvg = styled.img`
  max-width: 100%;
  width: calc(30% + 20vw);
  height: auto;
  z-index: 7;
  animation: ${move} 2.5s ease infinite;

  @media only screen and (max-width: 48em) {
    width: calc(45% + 20vw);
    margin-top: 3rem;
    align-self: center;
  }
  
  @media only screen and (max-width: 30em) {
    width: 80%; 
  }
`;

const Lb = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  line-height: 1.5;
  color: #fff;
  position: relative;
  z-index: 15;

  @media only screen and (max-width: 48em) {
    width: 100%;
    text-align: center;
    align-items: center;
  }
`;

const Topic = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--nav, #202020);
  color: #fff;
  font-weight: 700;
  font-size: calc(0.6rem + 0.4vw);
  padding: 0.5rem 1rem;
  border-radius: 20px;

  @media only screen and (max-width: 30em) {
    font-size: 0.7rem;
  }
`;

const Circle = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: var(--gold, #ffd700);
  margin-right: 0.5rem;
`;

const Title = styled.h1`
  font-size: calc(1.8rem + 1.5vw);
  line-height: 1.2;
  padding: 0.5rem 0;
  color: #fff;

  @media only screen and (max-width: 48em) {
    font-size: calc(1.6rem + 2vw);
  }
`;

const SubText = styled.h5`
  font-size: calc(0.8rem + 0.3vw);
  color: var(--nav2, #969696);
  font-weight: 400;
  
  @media only screen and (max-width: 48em) {
    font-size: 1rem;
  }
`;

const CTA = styled.button`
  background-color: #fff;
  color: #0a0b10;
  padding: 0.6rem 1.5rem;
  margin-top: 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  border: none;
  transition: transform 0.2s;

  img {
    width: 1.2rem;
    margin-left: 0.5rem;
  }

  &:hover {
    transform: scale(1.05);
  }
  
  @media only screen and (max-width: 48em) {
    font-size: 0.9rem;
    padding: 0.5rem 1.2rem;
  }
`;

const HeroSection = () => {
  return (
    <HomeSection id="home">
      <Blobs>
        <PinkBlob>
          <img src={pinkBlob} alt="Decorative Pink Blob" />
        </PinkBlob>
        <WhiteBlob>
          <img src={whiteBlob} alt="Decorative White Blob" />
        </WhiteBlob>
        <PurpleBlob>
          <img src={purpleBlob} alt="Decorative Purple Blob" />
        </PurpleBlob>
      </Blobs>

      <MainContent>
        <Lb id="leftBlock">
          <Topic>
            <Circle />
            <span>Crafting the web, one brilliant site at a time.</span>
          </Topic>
          <Title>Optimise. Elevate. Growth</Title>
          <SubText>
            We empower rapidly growing companies to create award-winning websites.
          </SubText>
          <CTA>
            Get in touch
            <img src={arrow} alt="arrow" />
          </CTA>
        </Lb>

        <MobileSvg
          src={Mobile}
          alt="Mobile Device Illustration"
          width="400"
          height="400"
        />
      </MainContent>
    </HomeSection>
  );
};

export default HeroSection;