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
  grid-template-columns: 4rem auto;
  padding: 1rem;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 0.5rem;
`;

const InfoWrapper = styled.div``;

const Name = styled.h3``;
const Email = styled.h4``;
const Locale = styled.h4``;

export const ProfileCard = ({ user }: IProfileCard) => {
  return (
    <Wrapper>
      <Image
        width={50}
        height={50}
        style={{ borderRadius: "0.5rem" }}
        src={user?.picture}
        alt="user"
        referrerPolicy="no-referrer"
      />
      <InfoWrapper>
        <Name>{user.name}</Name>
        <Email>{user.email}</Email>
        <Locale>{user.locale}</Locale>
      </InfoWrapper>
    </Wrapper>
  );
};
