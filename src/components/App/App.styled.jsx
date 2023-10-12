import styled from 'styled-components';

export const AppStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

export const StyledSection = styled.section`
  padding-top: 80px;
  padding-bottom: 20px;
  margin: 0 auto;
  width: 100%;
  min-height: 90vh;
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    #b1d8ef 0.1%,
    #d0e3f3 94.2%
  );
`;
