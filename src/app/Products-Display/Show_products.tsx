/* eslint-disable react/jsx-key */
import Image from "next/image";
import styles from "../products.module.css";
import Link from "next/link";
type All_Products = {
  products: string[];
};
async function getProducts() {
  const raw_data = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  });
  const data = await raw_data.json();
  return data;
}

export default async function Show_products() {
  let AllProducts: All_Products = await getProducts();

  const ShowProducts = await AllProducts.products.map((product: any) => {
    //Issue Thrown here from typescript for Parameter not assignable, so using 'any'
    return (
      <Link href={`/shop/${product.id}`} className={styles.productLink}>
        <div className={styles.singleItem} key={product.id}>
          <div className={styles.productImage}>
            <Image
              src={product.thumbnail}
              fill={true}
              alt={product.title}
            ></Image>
          </div>
          <div className={styles.productDetails}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
          <div className={styles.productPrice}>
            <p>{product.price}$</p>
            <button>Buy Now</button>
          </div>
        </div>
      </Link>
    );
  });

  return <div className={styles.showProducts}>{ShowProducts}</div>;
}
