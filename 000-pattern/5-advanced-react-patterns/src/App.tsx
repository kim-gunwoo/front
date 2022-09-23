import React from "react";
import styled from "styled-components";
import { Usage as CompoundComponent } from "./patterns/compound-component/Usage";
import { Usage as ControlProps } from "./patterns/control-props/Usage";
import { Usage as CustomHooks } from "./patterns/custom-hooks/Usage";

function App() {
  return (
    <Container>
      <Title>5 Advanced React Pattern </Title>

      <PatternContainer>
        <Title>Compound component pattern</Title>
        <CompoundComponent />
      </PatternContainer>

      <PatternContainer>
        <Title>Control props pattern</Title>
        <ControlProps />
      </PatternContainer>

      <PatternContainer>
        <Title>Custom hooks pattern</Title>
        <CustomHooks />
      </PatternContainer>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
`;

const Title = styled.div`
  padding: 10px;
`;

const PatternContainer = styled.div`
  padding: 30px;
  border-bottom: 2px solid black;

  &:last-child {
    border: none;
  }
`;

export default App;
