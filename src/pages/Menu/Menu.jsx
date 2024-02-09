import React, { useState } from "react";
import Title from "../../components/Title/Title";
import Search from "../../components/Search/Search";
import Card from "../../components/Card/Card";
import { useGetProductsQuery } from "../../store/products";

const Menu = () => {
  // const [product, setProduct] = useState([]);
  // const getAllProduct = async () => {
  //   const res = await axios("http://localhost:3000/products");
  //   setProduct(res.data);
  //   console.log(product);
  // };
  // useEffect(() => {
  //   getAllProduct();
  // }, []);
  const [category, setCategory] = useState('All')
  const { data = [], isloading } = useGetProductsQuery({category});
  
  if (isloading) {
    return <h2>loading...</h2>
  }
  return (
    <div className="menu">
      <div className="menu__header">
        <Title title="Menu" />
        <div>
            <h2>{category}</h2>
            <div>
              <button className={category == 'pizza' ? 'btn':""} onClick={()=> setCategory('pizza')}>pizza</button>
              <button className={category == 'salat' ? 'btn':""} onClick={()=> setCategory('salat')}>salat</button>
              <button className={category == 'All' ? 'btn':""} onClick={()=> setCategory('All')}>All</button>
            </div>
        </div>
        <Search />
      </div>
      <div className="menu__products">
        {data.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            price={item.price}
            rating={item.rating}
            title={item.title}
            description={item.ingridents}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
