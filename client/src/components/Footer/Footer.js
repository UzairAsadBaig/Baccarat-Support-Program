import React from 'react'
import './Footer.css'
function Footer() {
  return (
    <footer className='footer'>

      <div className='footer_main'>
        Copyright © 2022. Designed and Developed By <img src={require( './../../Simple Logo.png' )} className="logo"></img>
        <a className='devfum' href='https://devfum.com' target='_blank' rel='noopener noreferrer'> DevFUM </a>
      </div>

    </footer>
  )
}

export default Footer