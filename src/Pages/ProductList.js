import React, { useEffect, useState } from 'react'
import Layout from '../PageComponent/Layout'
import { Col, message, Row, Button } from 'antd';
import { useDeleteProductMutation, useGetProductsQuery, useUpdateProductStatusMutation } from '../service/productServices';
import { routes } from '../routes/route';
import CommonTable, { TablePageTitle } from '../PageComponent/CommonTable';
import Spinner from '../Component/common/Spinner';
import { CommonSwitch, DeleteIconButton, EditIconButton } from '../Component/common/IconButton';
import { useNavigate } from 'react-router';
import noImg from "../assets/noImage.png"
import { useGetCategoryQuery } from '../service/categoryServices';
import { ConfirmBox } from '../Component/common/ConfirmBox';
import CommonSelectFilter from '../Component/FilterComponent';

const ProductList = () => {
  const [product, setProduct] = useState()
  const [category, setCategory] = useState()
  const [pagination, setPagination] = useState({ skip: 0, pageSize: 10 });
  const { currentData, isLoading, refetch } = useGetProductsQuery(pagination)
  const { currentData: ProductOption } = useGetProductsQuery({ skip: 0, pageSize: 0 })
  const { currentData: categoryFilter } = useGetCategoryQuery({ pageSize: 0, skip: 0 })
  const [removeProduct] = useDeleteProductMutation()
  const [updateProductStatus] = useUpdateProductStatusMutation()
  const navigate = useNavigate()
  const [total, setTotal] = useState(0)
  const [switchDisabled, setSwitchDisabled] = useState(false)


  useEffect(() => {
    setTotal(currentData?.total)
  }, [currentData])

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [])

  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Product",
      dataIndex: "product_name",
      key: "name",
      // align: 'center', 
      render: (text, record, index) => (
        <div className='flex items-center'>
          <div className="w-10 h-10">
            <img src={record.image[0] || noImg} alt='...' className="w-full h-full object-cover rounded" />
          </div>
          <div onClick={() => navigate(routes.editProduct(record?._id))} className='ml-5 font-bold cursor-pointer'>{record?.product_name?.length > 80 ? record?.product_name?.slice(0, 80) + "..." : record?.product_name}</div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      children: [
        {
          title: 'India',
          dataIndex: 'price.inr',
          key: 'age_years',
          align: 'center',
          render: (text, record, index) => <p> {record.price.inr} Rs.</p>,
        },
        {
          title: 'Dubai',
          dataIndex: 'age_months',
          key: 'age_months',
          align: 'center',
          render: (text, record, index) => <p>{record.price.aed} AED</p>,
        },
      ],
    },
    {
      title: 'Category',
      dataIndex: 'category_id',
      key: 'category_id',
      align: 'center',
      render: (text, record, index) => <p>{categoryFilter?.data.find((item) => item._id === record?.category_id)?.category}</p>
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (text, record, index) => {
        return (
          <div className='flex items-center justify-center'>
            <EditIconButton handleClick={() => navigate(routes.editProduct(record?._id))} />
            <DeleteIconButton handleClick={() => removeProductData(record?._id)} />
          </div>
        )
      }
    },
    {
      title: "Status",
      dataIndex: "status",
      key: 'status',
      render: (text, record, index) => {
        return <CommonSwitch disabled={switchDisabled} status={record.status === "enabled" ? true : false} handleChange={(checked) => handleProductStatus(record.status === "enabled" ? "disabled" : "enabled", record._id)} />
      }
    }
  ];

  const handleProductStatus = (status, id) => {
    setSwitchDisabled(true)
    updateProductStatus({ status, id }).then((res) => {
      if (!res.error) {
        message.success("Status Updated Successfully")
        refetch()
        setSwitchDisabled(false)
      } else {
        message.error(res?.error?.data?.message || "Something Went Wrong")
        setSwitchDisabled(false)
      }
    })
  }

  const removeProductData = (id) => {
    ConfirmBox({
      title: 'product',
      onOk: () => removeProduct({ id }).then((res) => {
        if (!res.error) {
          message.success("Product deleted successfully")
          refetch()
        } else {
          message.error(res?.error?.data?.message || "Something Went Wrong")
        }
      })
    })
  }

  const refreshPage = () => {
    setPagination({ skip: 0, pageSize: 10 })
  }

  return (
    <>
      <TablePageTitle title="Products"
        path={routes.addProducts}
      />
      <div className='bg-white mx-10 rounded py-4 shadow-sm'>
        <Row className=''>
          <CommonSelectFilter
            pagination={pagination}
            setPagination={setPagination}
            refetch={refetch}
            value={product}
            title="product"
            optionData={ProductOption?.data?.map((ele) => ({ label: ele?.product_name, value: ele?._id }))}
            setValue={setProduct}
          />
          <CommonSelectFilter
            pagination={pagination}
            setPagination={setPagination}
            refetch={refetch}
            value={category}
            title="category"
            optionData={categoryFilter?.data?.map((ele) => ({ label: ele?.category, value: ele?._id }))}
            setValue={setCategory}
          />
          <Col span={4} className="flex px-3  justify-center">
            <Button className="my-auto mx-5" onClick={() => { setCategory(); setProduct(); refreshPage() }}>Clear</Button>
          </Col>
        </Row>
      </div>

      {
        isLoading ?
          <div className="flex justify-center items-center h-[70vh]">
            <Spinner size='large' className="text-4xl" />
          </div>
          :
          <>
            <CommonTable
              columns={columns}
              data={currentData?.data || []}
              pagination={pagination}
              total={total || 0}
              setPagination={setPagination}
            />
          </>

      }
    </>
  )
}

export default ProductList