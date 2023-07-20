import React from 'react'
import CommonForm, { MainTitle } from '../../PageComponent/CommonForm'
import { useRef } from 'react'
import { Col, Input, InputNumber, Row, Form, Select } from 'antd'

const AssignRoughForm = () => {
    const formRef = useRef()

    const onFinish = (value) => {
        console.log("🚀 ~ file: AddRoughForm.js:10 ~ onFinish ~ value:", value)

    }
    return (
        <CommonForm
            onFinish={onFinish}
            mainTitle={"Add Rough"}
            formRef={formRef}
        >
            <Row className="my-2">
                <Col span={12} className="p-2">
                <Form.Item
                        name="rough"
                        label="Rough"
                        rules={[{ required: true }]}
                    >
                    <Select
                        className="cursor-pointer w-full"
                        placeholder={`Select a Rough`}
                        options={[]}
                        showSearch
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    />

                    </Form.Item>
                </Col>
                <Col span={12} className="p-2">
                    <Form.Item
                        name="date"
                        label="Date"
                        rules={[{ required: true }]}
                    >
                        <Input type='date' className='w-full' placeholder="Enter Date" />
                    </Form.Item>
                </Col>
            </Row>
            <Row className="my-2">
                <Col span={12} className="p-2">
                    <Form.Item
                        name="workPlace"
                        label="Work Place"
                        rules={[{ required: true }]}
                    >
                        <Select
                            className="cursor-pointer w-full"
                            placeholder={`Select a Rough`}
                            options={[]}
                            showSearch
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={12} className="p-2">
                    <Form.Item
                        name="person"
                        label="Assign To Person"
                        rules={[{ required: true }]}
                    >
                        <Select
                            className="cursor-pointer w-full"
                            placeholder={`Select Employee Name`}
                            options={[]}
                            showSearch
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />
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
                        <InputNumber className='w-full' placeholder="Enter Carat" />
                    </Form.Item>
                </Col>
                <Col span={12} className="p-2 flex items-center">
                <div className='mx-2'>
                    <div>
                        Remaining Carat : 0.0000
                    </div>
                    <div>
                        Available Carat : 0.0000
                    </div>

                </div>
                </Col>
            </Row>

        </CommonForm>

    )
}

export default AssignRoughForm