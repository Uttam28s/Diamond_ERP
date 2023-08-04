import { Col, DatePicker, Form, Input, InputNumber, Row, message } from 'antd'
import React from 'react'
import CommonForm, { MainTitle } from '../../PageComponent/CommonForm'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import moment from 'moment'
import { useAddRoughMutation } from '../../service/roughServices'

const AddRoughForm = () => {
    const formRef = useRef()
    const [addRough] = useAddRoughMutation()
    const [totalAmount, setTotalAmount] = useState(0)
    const [carat, setCarat] = useState(0)
    const [amount, setAmount] = useState(0)
    const [purchaseDate, setPurchaseDate] = useState(null)
    const [days, setDays] = useState(0)

    useEffect(() => {
        setTotalAmount(carat * amount)
    }, [carat, amount])

    const onFinish = (values) => {
        let lastDate = new Date(moment(purchaseDate, "DD-MM-YYYY").add(days, "days"))
        let data = {
            ...values,
            date: purchaseDate,
            lastdate:lastDate,
            officecarat: 0,
            factorycarat: 0,
          };
        addRough({ data : data }).then((res) => {
            if(!res?.error){
                message.success("Rough Added SuccessFully")
            }else{
                message.success("Something Went Wrong")
            }
        })
    }

    return (
        <CommonForm
            onFinish={onFinish}
            mainTitle={"Add Rough"}
            formRef={formRef}
        >
            <h5 className="h5-form-label my-2">
                Rough Id : <span style={{ color: "#0F61FD" }}>#RID001</span>
            </h5>
            <Row className="my-2">
                <Col span={12} className="p-2">
                    <Form.Item
                        name="sellername"
                        label="Seller Name"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Enter Seller Name" />
                    </Form.Item>
                </Col>
                <Col span={12} className="p-2">
                    <Form.Item
                        name="brokername"
                        label="Broker Name"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Enter Broker Name" />
                    </Form.Item>
                </Col>
            </Row>
            <Row className="my-2">
                <Col span={12} className="p-2">
                    <Form.Item
                        name="carat"
                        label="Carat"
                        rules={[{ required: true }]}
                    >
                        <InputNumber onChange={(value) => setCarat(value)} className='w-full' placeholder="Enter Carat" />
                    </Form.Item>
                </Col>
                <Col span={12} className="p-2">
                    <Form.Item
                        name="rate"
                        label="Rate"
                        rules={[{ required: true }]}
                    >
                        <InputNumber onChange={(value) => setAmount(value)} className='w-full' placeholder="Enter Amount" />
                    </Form.Item>
                </Col>
            </Row>
            <Row className="my-2">
                <Col span={12} className="p-2">
                    <Form.Item
                        name="purchaseDate"
                        label="Purchase Date"
                        rules={[{ required: true }]}
                    >
                        <DatePicker onChange={(value, dateString) => setPurchaseDate(dateString)} className='w-full' placeholder="Enter Purchase Date" />
                    </Form.Item>
                </Col>
                <Col span={12} className="p-2">
                    <Form.Item
                        name="days"
                        label="Payment Days"
                        rules={[{ required: true }]}
                    >
                        <InputNumber onChange={(value) => setDays(value)} className='w-full' placeholder="Enter Payment Days" />
                    </Form.Item>
                </Col>
            </Row>
            <Row className='flex justify-between items-center px-2'>
                <Col span={12}>
                    Total Amount : <span className='text-green-700 font-semibold mx-0.5'>{totalAmount.toFixed(2)} /-</span>
                </Col>
                <Col span={12}>
                    Due Date : <span className='text-red-700 font-semibold mx-0.5'> {purchaseDate !== null
                        ? moment(purchaseDate, "DD-MM-YYYY")
                            .add(days, "days")
                            .format("DD-MM-YYYY")
                        : "00-00-0000"}</span>
                </Col>

            </Row>
        </CommonForm>

    )
}

export default AddRoughForm    