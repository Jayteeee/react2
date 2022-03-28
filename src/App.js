import React from "react";
import "./App.css";
import { Route, useHistory } from "react-router-dom";
import Main from "./Main";
import Card from "./Card"
import styled from "styled-components"

function App() {
  const history = useHistory();
  return (
    <Container>
      <Title onClick={() => {history.push("/")}}>
        <div>나만의 사전</div>
        <hr />
      </Title>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/card" >
        <Card />
      </Route>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
`

const Title = styled.header`
  position: sticky;
  top: 0px;
  font-size: 30px;
  padding: 10px 0 0 0;
  cursor: pointer;
  background: white;
`


export default App;
