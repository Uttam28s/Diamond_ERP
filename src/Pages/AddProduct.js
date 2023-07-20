import React, { useRef, useState, useEffect } from 'react'
import Layout from '../PageComponent/Layout'
import { message } from 'antd'
import { useGetCategoryQuery } from '../service/categoryServices'
import { useAddProductMutation, useGetProductsQuery } from '../service/productServices'
import Spinner from '../Component/common/Spinner'
import CommonForm from '../PageComponent/CommonForm'
import { useParams } from 'react-router'
import { routes } from '../routes/route'
import { useNavigate } from 'react-router-dom';
import { useUpdateProductMutation } from '../service/productServices'
import AddVariantTable, { ProductForm1, ProductForm2, ProductForm3, ProductForm4 } from '../PageComponent/ProductFormComponent.js'

const AddProduct = () => {
  const { currentData: getProductAPI, refetch } = useGetProductsQuery({ skip: 0, pageSize: 0 })
  let attributeData = []
  const { currentData , refetch : categoryRefetch } = useGetCategoryQuery({ skip: 0, pageSize: 0 })
  const [addProduct] = useAddProductMutation()
  const [updateProduct] = useUpdateProductMutation()
  const [categoryOption, setCategoryOption] = useState([])
  const [subCategoryOption, setSubCategoryOption] = useState([])
  const [category, setCategory] = useState(null)
  const [subCategory, setSubCategory] = useState(null)
  const [disc, setDisc] = useState('')
  const [summary, setSummary] = useState('')
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false)
  const [initialValue, setInitialValue] = useState({})
  const { id } = useParams()
  const [varientsData, setVarientsData] = useState()
  const [attribute_id, setAttributeId] = useState([])
  const navigate = useNavigate()
  const [listItems, setListItems] = useState([]);
  const formRef = useRef()
  const [visibility,setVisibility] = useState('both')
  const [quantity,setQuantity] = useState(0)

  useEffect(() => {
    if (id) {
      let storeData = getProductAPI?.data?.[getProductAPI?.data?.findIndex((ele) => ele?._id === id)]
      if (storeData) {
        let { price, ...rest } = storeData
        let inr = price?.inr;
        let aed = price?.aed;
        const formData = {
          ...rest,
          inr, aed
        }
        if (formData) {
          setCategory(formData?.category_id)
          setVarientsData(formData?.varients)
          setInitialValue(formData)
          let list = []
          formData?.image?.map((ele,index) => {
            list.push({
              id: String(index),
              order: index,
              image : ele
            })
          })
          setListItems(list)
          setQuantity(formData?.quantity)
          setVisibility(formData?.visibility)
          let categoryIndex = currentData?.data?.findIndex(ele => ele._id === formData?.category_id)
          let subCategoryIndex = currentData?.data?.[categoryIndex]?.subcategory?.findIndex((ele) => String(ele?._id) === String(formData?.subcategory_id))
          setAttributeId(currentData?.data?.[categoryIndex]?.subcategory?.[subCategoryIndex]?.attribute)

        }
      }
    }else{
      handleResetForm()
      setVarientsData([])
      setListItems([])
      categoryRefetch()
    }
    // eslint-disable-next-line
  }, [getProductAPI, id])


  useEffect(() => {
    const items = [];
    currentData?.data?.map((ele) => items.push({
      value: ele?._id,
      label: ele?.category
    }));
    setCategoryOption(items)
    // eslint-disable-next-line
  },[])

  useEffect(() => {
    const items = [];
    currentData?.data?.map((ele) => items.push({
      value: ele?._id,
      label: ele?.category
    }));
    if (id) {
      let list = currentData?.data?.filter((ele) => ele?._id === initialValue?.category_id)
      let subCatOption = []
      list?.[0]?.subcategory?.map((ele) => subCatOption.push({
        value: ele?._id,
        label: ele?.title
      }));
      setSubCategoryOption(subCatOption)
    }
    setCategoryOption(items)
  }, [currentData, initialValue, id])

  const onFinish = (value) => {
    const { price, ...rest } = value;
    const priceObject = {
      inr: value?.inr,
      aed: value?.aed,
    };
    const formData = {
      ...rest,
      price: priceObject,
      varients: varientsData,
    };
    const { varients, quantity, ...restData } = formData;
    const totalQty = varients?.reduce((i, ele) => Number(i) + Number(ele?.quantity), 0)
    // dnd changes
    const imageArray = listItems.map(item => item?.image);
    const finalData = { quantity: Number(totalQty) === 0  ? quantity : totalQty,image : imageArray, ...restData, varients }
    setLoading(true)
    id ?
      updateProduct({ data: finalData, id }).then((res) => {
        if (!res.error) {
          message.success(res?.data?.message || "Product updated successfully")
          navigate(routes.products)
          setLoading(false)
          refetch()
        } else {
          setLoading(false)
          message.error(res?.error?.data?.message || "Something went wrong")
        }
      })
      :
      addProduct({ data: finalData }).then((res) => {
        if (!res?.error) {
          message.success(res?.data?.message || "Product added successfully")
          setLoading(false)
          refetch()
          navigate(routes.products)
        } else {
          message.error(res?.error?.data?.message || "Something went wrong")
          setLoading(false)
        }
      });
  }

  const selectCategoryData = (val) => {
    setCategory(val)
    let listItem = [];
    let index = currentData?.data?.findIndex(ele => ele._id === val)
    currentData?.data?.[index]?.subcategory?.map(ele => listItem?.push({
      value: ele?._id,
      label: ele?.title,
    }))
    setSubCategoryOption(listItem)
  }


  const handleRemoveImage = (index) => {
    setListItems(listItems?.filter((ele, i) => ele?.order !== index))
  }
  const selectSubcategoryData = (val) => {
    let categoryIndex = currentData?.data?.findIndex(ele => ele._id === category)
    let subCategoryIndex = currentData?.data?.[categoryIndex]?.subcategory?.findIndex((ele) => String(ele?._id) === String(val))
    setAttributeId(currentData?.data?.[categoryIndex]?.subcategory?.[subCategoryIndex]?.attribute)

  }

  const handleVarientsData = (val) => {
    let totalQty = 0
    val?.map((ele) => {
      totalQty += ele?.quantity
      return ""
    })
    setQuantity(totalQty) 
    setInitialValue({...initialValue, quantity : totalQty})
    setVarientsData(val)
  }

  const newCategoryData = () => {
    if (subCategory) {
      const newItem = {
        value: subCategory,
        label: subCategory,
      };
      setSubCategoryOption(prevOptions => [...prevOptions, newItem]);
      setSubCategory('');
    }
  };

  // const openFileInput = () => {
  //   const fileInput = document.getElementById('file-input');
  //   fileInput.click();
  // };


  const handleImageAdd = (value) => {
    if (value.trim() !== '') {
      setListItems([...listItems, {order: listItems?.length + 1, image : value}]);
    }
  };


  const handleResetForm = () => {
    if (formRef.current) {
      formRef.current.resetForm();
    }
  };

  return (
    <>
        {
          Object.keys(initialValue)?.length === 0 && id
            ? <Spinner size="large" />
            : <CommonForm
              onFinish={onFinish}
              mainTitle={id ? "Edit Product" : "Add Product"}
              formref={formRef}
              initialValues={id ? initialValue : { quantity : quantity}}
              box2title="GST details"
              loading={loading}
              id={id}
              disabled={loading}
              box2={<ProductForm2 />}
              box3title="Upload image"
              box3={<ProductForm3 setListItems={setListItems} listItems={listItems} handleRemoveImage={handleRemoveImage} handleImageAdd={handleImageAdd} />}
              box4title="Visibility"
              box4={
                <ProductForm4
                  initialValue={initialValue}
                  visibility={visibility}
                  setVisibility={setVisibility}
                />
              }
              box5title="Varients"
              box5={<AddVariantTable
                handleVarientsData={handleVarientsData} 
                attribute_id={attribute_id} 
                attributeData={attributeData} 
                setQuantity={setQuantity}
                quantity={quantity}
                varientsData={varientsData}   
                productData={initialValue}
                selectSubcategoryData={selectSubcategoryData}
              />}
              box1title="General"
            >
              <ProductForm1
                categoryOption={categoryOption}
                category={category}
                selectCategoryData={selectCategoryData}
                subCategoryOption={subCategoryOption}
                newCategoryData={newCategoryData}
                disc={disc}
                setDisc={setDisc}
                setSummary={setSummary}
                summary={summary}
                quantity={quantity}
                setQuantity={setQuantity}
                variantsData={varientsData}   
                selectSubcategoryData={selectSubcategoryData}
                
              />
            </CommonForm>
        }
    </>
  )
}

export default AddProduct