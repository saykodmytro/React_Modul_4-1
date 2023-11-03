import React, { useState } from 'react';
import css from './ProductForm.module.css';

const ProductForm = ({ handleAddProduct }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [hasDiscount, setHasDiscount] = useState(false);
  const [discount, setDiscount] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();

    const productData = {
      title: title,
      price: Number.parseFloat(price),
      discount: hasDiscount ? Number.parseFloat(discount) : null,
    };
    handleAddProduct(productData);
    setTitle('');
    setPrice('');
    setHasDiscount(false);
    setDiscount('');
  };

  const handleInputChange = evt => {
    const value =
      evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    console.log('value: ', value);

    const name = evt.target.name;

    switch (name) {
      case 'title': {
        setTitle(value);
        return;
      }
      case 'price': {
        setPrice(value);
        return;
      }
      case 'hasDiscount': {
        setHasDiscount(value);
        return;
      }
      case 'discount': {
        setDiscount(value);
        return;
      }

      default:
        return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      {title === 'Spagetti' && (
        <h2>Congrats! You won a promocode - #R3E2A1🎉</h2>
      )}
      <label className={css.formLabel}>
        <p className={css.labelText}>Title: </p>
        <input
          type="text"
          name="title"
          onChange={handleInputChange}
          value={title}
        />
      </label>
      <label className={css.formLabel}>
        <p className={css.labelText}>Price: </p>
        <input
          type="text"
          name="price"
          onChange={handleInputChange}
          value={price}
        />
      </label>
      <label className={css.formLabel}>
        <input
          type="checkbox"
          name="hasDiscount"
          onChange={handleInputChange}
          checked={hasDiscount}
        />{' '}
        <span>Has discount?</span>
      </label>
      {hasDiscount && (
        <label className={css.formLabel}>
          <p className={css.labelText}>Discount: </p>
          <input
            type="text"
            name="discount"
            onChange={handleInputChange}
            value={discount}
          />
        </label>
      )}
      <button type="submit">Add Products</button>
    </form>
  );
};

export default ProductForm;
