import { createSlice } from '@reduxjs/toolkit'

//******* Declare your state variable here
const initialState={

  userData: {},
  // index: 0,
  // value: 1,
  // colors: [],
  // arr: [ '', '', '' ],

}

export const userSlice=createSlice( {
  name: 'userData',

  initialState,

  reducers: {
  
    setuserData: ( state, action ) => {
      state.userData=action.payload
    },



  },

} )


// Action creators are generated for each case reducer function
export const { setuserData, setArr, setColors, setIndex, setValue }=userSlice.actions

export default userSlice.reducer;