import { Carousel } from "antd";
//
const contentStyle = {
  margin: 0,
  height: "120px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  width:"100%"

};

const ProductDetailsSlider = (data) => {
  const images = data.data;
  const onChange = (number) => {
    // console.log(number);
  };
  return (
    <Carousel afterChange={onChange} autoplay>
      {images.map((item, i) => {
        return (
          <div key={i} className="w-full">
            <img style={contentStyle} src={item} alt={item} />
          </div>
        );
      })}
    </Carousel>
  );
};

export default ProductDetailsSlider;
