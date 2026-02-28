import styled from "styled-components";
import Twitter from "../../assets/twitter-square-brands.svg";
import Instagram from "../../assets/instagram-square-brands.svg";
import Gmail from "../../assets/envelope-open-solid.svg";

const FOOTER = styled.footer`
  padding: 1.2rem calc(2.5rem + 2.5vw);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0a0b10;
  color: #fff;

  @media only screen and (max-width: 48em) {
    flex-direction: column;
    padding: 2rem;
    text-align: center;
  }
`;

const RightText = styled.div`
  display: flex;
  align-items: center;
  
  img {
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 1.5rem;
    filter: invert(100%);
    transition: all 0.2s ease-in-out;
  }

  a {
    display: flex;
    align-items: center;
    &:hover {
      img {
        transform: scale(1.3);
        filter: invert(50%) sepia(100%) saturate(500%) hue-rotate(216deg)
          brightness(100%) contrast(97%);
      }
    }
  }

  @media only screen and (max-width: 48em) {
    flex-direction: column;
    margin-top: 1rem;
    
    span {
      margin-bottom: 1rem;
    }
    
    img {
      margin: 0 0.8rem;
    }
    
    .social-links {
      display: flex;
      justify-content: center;
    }
  }
`;

const LeftText = styled.div`
  text-align: left;
  font-size: 0.9rem;
  opacity: 0.8;

  @media only screen and (max-width: 48em) {
    text-align: center;
  }
`;

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <FOOTER>
      <LeftText>
        © {year} Built by Growth Agency. All rights reserved.
      </LeftText>
      
      <RightText>
        <span>Reach out to me via 😉</span>
        <div className="social-links">
          {/* rel="noreferrer" added to clear ESLint warnings */}
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <img src={Twitter} alt="Twitter" />
          </a>

          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <img src={Instagram} alt="Instagram" />
          </a>

          <a href="mailto:hello@growthagency.com?subject=Email From Your Website">
            <img src={Gmail} alt="Gmail" />
          </a>
        </div>
      </RightText>
    </FOOTER>
  );
};

export default Footer;