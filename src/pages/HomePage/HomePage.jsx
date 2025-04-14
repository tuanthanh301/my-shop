import React, { useEffect, useState } from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
} from "./style";
import slider from "../../assets/images/slider.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider4 from "../../assets/images/slider4.png";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
// import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  // const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [typeProducts, setTypeProducts] = useState([]);
  const initialLimit = 10;
  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  const {
    data: products,
    isLoading,
    isPreviousData,
  } = useQuery({
    queryKey: ["products", limit, searchDebounce],
    queryFn: fetchProductAll,
    retry: 3, // Số lần thử lại nếu lỗi
    retryDelay: 1000,
    keepPreviousData: true,
  });

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);
  return (
    <Loading isLoading={isLoading}>
      <div style={{ width: "1270px", margin: "0 auto", height: "100%" }}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        id="container"
        style={{
          height: "1000px",
          width: "1270px",
          margin: "0 auto",
        }}
      >
        <SliderComponent arrImages={[slider, slider2, slider4]} />
        <WrapperProducts
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            gap: "23px",
            flexWrap: "wrap",
          }}
        >
          {products?.data?.map((product) => {
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
                id={product._id}
              />
            );
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
            textButton={isPreviousData ? "Load more" : "Xem thêm"}
            type="outline"
            style={{
              border: "1px solid rgb(11, 116, 229)",
              width: "240px",
              height: "38px",
              borderRadius: "4px",
              color:
                products?.total === products?.data.length
                  ? "#ccc"
                  : "rgb(11, 116, 229)",
            }}
            disabled={
              products?.total === products?.data.length ||
              products?.totalPage === 1
            }
            styleTextButton={{ color: "rgb(11, 116, 229)", fontWeight: 500 }}
            onClick={() => setLimit((prev) => prev + 5)}
          />
          {/* {products?.data?.length > initialLimit && (
            <WrapperButtonMore
              textButton="Ẩn bớt"
              type="outline"
              style={{
                border: "1px solid rgb(11, 116, 229)",
                width: "240px",
                height: "38px",
                borderRadius: "4px",
                color: "rgb(11, 116, 229)",
              }}
              styleTextButton={{ color: "rgb(11, 116, 229)", fontWeight: 500 }}
              onClick={() => setLimit(initialLimit)}
            />
          )} */}
        </div>
      </div>
    </Loading>
  );
};

export default HomePage;
