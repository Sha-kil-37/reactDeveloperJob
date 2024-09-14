import { useParams } from "react-router-dom";
import { Button, Form, Input, Space, Select, Table } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useGetProductsCategorysQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../redux/api/productApi";
//
const ProductEdit = () => {
  //
  let { id } = useParams();
  // get single product by id
  const { data, isError, isLoading } = useGetSingleProductQuery(id);
  // get product categorys
  const productCategorysData = useGetProductsCategorysQuery().data;
  const [updateProduct] = useUpdateProductMutation();

  const [form] = Form.useForm();
  let inputData;
  let initialReviews;
  let categorys;
  let categorySelectData;

  if (productCategorysData) {
    let productCategorys = productCategorysData.map((item) => {
      const { name, slug } = item;
      const data = { name, slug };
      return data;
    });
    categorys = productCategorys;
    //
    const selectResult = productCategorysData.map((item) => ({
      value: item.name,
      label: item.name,
    }));
    categorySelectData = selectResult;
  }

  //
  if (data) {
    const {
      title,
      description,
      price,
      discountPercentag,
      returnPolicy,
      availabilityStatus,
      minimumOrderQuantity,
    } = data;
    inputData = {
      title,
      description,
      price,
      discountPercentag,
      returnPolicy,
      availabilityStatus,
      minimumOrderQuantity,
    };
    //
    let commentsArray = data.reviews.map((item) => item.comment);

    let result = commentsArray.map((item) => ({ comment: item }));
    initialReviews = result;
  }

  // product update function
  const onFinish = async (values) => {
    await updateProduct({ id: id, ...values })
      .unwrap()
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  // product update error function
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };
  // handleReviewSubmit
  function handleReviewSubmit(value) {
    //
    console.log(value, id);
  }
  //
  // product category change function
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  // product category search function
  const onSearch = (value) => {
    console.log("search:", value);
  };
  // product category columns
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Slug",
      dataIndex: "slug",
      fixed: "left",
    },

    {
      title: "Action",
      fixed: "right",
      render: (product) => <Button className="w-full ">...</Button>,
    },
  ];

  //
  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <h1 className="font-semibold text-xl text-[#1677FF]">Loading.....</h1>
      </div>
    );
  } else if (isError) {
    return (
      <h1 className="font-semibold text-2xl text-red-500">
        Something went wrong
      </h1>
    );
  } else if (data) {
    return (
      <div>
        <div>
          <h2 className="font-bold text-xl">Product Edit</h2>
          <Form
            className="w-full block sm:block md:flex lg:flex xl:flex 2xl:flex justify-center flex-wrap gap-x-4 mt-3"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              className="w-full sm:w-full md:w-[48%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]"
              name="title"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Input
                className="text-center font-medium"
                defaultValue={inputData.title}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              className="w-full sm:w-full md:w-[48%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]"
              name="description"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Input
                className="font-medium text-center"
                defaultValue={data.description}
              />
            </Form.Item>
            <Form.Item
              label="Price"
              className="w-full sm:w-full md:w-[48%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]"
              name="price"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Input
                defaultValue={data.price}
                className="font-medium text-center"
              />
            </Form.Item>
            <Form.Item
              label="Discount"
              className="w-full sm:w-full md:w-[48%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]"
              name="discountPercentage"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Input
                defaultValue={data.discountPercentage}
                className="font-medium text-center"
              />
            </Form.Item>
            <Form.Item
              label="ReturnPolicy"
              className="w-full sm:w-full md:w-[48%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]"
              name="returnPolicy"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Input
                defaultValue={data.returnPolicy}
                className="font-medium text-center"
              />
            </Form.Item>
            <Form.Item
              label="Status"
              className="w-full sm:w-full md:w-[48%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]"
              name="availabilityStatus"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Input
                defaultValue={data.availabilityStatus}
                className="font-medium text-center"
              />
            </Form.Item>
            <Form.Item
              label="OrderQuantity"
              className="w-full sm:w-full md:w-[48%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]"
              name="minimumOrderQuantity"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Input
                defaultValue={data.minimumOrderQuantity}
                className="text-center font-medium"
              />
            </Form.Item>
            <Form.Item
              className="w-full sm:w-full md:w-[48%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]"
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Button
                className="w-full font-medium"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="mt-5">
          <h2 className="font-bold text-xl">Reviews Edit</h2>
          <Form
            className="mt-3"
            form={form}
            name="dynamic_form_nest_item"
            onFinish={(values) => handleReviewSubmit(values)}
          >
            <Form.List name="comment" initialValue={initialReviews}>
              {(fields, { add, remove }) => (
                <div className="w-full block sm:block md:flex lg:flex xl:flex 2xl:flex justify-center flex-wrap gap-x-4 mt-3">
                  {fields.map((field) => (
                    <Space
                      className="w-full sm:w-full md:w-[48%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%] block"
                      key={field.key}
                      align="baseline"
                    >
                      <div className="flex justify-between">
                        <Form.Item
                          label="Comment"
                          className="w-[90%]"
                          {...field}
                          name={[field.name, "comment"]}
                          fieldKey={[field.fieldKey, "comment"]}
                          rules={[
                            { required: true, message: "Review is required" },
                          ]}
                        >
                          <Input
                            className="text-center w-full font-medium"
                            placeholder="Add comment"
                          />
                        </Form.Item>
                        <div className="w-[10%] text-center mt-1">
                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                          />
                        </div>
                      </div>
                    </Space>
                  ))}

                  <Form.Item className="w-[32%]">
                    <Button
                      className="font-medium"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Comment
                    </Button>
                  </Form.Item>
                  <Form.Item className="w-[32%]">
                    <Button
                      className="w-full font-medium"
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form.List>
          </Form>
        </div>
        <div className="mt-5">
          <h2 className="font-bold text-xl">Get All Category</h2>
          <div className="text-right">
            <Select
              className="mt-3"
              showSearch
              placeholder="Select Category"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={categorySelectData}
            >
              <h1>Category</h1>
            </Select>
          </div>
          <div className="mt-3">
            <Table dataSource={categorys} columns={columns} pagination={true} />
          </div>
        </div>
      </div>
    );
  }
};

export default ProductEdit;

//
