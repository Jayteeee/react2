import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"
import styled, { keyframes } from "styled-components";

const Main = () => {
  const history = useHistory();
  const word_list = useSelector((state) => state.word.list);

  return (

    <Container className="Main">
      <h1>재밌는 사전</h1>
      <Card_wrap>
      {word_list.map((list,idx) => {
        return(
          <Card
          onClick={() => {history.push("/card")}}
          key={idx}>
            <h3>{list.word}</h3>
            <hr />
            <div>
              <p>정의</p>
              <p>{list.definition}</p>
            </div>
            <br></br>
            <Example>
              <p>예시</p>
              <p>{list.example}</p>
            </Example>
          </Card>
        )
      })}
      </Card_wrap>
      <Join
        onClick={() => {
          history.push("/card");
        }}
      >
        +
      </Join>
      <Totop
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        ↑
      </Totop>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Card_wrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
  max-width: 80vw;
  width: 80vw;
`;

const Card = styled.div`
  max-width: 80vw;
  width: 280px;
  height: 300px;
  border: 1px solid gray;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  text-align: left;
`;

const Example = styled.div`
  color: blue;
`

const joinAnimation = keyframes`
  0% {
    transform: rotate(0deg)
  }

  100% {
    transform: rotate(90deg)
  }
`;

const Join = styled.button`
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  font-size: 50px;
  cursor: pointer;
  background: #4169e1;
  color: white;
  border: 1px solid gray;

  &:hover {
    animation: ${joinAnimation} 0.3s linear alternate;
  }
`;

const Totop = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  font-size: 30px;
  cursor: pointer;
  background: #4169e1;
  color: white;
  border: 1px solid gray;
`;

export default Main;
