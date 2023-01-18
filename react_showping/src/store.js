import { configureStore, createSlice } from '@reduxjs/toolkit';

let cart = createSlice({
  name: 'cart',
  initialState: [],

  reducers: {
    addcart(state, action) {
      alert('장바구니에 추가되었습니다');

      return [...state, action.payload].filter((item, i) => {
        return (
          [...state, action.payload].findIndex((item2, j) => {
            return item.itemid === item2.itemid;
          }) === i
        );
      });
    },

    count(state, action) {
      let index = state.findIndex((a) => {
        return a.itemid === action.payload.itemid;
      });

      if (action.payload.plma === 'ma') {
        if (state[index].itemstock < 2) {
          alert('최소갯수는 1개입니다.');
        } else {
          state[index].itemstock--;
        }
      } else {
        state[index].itemstock++;
      }
    },

    dele(state, action) {
      let index = state.findIndex((a) => {
        return a.itemid === action.payload.itemid;
      });
      console.log(index);
      return state.filter((a, i) => {
        return i !== index;
      });
    },
  },
});

export let { addcart, count, dele } = cart.actions;

export default configureStore({
  reducer: {
    cart: cart.reducer,
  },
});
