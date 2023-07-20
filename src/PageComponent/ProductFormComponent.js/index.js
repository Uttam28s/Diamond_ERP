import React, { useState, useEffect, useRef } from "react";
import {
  Col,
  Form,
  InputNumber,
  Row,
  Select,
  Input,
  Button,
  Table,
  Modal,
  Radio,
} from "antd";
import { capitalizeFirstLetter } from "../../Component/const";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  DeleteIconButton,
  EditIconButton,
} from "../../Component/common/IconButton";
import PrimaryButton from "../../Component/Button";
import { useParams } from "react-router-dom";
import VariantForm from "../../Component/VariantForm";
import DragCard from "../../Component/DragCard";

export const ProductForm1 = ({
  selectSubcategoryData,
  quantity,
  categoryOption,
  category,
  selectCategoryData,
  subCategoryOption,
  summary,
  setSummary,
  disc,
  setDisc,
  variantsData,
  setQuantity
}) => {
  return (
    <>
      {/* children */}
      <Row className="my-2">
        <Col span={12} className="p-2">
          <Form.Item
            name="product_name"
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Product-name" />
          </Form.Item>
        </Col>
        <Col span={12} className="p-2">
          <Form.Item
            name="product_sku_id"
            label="SKU"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter product sku id" />
          </Form.Item>
        </Col>
      </Row>
      <Row className="my-2">
        <Col span={12} className="p-2">
          <Form.Item
            name="category_id"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select
              className="cursor-pointer"
              placeholder="Select a Category"
              optionFilterProp="children"
              options={categoryOption}
              value={category}
              onChange={selectCategoryData}
            />
          </Form.Item>
        </Col>

        <Col span={12} className="p-2">
          <Form.Item
            name="subcategory_id"
            label="Subcategory"
            rules={[{ required: true }]}
          >
            <Select
              className="cursor-pointer"
              onChange={selectSubcategoryData}
              placeholder="Select sub-category"
              options={subCategoryOption}
              disabled={category ? false : true}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="p-2">
          <Form.Item
            name="productSummary"
            label="Bullet Points"
            rules={[{ required: true }]}
          >
            <ReactQuill
              theme="snow"
              value={summary}
              onChange={setSummary}
              className="rounded-3xl"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="p-2">
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <ReactQuill
              theme="snow"
              value={disc}
              onChange={setDisc}
              className="rounded-3xl"
            />
          </Form.Item>
        </Col>
      </Row>
    
      <Row>
        <Col span={8} className="p-2">
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              { required: true, message: 'Please enter the quantity' },

            ]}
          >
            <InputNumber value={quantity} min={0} onChange={(value) => setQuantity(value)} className="w-full" disabled={variantsData?.length !== 0} />
          </Form.Item>
        </Col>
        <Col span={8} className="p-2">
          <Form.Item name="inr" label="In INR" rules={[{ required: true }]}>
            <InputNumber placeholder="In INR" className="w-full" />
          </Form.Item>
        </Col>
        <Col span={8} className="p-2">
          <Form.Item
            name="aed"
            label="In AED"
            rules={[{ required: true }]}
          >
            <InputNumber placeholder="In AED" className="w-full" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export const ProductForm2 = () => {
  return (
    <>
      <Row className="my-2">
        <Col span={24} className="p-2">
          <Form.Item name="hsn_code" label="HSN Code">
            <Input placeholder="HSN Code" className="w-full" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="p-2">
          <Form.Item name="gst_percentage" label="GST Percentage">
            <InputNumber placeholder="GST percentage" className="w-full" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="p-2">
          <Form.Item name="vat_percentage" label="VAT Percentage">
            <InputNumber placeholder="VAT percentage" className="w-full" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export const ProductForm3 = ({
  listItems,
  handleImageAdd,
  handleRemoveImage,
  setListItems
}) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <Row className="my-2">
        <Col span={24} className="p-2">
          <div className="flex">
            <Input
              className="w-3/5 mx-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="w-2/5">
              <Button
                onClick={() => {
                  handleImageAdd(inputValue);
                  setInputValue("");
                }}
              >
                Add
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap relative my-4">
          <DragCard listItems={listItems} setListItems={setListItems} handleRemoveImage={handleRemoveImage} />
            {/* {listItems.map((ele, index) => (
              <>
                <div
                  className="border border-gray h-32 w-32 rounded-lg m-1"
                  key={index}
                  style={{ position: "relative" }}
                >
                  <img
                    src={ele}
                    alt="Not Found"
                    className="rounded-lg p-2 h-full w-full object-contain"
                  />
                  <div className="absolute top-3">
                    <DeleteIconButton
                      buttonColor="text-red"
                      className="delete-icon h-3 w-3"
                      handleClick={() => handleRemoveImage(index)}
                    // style={{ position: 'absolute', top: '0', right: '0', zIndex: 1 }}
                    />
                  </div>
                </div>
              </>
            ))} */}
          </div>
      
        </Col>
      </Row>
    </>
  );
};

export const ProductForm4 = ({ visibility, setVisibility }) => {

  const handleRadioChange = (e) => {
    setVisibility(e.target.value);
  };


  return (
    <Form.Item name="visibility">
      <Row className="my-2">
        <Radio.Group onChange={handleRadioChange} value={visibility}>
          <Radio value="both">Both</Radio>
          <Radio value="india">India</Radio>
          <Radio value="dubai">Dubai</Radio>
        </Radio.Group>
      </Row>
    </Form.Item>
  );
};

const AddVariantTable = ({
  attribute_id,
  varientsData,
  handleVarientsData,
  attributeData,
  selectSubcategoryData,
  productData,
}) => {
  const { id } = useParams();
  const [data, setData] = useState(varientsData || []);
  const [open, setOpen] = useState(false);

  const [flag, setFlag] = useState(false);
  const [images, setImage] = useState([]);
  const [initialValue, setInitialValue] = useState({});
  const childFormRef = useRef();


  useEffect(() => {
    if (!id) {
      setData([])
      setImage([])
      setOpen(false)
    }
  }, [id])
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      width: 280,
      key: "index",
      render: (text, record, index) => <p> {record?.title?.length > 70 ? record?.title?.slice(0, 70) + "..." : record?.title} </p>,

    },
    {
      title: "Qty",
      dataIndex: "quantity",
      width: 30,
      align:"center",
      key: "index",
    },
    {
      title: "Sku Id",
      dataIndex: "sku_id",
      key: "index",
      align:"center",
      width: 80,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      width:80,
      children: [
        {
          title: "INR",
          dataIndex: "price.inr",
          key: "inr",
          align: "center",
          width :40,
          render: (text, record, index) => <p> {record.price.inr} </p>,
        },
        {
          title: "AED",
          dataIndex: "price.aed",
          key: "aed",
          align: "center",
          width :40,
          render: (text, record, index) => <p> {record.price.aed}</p>,
        },
      ],
    },
    {
      title: "Remove",
      dataIndex: "remove",
      key: "index",
      width: 30,
      align: "center",
      render: (_, record, index) => (
        <div className="flex justify-center">
          <EditIconButton
            handleClick={() => handleEdit(id ? record?._id : record, id ? "" : index)}
          />
          <DeleteIconButton className="ml-2 bg-red-200" handleClick={() => handleRemoveRow(index)} />
        </div>
      ),
    },
  ];

  const handleEdit = (record, index) => {
    if (id) {
      let varData = varientsData?.filter((ele) => {
        return ele?._id === record;
      });
      let obj = {
        ...varData?.[0],
        inr: varData?.[0]?.price?.inr,
        aed: varData?.[0]?.price?.aed,
      };
      let list = []
      varData?.[0]?.image?.map((ele) => {
        list.push({
          id: String(index),
          order: index,
          image : ele
        })
      })
      setImage(list);
      setInitialValue(obj);
      selectSubcategoryData(productData?.subcategory_id)
      setOpen(true);
    } else {
      let obj = {
        ...record,
        index: index,
        inr: record?.price?.inr,
        aed: record?.price?.aed,
      };
      setInitialValue(obj)
      setImage(record?.image);
      setOpen(true);
    }
  };

  const handleRemoveRow = (id) => {
    let varData = varientsData?.filter((item, index) => index !== id)
    handleVarientsData(varData);
    setData((prevData) => prevData?.filter((item, index) => index !== id));
  };

  return (
    <div className="w-full">
      {
        data?.length > 0 &&
        <div>
          <Table
            dataSource={data}
            size="small"
            columns={columns}
            pagination={false}
            bordered
          />
        </div>
      }

      <Modal
        title="Add New varient"
        open={open}
        width={750}
        footer={false}
        // onOk={handleOk}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <VariantForm
          attribute_id={attribute_id}
          attributeData={attributeData}
          images={images || []}
          closeModal={() => {
            setOpen(false);
            childFormRef.current?.resetFields();
          }}
          setImage={setImage}
          data={data}
          setData={setData}
          variantsData={varientsData}
          handleVarientsData={handleVarientsData}
          initialValue={initialValue}
          childFormRef={childFormRef}
        />
      </Modal>
      <div className="w-100 flex justify-end">
        <PrimaryButton
          title="Add Varient"
          onClick={() => {
            setFlag(!flag);
            setImage([])
            setOpen(true);
            setInitialValue({});
            childFormRef.current?.resetFields();
          }}
          className="mt-3 mx-3 bg-green font-bold text-white hover:!text-white hover:!border-white hover:bg-pink"
        />
      </div>
    </div>
  );
};

export default AddVariantTable;
