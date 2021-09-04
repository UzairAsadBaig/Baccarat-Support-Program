import React from 'react'
import {Row , Col} from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import './Admin.css'
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import { useNavigate  } from 'react-router-dom';
import UsersTable from './UsersTable';

export default function Admin() {
  const navigate = useNavigate();
  
  const handleLogout=() => {
    Cookies.remove( 'jwt' );

  }

const handleClick = ()=>{

  setTimeout( () => {
    handleLogout();
    navigate( '/' );
  
  }, 1000 )
}
return (
    <>

    <div className='admin_nav'>
    <span>바카라</span>
    <span> <a style={{color:'black'}}><PersonIcon fontSize='20px' sx={{marginRight:'5px'}}/>최고 관리자</a> <a onClick={handleClick} style={{paddingLeft:'2rem' , color:'black'}}><LogoutIcon fontSize='20px' sx={{marginRight:'5px'}}/>로그 아웃</a> </span>
    </div>
    <div style={{marginTop:'5rem' , marginLeft:'1rem' , marginBottom:'-1.5rem'}}>

    <Breadcrumb>
    <Breadcrumb.Item  >
      <HomeOutlined /> 관리자
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <UserOutlined /> 사용자
    </Breadcrumb.Item>
  </Breadcrumb>
  </div>

  <div style={{padding:'2rem'}}>
    <UsersTable/>
  </div>

    </>
  )
}
