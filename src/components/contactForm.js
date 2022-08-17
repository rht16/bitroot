import React, { useState, useEffect } from 'react';
import { Table, Button, message, Form, Input, Row, Col, Popconfirm } from 'antd';
import { CSVLink } from "react-csv";
import ContactsServices from '../services/contactsService';
import { useNavigate } from 'react-router-dom';
export default function ContactForm(mode) {
  const headers = [
    { label: "Name", key: "name" },
    { label: "Contact Number", key: "mobileNumber" },
  ];
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [phoneNumber, setPohneNumber] = useState('');
  const [type, setType] = useState('');
  const [data, setData] = useState();
  const [image, setImage ] = useState();
  const [loading, setLoading] = useState(false);

  const getDeepCopy = (obj) => JSON.parse(JSON.stringify(obj));

  const onCancle  = () => {
    navigate('/');
  }

  const onSubmitNewContactForm = async () => {
    try {
      if (name.length === 0) {
        message.warning('Enter the driver name');
        return;
      }

      if (phoneNumber.length !== 10) {
        message.warning('Enter a valid phone number of 10 digits');
        return;
      } 
      
      const driverDetails = new FormData();

      driverDetails.append('name', name);
      driverDetails.append('mobileNumber', phoneNumber);
      if (image) {
      driverDetails.append('image', image); 
      }

       await ContactsServices.add(driverDetails);
      message.success('Contact added successfully!');
      getAllContacts();
      setName();
      setPohneNumber();
    } catch (err) {
      message.error('Something went wrong', err);
    }
  };

  const onSubmitSearchContact = async () => {
    try {  
      let payload = {
        userName: name,
        mobileNumber: phoneNumber,
      };
      const res = await ContactsServices.getByNumber(payload);
      res && res.data && setData(...[res.data]);
      message.success('Contact fetched successfully!');
    } catch (err) {
      message.error('Something went wrong', err);
    }
  };

  const getAllContacts = async() => {
    try {
      setLoading(true);
      const res = await ContactsServices.getAll();
      res && res.data && res.data.length > 0 && setData(res.data);
      setLoading(false);
      message.success('Contact fetched successfully!');
    } catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    setType(mode.mode);
    setData()
    mode.mode === 'Add' && getAllContacts();
  }, [mode]);

  const onNameChange = (val, idx) => {
    const temp = getDeepCopy(data);
    temp[idx].editedName = val;
    temp[idx].edited = true;
    setData(temp);
  };

  const onNumberChange = (val, idx) =>{
    const temp = getDeepCopy(data);
    temp[idx].editedNumber = val;
    temp[idx].edited = true;
    setData(temp);
  };

  const updateHandler = (idx) => {
    const temp = getDeepCopy(data);
    temp[idx].editable = true;
    temp[idx].edited = false;
    temp[idx].editedName = temp[idx].name;
    temp[idx].editedNumber = temp[idx].mobileNumber;

    setData(temp);
  };



  const removeContact = async (_id) => {
    try {
      await ContactsServices.deleteOpenContact(_id);
      message.success('Removed contact');
      getAllContacts();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        message.warn(err.response.data.msg);
      } else {
        message.error('Something went wrong');
      }
    }
  };

  const saveHandler = async (idx) => {
    const temp = getDeepCopy(data);
    try {
      if (temp[idx].edited) {
      if (temp[idx]._id) {
        await ContactsServices.update({ name: temp[idx].editedName, mobileNumber: temp[idx].editedNumber, _id: temp[idx]._id});
      } else {
        await ContactsServices.add({ name: temp[idx].editedName, mobileNumber: temp[idx].editedNumber });
      }
      message.success('Updated successfully');
      getAllContacts();
      setData(temp);
    } else {
      temp[idx].edited = false;
      message.success('Updated successfully');
      getAllContacts();
    }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        message.warn(err.response.data.msg);
      } else if (err.response && err.response.status === 401) {
        message.error('User not authorised');
      } else {
        message.error('Something went wrong');
      }
    }
  };

  const cancelHandler = (idx) => {
    const temp = getDeepCopy(data);
    if (!temp[idx].name) {
      temp.splice(idx, 1);
    } else {
      temp[idx].editedName = temp[idx].name;
      temp[idx].editedNumber = temp[idx].mobileNumber;

      temp[idx].editable = false;
    }
    setData(temp);
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      render: (text, { editable, editedName }, idx) => {
        if (!editable) {
          return text;
        }
        return <Input value={editedName} width='200px' type="text" onChange={(e) => onNameChange(e.target.value, idx) } />;
      },
    },
    
    {
      title: 'Contact Number',
      dataIndex: 'mobileNumber',
      render: (text, { editable, editedNumber }, idx) => {
        if (!editable) {
          return text;
        }
        return <Input value={editedNumber} width='200px' type="number" onChange={(e) => onNumberChange(e.target.value, idx) } />;
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_text, { _id, editable }, idx) => {
        return (editable ?
          <>
            <Button type="link" onClick={() => saveHandler(idx)}>Save</Button>
            <Button type="link" onClick={() => cancelHandler(idx)}>Cancel</Button>
          </>
          :
          <>
            <Button type="link" onClick={() => updateHandler(idx)}>Update</Button>
            <Popconfirm
              placement="top"
              title="Are you sure to delete this contact?"
              onConfirm={() => removeContact(_id)}
              okText="Delete"
              cancelText="Cancel"
              style={{backgroundColor: '#FF0000'}}
              // onCancel={cancel}
            >
              <Button type="link">Remove</Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <div>
    <Form css={{ width: '300px' }}>
      <Row >
        <Col >
          <Input rows={3} 
            allowClear
            
            value={name}
            onBlur={e => setName(e.target.value.trim())}
            onChange={e => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Enter Name"
          />
          <Input rows={3} 
            allowClear
            value={phoneNumber}
            onBlur={e => setPohneNumber(e.target.value.trim())}
            onChange={e => setPohneNumber(e.target.value)}
            type="text"
            placeholder="Enter Phone Number"
          />
          <Input 
                      id="image" 
                      name="image" 
                      type="file"
                      accept=".gif,.png,.jpg,.jpeg"
                      onChange={
                        (e) => {
                          setImage(e.currentTarget.files[0]);
                        }
                      } /> 
        </Col>
        <Col>
          <Row>
            <Col span={12} >
              <Button 
              
                shape="round"
                onClick={() => {
                  onCancle();
                }}>Cancel</Button>
            </Col>
            <Col span={12} >
              {type === 'Add' ?
              <Button type="primary" shape="round"  onClick={() => onSubmitNewContactForm()}  >
                Submit
              </Button> : <Button type="primary" shape="round"  onClick={() => onSubmitSearchContact()}  >
                Search
              </Button>
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
    <Table loading={loading} dataSource={data} columns={columns} pagination={false} />
    {data && data.length > 0 && 
    <CSVLink data={data} filename={"contacts.csv"} headers={headers}>Export Contacts</CSVLink>
    }
    </div>
  );
};
