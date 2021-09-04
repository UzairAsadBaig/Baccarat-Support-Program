import React, { useState , useEffect} from 'react'
import { Button , Modal , Select} from 'antd';
import { Col, Row } from 'antd';
import SettingsIcon from '@mui/icons-material/Settings';
import { useGetPatternMutation } from '../../services/nodeApi';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setValue } from '../../redux/valueSlice';
import { setIndex } from '../../redux/indexSlice';
import { setArr } from '../../redux/arrSlice';
import { setColors } from '../../redux/colorSlice';
import { Spin } from 'antd';



const MainBox = () => {

  const [ loading, setLoading ]=useState( false );

  const [ amount, setAmount ]=useState( null );
  const [ level, setLevel ]=useState( null );

  const { Option } = Select;
  const dispatch=useDispatch();

  const [ isModalVisible, setIsModalVisible ]=useState( false );

  const [ arrr, setArrr ]=useState( [] )



  const { value }=useSelector( ( state ) => state.val );
  const { index }=useSelector( ( state ) => state.ind );
  const { arr }=useSelector( ( state ) => state.arr );
  const { colors }=useSelector( ( state ) => state.col );

  const [ getPattern ]=useGetPatternMutation()

  // const [ index, setIndex ]=useState( 0 );
  // const [ value2, setValue2 ]=useState( 1 );
  // const [ colors, setColors ]=useState( [] );



  const randomColors=() => {
    let arr=[ ...colors ];
    for ( let i=index; i<66; i++ ) {
      let rand=Math.floor( Math.random()*10 );
      if ( rand%2===0 ) {
        arr[ i ]='red'
      } else {
        arr[ i ]='blue'
      }
    };
    dispatch( setColors( arr ) );  
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk=async () => {
    setIsModalVisible( false );
    setLoading( true );
    const res=await getPattern( { selAmount: amount, selLevel: level } );
    setLoading( false );
    dispatch( setArr( res.data.data ) );
    setArrr(res.data.data);
    dispatch( setValue( 1 ) )
    dispatch( setIndex( 0 ) );
    randomColors();
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchPattern = async ()=>{
      if ( amount===null&&level===null ) {

        setLoading( true );
        const res=await getPattern( { selAmount: '1000', selLevel: '8' } );
        setLoading( false );
        setAmount( 1000 );
        setLevel( 8 );
        dispatch( setValue( 1 ) );
        // console.log(">>>>>>>>>>>>>>>>>>>>>",res.data.data);
        dispatch( setArr( res.data.data ) );
        setArrr( res.data.data )
        randomColors();

      }
    }
    fetchPattern();
  }, [ amount, level ] )
  

  const handleAmountChange = (value) => {
    setAmount( value );
  };
  

  const handleLevelChange = (value) => {
    setLevel( value );
  };
  
  const handleReset=() => {
    randomColors();
  }




 //This is not being used for arrow up and down and anymore as the client changed his logic 
  const changeCourseValue=( condition ) => {
    if ( condition==='up' ) {
      if ( index+1<66 ) {
        dispatch( setValue( ( value+1 )%level ) ) 
        dispatch( setIndex( index+1 ) )
      } 
    } else {
      if ( index>0 ) {
        dispatch( setValue( ( arrr.slice( 0, level ).indexOf( arr[ index-1 ] ) )+1 ) )
        dispatch( setIndex( index-1 ) );
      }
    }

  }


  //This is used for arrow up as client wanted the same logic as Tie
  const handleUpArrow=() => {
    if ( index<66 ) {
      dispatch( setArr( [ ...( arr.slice( 0, index+1 ) ), ...( arr.slice( index ) ) ] ) )
      dispatch( setIndex( index+1 ) )
    }
  }

  //This is used for arrow down as client wanted the same logic as Tie but reversed
  const handleDownArrow=() => {
    if ( index>0 ) {
      const diff=arrr.length-arr.length;

      if ( diff>0 )
        dispatch( setArr( [ ...( arr.slice( 0, index-1 ) ), arr[ index ], ...( arr.slice( index+1 ) ), ...arrr ] ) )
      else
        dispatch( setArr( [ ...( arr.slice( 0, index-1 ) ), arr[ index ], ...( arr.slice( index+1 ) ) ] ) )
      console.log( arr.length )
      dispatch( setIndex( index-1 ) )
    }
  }



  const initializeGame=()=>{
    dispatch( setValue( 1 ) )
    dispatch(setIndex(0));
    setAmount( null );
    setLevel( null )
  }


  const handleWin=() => {
    if ( index+1===66 ) {

      dispatch( setValue( 1 ) )
      dispatch( setIndex( 0 ) );
      // randomColors();

    }else{
      // console.log([...(arr.slice(0,index+1)),...(arrr.slice(0,arrr.length-index))]);
      dispatch( setArr( [ ...( arr.slice( 0, index+1 ) ), ...( arrr.slice( 0, arrr.length-index ) ) ] ) );

      dispatch( setIndex( index+1 ) )
      dispatch( setValue( 1 ) )   
    }
  }

  const handleLose=() => {
    if ( index+1===66 ) {

      dispatch( setValue( 1 ) )
      dispatch( setIndex( 0 ) );
      // randomColors();
    }else{
      dispatch( setValue( ( arrr.slice( 0, level ).indexOf( arr[ index+1 ] ) )+1 ) )
      dispatch( setIndex( index+1 ) )

    }
  }

  const handleTie=() => {
    if ( index+1===66 ) {

      dispatch( setValue( 1 ) )
      dispatch( setIndex( 0 ) );

    }else{
      dispatch( setArr( [ ...( arr.slice( 0, index+1 ) ), ...( arr.slice( index ) ) ] ) )
      dispatch( setIndex( index+1 ) )
    }
  }



  const handleNewGame=async () => {
    setLoading( true )
    const res=await getPattern( { selAmount: amount, selLevel: level } );
    setLoading( false );
    dispatch( setIndex( 0 ) );
    dispatch( setValue( 1 ) );
    dispatch( setArr( res.data.data ) );
    setArrr( res.data.data )
    // randomColors();

  }

  const handleBack=() => {
    changeCourseValue( 'down' );
  }

  return (
    <><Spin spinning={loading} delay={500}>

      <div className='main_box'>
        <div className='amount_box'>
          <div className={`course_no course_${colors[ index ]}`}>{value==0? level:value}</div>
          <div className={`amount bet_amount_${colors[ index ]}`}>{arr.length>3? arr[ index ].toLocaleString():0}</div>
        </div>


        <Row justify="space-between" style={{ marginTop: "40px", textAlign: 'center' }}>
          <Col span={8} style={{ paddingRight: '3rem' }}> <Button type="primary" className='box_btn win_btn' disabled={arr.length<4} onClick={handleWin}>승</Button> </Col>
          <Col span={8}> <Button type="primary" className='box_btn tie_btn' disabled={arr.length<4} onClick={handleTie}>무</Button> </Col>
          <Col span={8} style={{ paddingLeft: '3rem' }}> <Button type="primary" className='box_btn loose_btn' disabled={arr.length<4} onClick={handleLose}>패</Button> </Col>
        </Row>



        <Row justify="space-between" style={{ marginTop: "30px", textAlign: 'center' }}>
          <Col span={6}> <Button className='box_btn2 ' disabled={arr.length<=3} onClick={handleNewGame}>새 게임</Button> </Col>
          <Col span={6}> <Button className='box_btn2 ' onClick={handleBack} disabled={arr.length<=3||( index===0 )}>BACK</Button> </Col>
          <Col span={6}> <Button className='box_btn2 ' disabled={arr.length<=3} onClick={handleReset}>리셋</Button> </Col>
          <Col span={6}> <Button className='box_btn2 setting_btn' onClick={showModal}><SettingsIcon sx={{ marginTop: '2px', fontSize: '23px', fontWeight: 'bold' }} /></Button> </Col>
        </Row>


        <Modal className='setting_modal' closable={false} width={350} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <div style={{ textAlign: 'center', padding: '1rem' }}>설정 금액</div>
          <div style={{ textAlign: 'center' }}>
            <Select
              defaultValue=""
              style={{
                width: 180,
                border: '2px solid blue',
                borderRadius: '4px',
              }}
              onChange={handleAmountChange}
            >
              <Option value="1000">1000</Option>
              <Option value="2000">2000</Option>
              <Option value="3000">3000</Option>
              <Option value="30009"  disabled={level==='8'|| level==='10'}>3000-9</Option>
            </Select>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem' }}>설정 레벨</div>
          <div style={{ textAlign: 'center' }}>
            <Select
              defaultValue=""
              style={{
                width: 180,
                border: '2px solid blue',
                borderRadius: '4px',
              }}
              onChange={handleLevelChange}
            >
              <Option value="8" disabled={amount==='30009'}>단계 8</Option>
              <Option value="9">단계 9</Option>
              <Option value="10" disabled={amount==='30009'}>단계 10</Option>
            </Select>
          </div>

        </Modal>



        <Row justify="center" style={{ marginTop: "30px" }}>
          <Col span={6} style={{ textAlign: 'right', marginTop: '10px', marginRight: 20 }}>
            <Button className='arrows' disabled={arr.length<4} onClick={() => { handleUpArrow(); }}>UP</Button></Col>
          <Col span={6}> <div className='course_inputBox'>#<span>{index+1}</span></div> </Col>
          <Col span={6} style={{ marginTop: '10px', marginLeft: 20 }}>

            <Button onClick={() => { handleDownArrow(); }} className='arrows' disabled={arr.length<4}>DOWN</Button> </Col>
        </Row>


        <Row justify="space-between" style={{ marginTop: "30px", textAlign: 'center' }}>
          <Col span={8}>
            <div className={`courses course_${index-1<0? '':colors[ index-1 ]}`} style={{ opacity: 0.6, height: '60px', width: '60px', fontSize: '18px', marginTop: '20px' }}><span>{index-1<0? '':`#${index}`}</span></div>
            <div className={`bet_amount bet_amount_${index-1<0? '':colors[ index-1 ]}`} style={{ opacity: 0.6, fontSize: '15px' }}>{index-1<0? `${index-1>=0? arr[ 0 ]:''}`:arr[ index-1 ].toLocaleString()}</div>
          </Col>
          <Col span={8}>
            <div className={`courses course_${colors[ index ]}`}> #<span>{index+1}</span></div>
            <div className={`bet_amount bet_amount_${colors[ index ]}`}>{arr[ index ].toLocaleString()}</div>
          </Col>

          <Col span={8}>
            <div className={`courses course_${index+1!==66? colors[ index+1 ]:""}`} style={{ opacity: 0.6, height: '60px', width: '60px', fontSize: '18px', marginTop: '20px' }}> #<span>{index+2}</span></div>
            <div className={`bet_amount bet_amount_${index+1!==66? colors[ index+1 ]:""}`} style={{ opacity: 0.6, fontSize: '15px' }}>{index+1!==66? arr[ index+1 ].toLocaleString():''}</div>
          </Col>

        </Row>








      </div>
    </Spin></>

  )
}

export default MainBox