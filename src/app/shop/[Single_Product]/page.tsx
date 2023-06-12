import Image from "next/image";
import styles from "./Single.module.css";

//In this code, I am fetching two times the same, NextJS caches requests so it will only send one request

export async function generateMetadata({ params }) {
  const raw_data = await fetch("https://dummyjson.com/products").then((data) =>
    data.json()
  );
  const data = raw_data.products.map(
    (product: { title: string; description: string }) => {
      return { title: product.title, description: product.description };
    }
  );
  return data;
}

export async function generateStaticParams() {
  const raw_data = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  }).then((data) => data.json());
  const data = raw_data.products.map((product: { title: string }) => {
    return { slug: product.title.replaceAll(" ", "") };
  });
  return data;
}

export default async function Main({ params }) {
  const singleProduct = await fetch(
    `https://dummyjson.com/products/${params.Single_Product}`
  ).then((data) => data.json());

  return (
    <div className={styles.container}>
      <div className={styles.imagecontainer}>
        <Image
          src={singleProduct.images[0]}
          alt={singleProduct.title}
          fill={true}
        />
      </div>
      <div className={styles.productdetails}>
        <h1>{singleProduct.title}</h1>
        <h4>{singleProduct.description}</h4>
        <div className={styles.productprice}>
          <h1>Price: {singleProduct.price}$</h1>
          <button>Buy Now</button>
        </div>
      </div>
    </div>
  );
}
