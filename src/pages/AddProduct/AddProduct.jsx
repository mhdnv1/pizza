import React from "react";
import { useAddProductMutation } from "../../store/products";

const AddProduct = () => {
  const [addUser, obj] =useAddProductMutation()
  const handleSubmit = async(e)=>{
     e.preventDefault()
     let product = ({
        price:e.target[0].value,
        rating:e.target[1].value,
        title:e.target[2].value,
        image:e.target[3].value,
        ingridents:e.target[4].value,
        category:e.target[5].value,
     });
     await addUser(product)
     e.target[0].value = ''
     e.target[1].value = ''
     e.target[2].value = ''
     e.target[3].value = ''
     e.target[4].value = ''
     e.target[5].checked = false 
  }
  return (
    <div className="add__product">
      <form action="" onSubmit={handleSubmit}>
        <input placeholder="price" type="number" name="price" />
        <br />
        <input placeholder="rating" type="number" name="rating" />
        <br />
        <input placeholder="title" type="text" name="title" />
        <br />
        <input placeholder="file" type='url' name="image" />
        <br />
        <input placeholder="ingridents" type="text" name="ingridents" />
        <br />
        <div>
          <label>
            <input name="category" value="pizza" type="radio" />
            pizza
          </label>
          <label>
            <input name="category" value="salat" type="radio" />
            salat
          </label>
        </div><br />
        <button className="btn">Add product</button>
      </form>
    </div>
  );
};

export default AddProduct;
