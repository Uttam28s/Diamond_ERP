// eslint-disable-next-line
import { Form, Input, Row, Col, Button, Select, InputNumber } from 'antd';
import React from 'react'
import PrimaryButton from './Button';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DragCard from './DragCard';

const VariantForm = ({ images, setImage, attributeData, attribute_id,
    closeModal, data, setData, variantsData, handleVarientsData,
    initialValue, childFormRef
}) => {
    const { id } = useParams()
    const [form] = Form.useForm();
    const [inputValue, setInputValue] = useState('');
    const [dropDownList, setDropDownList] = useState([])
    const [ddTitle, setDDTitle] = useState([])

    useEffect(() => {
        let refactoredObject = {}
        if (initialValue?.variants_type?.length > 0) {
            refactoredObject = initialValue?.variants_type?.reduce((acc, variant) => {
                acc[variant.type] = variant?.value;
                return acc;
            }, {});

        }
        form.setFieldsValue({ ...initialValue, ...refactoredObject });
        // eslint-disable-next-line
    }, [initialValue])

    useEffect(() => {
        let list = []
        attributeData?.data?.map((ele) => {
            if (attribute_id?.includes(String(ele?._id))) {
                list.push(ele)
            }
            return ''
        })
        let OptionList = []
        let keyList = []
        list?.map((ele) => {
            let a = []
            ele?.values?.map((item) => {
                a.push({ label: item?.title, value: item.value })
                return ''
            })
            keyList.push(ele?.display_name)
            OptionList.push(a)
            return ''
        })
        setDDTitle(keyList)
        setDropDownList(OptionList)

    }, [initialValue, attributeData, attribute_id])

    const handleImageAdd = (value) => {
        if (value?.trim() !== '') {
            setImage([...images, value]);
        }
    };

    const handleDeleteImage = (index) => {
        let newImages = images?.filter((ele, i) => i !== index)
        setImage(newImages)
    }

    const onFinish = (values) => {
        let arr = ["aed", "inr", "quantity", "title", "sku_id"]
        let variants_type = []
        let list = []
        attributeData?.data?.map((ele) => {
            if (attribute_id?.includes(String(ele?._id))) {
                list.push(ele)
            }
            return ''
        })
        const idArray = [];
        const valueArray = [];

        list?.map((ele) => {
            const values = ele.values;
            for (let i = 0; i < values.length; i++) {
                const value = values[i];
                idArray.push(value._id);
                valueArray.push(value.value);
            }
            return ''
        })

        Object.keys(values)?.map((ele) => {
            if (!arr.includes(ele)) {
                let index = valueArray?.findIndex((item) => item === values[ele])
                variants_type?.push({ type: ele, value: values[ele], id: idArray[index] })
            }
            return ''
        })
        let finalData = {}
        // dnd changes
        const imageArray = images.map(item => item?.image);
        if (id) {

            finalData = {
                ...initialValue,
                price: {
                    inr: values?.inr,
                    aed: values.aed
                },
                image: imageArray,
                variants_type: variants_type
                    // ...initialValue?.variants_type,
                    
                ,
                ...values
            }
            if (finalData?._id) {
                let Index = variantsData?.findIndex((ele) =>
                    ele?._id === finalData?._id
                )
                if (Index !== -1) {
                    setData((prevData) => {
                        const newData = [...prevData]; // Create a copy of the previous data array
                        newData[Index] = finalData; // Replace the element at the specified Index with the new data
                        return newData; // Return the updated array
                    });
                    const updatedVariantsData = [...variantsData];
                    updatedVariantsData[Index] = finalData;
                    handleVarientsData(updatedVariantsData);
                    closeModal()
                }
            } else {
                let Index = data?.findIndex((ele) => ele?.sku_id === values?.sku_id)
                if(Index === -1){
                    setData((prevData) => [...prevData, finalData])
                    handleVarientsData([...data, finalData])
                }else{
                    setData((prevData) => {
                        const newData = [...prevData]; // Create a copy of the previous data array
                        newData[Index] = finalData; // Replace the element at the specified Index with the new data
                        return newData; // Return the updated array
                    });
                    let updatedData = data
                    updatedData[Index] = finalData

                    handleVarientsData(updatedData);
                }
                closeModal()
            }
        } else {
            if (initialValue?.index) {
                finalData = {
                    ...values,
                    variants_type: variants_type,
                    price: {
                        inr: values?.inr,
                        aed: values.aed
                    },
                    image: images,
                }

                setData((prevData) => {
                    const newData = [...prevData]; // Create a copy of the previous data array
                    newData[initialValue?.index] = finalData; // Replace the element at the specified Index with the new data
                    return newData; // Return the updated array
                });
                const updatedVariantsData = [...variantsData];
                updatedVariantsData[initialValue?.index] = finalData;
                handleVarientsData(updatedVariantsData);
                closeModal()

            } else {
                finalData = {
                    ...values,
                    variants_type: variants_type,
                    price: {
                        inr: values?.inr,
                        aed: values.aed
                    },
                    image: imageArray,
                    index: data?.length + 1
                }

                setData((prevData) => [...prevData, finalData])
                handleVarientsData([...data, finalData])
                closeModal()

            }
        }
    };

    const renderDropdownList = () => {
        const rows = [];
        let currentRow = [];
        dropDownList?.forEach((ele, index) => {
            currentRow.push(
                <Col span={12} key={index}>
                    <Form.Item label={ddTitle[index]} name={ddTitle[index]}>
                        <Select placeholder={`Select ${ddTitle[index]}`} options={ele} />
                    </Form.Item>
                </Col>
            );
            // Check if currentRow has two items or if it's the last item
            if (currentRow.length === 2 || index === dropDownList.length - 1) {
                rows.push(<Row gutter={8}>{currentRow}</Row>);
                currentRow = [];
            }
        });
        return rows;
    };


    return (
        <Form
            ref={childFormRef}
            onFinish={onFinish}
            layout='vertical'
            form={form}
            className='p-3 border border-gray rounded-lg '
        >
            <div>
                <div className='w-full flex'>

                    <div className='w-full'>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    label="Title"
                                    name="title"
                                    rules={[{ required: true, message: 'Please enter the title' }]}
                                >
                                    <Input placeholder="Enter title" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="SKU ID"
                                    name="sku_id"
                                    rules={[{ required: true, message: 'Please enter the SKU ID' }]}
                                >
                                    <Input placeholder="Enter SKU ID" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <div>{renderDropdownList()}</div>

                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    label="Price (INR)"
                                    name="inr"
                                    rules={[{ required: true, message: 'Please enter the price in INR' }]}
                                >
                                    <Input placeholder="Enter price in INR" type="number" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Price (AED)"
                                    name="aed"
                                    rules={[{ required: true, message: 'Please enter the price in AED' }]}
                                >
                                    <Input placeholder="Enter price in AED" type="number" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    label="Quantity"
                                    className='w-full'
                                    name="quantity"
                                    rules={[
                                        { required: true, message: 'Please enter the quantity' },
                                        { type: 'number', min: 0, message: 'Quantity must be greater than or equal to 0' }
                                    ]}
                                >
                                    <InputNumber className='w-full' placeholder="Enter quantity" />
                                </Form.Item>

                            </Col>
                        </Row>
                        <div className='w-full py-1 '>
                            <div className='text-green font-base text-lg m-3'>Images</div>
                            <div className='flex w-1/2'>
                                <Input className="w-4/5 mx-2" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                                <div className='w-1/5'>
                                    <Button onClick={() => { handleImageAdd(inputValue); setInputValue('') }}>Add</Button>
                                </div>
                            </div>
                            <div className='flex flex-wrap relative my-4'>

                            <DragCard listItems={images} setListItems={setImage} handleRemoveImage={handleDeleteImage} />

                                {/* {images?.map((ele, index) => (
                                    <>
                                        <div className='border border-gray rounded-lg m-1 h-36 w-36' key={index} style={{ position: 'relative' }}>
                                            <img
                                                src={ele}
                                                alt="Not Found"
                                                className='rounded-lg self-stretch p-2 object-cover h-full w-full'
                                            />
                                            <div className='absolute top-3 '>
                                                <DeleteIconButton
                                                    buttonColor='text-red'
                                                    className="delete-icon h-3 w-3"
                                                    handleClick={() => handleDeleteImage(index)}
                                                />

                                            </div>
                                        </div>

                                    </>
                                ))} */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <Form.Item>
                    <div className='flex justify-end items-end'>
                        <PrimaryButton
                            type="primary"
                            htmlType="submit"
                            title="Submit"

                        />

                    </div>

                </Form.Item>

            </div>
        </Form>
    )
}

export default VariantForm