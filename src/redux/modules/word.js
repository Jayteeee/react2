// word.js

// Actions
const CREATE = 'card/CREATE';
// const UPDATE = 'card/UPDATE';

const initialState = {
    list: [
        {
          word: "항해99",
          definition: "99일간의 여정",
          example: "항해99에 올라타보자",
          password: "0000",
          completed: false
        },
    ],

};

// Action Creators
export function createCard(card) {
  return { type: CREATE, card:card };
}

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
      case "card/CREATE": {
        const new_card_list = [...state.list, action.card];
        return {list: new_card_list};
      }

      default:
        return state;
    }
  }