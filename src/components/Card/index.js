import styled from "styled-components";

const CARD = styled.div`
  height: calc(8rem + 12vw);
  width: calc(9rem + 12vw);
  background-color: var(--nav2);
  border-radius: 20px;
  position: relative;
  margin-top: calc(5rem + 5vw);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--nav);
    transform: translateY(-10px);
  }

  @media only screen and (max-width: 40em) {
    height: calc(10rem + 15vw);
    width: calc(12rem + 15vw);
  }
`;

const StyledImage = styled.div`
  width: 40%;
  height: 40%;
  position: absolute;
  left: 50%;
  bottom: 80%;
  transform: translate(-50%);
  border-radius: 50%;
  background-color: red;
  /* Use the prop passed from the component */
  background-image: ${(props) => `url(${props.$img})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  filter: drop-shadow(0px -3px 3px var(--nav2));
  border: 2px solid var(--gold);
`;

const TEXT = styled.h4`
  color: var(--white);
  padding: 0 calc(1rem + 1vw);
  text-align: center;
  font-size: calc(0.7rem + 0.5vw);
  font-weight: 400;
  line-height: 1.4;
`;

const NAME = styled.h3`
  color: var(--gold);
  padding-top: 1rem;
  font-size: calc(0.6rem + 1vw);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Card = ({ name, text, image }) => {
  // Directly use the image prop if you are passing the imported file 
  // or use the public folder path.
  return (
    <CARD>
      <StyledImage $img={image} />
      <TEXT>{text}</TEXT>
      <NAME>{name}</NAME>
    </CARD>
  );
};

export default Card;