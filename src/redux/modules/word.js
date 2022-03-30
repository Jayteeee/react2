// word.js
import {db} from "../../firebase"
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"

// Actions
const LOAD = 'card/LOAD';
const CREATE = 'card/CREATE';
const UPDATE = 'card/UPDATE';
const EDIT = 'card/EDIT'
const DELETE = 'card/DELETE';


const initialState = {
    list: [],

};

// Action Creators
export function loadCard(card_list){
  return { type: LOAD, card_list};
}

export function createCard(card) {
  return { type: CREATE, card:card };
}

export function updateCard(card_index) {
  return { type: UPDATE, card_index};
}

export function editCard(card) {
  return {type: EDIT, card};
}

export function deleteCard(card_index) {
  return {type: DELETE, card_index};
}

// middlewares
export const loadCardFB = () => {
  return async function (dispatch) {
    const card_data = await getDocs(collection(db, "card"));

    let card_list = [];
    card_data.forEach((card) => {
      card_list.push({id:card.id, ...card.data()})
    });
    dispatch(loadCard(card_list));
  }

}

export const addCardFB = (card) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "card"), card);
    const card_data = { id:docRef.id, ...card };

    dispatch(createCard(card_data))
  }
}

export const updateCardFB = (card) => {
  return async function (dispatch, getState) {
      const docRef = doc(db, "card", card.id);
      console.log(card)
      // await updateDoc(docRef, {completed: true? false : true} ); 원래 했었던 코드, 삼항연산자 적용이 안됨. 한번만 딱 바뀜 이후에 안됨
      // dispatch로 불러오는 값도 바꿔줌. 원래는 id만 들어왔음. 
      await updateDoc(docRef, {completed: !card.completed} );

      const _card_list = getState().word.list;
      
      const card_index = _card_list.findIndex((c) => {
        return c.id === card.id;
      })
      dispatch(updateCard(card_index))
  } 
};

export const editCardFB = (card) => {
  return async function (dispatch, getState) {
      const docRef = doc(db, "card", card.id );
      await updateDoc(docRef, {
        word: card.word,
        definition: card.definition,
        example: card.example,
        password: card.password,
      } );

      const _card_list = getState().word.list;
      
      const card_index = _card_list.findIndex((c) => {
        return c.id === card.id;
      })
      dispatch(editCard(card_index))
  }
};

export const deleteCardFB = (card_id) => {
  return async function (dispatch, getState) {
    if(!card_id){
      window.alert("아이디가 없네요!");
      return;
    }
    const docRef = doc(db, "card", card_id);
    await deleteDoc(docRef);
    

      const _card_list = getState().word.list;
      const card_index = _card_list.findIndex((c) => {
        return c.id === card_id;
      });

      dispatch(deleteCard(card_index));
  }
};

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
      case "card/LOAD": {
        const list_sorted = action.card_list.sort((a,b) => {
          return a.time - b.time;
        });
        return {list: list_sorted}
      }
      case "card/CREATE": {
        const new_card_list = [...state.list, action.card];
        
        return {list: new_card_list};
      }

      case "card/UPDATE": {
        const new_card_list = state.list.map((l, idx) => {
          if (parseInt(action.card_index) === idx) {
            return { ...l, completed: !l.completed};
          } else {
            return l;
          }
        });
        return {list: new_card_list}
      }

      case "card/EDIT": {

        const edit_card_list = state.list.map((l, idx) => {
          if (parseInt(action.card_index) === idx) {
            return l
          } else {
            return l
          }
        })
        return {list: edit_card_list}
      }

      case "card/DELETE": {
        const new_card_list = state.list.filter((l,idx) => {
          return parseInt(action.card_index)!== idx;
        });

        return {list: new_card_list}
      }

      default:
        return state;
    }
  }