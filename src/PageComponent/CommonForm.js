import { Form } from 'antd';
import React, { useEffect } from 'react'
import PrimaryButton from '../Component/Button';

export const MainTitle = ({ title }) => {
    return (
        <div className='flex justify-start  my-3'>
            <div className='font-bold text-xl text-black'>{title}</div>
        </div>
    )
}

export const Card = ({ title, child, className }) => {
    return (
        <div className={`${className} p-5 bg-white shadow-md rounded-md w-100 ms-5 h-fit my-5`}>
            <div className='font-bold text-lg text-pink'>
                {title}
            </div>
            <div className='mt-2'>
                {child}
            </div>
        </div>
    )
}

const CommonForm = ({
    singleBox, onFinish, initialValues, formRef, mainTitle, box1title, loading,
    children, box2title, box2, box3title, box3, box4title, box4, box5title, box5, id, disabled
}) => {
    const [form] = Form.useForm();

    const resetForm = () => {
        form.resetFields();
    };

    useEffect(() => {
        form.setFieldsValue(initialValues)
        // eslint-disable-next-line
    }, [initialValues])

    React.useImperativeHandle(formRef, () => ({
        resetForm
    }));

    return (
        <div className='py-1 w-full flex-col justify-center items-center'>
            <div className='mx-2'>
                <Form
                    form={form}
                    layout='vertical'
                    requiredMark={true}
                    onFinish={onFinish}
                    initialValues={initialValues}
                    ref={formRef}
                    className='mt-1'
                >
                    <div className={`${singleBox ? '' : 'flex'} w-full`}>
                        <div className={`${singleBox ? 'w-100' : 'w-2/3'}`}>
                            <Card title={box1title} child={children} />
                            {box3 && (
                                <Card title={box3title} child={box3} />
                            )}
                            {/* {box5 && (
                                <Card title={box5title} child={box5} />
                            )} */}
                        </div>
                        {
                            !singleBox &&
                            <div className='w-1/3'>
                                {box2 && (
                                    <Card title={box2title} child={box2} />
                                )}
                                {box4 && (
                                    <Card title={box4title} child={box4} />
                                )}
                            </div>
                        }
                    </div>
                    <div className='w-full'>
                    {box5 && (
                                <Card title={box5title} child={box5} />
                            )}
                    </div>
                    <div className='mt-5'>
                        <hr className='w-full my-4 ' />
                        <Form.Item className="flex justify-end">
                            <PrimaryButton
                                type="primary"
                                htmlType="submit"
                                title={id ? "Update" : "Submit"}
                                disabled={disabled}
                                loading={loading}
                                className="me-2  font-bold"
                            />
                        </Form.Item>
                    </div>
                </Form>
                
            </div>

        </div>
    )
}

export default CommonForm;