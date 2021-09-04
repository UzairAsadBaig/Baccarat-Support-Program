import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, InputNumber, Popconfirm, Table, Typography , Tooltip, message } from 'antd';
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateDurationMutation, useUpdatePasswordMutation } from '../../services/nodeApi';
import Countdown from "react-countdown";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { Spin } from 'antd';

import Highlighter from 'react-highlight-words';


export default function UsersTable() {

  const editRef = useRef(null);
  const refForm = useRef(null);

  const [ loading, setLoading ]=useState( false )

  const [ updatePassword ]=useUpdatePasswordMutation();
  const [ updateDuration ]=useUpdateDurationMutation();
  const [ deleteUser ]=useDeleteUserMutation();

  const [ searchText, setSearchText ]=useState( '' );
  const [ searchedColumn, setSearchedColumn ]=useState( '' );
  const searchInput=useRef( null );

  const handleSearch=( selectedKeys, confirm, dataIndex ) => {
    confirm();
    setSearchText( selectedKeys[ 0 ] );
    setSearchedColumn( dataIndex );
  };

  const handleReset=( clearFilters ) => {
    clearFilters();
    setSearchText( '' );
  };

  const getColumnSearchProps=( dataIndex ) => ( {
    filterDropdown: ( { setSelectedKeys, selectedKeys, confirm, clearFilters } ) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`사용자 검색`}
          value={selectedKeys[ 0 ]}
          onChange={( e ) => setSelectedKeys( e.target.value? [ e.target.value ]:[] )}
          onPressEnter={() => handleSearch( selectedKeys, confirm, dataIndex )}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch( selectedKeys, confirm, dataIndex )}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            
검색

          </Button>
          <Button
            onClick={() => clearFilters&&handleReset( clearFilters )}
            size="small"
            style={{
              width: 90,
            }}
          >
           
초기화

          </Button>



        </Space>
      </div>
    ),
    filterIcon: ( filtered ) => (
      <SearchOutlined
        style={{
          color: filtered? '#1890ff':undefined,
        }}
      />
    ),
    onFilter: ( value, record ) =>
      record[ dataIndex ].toString().toLowerCase().includes( value.toLowerCase() ),
    onFilterDropdownVisibleChange: ( visible ) => {
      if ( visible ) {
        setTimeout( () => searchInput.current?.select(), 100 );
      }
    },
    render: ( text ) =>
      searchedColumn===dataIndex? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[ searchText ]}
          autoEscape
          textToHighlight={text? text.toString():''}
        />
      ):(
        text
      ),
  } );











  const Completionist=() => {
    return <span>로그아웃</span>
  };


  const [ data, setData ]=useState( [] );
  const { data: users, error, isLoading }=useGetAllUsersQuery();



  const originData = [];



  !isLoading&&users.data.data.forEach( ( user, i ) => {



    originData.push( {
      key: user._id,
      no: i+1,
      userid: user.userId,
      password: "***********",
      mobileNumber: user.phone,
      timeRemaining: user.endingTime? ( user.endingTime ):0,


    } );

  } );




  useEffect( () => {
    setData( originData )
  }, [] )




const [PASSWORD, setPASSWORD] = useState('');

const handlePassChange = (e)=>{
  setPASSWORD(e.target.value)    

  if(e.target.value.includes('*****')){
    refForm.current.resetFields();

  }
}

const handlePassInputClick = (e) =>{
  if(e.target.value.includes('*****')){
    refForm.current.resetFields();

  }
}

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = <Input name='PASSWORD' ref={editRef} onClick={handlePassInputClick} value={PASSWORD} key="PASSWORD" autoFocus='autoFocus' onChange={handlePassChange}/>;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `비밀번호를 입력해주세요`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      password: '',
      mobileNumber: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData=[ ...data ];
      setLoading( true );
      const res = await updatePassword({
        id:key,
        password:PASSWORD
      } )


      if ( res.data.status==='success' ) {
        setLoading( false );
        message.success({
          content:`비밀번호가 성공적으로 업데이트되었습니다.`,
        })
      } else {
        setLoading( false );
        message.error("문제가 발생했습니다 다시 시도하십시오")
      }

      const index=newData.findIndex( ( item ) => key===item.key );

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
    }
  };



  const columns = [
    {
      key: 'no',
        title:'No.',
        dataIndex:'no',
        width:'5%',
        editable:false
    },

    {
      key: 'userid',
      title: '사용자 아이디',
      dataIndex: 'userid',
      width: '20%',
      editable: false,
      ...getColumnSearchProps( 'userid' )
    },
    {
      key: 'password',
      title: '비밀번호',
      dataIndex: 'password',
      width: '18%',
      editable: true,
    },
    {
      title: '휴대폰 번호',
      dataIndex: 'mobileNumber',
      width: '22%',
      editable: false,
    },
    {
        title:'남은 시간',
        dataIndex:'timeRemaining',
        width:'15%',
      editable: false,
      render: ( value ) => {
        return (
          <Countdown date={value}>
            <Completionist />
          </Countdown> )

      }
    },
    {
      title: '작업',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              저장
            </Typography.Link>
            <Popconfirm title="취소하시겠습니까" onConfirm={cancel}>
              <a>취소</a>
            </Popconfirm>
          </span>
        ) : (
            <>
            <Tooltip title="사용자 비밀번호 수정" placement='left'>
          <Typography.Link disabled={editingKey !== ''}  onClick={() => {
            edit(record)
            }}>
                  비번 변경
          </Typography.Link>
          </Tooltip>
          <Tooltip title='이 사용자에게 추가 시간 할당' placement='bottom'>
          <Popconfirm placement="top" title='이 사용자에게 24시간을 할당하시겠습니까' onConfirm={()=>confirm(record)} okText="Yes" cancelText="No">
          <Typography.Link style={{paddingLeft:'2rem'}}>
                    시간 추가</Typography.Link>

          </Popconfirm>
              </Tooltip>


              <Tooltip title='사용자 삭제' placement='bottom'>
                <Popconfirm placement="top" title='이 사용자를 삭제하시겠습니까?' onConfirm={() => confirmDelete( record )} okText="Yes" cancelText="No">
                  <Typography.Link style={{ paddingLeft: '2rem' }}>
                    ID 삭제</Typography.Link>

                </Popconfirm>
              </Tooltip>





            </>
        );
      },
    },
  ];

  const confirm=async ( record ) => {
    setLoading( true );
    const res = await updateDuration({
      id: record.key,
      })
    if ( res.data.status.includes( "successfully" ) ) {
      setLoading( false );
      message.success("이 사용자에게 24시간이 성공적으로 추가되었습니다")
    } else {
      setLoading( false );
      message.error("문제가 발생했습니다 다시 시도하십시오")
    }
  }
  const confirmDelete=async ( record ) => {
    setLoading( true );
    const res=await deleteUser( {
      id: record.key,
    } )



    if ( res.data.status==="success" ) {
      setLoading( false );
      message.success( "사용자가 성공적으로 삭제되었습니다" )
    } else {
      setLoading( false );
      message.error( "사용자를 찾을 수 없음" )
    }

  }

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'timeremaining' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),

    };

  } );

  const onFinish=( values ) => {
  }


  return (
    <>
      {!isLoading&&originData.length>0&&

        <Spin spinning={loading} >
          <div>

            <Form form={form} ref={refForm} onFinish={onFinish} component={false}>
              <Table
                style={{ marginTop: '1rem' }}
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={originData}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                  onChange: cancel,
                }}
              />
            </Form>
          </div>
        </Spin>

      }
    </>
  )
}
