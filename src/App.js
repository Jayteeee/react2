import React from "react";
import "./App.css";
import { Route, useHistory } from "react-router-dom";
import Main from "./Main";
import Card from "./Card"
import Edit from "./edit";
import styled from "styled-components"
import { useDispatch } from "react-redux";
import { loadCardFB } from "./redux/modules/word";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  React.useEffect( () => {
    dispatch(loadCardFB());
  }, []);

  return (
      <Container>
        <Title onClick={() => {history.push("/")}}>
          <div>나만의 사전</div>
          <MyLine />
        </Title>
        <Route exact path="/" >
          <Main />
        </Route>
        <Route path="/card" >
          <Card />
        </Route>
        <Route path='/edit/:card_idx/:card_id' exact >
          <Edit />
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
  & > div {
    font-weight: 700;
  }
`

const MyLine = styled.hr`
  border: 1px solid #a7bbf8;
  margin: 10px 30px 50px;
`


export default App;
