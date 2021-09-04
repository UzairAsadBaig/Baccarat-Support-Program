import { createSlice } from '@reduxjs/toolkit'

//******* Declare your state variable here
const initialState={

  // index: 0,
  value: 1,
  // colors: [],
  // arr: [ '', '', '' ],

}

export const valueSlice=createSlice( {
  name: 'value',

  initialState,

  reducers: {

    setuserData: ( state, action ) => {
      state.userData=action.payload
    },

    setIndex: ( state, action ) => {
      state.index=action.payload
    },

    setValue: ( state, action ) => {
      state.value=action.payload
    },

    setColors: ( state, action ) => {
      state.colors=action.payload
    },

    setArr: ( state, action ) => {
      state.arr=action.payload
    },

  },

} )


// Action creators are generated for each case reducer function
export const { setArr, setColors, setIndex, setValue }=valueSlice.actions

export default valueSlice.reducer;