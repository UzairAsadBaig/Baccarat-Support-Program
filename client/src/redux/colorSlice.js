import { createSlice } from '@reduxjs/toolkit'

//******* Declare your state variable here
const initialState={

  // index: 0,
  // value: 1,
  colors: [],
  // arr: [ '', '', '' ],

}

export const colorSlice=createSlice( {
  name: 'col',

  initialState,

  reducers: {



    setColors: ( state, action ) => {
      state.colors=action.payload
    },


  },

} )


// Action creators are generated for each case reducer function
export const { setColors }=colorSlice.actions

export default colorSlice.reducer;