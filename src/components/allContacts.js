// import React, { useState, useEffect, useCallback } from 'react';
// import { Row, Col, message, Icon, Input, Select } from 'antd';
// // import AdditionalChargesServices from '../../services/AdditionalCharges';
// // import CompanyServices from '../../services/Company';
// const { Option } = Select;

// export default function AdditionalChargesCard({ index, handleDelete, handleChange, data, currentBill }){
//   const [additionalCharges, setadditionalCharges] = useState([]);
//   const [enableAdditionalCharges, setenableAdditionalCharges] = useState(false);

//   const fetchShipperCompany = useCallback(async () =>{
//     let res = await CompanyServices.getCompanyDetails(currentBill.shipper.company);
//     setenableAdditionalCharges(res.data.enableAdditionalCharges);
//   }, []);

//   const fetchAdditionalCharges = useCallback(async () => {
//     try {
//       const { data } = await AdditionalChargesServices.get(currentBill.shipper.company);
//       setadditionalCharges(data);
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.msg) {
//         message.warn(err.response.data.msg);
//       } else if (err.response && err.response.status === 401) {
//         message.error('User not authorised');
//       } else {
//         message.error('Something went wrong');
//       }
//     }
//   }, []);

//   useEffect(() => {
//     fetchShipperCompany();
//   }, [fetchShipperCompany]);

//   useEffect(() => {
//     if (enableAdditionalCharges){
//       fetchAdditionalCharges();
//     }
//   }, [enableAdditionalCharges, fetchAdditionalCharges]);

//   const handleDropDownChange = function (e){
//     let tempData = additionalCharges.find((obj) => obj.name === e);
//     handleChange('reason', e, index); 
//     handleChange('charges', tempData.amount, index);
//   };
//   return (
//     <div>
//       <Row>
//         <Col span={22}>
//           <div style={{ border: '1px dashed #c9c5c5', padding: '20px', margin: '10px', borderRadius: '5px' }}>
//             <Row>
//               <Row>
//                 Reason for additional charge:
//               </Row>
//               {!enableAdditionalCharges ?
//                 <Row style={{ border: '1px solid #dbd7d7', borderRadius: '50px', width: '70%' }}>

//                   <Input style={{ width: '100%', border: 'none' }} placeholder = 'Please enter the reason' name = 'reason' onChange={(e)=>{
//                     handleChange(e.target.name, e.target.value, index); 
//                   }}
//                   value={data.reason} />

//                 </Row> :
//                 <Col span={24}>
//                   <Select
//                     placeholder='Select reason'
//                     style={{ width: '100%' }}
//                     onChange={(e)=>{
//                       handleDropDownChange(e); 
//                     }}
//                   >
                    
//                     {
//                       additionalCharges.map((charge) => {
//                         return <Option value={charge.name}>{charge.name}</Option>;
//                       })
                      
//                     }
//                   </Select>
//                 </Col>   
//               }
//             </Row>
//             <Row>
//               <Row>
//                 Charge:
//               </Row>
//               <Row style={{ border: '1px #dbd7d7', width: '70%', borderRadius: '50px', overflow: 'hidden' }}>
//                 <Input
//                   type="number"
//                   allowClear
//                   name='charges'
//                   onChange={(e)=>{
//                     handleChange(e.target.name, e.target.value, index);
//                   }}
//                   value={data.charges}
//                   addonBefore="₹"
//                   min={0}
//                   placeholder="Please enter the charge"
//                 />
//               </Row> 
//             </Row>
//             <Row>
//               <Col span={12}>
//                 Supporting Documents:
//               </Col>
//               <Col>
//                 <Input
//                   type="file"
//                   multiple
//                   accepts=".png,.jpg,.jpeg,.pdf"
//                   name = 'images'
//                   onChange={(e)=>{
//                     handleChange(e.target.name, Array.from(e.currentTarget.files), index);
//                   }}
//                 />
//               </Col>
//             </Row>
//           </div>
//         </Col>
//         <Col span={2} style={{ padding: '10px' }}>
//           <Icon type='delete' style={{ color: 'red' }} onClick={()=>handleDelete(index)}/>
//         </Col>
//       </Row>
      
//     </div>);
// }