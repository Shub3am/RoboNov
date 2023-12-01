/* eslint-disable react/jsx-key */
import Image from "next/image";
import styles from "./products.module.css";
import Product_Banner from "./Product_Banner";
import UpdateCartButton from "@/app/lib/updateCart";
import Link from "next/link";
type All_Products = {
  products: string[];
};
async function getProducts() {
  const raw_data = await fetch(`${process.env.URL}/api/products`, {
    cache: "no-cache",
  }).then((res) => res.json());
  return { products: raw_data };
}

export default async function Show_products() {
  let AllProducts: All_Products = await getProducts();

  const ShowProducts = AllProducts.products.map((product: any) => {
    //Issue Thrown here from typescript for Parameter not assignable, so using 'any'
    if (product.id >= 11 && product.id <= 20) {
      //Rendering Only 8 Products to Avoid Clutter
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
    }
  });

  return (
    <div>
      <Product_Banner />
      <h1 className={styles.showProductstitle}>Top Picks</h1>
      <div className={styles.showProducts}>{ShowProducts}</div>;
    </div>
  );
}
