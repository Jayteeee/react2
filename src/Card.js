// 모듈, 패키지
import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// 다른페이지
import { addCardFB, createCard } from "./redux/modules/word";
import styled from "styled-components";

function Card() {
  const history = useHistory();
  const dispatch = useDispatch();
  const word = React.useRef(null);
  const definition = React.useRef(null);
  const example = React.useRef(null);
  const password = React.useRef(null);
  const addCardList = () => {
    dispatch(
      addCardFB({
        word: word.current.value,
        definition: definition.current.value,
        example: example.current.value,
        password: password.current.value,
        completed: false,
        time: new Date().getTime()
      })
    );
  };

  return (
    <Container className="Card">
      <h1>단어 추가하기</h1>
      <Box>
        <InputBox>
          <input type="text" ref={word} placeholder="word"></input>
          <span> 단어 </span>
        </InputBox>
        <InputBox>
          <input type="text" ref={definition} placeholder="def"></input>
          <span> 정의 </span>
        </InputBox>
        <InputBox>
          <input type="text" ref={example} placeholder="ex"></input>
          <span> 예시 </span>
        </InputBox>
        <InputBox>
          <input type="text" ref={password} placeholder="pw"></input>
          <span> 비밀번호 </span>
        </InputBox>
        <button
          onClick={() => {
            addCardList();
            history.push("/");
          }}
        >
          저장
        </button>
        <button
          onClick={() => {
            history.push('/');
          }}
        >
          취소
        </button>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  & > h1 {
    color: white;
  }
`;

const Box = styled.form`
  width:40vw;
  max-width:768px;
  border:1px solid #ddd;
  padding:3vw;
  display:flex;
  flex-direction:column;
  border-radius:5px;
  background-color: white ;

  & button {
    padding:15px 0px; 
    margin-top:20px;
    background:#4169e1;
    color:#fff;
    border:1px solid #4169e1;
    cursor:pointer;
    border-radius:3px;
  }
`;

const InputBox = styled.label`
  margin-bottom:15px;
  position:relative;
  border-bottom:1px solid #ddd;
  & input {
    width:100%;
    padding:10px 0px;
    margin-top:20px;
    border:none;
    outline:none;
  }
  & input::placeholder{
    opacity:0;
  }
  & span{
    position:absolute;
    top:0;
    left:0;
    transform:translateY(30px);
    font-size:0.825em;
    transition-duration:300ms;
  }
  &:focus-within > span,
  input:not(:placeholder-shown) + span{
      color:#4169e1;
      transform:translateY(0px);
  }

`

export default Card;
