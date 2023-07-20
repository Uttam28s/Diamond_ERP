import React, { useEffect, useState } from 'react'
import { Table, InputNumber, Row, Select, Col } from "antd";
import CommonTable from '../../PageComponent/CommonTable';
import PrimaryButton from '../../Component/Button';
import { useGetRoughListQuery } from '../../service/roughServices';
const dataSource = [
    {
        key: "chocki",
        type: "Chocki",
        carat: 0.00,
        price: 0.00
    },
    {
        key: "markis",
        type: "Markis",
        carat: 0.00,
        price: 0.00,
    },
    {
        key: "gol",
        type: "Gol",
        carat: 0.00,
        price: 0.00,
    },
    {
        key: "crystal",
        type: "Crystal",
        carat: 0.00,
        price: 0.00,
    },
    {
        key: "out",
        type: "Out",
        carat: 0.00,
        price: 0.00,
    },
];

const SortingRoughForm = () => {
    const [data, setData] = useState(dataSource)
    const { currentData: roughPreferenceData } = useGetRoughListQuery()
    const [roughList, setRoughList] = useState([])
    const [selectedRough, setSelectedRough] = useState('')
    const [totalSortCarat,setTotalSortCarat] = useState(0.00)
    const [remainCarat,setRemainCarat] = useState(0.00)
    const [totalAmount,setTotalAmount] = useState(0.00)
    const [availableCarat,setAvailableCarat] = useState(0.00)

    const handleOnChange = (title, value, index) => {
        console.log("🚀 ~ file: SortingRoughForm.js:50 ~ handleOnChange ~ title, value, index:", title, value, index)
        let updatedData = data
        if(title === 'carat'){
            updatedData[index]['total'] = updatedData[index]['price'] * value 
        }else if(title === 'price'){
            updatedData[index]['total'] = updatedData[index]['carat'] * value 
        }
        setData(updatedData)
    }


    
    useEffect(() => {
        if (roughPreferenceData?.commonGet) {
            let list = []
            roughPreferenceData?.commonGet?.caratList.map((value) =>
                list.push({ value: value._id, label: "R" + value.Id.toString() + "--Carat " + value?.carat.toString() })
            );
            setRoughList(list)
        }
    }, [roughPreferenceData])

    const columns = [
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Carat",
            dataIndex: "carat",
            key: "carat",
            render: (value, record, index) => (
                <InputNumber
                    name={`${record.type}Carat`}
                    value={value}
                    onChange={(value) => handleOnChange(`carat`, value, index)}
                    type="number"
                    placeholder="0"
                    className="sorting-table-input"
                />
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (value, record) => (
                <InputNumber
                    name={`${record.type}Price`}
                    value={value}
                    //   onChange={(value) => props.handelOnChange(`${record.type}Price`, value)}
                    type="number"
                    placeholder="0"
                    className="sorting-table-input"
                />
            ),
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            render: (value, record) => (
                <p className="sorting-table-input">
                    {(record.carat * record.price).toFixed(2)}
                </p>
            ),
        },
    ];


    return (
        <div>
            <div className='bg-white mx-10 rounded py-4 shadow-sm'>
                <Row className='flex justify-between items-center'>
                    <Col span={8} className="flex px-8 mx-3 justify-center">
                        <Select
                            className="cursor-pointer w-full"
                            placeholder={`Select a Rough`}
                            options={roughList}
                            showSearch
                            optionFilterProp="children"
                            value={selectedRough}
                            onChange={(value) => {
                                setSelectedRough(value)
                            }}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Col>
                    <Col span={4}>
                        Date : <span className='text-blue-700 font-semibold mx-0.5'>01/01/2022</span>
                    </Col>

                    <Col span={4}>
                        Total Carat : <span className='text-blue-700 font-semibold mx-0.5'>0</span>
                    </Col>
                </Row>
            </div>
            <CommonTable
                data={data}
                columns={columns}
                pagination={false}
                bordered
            />
            <div className='bg-white mx-10 rounded py-4 px-4 shadow-sm'>
                <Row className='flex justify-between items-center pb-2'>
                    <Col span={12}>
                        Total Sorting Carat : <span className='text-red-700 font-semibold mx-0.5'>0</span>
                    </Col>

                    <Col span={12}>
                        Total Amount : <span className='text-green-700 font-semibold mx-0.5'>0 /-</span>
                    </Col>
                </Row>
                <Row className='flex justify-between items-center'>
                    <Col span={12}>
                        Carat Remaining : <span className='text-blue-700 font-semibold mx-0.5'>0</span>
                    </Col>

                    <Col span={12}>
                        Available Carat : <span className='text-blue-700 font-semibold mx-0.5'>0</span>
                    </Col>
                </Row>
            </div>
            <div className='mx-10 my-4 flex justify-end'>
                <PrimaryButton title="Save" />
            </div>
        </div>
    );
}

export default SortingRoughForm
