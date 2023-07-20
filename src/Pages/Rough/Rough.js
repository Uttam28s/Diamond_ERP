import React from 'react'
import Layout from '../../PageComponent/Layout'
import { useGetRoughQuery } from '../../service/roughServices'
import { useState } from 'react'
import CommonTable, { TablePageTitle } from '../../PageComponent/CommonTable';
import Spinner from '../../Component/common/Spinner';
import { useEffect } from 'react'
import { routes } from '../../routes/route'
import { DeleteIconButton, EditIconButton, ViewButton } from '../../Component/common/IconButton'
import { Table } from 'antd';


const Rough = () => {
  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
  const { currentData: RoughData, isLoading } = useGetRoughQuery(pagination)

  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (RoughData?.data) {
      setTotal(RoughData?.count)
    }
    // eslint-disable-next-line
  }, [RoughData])

  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => <p>{index + 1}</p>,
    },

    {
      title: 'Seller',
      dataIndex: 'sellername',
      key: 'sellername',
      align: 'center',
      render: (text, record, index) => <p className='font-base'>{record.sellername}</p>,
    },
    {
      title: 'Broker',
      dataIndex: 'brokername',
      key: 'Id',
      align: 'center',
      render: (text, record, index) => <p className='font-base'>{record.brokername}</p>,
    },
    {
      title: 'Carat',
      dataIndex: 'carat',
      key: 'Id',
      align: 'center',
      render: (text, record, index) => <p className='font-base'>{record.carat}</p>,
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'Id',
      align: 'center',
      render: (text, record, index) => <p className='font-base'>{record.rate}</p>,
    },
    {
      title: 'Total Amount',
      dataIndex: 'rough_total',
      key: 'Id',
      align: 'center',
      render: (text, record, index) => <p className='font-base'>{record.rough_total}</p>,
    },
    {
      title: 'Purchase Date',
      dataIndex: 'createdAt',
      key: 'Id',
      align: 'center',
      render: (text, record, index) => <p className='font-base'>{record.createdAt}</p>,
    },
    {
      title: 'Days',
      dataIndex: 'days',
      key: 'Id',
      align: 'center',
      render: (text, record, index) => <p className='font-base'>{record.days}</p>,
    },
    {
      title: 'Last Date',
      dataIndex: 'lastdate',
      key: 'orderId',
      align: 'center',
      render: (text, record, index) => <p className='font-base'>{record.lastdate}</p>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (text, record, index) => {
        return (
          <div className='flex items-center justify-center'>
            <EditIconButton handleClick={() => ""} />
            <DeleteIconButton handleClick={() => ''} />
            <ViewButton />
          </div>
        )
      }
    },

  ];

  return (
    <>
      <TablePageTitle title="Rough"
        path={routes.addProducts}
      />
      {
        isLoading
          ? <div className="flex justify-center items-center h-[80vh]">
            <Spinner size='large' className="text-4xl" />
          </div>
          : <CommonTable
            columns={columns}
            data={RoughData?.data || []}
            pagination={pagination}
            total={total || 0}
            setPagination={setPagination}
          />

      }
    </>


  )
}

export default Rough


