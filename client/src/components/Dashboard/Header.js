import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';
import Countdown from "react-countdown";
import Cookies from 'js-cookie';
import { useNavigate  } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setValue } from '../../redux/valueSlice';
import { setIndex } from '../../redux/indexSlice';
import { useLogoutUserMutation } from '../../services/nodeApi';
import jwt_decode from "jwt-decode";

const Header=() => {

  
  const [ logoutUser ]=useLogoutUserMutation();


  const { userData } = useSelector((state) => state.user);

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogout=async () => {

    // console.log( jwt_decode( Cookies.get( 'jwt' ) ) )
    const res=await logoutUser( { id: jwt_decode( Cookies.get( 'jwt' ) ).id } );

    Cookies.remove( 'jwt' );
    
    dispatch( setIndex( 0 ) );
    dispatch( setValue( 1 ) );
    localStorage.removeItem( 'persist:root' )



  }

  const Completionist=() => {

    setTimeout( () => {
      handleLogout();
      localStorage.removeItem( 'persist:root' )
      navigate( '/' );

    }, 1000 )
    return <span>
    로그아웃 중입니다  .....!</span>
  };

  return (


    <div className='header_main'>
      <span style={{fontWeight:'bold'}}>다시 오신 것을 환영합니다 , {userData.userId}</span>
      <span>
        <a className='header_main_text program_btn' ><SurroundSoundIcon fontSize='22' sx={{ marginTop: '8px' }} /> 프로그램</a>
        <a className='header_main_text'><AccessTimeIcon fontSize='15px' sx={{ marginTop: '8px' }} /> 남은 시간 : <span className='header_secondary_text'>
        <Countdown date={new Date(userData.endingTime)}>
          <Completionist />
        </Countdown>
      </span></a>

      <Link className='header_main_text logout_btn' onClick={handleLogout} to='/'><LogoutIcon fontSize='15px' sx={{ marginTop: '8px' }} /> 로그 아웃 </Link>
</span> 
    </div>

  )
}

export default Header