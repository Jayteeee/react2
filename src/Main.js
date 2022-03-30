import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux"
import styled, { keyframes } from "styled-components";
import { TiTickOutline, TiEdit, TiTimes } from "react-icons/ti";
import { FiChevronsUp } from "react-icons/fi";
import { updateCardFB, deleteCardFB } from "./redux/modules/word";

const Main = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const word_list = useSelector((state) => state.word.list);
  return (

    <Container className="Main">
      <Card_wrap>
      {word_list.map((list,idx) => {
        return(
          <Card 
          completed={list.completed}
          key={idx}>
            <Name>
              <div>
              {list.word}
              </div>
              <Buttons completed={list.completed}>
              < TiTickOutline 
                onClick={() => {
                 dispatch(updateCardFB(list))
              }}
              />
              < TiEdit
                onClick={() => {
                  let insert_pw = window.prompt("비밀번호를 입력해주세요.","")
                  insert_pw == list.password? history.push(`/edit/${idx}/${list.id}`) : alert("비밀번호가 다릅니다.")
                }}
              />
              < TiTimes 
                onClick={() => {
                  let insert_pw = window.prompt("비밀번호를 입력해주세요.","")
                  insert_pw == list.password? dispatch(deleteCardFB(list.id)) : alert("비밀번호가 다릅니다.")
                  // window.location.reload();
              }}
              />
              </Buttons>
            </Name>
            <hr />
            <div>
              <p>정의</p>
              <p>{list.definition}</p>
            </div>
            <br></br>
            <Example completed={list.completed}>
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
        <FiChevronsUp/>
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
  
  @media screen and (min-width: 0px) and (max-width: 800px) {
    justify-content: center;
  }
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
  overflow-wrap: break-word;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
  }
  background-color: ${(props) => (props.completed? "#4169e1" : "white")};
  color: ${(props) => (props.completed? "white" : "black")};

  @media screen and (min-width: 0px) and (max-width: 800px) {
    width: 80vw;
  }

  & > h3 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &:hover {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 10px 11px 0px,
    rgba(60, 64, 67, 0.15) 0px 5px 10px 4px;
    transition: 200ms ease-in-out;
  }
`;

const Name = styled.h3`
  & > div {
    inline-size: 75px;
    overflow-wrap: break-word;
  }
  
`

const Buttons = styled.div`
  color: ${(props) => (props.completed? "white" : "#4169e1")};
  cursor: pointer;
  font-size: 25px;
`

const Example = styled.div`
  overflow-wrap: break-word;
  color: ${(props) => (props.completed? "white" : "#4169e1")};
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
  background: white;
  color: #4169e1;
  border: 1px solid gray;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  &:hover {
    background: #4169e1;
    color: white;
    animation: ${joinAnimation} 0.2s linear alternate;
  }
`;

const Totop = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  padding-top: 10px;
  border-radius: 60px;
  font-size: 30px;
  cursor: pointer;
  background: white;
  color: #4169e1;
  border: 1px solid gray;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  &:hover {
    background: #4169e1;
    color: white;
    transition: 0.2s linear alternate
  }
`;

export default Main;
