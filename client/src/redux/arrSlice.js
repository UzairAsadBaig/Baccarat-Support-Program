import { createSlice } from '@reduxjs/toolkit'

//******* Declare your state variable here
const initialState={

  // index: 0,
  // value: 1,
  // colors: [],
  arr: [ '', '', '' ],

}

export const arrSlice=createSlice( {
  name: 'arr',

  initialState,

  reducers: {



    setArr: ( state, action ) => {
      state.arr=action.payload
    },

  },

} )


// Action creators are generated for each case reducer function
export const { setArr }=arrSlice.actions

export default arrSlice.reducer;