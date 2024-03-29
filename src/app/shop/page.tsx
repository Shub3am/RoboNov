/* eslint-disable react/jsx-key */
import Image from "next/image";
import styles from "../Products-Display/products.module.css";

import UpdateCartButton from "../lib/updateCart";
import Link from "next/link";
let websiteURL = process.env.URL;
type All_Products = {
  products: string[];
};
async function getProducts() {
  const raw_data = await fetch(`${websiteURL}/api/products/all`);
  const data = await raw_data.json();
  return data;
}

export default async function Show_products() {
  let AllProducts: All_Products = await getProducts();

  const ShowProducts = AllProducts.products.map((product: any) => {
    //Issue Thrown here from typescript for Parameter not assignable, so using 'any'
    return (
      <div className={styles.singleItem} key={product.id}>
        <Link href={`/shop/${product.id}`} className={styles.productLink}>
          <div className={styles.productImage}>
            <Image
              src={product.thumbnail}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              alt={product.title}
            ></Image>
          </div>
          <div className={styles.productDetails}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
        </Link>

        <div className={styles.productPrice}>
          <p>{product.price}$</p>

          <UpdateCartButton
          buttonName="Buy Now"
            productId={product.id}
            productName={product.title}
            productPrice={product.price}
            redirectToCart={true}
          />
          <UpdateCartButton
          buttonName="Add to Cart"
            productId={product.id}
            productName={product.title}
            productPrice={product.price}
            redirectToCart={false}
          />
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1 className={styles.showProductstitle}>Shop</h1>
      <div className={styles.showProducts}>{ShowProducts}</div>;
    </div>
  );
}
