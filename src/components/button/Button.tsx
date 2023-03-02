import styled from "styled-components";

interface ButtonProps {
  label: string;
  href?: string;
}

const Styles = {
  Button: styled.a`
    background: transparent;
    border-radius: 0.5rem;
    border: 1px solid #888;
    color: #888;
    font-family: "Courier New", Courier, monospace;
    font-size: x-large;
    margin: 0.25rem;
    padding: 0.5rem 1rem;
    text-decoration: none;

    cursor: pointer;

    :hover {
      opacity: 0.8;
      background-color: #ddd;
      transform: translateY(-0.125rem);
    }

    transition: all 0.3s ease;
  `,
};

export const Button = ({ label, href = "/" }: ButtonProps) => {
  return (
    <Styles.Button type="button" href={href}>
      {label}
    </Styles.Button>
  );
};
