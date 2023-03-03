import styled from "styled-components";
import { GoogleUserResult } from "../../utils/getGoogleUser";

interface IProfileCard {
  user: GoogleUserResult;
}

const Wrapper = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.2);
  column-gap: 1rem;
  display: grid;
  font-family: "Courier New", Courier, monospace;
  grid-template-columns: auto 1fr;
  padding: 1rem;
  margin-bottom: auto;
`;

const Image = styled.img`
  align-self: center;
  width: 5rem;
  height: 5rem;
  border-radius: 0.5rem;
`;

const InfoWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-flow: column;
  gap: 0.25rem;
`;

const Name = styled.h3`
  margin: 0;
  padding: 0;
`;
const Email = styled.h4`
  margin: 0;
  padding: 0;
  font-weight: 300;
`;
const Locale = styled.h4`
  margin: 0;
  padding: 0;
  font-weight: 300;
`;

export const ProfileCard = ({ user }: IProfileCard) => {
  return (
    <Wrapper>
      <Image src={user?.picture} alt="user" referrerPolicy="no-referrer" />
      <InfoWrapper>
        <Name>{user.name}</Name>
        <Email>{user.email}</Email>
        <Locale>{user.locale}</Locale>
      </InfoWrapper>
    </Wrapper>
  );
};
