import { createSlice } from '@reduxjs/toolkit'

//******* Declare your state variable here
const initialState={

  index: 0,

  // colors: [],
  // arr: [ '', '', '' ],

}

export const indexSlice=createSlice( {
  name: 'value',

  initialState,

  reducers: {



    setIndex: ( state, action ) => {
      state.index=action.payload
    },


  },

} )


// Action creators are generated for each case reducer function
export const { setIndex }=indexSlice.actions

export default indexSlice.reducer;