// 모듈, 패키지
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// 다른페이지
import { editCardFB } from "./redux/modules/word";
import styled from "styled-components";

function Edit() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const word = React.useRef(null);
  const definition = React.useRef(null);
  const example = React.useRef(null);
  const password = React.useRef(null);
  const editCardList = () => {
    dispatch(
      editCardFB({
        word: word.current.value,
        definition: definition.current.value,
        example: example.current.value,
        password: password.current.value,
        completed: false,
        id: params.card_id,
      })
    );
  };
  const word_list = useSelector((state) => [state.word.list][0]);
  const my_idx = params.card_idx;

  return (
    <Container className="Card">
      <h1>단어 수정하기</h1>
      <Box>
        <InputBox>
          <span> 단어 </span>
          <input
            type="text"
            ref={word}
            defaultValue={word_list[my_idx]?.word}
          ></input>
        </InputBox>
        <InputBox>
          <span> 정의 </span>
          <input
            type="text"
            ref={definition}
            defaultValue={word_list[my_idx]?.definition}
          ></input>
        </InputBox>
        <InputBox>
          <span> 예시 </span>
          <input
            type="text"
            ref={example}
            defaultValue={word_list[my_idx]?.example}
          ></input>
        </InputBox>
        <InputBox>
          <span> 비밀번호 </span>
          <input
            type="text"
            ref={password}
            defaultValue={word_list[my_idx]?.password}
          ></input>
        </InputBox>
        <button
          onClick={() => {
            editCardList();
            history.push("/");
          }}
        >
          저장
        </button>
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          취소
        </button>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const Box = styled.form`
  width: 40vw;
  max-width: 768px;
  border: 1px solid #ddd;
  padding: 3vw;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  & button {
    padding: 15px 0px;
    margin-top: 20px;
    background: #4169e1;
    color: #fff;
    border: 1px solid #4169e1;
    cursor: pointer;
    border-radius: 3px;
  }
`;

const InputBox = styled.label`
  margin-bottom: 15px;
  position: relative;
  border-bottom: 1px solid #ddd;
  & input {
    width: 100%;
    padding: 10px 0px;
    margin-top: 20px;
    border: none;
    outline: none;
  }
  & input::placeholder {
    opacity: 0;
  }
  & span {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(0px);
    font-size: 0.825em;
    transition-duration: 300ms;
  }
  &:focus-within > span,
  input:not(:placeholder-shown) + span {
    color: #4169e1;
  }
`;

export default Edit;
