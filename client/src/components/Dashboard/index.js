import React from 'react'
import Header from './Header'
import MainBox from './MainBox'
import './Dashboard.css'
import Footer from './../Footer/Footer'

const Dashboard=() => {
  return (
    <>
      <Header />
      <MainBox />
      <div>
        <Footer />
      </div>
    </>

  )
}

export default Dashboard