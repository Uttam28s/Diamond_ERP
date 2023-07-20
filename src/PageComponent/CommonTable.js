import { Table } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router'
import PrimaryButton from '../Component/Button'

export const TablePageTitle = ({ title, path }) => {
    const navigate = useNavigate()

    return (
        <div className=' mx-10 rounded mt-7 mb-5'>

            <div className='pt-2 my-4 flex justify-between'>
                <div>
                    <div className=' font-bold text-2xl text-black'>{title}</div>
                </div>
                <div >
                    {
                        path &&
                        <div className='font-semibold text-2xl'>
                            <PrimaryButton
                                className="me-2 bg-green"
                                type="primary"
                                onClick={() => navigate(path)}
                                title={`Add ${title}`}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
const CommonTable = ({ columns, data, total, pagination, setPagination }) => {

    const handleTableChange = (pag) => {
        setPagination({ pageSize: 10, skip: (pag?.current - 1) * pag?.pageSize });
    };
    return (
        <div className=' w-full mt-5'>
            <div className=' mx-10'>
                <div className='rounded-md shadow  mb-10 w-full  h-fit'>
                    <Table columns={columns} dataSource={data || []} size="small" pagination={{ ...pagination, total: total }} onChange={handleTableChange} />
                </div>
            </div>
        </div>
    )
}

export default CommonTable