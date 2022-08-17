import React, { useState, useEffect } from 'react';
import { Drawer, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import ContactForm from './contactForm';
export default function Home() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState();

  const handleCancel = () => {
    setVisible(false);
  };



  const showHandler = (e) => {
    // navigate('/add-contact');
    setMode(e);
    setVisible(true);
  }

  const onUpdate = () => {
    // getVehicleInfo(vehicleCode);
    // getDriverInfo(driverCode);
    // onClose();
    // onSave();
  };

  const onClose = () => {
    setVisible(false);
    // setUploadMode(false);
  };

  const searchHandler = () => {
console.log('vjbknlsdfs')
  }

  return (
    <>
    <Button onClick={ () => showHandler('Add')}>Add</Button>
    <Button onClick={ () => showHandler('Search')}>Search Contact</Button>
    {
      visible &&
      <ContactForm mode={mode}/>
    }
    </>
  )
};
