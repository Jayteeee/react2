// 모듈, 패키지
import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"

// 다른페이지
import { createCard } from "./redux/modules/word";

function Card() {
  const history = useHistory();
  const dispatch = useDispatch();
  const word = React.useRef(null);
  const definition = React.useRef(null);
  const example = React.useRef(null);
  const password = React.useRef(null);
  const addCardList = () => {
    dispatch(
      createCard({
        word: word.current.value,
        definition: definition.current.value,
        example: example.current.value,
        password: password.current.value,
        completed: false,
      })
    );
  };

  return (
    <div className="Card">
      <h1>단어 추가하기</h1>
      <div>
        <div>
          <label> 단어 </label>
          <input type="text" ref={word}></input>
        </div>
        <div>
          <label> 정의 </label>
          <input type="text" ref={definition}></input>
        </div>
        <div>
          <label> 예시 </label>
          <input type="text" ref={example}></input>
        </div>
        <div>
          <label> 비밀번호 </label>
          <input type="text" ref={password}></input>
        </div>
      </div>

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
          history.goBack();
        }}
      >
        취소
      </button>
    </div>
  );
}

export default Card;
