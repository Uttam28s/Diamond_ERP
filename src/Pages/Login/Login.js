import { Form, Input, message } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAdminLoginMutation } from '../../service/adminService';
import PrimaryButton from '../../Component/Button';
import { routes } from '../../routes/route';
import SignUpComponent from './SignUp';
import SplashScreen from './SplashScreen';
import { useEffect } from 'react';
const Login = () => {
    const [adminLogin] = useAdminLoginMutation()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [signUp, setSignUp] = useState(false)
    const [splash, setSplash] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setSplash(false)
        }, 2000);
    }, [splash])

    const onFinish = (values) => {
        setLoading(true)
        adminLogin({ data: values }).then(res => {
            if (!res.error) {
                setLoading(false)
                message.success('Login Successfully..')
                navigate(routes.homePage)
            } else {
                setLoading(false)
                message.error(res?.error?.data?.message || "Something Went Wrong")
            }
        })
    }

    return (
        <>
            {
                splash
                    ? <SplashScreen />
                    : <div className="bg-slate-300 flex justify-center items-center p-10 h-screen">
                        <div className="bg-white rounded-md p-8 shadow-2xl">
                            <div className="flex justify-center items-center text-3xl font-semibold">
                                Diamond ERP
                            </div>
                            <h3 className="my-3 text-2xl font-semibold text-center">{signUp ? 'SignUp' : 'LogIn'}</h3>
                            {
                                !signUp
                                    ? <Form
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
                                                    title="logIn"
                                                />
                                            </Form.Item>
                                        </div>
                                    </Form>
                                    : <SignUpComponent />
                            }
                            <div className='text-center'>Don't Have an Account ? <span className='cursor-pointer font-semibold' onClick={() => setSignUp(!signUp)}>{signUp ? 'LogIn' : 'SignUp'}</span></div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Login
