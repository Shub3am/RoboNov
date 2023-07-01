/* eslint-disable react/jsx-key */
import Image from "next/image";
import styles from "./products.module.css";
import Link from "next/link";
async function getTopProduct() {
  const data = await fetch(`${process.env.URL}/api/products?limit=5`, {
    cache: "no-store",
  }).then((res) => res.json());
  return { products: data };
}

const BannerGenerator = function (
  row: any,
  item: { id: number; thumbnail: string; title: string }
): React.ReactNode {
  return (
    <div key={item.id} className={`${row} ${styles.banneritem}`}>
      <Link href={`/shop/${item.id}`}>
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
        <h2>{item.title}</h2>
      </Link>
    </div>
  );
};

export default async function Banner() {
  let Products = await getTopProduct();
  const firstRow = Products.products.map((item) => {
    if (item.id <= 2) {
      return BannerGenerator(styles.firstRowItem, item);
    }
  });
  const secondRow = Products.products.map((item) => {
    if (item.id > 2) {
      return BannerGenerator(styles.secondRowItem, item);
    }
  });

  return (
    <div className={styles.banner}>
      <div className={styles.firstRow}>{firstRow}</div>
      <div className={styles.secondRow}>{secondRow}</div>
    </div>
  );
}
