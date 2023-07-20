import { Form, Input, message } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAdminSignUpMutation } from '../../service/adminService';
import PrimaryButton from '../../Component/Button';
import { routes } from '../../routes/route';

const SignUpComponent = () => {
    const [adminSignUp] = useAdminSignUpMutation()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onFinish = (values) => {
        setLoading(true)
        adminSignUp({ data: values }).then(res => {
            if (!res.error) {
                setLoading(false)
                message.success('SignUp Successfully..')
                navigate(routes.homePage)
            } else {
                setLoading(false)
                message.error(res?.error?.data?.message || "Something Went Wrong")
            }
        })
    }

    return (
        <>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                layout="vertical"
                requiredMark={false}
                onFinish={onFinish}
                autoComplete="off"
            >
                <div className="flex flex-col justify-center items-center">
                    <Form.Item
                        className="font-semibold text-lg my-2"
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your name..",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter your Name.."
                            className="w-96 rounded border-1 border-slate-950"
                        />
                    </Form.Item>
                    <Form.Item
                        className="font-semibold text-lg my-2"
                        name="username"
                        label="User Name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your user-name..",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter your User-name.."
                            className="w-96 rounded border-1 border-slate-950"
                        />
                    </Form.Item>
                    <Form.Item
                        className="font-semibold text-lg my-2"
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password..",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter your Password"
                            className="w-96 rounded border-1 border-slate-950"
                        />
                    </Form.Item>
                    <Form.Item>
                        <PrimaryButton
                            disabled={loading}
                            className="mt-7"
                            loading={loading}
                            htmlType="submit"
                            // type="primary" 
                            title="SignUp"
                        />
                    </Form.Item>
                </div>
            </Form>

        </>
    )
}

export default SignUpComponent
