import { Link, useParams } from "react-router-dom";
import { Button, Image } from "antd";
import ProductDetailsSlider from "./slider/ProductDetailsSlider";
import { Typography } from "antd";
import { Table } from "antd";
import { useGetSingleProductQuery } from "../redux/api/productApi";
//
const ProductDetails = () => {
  //
  const { Title, Text } = Typography;
  let { id } = useParams();
  const { data, isError, isLoading } = useGetSingleProductQuery(id);

  let datas;
  const columns = [
    {
      title: "SKU",
      dataIndex: "sku",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      fixed: "left",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Status",
      dataIndex: "availabilityStatus",
      fixed: "right",
    },
  ];

  if (data) {
    const { brand, category, stock, availabilityStatus, sku } = data;
    datas = [{ brand, category, stock, availabilityStatus, sku }];
  }
  // handleEditPage

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
      <div className="block sm:block md:block lg:flex xl:flex 2xl:flex gap-x-4">
        <div className="w-full sm:w-full md:w-full lg:w-[50%] xl:w-[50%] 2xl:w-[50%]">
          <div className="overflow-hidden h-[300px] text-center w-full object-cover">
            <Image
              className="h-full
             w-full"
              src={data.thumbnail}
            />
          </div>
          <div className="mt-[20px]">
            <ProductDetailsSlider data={data.images} />
          </div>
        </div>
        <div className="w-full sm:w-full md:w-full lg:w-[50%] xl:w-[50%] 2xl:w-[50%] sm:mt-3 md:mt-3">
          <Title>{data.title}</Title>
          <div className="block sm:block md:flex lg:flex xl:flex 2xl:flex gap-x-10 items-center">
            <div className="flex gap-x-4 items-center">
              <div>
                <Text className="font-medium text-[#4096FF] text-xl">
                  ${data.price}
                </Text>
              </div>
              <div>
                <Text className="line-through font-medium">
                  ${data.discountPercentage}%
                </Text>
              </div>
            </div>
            <div>
              <Text className="font-medium block">{data.rating} Rating</Text>
              <Text className="font-medium block">
                ({data.reviews.length}) Reviews
              </Text>
            </div>
          </div>
          <hr className="mt-4" />
          <div className="mt-4">
            <Text className="font-medium block">
              ReturnPolicy : {data.returnPolicy}
            </Text>
            <Text className="font-medium">
              Shiping : {data.shippingInformation}
            </Text>
            <Text className="font-medium block">
              Warranty : {data.warrantyInformation}
            </Text>
          </div>
          <div className="mt-4">
            <Table
              dataSource={datas}
              columns={columns}
              pagination={false}
              size="small"
            />
          </div>
          <div className="mt-4 flex gap-x-3 justify-end">
            <Link
              to={`/product-edit/${data.id}`}
              className="flex justify-center items-center px-5 py-1 rounded-md border-[1px] border-gray-500 transition duration-200 hover:border-gray-400 font-medium hover:text-black"
            >
              Edit
            </Link>
            <Button danger className="font-medium">
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductDetails;
