import css from './Product.module.css';

export const Product = ({
  id,
  title,
  price,
  discount,
  hendleDeleteProduct,
  openModal,
}) => {
  const productBg = discount ? 'red' : 'green';

  const productStyles = {
    backgroundColor: productBg,
  };
  console.log('css :', css);

  return (
    <div className={css.product} style={productStyles}>
      <img
        className={css.productImg}
        src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640"
        alt="Tacos With Lime"
        width="640"
      />
      <h2>{title}</h2>
      {/* {discount && <h3>Discount: {discount}$</h3>} */}
      {discount ? (
        <h3 className={css.discountBage}>Discount: {discount}$</h3>
      ) : (
        <p className={css.apology}>
          Sorry , but discount on this product has expired!
        </p>
      )}
      <p>Price: {price}$</p>
      <button className={css.prodAddToCartBtn} type="button">
        Add to cart
      </button>
      <button
        onClick={() => openModal({ title, discount, price })}
        className={css.prodAddToCartBtn}
        type="button"
      >
        See the details
      </button>
      <button
        onClick={() => hendleDeleteProduct(id)}
        className={css.prodAddToCartBtn}
        type="button"
      >
        &times;
      </button>
    </div>
  );
};
