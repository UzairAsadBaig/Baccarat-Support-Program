import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Signup.css'
import { Col, Row } from 'antd';
import { Button, Form, Input , message } from 'antd';
import { Link } from "react-router-dom";
import { useSignupMutation } from '../../services/nodeApi';
export default function Signup() {

  const [ loading, setLoading ]=useState( false )

  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  const onFinish=async( values ) => {

    try {

      setLoading( true );
    const res = await signup(
      {
        userId: values.userid,
        password: values.password,
        phone: values.phoneNo

      }
    );
      if ( res.data?.status==='success' ) {
        setLoading( false );
      message.success("Signed up succesfully!")

      setTimeout( () => {
        navigate( '/login' );
      }, 2000 )
    }
    else if(res.error.data.message.includes('Password must be of atleast 8 characters long')){
        setLoading( false );
        message.error( "Password must be of atleast 8 characters long" )
    }
    } catch ( err ) {
      setLoading( false )
  }
  };

  const onFinishFailed=( errorInfo ) => {
  };
  return (
    <div className='main'>

      <Row>
        <Col className="gutter-row" span={12}>
          <div style={{ backgroundColor: 'black', height: "100vh" }}>
            <img className='signup_img' src={require( './../../signup.png' )} alt="svg" />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div className='signup_form'>
            <p style={{ textAlign: 'center', color: 'rgb(228 179 3)', fontSize: '3rem', marginBottom: 0 }}>
            AI 데이터베이스
            </p>
            <p style={{ textAlign: 'center', fontSize: '1.6rem', marginBottom: 15, fontWeight: 'bold' }}>가입하기</p>



            <Form
              name="basic"

              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="userid"
                rules={[
                  {
                    required: true,
                    message: '사용자 ID를 입력하세요.',

                  },
                ]}
              >
                <Input placeholder='사용자 아이디 입력' />
              </Form.Item>

              <Form.Item

                name="password"
                rules={[
                  {
                    required: true,
                    message: '비밀번호를 입력해주세요',
                  },
                ]}
              >
                <Input.Password placeholder='비밀번호 생성' />
              </Form.Item>

              <Form.Item
                name="phoneNo"
                rules={[
                  {
                    required: true,
                    message: '휴대폰 번호를 입력해주세요',
                  },
                ]}
              >
                <Input placeholder='휴대폰 번호 입력' />



              </Form.Item>

              <Form.Item style={{ textAlign: 'center' }}>
                <Button htmlType="submit" style={{ paddingLeft: '4rem', paddingRight: '4rem', color: 'white', backgroundColor: 'rgb(228 179 3)' }} loading={loading}>
                  가입하기
                  </Button>
              </Form.Item>
            </Form>

            <div style={{ textAlign: 'center' }}>
              <Link to='/' className='login_link'>이미 계정이 있습니까? 로그인</Link>
            </div>

          </div>
        </Col>

      </Row>

    </div>
  )
}
