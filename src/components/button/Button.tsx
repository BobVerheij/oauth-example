import { ReactNode } from "react";
import styled, { css } from "styled-components";

interface ButtonProps {
  label: string;
  href?: string;
  order?: "reverse";
  onClick?: () => void;
  children?: ReactNode;
}

const Styles = {
  Button: styled.a<{ order?: "reverse" }>`
    background: transparent;
    border-radius: 0.5rem;
    border: 1px solid #888;
    color: #888;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: "Courier New", Courier, monospace;
    font-size: x-large;
    margin: 0.25rem;
    padding: 0.5rem 1rem;
    text-decoration: none;

    ${({ order }) =>
      order === "reverse" &&
      css`
        flex-direction: row-reverse;
      `}

    cursor: pointer;

    :hover {
      opacity: 0.8;
      background-color: #ddd;
      transform: translateY(-0.125rem);
    }

    transition: all 0.3s ease;
  `,
};

export const Button = ({
  children,
  href = "/",
  label,
  onClick = () => {},

  order,
}: ButtonProps) => {
  return (
    <Styles.Button type="button" href={href} onClick={onClick} order={order}>
      {children}
      {label}
    </Styles.Button>
  );
};
