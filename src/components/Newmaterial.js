import React from "react";

import { useState } from "react";

const Newmaterial = (props) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!image || !name || !quantity || !location || !price) {
      alert("Please fill up materials details");
      return;
    }
    props.addMaterial(image, name, quantity, location, price);

    setImage("");
    setName("");
    setQuantity("");
    setLocation("");
    setPrice("");
  };

  return (
    <div class="container mt-3">
      <h2>Add your materials here!!</h2>
      <form onSubmit={submitHandler}>
        <div class="mb-3 mt-3">
          <label for="image">image url:</label>
          <input
            type="text"
            class="form-control"
            id="image"
            placeholder="Enter Image url"
            name="email"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div class="mb-3">
          <label for="name">Name:</label>
          <input
            type="text"
            class="form-control"
            id="nme"
            placeholder="Enter Name of material"
            name="material"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="qty">Quantity:</label>
          <input
            type="number"
            class="form-control"
            id="qty"
            placeholder="Enter Quantity of material"
            name="qty"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="location">location:</label>
          <input
            type="text"
            class="form-control"
            id="qty"
            placeholder="Enter location of material"
            name="qty"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="price">price:</label>
          <input
            type="number"
            class="form-control"
            id="qty"
            placeholder="Enter price of material"
            name="qty"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Add Material
        </button>
      </form>
    </div>
  );
};

export default Newmaterial;
