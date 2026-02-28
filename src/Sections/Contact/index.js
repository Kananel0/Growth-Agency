import Facebook from "../../assets/facebook-square-brands.svg";
import LinkedId from "../../assets/linkedin-brands.svg";
import Twitter from "../../assets/twitter-square-brands.svg";
import Instagram from "../../assets/instagram-square-brands.svg";
import styled from "styled-components";

const ContactSection = styled.section`
  width: 100%;
  padding: calc(2.5rem + 2.5vw) 0;
  background-color: #0a0b10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: var(--white);
  display: inline-block;
  font-size: 2rem;
  margin-bottom: 3rem;
  position: relative;
  &::before {
    content: "";
    height: 1px;
    width: 50%;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0.5rem);
    border-bottom: 2px solid var(--gold);
  }
`;

const Icons = styled.div`
  display: flex;
  margin-bottom: 3rem;
  a {
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.1);
      img {
        filter: invert(20%) sepia(100%) saturate(500%) hue-rotate(580deg)
          brightness(100%) contrast(97%);
      }
    }
    &:not(:last-child) {
      margin-right: 2rem;
    }
    img {
      width: 3rem;
      height: 3rem;
    }
  }
  @media only screen and (max-width: 40em) {
    gap: 1rem;
    a:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70vw; /* Added width for better control */
  max-width: 600px;

  input, textarea {
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: var(--nav2);
    border: none;
    border-radius: 4px;
    color: #eff7f8;
    font-family: inherit;
    &:focus {
      outline: none;
      background-color: var(--nav);
    }
    &::placeholder {
      color: #eff7f8;
      opacity: 0.6;
    }
  }

  button {
    padding: 0.8rem 2rem;
    background-color: var(--white);
    border-radius: 20px;
    font-size: 1.2rem;
    color: #0a0b10;
    cursor: pointer;
    border: none;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.9);
    }
  }

  @media only screen and (max-width: 48em) {
    width: 90vw;
  }
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  input {
    width: 100%;
    &[name="name"] {
      margin-right: 2rem;
    }
  }

  @media only screen and (max-width: 40em) {
    flex-direction: column;
    input[name="name"] {
      margin-right: 0;
    }
  }
`;

const Contact = () => {
  return (
    <ContactSection id="contact">
      <Title>Get in touch</Title>
      <Icons>
        {/* Added rel="noreferrer" to clear ESLint warnings */}
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <img src={Facebook} alt="Facebook" />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
          <img src={LinkedId} alt="LinkedIn" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
          <img src={Twitter} alt="Twitter" />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          <img src={Instagram} alt="Instagram" />
        </a>
      </Icons>
      <Form>
        <Row>
          <input name="name" type="text" placeholder="your name" required />
          <input
            name="email"
            type="email"
            placeholder="enter email"
            required
          />
        </Row>
        <textarea
          name="message"
          cols="30"
          rows="4"
          placeholder="your message"
          required
        ></textarea>
        <div style={{ margin: "0 auto" }}>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              alert("Form submitted!");
            }}
          >
            Submit
          </button>
        </div>
      </Form>
    </ContactSection>
  );
};

export default Contact;