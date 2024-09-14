import { Table } from "antd";
import { Link } from "react-router-dom";
import { useGetAllProductQuery } from "../redux/api/productApi";
//
const ProductsTable = () => {
  const { data, isError, isLoading } = useGetAllProductQuery();
  let products;
  
  if (data) {
    const productsArray = data.products.map((product) => {
      const { title, stock, price, sku, id } = product;
      const data = { title, stock, price, sku, id };
      return data;
    });
    products = productsArray;
  }


  // product table columns
  const columns = [
    { title: "SKU", dataIndex: "sku" },
    {
      title: "Name",
      dataIndex: "title",
      fixed: "left",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    { title: "Stock", dataIndex: "stock", fixed: "left" },
    {
      title: "Action",
      fixed: "right",
      render: (product) => (
        <Link
          to={`/product/${product.id}`}
          className="inline-block text-center px-2 py-2 bg-[#1677FF] w-full text-white transition duration-150 hover:bg-[#4096FF] rounded-md font-medium hover:text-white"
        >
          View
        </Link>
      ),
    },
  ];


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
    return <Table dataSource={products} columns={columns} pagination={true} />;
  }
};

export default ProductsTable;
