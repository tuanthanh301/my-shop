import React from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
} from "./style";
import slider from "../../assets/images/slider.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import CardComponent from "../../components/CardProduct/CardComponent";
import { useQuery } from "@tanstack/react-query";
// import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import * as ProductService from "../../services/ProductService";

const HomePage = () => {
  const arr = ["Dell", "Asus", "Macbook"];
  const fetchProductAll = async () => {
    const response = await ProductService.getAllProduct(); // Gọi hàm đúng cách
    return response; // ✅ Trả về dữ liệu
  };
  
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductAll,
    retry: 3, // Số lần thử lại nếu lỗi
    retryDelay: 1000,
  });
 
  return (
    <>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return (
              <TypeProduct name={item} key={item} />
              // <TypeProduct name={item} key={item}/>
            );
          })}
        </WrapperTypeProduct>
      </div>
      {/* <div
        className="body"
        style={{ width: "1270px", backgroundColor: "#efefef" }}
      > */}
        <div
          id="container"
          style={{
            height: '1000px',
            width: "1270px",
            margin: "0 auto"
          }}
        >
          <SliderComponent arrImages={[slider, slider2, slider3]} />
          <WrapperProducts
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {products?.data?.map((product) =>{
              return (
                <CardComponent
                  key={product._id}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  type={product.type}
                  discount={product.discount}
                  sold={product.sold}

                />
              )
            })}
          </WrapperProducts>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <WrapperButtonMore
              textButton="Xem thêm"
              type="outline"
              style={{
                border: "1px solid rgb(11, 116, 229)",
                width: "240px",
                height: "38px",
                borderRadius: "4px",
              }}
              styleTextButton={{ color: "rgb(11, 116, 229)", fontWeight: 500 }}
            />
          </div>

          {/* <NavBarComponent/> */}
        </div>
      {/* </div> */}
    </>
  );
};

export default HomePage;
