--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    id integer NOT NULL,
    user_id integer NOT NULL,
    productid jsonb[]
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- Name: cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_id_seq OWNER TO postgres;

--
-- Name: cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    orderid integer NOT NULL,
    customer_id integer NOT NULL,
    productid character varying(255) NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_orderid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_orderid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_orderid_seq OWNER TO postgres;

--
-- Name: orders_orderid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_orderid_seq OWNED BY public.orders.orderid;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    price integer NOT NULL,
    rating integer NOT NULL,
    thumbnail character varying(255) NOT NULL,
    category character varying(255) NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(350) NOT NULL,
    age integer NOT NULL,
    phone bigint NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cart id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);


--
-- Name: orders orderid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN orderid SET DEFAULT nextval('public.orders_orderid_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
02124c09-1100-4d1a-8da7-df3d3cf19115	ae122a4166e5800a91926a99cc04e3fb363ad3b6dcb549e357cf6dba11d84756	2023-06-11 13:01:26.561179+05:30	20230611073126_init	\N	\N	2023-06-11 13:01:26.54458+05:30	1
017d83bd-1acf-41c7-84cd-0230c01c7d3d	cf94e9cdf37b9daad2eefbc191bc78765f4d9bb6b49a36391d91a38b1b9a15c1	2023-06-26 18:16:35.123094+05:30	20230626044010_ecommerceapp	\N	\N	2023-06-26 18:16:35.111033+05:30	1
f627b507-1507-4258-84d6-2e1fff5e0aa3	828cfae1276e55f2d1d829f08a6ac7c4a06fe61b5b0711d0aec13a709aad027f	2023-06-29 10:04:46.697702+05:30	20230629043446_ecommerceapp	\N	\N	2023-06-29 10:04:46.683262+05:30	1
7966276c-8330-4e33-a71f-b0196ee67995	dd8eb5c8537eccc869d9f86ebb219f315ce8d08f5e4781bb537b118f9ee256a4	2023-06-29 10:05:52.202758+05:30	20230629043552_ecommerceapp	\N	\N	2023-06-29 10:05:52.196934+05:30	1
0755d188-3a34-423e-ac51-34d6963dd02b	d85cdc9a2e8a28a5ba9c9d58f94fae50c1cbc86e43459be6e7b9a28e5e55376c	2023-07-21 21:49:09.556374+05:30	20230721161909_	\N	\N	2023-07-21 21:49:09.547388+05:30	1
d704a29f-4ef2-4d78-9f3c-31598aa446ba	e385b69d1af4a75f402074a7dfd693faf0bb7915d617518ff22ceb01ce6beb2a	2023-07-28 21:17:27.549453+05:30	20230728154727_	\N	\N	2023-07-28 21:17:27.543487+05:30	1
\.


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart (id, user_id, productid) FROM stdin;
1	16	\N
3	19	\N
4	20	\N
5	21	\N
2	18	{"{\\"qty\\": 1, \\"productid\\": \\"13\\", \\"productname\\": \\"Fog Scent Xpressio Perfume\\", \\"productprice\\": 13}","{\\"qty\\": 1, \\"productid\\": \\"14\\", \\"productname\\": \\"Non-Alcoholic Concentrated Perfume Oil\\", \\"productprice\\": 120}","{\\"qty\\": 1, \\"productid\\": \\"18\\", \\"productname\\": \\"Oil Free Moisturizer 100ml\\", \\"productprice\\": 40}","{\\"qty\\": 1, \\"productid\\": \\"17\\", \\"productname\\": \\"Tree Oil 30ml\\", \\"productprice\\": 12}","{\\"qty\\": 1, \\"productid\\": \\"16\\", \\"productname\\": \\"Hyaluronic Acid Serum\\", \\"productprice\\": 19}","{\\"qty\\": 1, \\"productid\\": \\"15\\", \\"productname\\": \\"Eau De Perfume Spray\\", \\"productprice\\": 30}","{\\"qty\\": 1, \\"productid\\": \\"11\\", \\"productname\\": \\"perfume Oil\\", \\"productprice\\": 13}","{\\"qty\\": 1, \\"productid\\": \\"20\\", \\"productname\\": \\"Freckle Treatment Cream- 15gm\\", \\"productprice\\": 70}","{\\"qty\\": 1, \\"productid\\": \\"19\\", \\"productname\\": \\"Skin Beauty Serum.\\", \\"productprice\\": 46}"}
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (orderid, customer_id, productid) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, title, description, price, rating, thumbnail, category) FROM stdin;
1	iPhone 9	An apple mobile which is nothing like apple	549	4	https://i.dummyjson.com/data/products/1/thumbnail.jpg	smartphones
2	iPhone X	SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...	899	4	https://i.dummyjson.com/data/products/2/thumbnail.jpg	smartphones
3	Samsung Universe 9	Samsung's new variant which goes beyond Galaxy to the Universe	1249	4	https://i.dummyjson.com/data/products/3/thumbnail.jpg	smartphones
4	OPPOF19	OPPO F19 is officially announced on April 2021.	280	4	https://i.dummyjson.com/data/products/4/thumbnail.jpg	smartphones
5	Huawei P30	Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.	499	4	https://i.dummyjson.com/data/products/5/thumbnail.jpg	smartphones
6	MacBook Pro	MacBook Pro 2021 with mini-LED display may launch between September, November	1749	4	https://i.dummyjson.com/data/products/6/thumbnail.png	laptops
7	Samsung Galaxy Book	Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched	1499	4	https://i.dummyjson.com/data/products/7/thumbnail.jpg	laptops
8	Microsoft Surface Laptop 4	Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.	1499	4	https://i.dummyjson.com/data/products/8/thumbnail.jpg	laptops
9	Infinix INBOOK	Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty	1099	4	https://i.dummyjson.com/data/products/9/thumbnail.jpg	laptops
10	HP Pavilion 15-DK1056WM	HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10	1099	4	https://i.dummyjson.com/data/products/10/thumbnail.jpeg	laptops
11	perfume Oil	Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil	13	4	https://i.dummyjson.com/data/products/11/thumbnail.jpg	fragrances
12	Brown Perfume	Royal_Mirage Sport Brown Perfume for Men & Women - 120ml	40	4	https://i.dummyjson.com/data/products/12/thumbnail.jpg	fragrances
13	Fog Scent Xpressio Perfume	Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men	13	4	https://i.dummyjson.com/data/products/13/thumbnail.webp	fragrances
14	Non-Alcoholic Concentrated Perfume Oil	Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil	120	4	https://i.dummyjson.com/data/products/14/thumbnail.jpg	fragrances
15	Eau De Perfume Spray	Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality	30	4	https://i.dummyjson.com/data/products/15/thumbnail.jpg	fragrances
16	Hyaluronic Acid Serum	L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid	19	4	https://i.dummyjson.com/data/products/16/thumbnail.jpg	skincare
17	Tree Oil 30ml	Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,	12	4	https://i.dummyjson.com/data/products/17/thumbnail.jpg	skincare
18	Oil Free Moisturizer 100ml	Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.	40	4	https://i.dummyjson.com/data/products/18/thumbnail.jpg	skincare
19	Skin Beauty Serum.	Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m	46	4	https://i.dummyjson.com/data/products/19/thumbnail.jpg	skincare
20	Freckle Treatment Cream- 15gm	Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.	70	4	https://i.dummyjson.com/data/products/20/thumbnail.jpg	skincare
21	- Daal Masoor 500 grams	Fine quality Branded Product Keep in a cool and dry place	20	4	https://i.dummyjson.com/data/products/21/thumbnail.png	groceries
22	Elbow Macaroni - 400 gm	Product details of Bake Parlor Big Elbow Macaroni - 400 gm	14	4	https://i.dummyjson.com/data/products/22/thumbnail.jpg	groceries
23	Orange Essence Food Flavou	Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item	14	4	https://i.dummyjson.com/data/products/23/thumbnail.jpg	groceries
24	cereals muesli fruit nuts	original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji	46	4	https://i.dummyjson.com/data/products/24/thumbnail.jpg	groceries
25	Gulab Powder 50 Gram	Dry Rose Flower Powder Gulab Powder 50 Gram • Treats Wounds	70	4	https://i.dummyjson.com/data/products/25/thumbnail.jpg	groceries
26	Plant Hanger For Home	Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf	41	4	https://i.dummyjson.com/data/products/26/thumbnail.jpg	home-decoration
27	Flying Wooden Bird	Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm	51	4	https://i.dummyjson.com/data/products/27/thumbnail.webp	home-decoration
28	3D Embellishment Art Lamp	3D led lamp sticker Wall sticker 3d wall art light on/off button  cell operated (included)	20	4	https://i.dummyjson.com/data/products/28/thumbnail.jpg	home-decoration
29	Handcraft Chinese style	Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate	60	4	https://i.dummyjson.com/data/products/29/thumbnail.webp	home-decoration
30	Key Holder	Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality	30	4	https://i.dummyjson.com/data/products/30/thumbnail.jpg	home-decoration
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, age, phone, password) FROM stdin;
16	Shubham	ab@vshubham.com	21	1234567890	$2a$12$MlTi.NP2ebKhS0O1eUhZh.R7sdf9wr121J8xkgxn95e4wj.rDT2/S
18	Shubham	a@vshubham.com	21	1234567889	$2a$12$ZrCupRWb5mBWGCc9kticqunbrS8zB2O.buK2AYjCWg02ltOyOuiTa
19	test	test@vshubham.com	23	1020304050	$2a$12$i2qWLmzZp3v.ATA2zpdlcOTLA3/xIyKQP98Fcc.FjRLhI21Z40fTO
20	dasd	32@fad.com	32	1020395011	$2a$12$efHAb7ZV1jHSNlVAVd5maOTKlgAF0c7bbewJkplQrURbp/JyeqGm6
21	vdv	feqw@fem.com	35	120203203	$2a$12$IQHlYxg86Xbgu/gpXXgRyeESlODXJBVZFyrXneACEOls2hIIJcZN2
\.


--
-- Name: cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_id_seq', 5, true);


--
-- Name: orders_orderid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_orderid_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 30, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 21, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (orderid);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: cart_user_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX cart_user_id_key ON public.cart USING btree (user_id);


--
-- Name: products_thumbnail_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX products_thumbnail_key ON public.products USING btree (thumbnail);


--
-- Name: products_title_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX products_title_key ON public.products USING btree (title);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_phone_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_phone_key ON public.users USING btree (phone);


--
-- Name: cart cart_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: orders orders_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

