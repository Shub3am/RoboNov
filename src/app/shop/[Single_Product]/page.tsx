import Image from "next/image";
import styles from "./Single.module.css";
import UpdateCartButton from "@/app/lib/updateCart";
//In this code, I am fetching two times the same, NextJS caches requests so it will only send one request
let websiteURL = process.env.URL;
export async function generateMetadata({ params }) {
  const raw_data = await fetch(
    `${websiteURL}/api/products/${params.Single_Product}`
  ).then((data) => data.json());
  return { title: raw_data.title, description: raw_data.description };
}

export async function generateStaticParams() {
  const raw_data = await fetch(`${websiteURL}/api/products/all`, {
    cache: "no-store",
  }).then((data) => data.json());
  const data = raw_data.products.map((product: { title: string }) => {
    return { slug: product.title.replaceAll(" ", "") };
  });
  return data;
}

export default async function Main({ params }) {
  const singleProduct = await fetch(
    `${websiteURL}/api/products/${params.Single_Product}`
  ).then((data) => data.json());

  return (
    <div className={styles.container}>
      <div className={styles.imagecontainer}>
        <Image
          src={singleProduct.thumbnail}
          alt={singleProduct.title}
          fill={true}
        />
      </div>
      <div className={styles.productdetails}>
        <h1>{singleProduct.title}</h1>
        <h4>{singleProduct.description}</h4>
        <div className={styles.productprice} >
          <h1>Price: {singleProduct.price}$</h1>
          <UpdateCartButton
          buttonName="Add to Cart"
            productId={singleProduct.id}
            productName={singleProduct.title}
            productPrice={singleProduct.price}
            redirectToCart={false}
          />
                    <UpdateCartButton
          buttonName="Buy Now"
            productId={singleProduct.id}
            productName={singleProduct.title}
            productPrice={singleProduct.price}
            redirectToCart={true}
          />
        </div>
      </div>
    </div>
  );
}
