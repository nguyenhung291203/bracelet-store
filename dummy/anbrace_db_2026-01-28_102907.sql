--
-- PostgreSQL database dump
--

\restrict XeXKgneRms5piedQNd25kbW9xqblP9SqNSMBMxTroov3EngNkOeSLxQEVJIlUZY

-- Dumped from database version 16.11 (Homebrew)
-- Dumped by pg_dump version 16.11 (Homebrew)

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: nguyenvanhung
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO nguyenvanhung;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: nguyenvanhung
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: nguyenvanhung
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


ALTER TABLE public._prisma_migrations OWNER TO nguyenvanhung;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: nguyenvanhung
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" integer,
    "updatedAt" timestamp(3) without time zone,
    "updatedBy" integer,
    "deletedAt" timestamp(3) without time zone,
    "deletedBy" integer,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.categories OWNER TO nguyenvanhung;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyenvanhung
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO nguyenvanhung;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyenvanhung
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: colors; Type: TABLE; Schema: public; Owner: nguyenvanhung
--

CREATE TABLE public.colors (
    id integer NOT NULL,
    name text NOT NULL,
    code text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" integer,
    "updatedAt" timestamp(3) without time zone,
    "updatedBy" integer,
    "deletedAt" timestamp(3) without time zone,
    "deletedBy" integer,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.colors OWNER TO nguyenvanhung;

--
-- Name: colors_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyenvanhung
--

CREATE SEQUENCE public.colors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.colors_id_seq OWNER TO nguyenvanhung;

--
-- Name: colors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyenvanhung
--

ALTER SEQUENCE public.colors_id_seq OWNED BY public.colors.id;


--
-- Name: product_categories; Type: TABLE; Schema: public; Owner: nguyenvanhung
--

CREATE TABLE public.product_categories (
    "productId" integer NOT NULL,
    "categoryId" integer NOT NULL,
    "isPrimary" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" integer,
    "deletedAt" timestamp(3) without time zone,
    "deletedBy" integer,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.product_categories OWNER TO nguyenvanhung;

--
-- Name: product_variants; Type: TABLE; Schema: public; Owner: nguyenvanhung
--

CREATE TABLE public.product_variants (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    "sizeId" integer,
    "colorId" integer,
    price integer,
    quantity integer DEFAULT 0 NOT NULL,
    sku text,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" integer,
    "updatedAt" timestamp(3) without time zone,
    "updatedBy" integer,
    "deletedAt" timestamp(3) without time zone,
    "deletedBy" integer,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.product_variants OWNER TO nguyenvanhung;

--
-- Name: product_variants_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyenvanhung
--

CREATE SEQUENCE public.product_variants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_variants_id_seq OWNER TO nguyenvanhung;

--
-- Name: product_variants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyenvanhung
--

ALTER SEQUENCE public.product_variants_id_seq OWNED BY public.product_variants.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: nguyenvanhung
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    slug text NOT NULL,
    description text,
    "ratingAvg" double precision DEFAULT 0 NOT NULL,
    "ratingCount" integer DEFAULT 0 NOT NULL,
    sold integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" integer,
    "updatedAt" timestamp(3) without time zone,
    "updatedBy" integer,
    "deletedAt" timestamp(3) without time zone,
    "deletedBy" integer,
    "isDeleted" boolean DEFAULT false NOT NULL,
    images jsonb
);


ALTER TABLE public.products OWNER TO nguyenvanhung;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyenvanhung
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO nguyenvanhung;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyenvanhung
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: nguyenvanhung
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    rating integer NOT NULL,
    comment text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" integer,
    "deletedAt" timestamp(3) without time zone,
    "deletedBy" integer,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.reviews OWNER TO nguyenvanhung;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyenvanhung
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO nguyenvanhung;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyenvanhung
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: sizes; Type: TABLE; Schema: public; Owner: nguyenvanhung
--

CREATE TABLE public.sizes (
    id integer NOT NULL,
    name text NOT NULL,
    value integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" integer,
    "updatedAt" timestamp(3) without time zone,
    "updatedBy" integer,
    "deletedAt" timestamp(3) without time zone,
    "deletedBy" integer,
    "isDeleted" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.sizes OWNER TO nguyenvanhung;

--
-- Name: sizes_id_seq; Type: SEQUENCE; Schema: public; Owner: nguyenvanhung
--

CREATE SEQUENCE public.sizes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sizes_id_seq OWNER TO nguyenvanhung;

--
-- Name: sizes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nguyenvanhung
--

ALTER SEQUENCE public.sizes_id_seq OWNED BY public.sizes.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: colors id; Type: DEFAULT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.colors ALTER COLUMN id SET DEFAULT nextval('public.colors_id_seq'::regclass);


--
-- Name: product_variants id; Type: DEFAULT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.product_variants ALTER COLUMN id SET DEFAULT nextval('public.product_variants_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: sizes id; Type: DEFAULT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.sizes ALTER COLUMN id SET DEFAULT nextval('public.sizes_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: nguyenvanhung
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
f77b582c-7f02-4f8c-b179-fffbeee11190	ab75ccb8120cfe3849b085d4e073977aecee2b443c173453d19e3613aead5a1f	2026-01-27 14:37:49.030883+07	20260127073749_init_category	\N	\N	2026-01-27 14:37:49.02661+07	1
349f7792-e875-4bab-b730-ecc4f1afb8c6	d58bf8f91dfbca5a9e2c620a67f498bc0b82ac30c0fc10b38c586476363b1634	2026-01-28 09:24:13.096161+07	20260128022413_add_sold_to_product	\N	\N	2026-01-28 09:24:13.07197+07	1
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: nguyenvanhung
--

COPY public.categories (id, name, description, "createdAt", "createdBy", "updatedAt", "updatedBy", "deletedAt", "deletedBy", "isDeleted") FROM stdin;
1	Vòng Đá Tự Nhiên	Vòng tay làm từ đá quý tự nhiên, mang ý nghĩa phong thủy	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
2	Vòng Đá Mắt Hổ	Vòng tay đá mắt hổ - thu hút tài lộc, xua đuổi tà khí	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
3	Vòng Thạch Anh	Vòng tay thạch anh các loại - trong suốt, hồng, tím, vàng	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
4	Vòng Trầm Hương	Vòng tay trầm hương thiên nhiên, mùi thơm dịu nhẹ	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
5	Vòng Gỗ Sưa	Vòng tay gỗ sưa quý hiếm, đẹp tự nhiên	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
6	Vòng Bạc	Vòng tay bạc 925, thiết kế tinh xảo	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
7	Vòng Charm	Vòng tay charm đa dạng kiểu dáng, phối hợp linh hoạt	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
8	Vòng Tết Dây	Vòng tay tết dây thủ công, phong cách Handmade	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
9	Vòng Mệnh Kim	Vòng tay phù hợp với người mệnh Kim	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
10	Vòng Mệnh Thủy	Vòng tay phù hợp với người mệnh Thủy	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
11	Vòng Mệnh Mộc	Vòng tay phù hợp với người mệnh Mộc	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
12	Vòng Mệnh Hỏa	Vòng tay phù hợp với người mệnh Hỏa	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
13	Vòng Mệnh Thổ	Vòng tay phù hợp với người mệnh Thổ	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
14	Vòng Tài Lộc	Vòng tay thu hút tài lộc, may mắn	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
15	Vòng Bình An	Vòng tay mang lại bình an, sức khỏe	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
16	Vòng Tình Duyên	Vòng tay giúp thuận lợi về tình cảm	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
17	Vòng Sự Nghiệp	Vòng tay hỗ trợ thăng tiến, thành công	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
18	Vòng Nam	Vòng tay dành cho nam giới	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
19	Vòng Nữ	Vòng tay dành cho nữ giới	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
20	Vòng Cặp Đôi	Vòng tay cặp đôi, tình nhân	2026-01-28 10:05:28.703	\N	\N	\N	\N	\N	f
\.


--
-- Data for Name: colors; Type: TABLE DATA; Schema: public; Owner: nguyenvanhung
--

COPY public.colors (id, name, code, "createdAt", "createdBy", "updatedAt", "updatedBy", "deletedAt", "deletedBy", "isDeleted") FROM stdin;
1	Đen	#000000	2026-01-28 10:05:56.664	\N	\N	\N	\N	\N	f
2	Nâu	#8B4513	2026-01-28 10:05:56.664	\N	\N	\N	\N	\N	f
3	Vàng	#FFD700	2026-01-28 10:05:56.664	\N	\N	\N	\N	\N	f
4	Xanh Lá	#228B22	2026-01-28 10:05:56.664	\N	\N	\N	\N	\N	f
5	Xanh Dương	#4169E1	2026-01-28 10:05:56.664	\N	\N	\N	\N	\N	f
6	Tím	#9370DB	2026-01-28 10:05:56.664	\N	\N	\N	\N	\N	f
7	Hồng	#FF69B4	2026-01-28 10:05:56.664	\N	\N	\N	\N	\N	f
8	Trắng	#FFFFFF	2026-01-28 10:05:56.664	\N	\N	\N	\N	\N	f
9	Đỏ	#DC143C	2026-01-28 10:05:56.664	\N	\N	\N	\N	\N	f
10	Cam	#FF8C00	2026-01-28 10:05:56.664	\N	\N	\N	\N	\N	f
11	Vàng Nâu	#B8860B	2026-01-28 10:05:56.664	\N	\N	\N	\N	\N	f
12	Xanh Ngọc	#20B2AA	2026-01-28 10:05:56.664	\N	\N	\N	\N	\N	f
13	Bạc	#C0C0C0	2026-01-28 10:05:56.664	\N	\N	\N	\N	\N	f
14	Mix	#808080	2026-01-28 10:05:56.664	\N	\N	\N	\N	\N	f
\.


--
-- Data for Name: product_categories; Type: TABLE DATA; Schema: public; Owner: nguyenvanhung
--

COPY public.product_categories ("productId", "categoryId", "isPrimary", "createdAt", "createdBy", "deletedAt", "deletedBy", "isDeleted") FROM stdin;
1	2	t	2026-01-28 10:14:17.869	\N	\N	\N	f
1	1	f	2026-01-28 10:14:17.869	\N	\N	\N	f
1	14	f	2026-01-28 10:14:17.869	\N	\N	\N	f
1	18	f	2026-01-28 10:14:17.869	\N	\N	\N	f
2	3	t	2026-01-28 10:14:17.869	\N	\N	\N	f
2	1	f	2026-01-28 10:14:17.869	\N	\N	\N	f
2	15	f	2026-01-28 10:14:17.869	\N	\N	\N	f
2	19	f	2026-01-28 10:14:17.869	\N	\N	\N	f
3	3	t	2026-01-28 10:14:17.869	\N	\N	\N	f
3	1	f	2026-01-28 10:14:17.869	\N	\N	\N	f
3	16	f	2026-01-28 10:14:17.869	\N	\N	\N	f
3	19	f	2026-01-28 10:14:17.869	\N	\N	\N	f
4	3	t	2026-01-28 10:14:17.869	\N	\N	\N	f
4	1	f	2026-01-28 10:14:17.869	\N	\N	\N	f
4	15	f	2026-01-28 10:14:17.869	\N	\N	\N	f
4	9	f	2026-01-28 10:14:17.869	\N	\N	\N	f
5	1	t	2026-01-28 10:14:17.869	\N	\N	\N	f
5	15	f	2026-01-28 10:14:17.869	\N	\N	\N	f
5	10	f	2026-01-28 10:14:17.869	\N	\N	\N	f
5	18	f	2026-01-28 10:14:17.869	\N	\N	\N	f
6	1	t	2026-01-28 10:14:17.869	\N	\N	\N	f
6	17	f	2026-01-28 10:14:17.869	\N	\N	\N	f
6	12	f	2026-01-28 10:14:17.869	\N	\N	\N	f
6	18	f	2026-01-28 10:14:17.869	\N	\N	\N	f
7	1	t	2026-01-28 10:14:17.869	\N	\N	\N	f
7	17	f	2026-01-28 10:14:17.869	\N	\N	\N	f
7	10	f	2026-01-28 10:14:17.869	\N	\N	\N	f
8	1	t	2026-01-28 10:14:17.869	\N	\N	\N	f
8	14	f	2026-01-28 10:14:17.869	\N	\N	\N	f
8	11	f	2026-01-28 10:14:17.869	\N	\N	\N	f
8	19	f	2026-01-28 10:14:17.869	\N	\N	\N	f
9	4	t	2026-01-28 10:14:17.869	\N	\N	\N	f
9	15	f	2026-01-28 10:14:17.869	\N	\N	\N	f
9	18	f	2026-01-28 10:14:17.869	\N	\N	\N	f
10	4	t	2026-01-28 10:14:17.869	\N	\N	\N	f
10	15	f	2026-01-28 10:14:17.869	\N	\N	\N	f
10	11	f	2026-01-28 10:14:17.869	\N	\N	\N	f
11	5	t	2026-01-28 10:14:17.869	\N	\N	\N	f
11	14	f	2026-01-28 10:14:17.869	\N	\N	\N	f
11	18	f	2026-01-28 10:14:17.869	\N	\N	\N	f
12	5	t	2026-01-28 10:14:17.869	\N	\N	\N	f
12	15	f	2026-01-28 10:14:17.869	\N	\N	\N	f
12	12	f	2026-01-28 10:14:17.869	\N	\N	\N	f
13	6	t	2026-01-28 10:14:17.869	\N	\N	\N	f
13	14	f	2026-01-28 10:14:17.869	\N	\N	\N	f
13	18	f	2026-01-28 10:14:17.869	\N	\N	\N	f
14	6	t	2026-01-28 10:14:17.869	\N	\N	\N	f
14	15	f	2026-01-28 10:14:17.869	\N	\N	\N	f
14	18	f	2026-01-28 10:14:17.869	\N	\N	\N	f
15	7	t	2026-01-28 10:14:17.869	\N	\N	\N	f
15	14	f	2026-01-28 10:14:17.869	\N	\N	\N	f
15	19	f	2026-01-28 10:14:17.869	\N	\N	\N	f
16	7	t	2026-01-28 10:14:17.869	\N	\N	\N	f
16	14	f	2026-01-28 10:14:17.869	\N	\N	\N	f
16	18	f	2026-01-28 10:14:17.869	\N	\N	\N	f
17	8	t	2026-01-28 10:14:17.869	\N	\N	\N	f
17	14	f	2026-01-28 10:14:17.869	\N	\N	\N	f
17	15	f	2026-01-28 10:14:17.869	\N	\N	\N	f
18	8	t	2026-01-28 10:14:17.869	\N	\N	\N	f
18	15	f	2026-01-28 10:14:17.869	\N	\N	\N	f
19	3	t	2026-01-28 10:14:17.869	\N	\N	\N	f
19	1	f	2026-01-28 10:14:17.869	\N	\N	\N	f
19	14	f	2026-01-28 10:14:17.869	\N	\N	\N	f
19	18	f	2026-01-28 10:14:17.869	\N	\N	\N	f
20	1	t	2026-01-28 10:14:17.869	\N	\N	\N	f
20	15	f	2026-01-28 10:14:17.869	\N	\N	\N	f
20	14	f	2026-01-28 10:14:17.869	\N	\N	\N	f
21	1	t	2026-01-28 10:14:17.869	\N	\N	\N	f
21	14	f	2026-01-28 10:14:17.869	\N	\N	\N	f
21	13	f	2026-01-28 10:14:17.869	\N	\N	\N	f
21	18	f	2026-01-28 10:14:17.869	\N	\N	\N	f
22	1	t	2026-01-28 10:14:17.869	\N	\N	\N	f
22	16	f	2026-01-28 10:14:17.869	\N	\N	\N	f
22	12	f	2026-01-28 10:14:17.869	\N	\N	\N	f
22	19	f	2026-01-28 10:14:17.869	\N	\N	\N	f
23	1	t	2026-01-28 10:14:17.869	\N	\N	\N	f
23	15	f	2026-01-28 10:14:17.869	\N	\N	\N	f
24	1	t	2026-01-28 10:14:17.869	\N	\N	\N	f
24	14	f	2026-01-28 10:14:17.869	\N	\N	\N	f
24	18	f	2026-01-28 10:14:17.869	\N	\N	\N	f
25	20	t	2026-01-28 10:14:17.869	\N	\N	\N	f
25	3	f	2026-01-28 10:14:17.869	\N	\N	\N	f
25	16	f	2026-01-28 10:14:17.869	\N	\N	\N	f
26	20	t	2026-01-28 10:14:17.869	\N	\N	\N	f
26	14	f	2026-01-28 10:14:17.869	\N	\N	\N	f
26	1	f	2026-01-28 10:14:17.869	\N	\N	\N	f
\.


--
-- Data for Name: product_variants; Type: TABLE DATA; Schema: public; Owner: nguyenvanhung
--

COPY public.product_variants (id, "productId", "sizeId", "colorId", price, quantity, sku, "isActive", "createdAt", "createdBy", "updatedAt", "updatedBy", "deletedAt", "deletedBy", "isDeleted") FROM stdin;
381	1	3	11	350000	45	MH-8MM-16-VN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
382	1	4	11	380000	38	MH-8MM-17-VN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
383	1	5	11	410000	32	MH-8MM-18-VN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
384	1	6	11	440000	25	MH-8MM-19-VN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
385	2	2	6	520000	28	TAT-10MM-15-TIM	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
386	2	3	6	560000	35	TAT-10MM-16-TIM	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
387	2	4	6	600000	30	TAT-10MM-17-TIM	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
388	2	5	6	640000	22	TAT-10MM-18-TIM	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
389	3	1	7	420000	42	TAH-8MM-14-HONG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
390	3	2	7	450000	48	TAH-8MM-15-HONG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
391	3	3	7	480000	40	TAH-8MM-16-HONG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
392	3	4	7	510000	35	TAH-8MM-17-HONG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
393	4	3	8	580000	25	TAT-12MM-16-TR	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
394	4	4	8	630000	20	TAT-12MM-17-TR	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
395	4	5	8	680000	18	TAT-12MM-18-TR	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
396	4	6	8	730000	15	TAT-12MM-19-TR	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
397	5	4	1	380000	50	OBS-10MM-17-DEN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
398	5	5	1	420000	45	OBS-10MM-18-DEN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
399	5	6	1	460000	38	OBS-10MM-19-DEN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
400	5	7	1	500000	30	OBS-10MM-20-DEN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
401	6	3	9	320000	35	MND-8MM-16-DO	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
402	6	4	9	350000	32	MND-8MM-17-DO	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
403	6	5	9	380000	28	MND-8MM-18-DO	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
404	6	6	9	410000	22	MND-8MM-19-DO	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
405	7	2	5	550000	18	LAP-8MM-15-XD	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
406	7	3	5	580000	22	LAP-8MM-16-XD	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
407	7	4	5	610000	20	LAP-8MM-17-XD	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
408	7	5	5	640000	15	LAP-8MM-18-XD	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
409	8	1	4	280000	25	MM-6MM-14-XL	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
410	8	2	4	300000	30	MM-6MM-15-XL	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
411	8	3	4	320000	28	MM-6MM-16-XL	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
412	8	4	4	340000	22	MM-6MM-17-XL	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
413	9	4	2	1200000	12	TH-12MM-17-NAU	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
414	9	5	2	1350000	10	TH-12MM-18-NAU	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
415	9	6	2	1500000	8	TH-12MM-19-NAU	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
416	9	7	2	1650000	6	TH-12MM-20-NAU	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
417	10	3	2	850000	15	THT-10MM-16-NAU	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
418	10	4	2	920000	12	THT-10MM-17-NAU	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
419	10	5	2	990000	10	THT-10MM-18-NAU	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
420	10	6	2	1060000	8	THT-10MM-19-NAU	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
421	11	4	9	2500000	5	SUA-12MM-17-DO	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
422	11	5	9	2750000	4	SUA-12MM-18-DO	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
423	11	6	9	3000000	3	SUA-12MM-19-DO	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
424	11	7	9	3250000	2	SUA-12MM-20-DO	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
425	12	3	9	1800000	8	HR-10MM-16-DO	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
426	12	4	9	1950000	7	HR-10MM-17-DO	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
427	12	5	9	2100000	6	HR-10MM-18-DO	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
428	12	6	9	2250000	5	HR-10MM-19-DO	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
429	13	8	13	980000	25	BAC-RONG-FS-BAC	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
430	14	8	14	850000	30	BAC-ONX-FS-MIX	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
431	15	2	14	420000	40	CH-BI-15-MIX	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
432	15	3	14	450000	45	CH-BI-16-MIX	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
433	15	4	14	480000	38	CH-BI-17-MIX	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
434	15	5	14	510000	32	CH-BI-18-MIX	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
435	16	4	3	680000	35	CH-TH-17-VAG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
436	16	5	3	720000	30	CH-TH-18-VAG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
437	16	6	3	760000	25	CH-TH-19-VAG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
438	16	7	3	800000	20	CH-TH-20-VAG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
439	17	8	9	180000	60	TD-DO-FS-DO	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
440	18	8	14	150000	70	TD-5M-FS-MIX	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
441	19	4	3	750000	22	TAT-8MM-17-VAG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
442	19	5	3	810000	18	TAT-8MM-18-VAG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
443	19	6	3	870000	15	TAT-8MM-19-VAG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
444	19	7	3	930000	12	TAT-8MM-20-VAG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
445	20	3	12	3500000	6	PT-16-XN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
446	20	4	12	3800000	5	PT-17-XN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
447	20	5	12	4100000	4	PT-18-XN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
448	20	6	12	4400000	3	PT-19-XN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
449	21	4	3	620000	28	CIT-10MM-17-VAG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
450	21	5	3	670000	24	CIT-10MM-18-VAG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
451	21	6	3	720000	20	CIT-10MM-19-VAG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
452	21	7	3	770000	16	CIT-10MM-20-VAG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
453	22	1	9	480000	20	GAR-8MM-14-DO	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
454	22	2	9	510000	25	GAR-8MM-15-DO	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
455	22	3	9	540000	22	GAR-8MM-16-DO	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
456	22	4	9	570000	18	GAR-8MM-17-DO	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
457	23	3	14	390000	50	7CH-16-MIX	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
458	23	4	14	420000	55	7CH-17-MIX	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
459	23	5	14	450000	48	7CH-18-MIX	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
460	23	6	14	480000	40	7CH-19-MIX	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
461	24	4	14	580000	32	MIX-TL-17-MIX	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
462	24	5	14	630000	28	MIX-TL-18-MIX	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
463	24	6	14	680000	24	MIX-TL-19-MIX	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
464	24	7	14	730000	20	MIX-TL-20-MIX	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
465	25	3	7	520000	15	CP-TAH-16-HONG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
466	25	3	1	520000	15	CP-OBS-16-DEN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
467	25	4	7	560000	12	CP-TAH-17-HONG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
468	25	4	1	560000	12	CP-OBS-17-DEN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
469	25	5	7	600000	10	CP-TAH-18-HONG	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
470	25	5	1	600000	10	CP-OBS-18-DEN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
471	26	4	12	1280000	10	CP-TH-17-XN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
472	26	5	12	1380000	8	CP-TH-18-XN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
473	26	6	12	1480000	6	CP-TH-19-XN	t	2026-01-28 10:16:39.249	\N	\N	\N	\N	\N	f
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: nguyenvanhung
--

COPY public.products (id, name, slug, description, "ratingAvg", "ratingCount", sold, "createdAt", "createdBy", "updatedAt", "updatedBy", "deletedAt", "deletedBy", "isDeleted", images) FROM stdin;
1	Vòng Tay Đá Mắt Hổ Vàng Nâu 8mm	vong-tay-da-mat-ho-vang-nau-8mm	Vòng tay đá mắt hổ vàng nâu thiên nhiên 8mm, mang lại may mắn, tài lộc. Đá có độ bóng tự nhiên, vân rõ nét.	4.8	156	423	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/mat-ho-1.jpg", "https://example.com/mat-ho-2.jpg", "https://example.com/mat-ho-3.jpg"]
2	Vòng Tay Thạch Anh Tím 10mm	vong-tay-thach-anh-tim-10mm	Vòng tay thạch anh tím Uruguay cao cấp 10mm, màu tím đậm. Giúp tăng cường trực giác, bình an.	4.7	203	567	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/thach-anh-tim-1.jpg", "https://example.com/thach-anh-tim-2.jpg"]
3	Vòng Tay Thạch Anh Hồng 8mm	vong-tay-thach-anh-hong-8mm	Vòng tay thạch anh hồng Madagascar 8mm, màu hồng pastel dịu nhẹ. Thúc đẩy tình yêu, hạnh phúc.	4.9	189	634	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/thach-anh-hong-1.jpg"]
4	Vòng Tay Thạch Anh Trắng 12mm	vong-tay-thach-anh-trang-12mm	Vòng tay thạch anh trắng trong suốt 12mm, thanh lọc năng lượng, tăng cường sức khỏe.	4.6	145	389	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/thach-anh-trang-1.jpg", "https://example.com/thach-anh-trang-2.jpg"]
5	Vòng Tay Đá Obsidian Đen 10mm	vong-tay-da-obsidian-den-10mm	Vòng tay đá Obsidian đen bóng 10mm, bảo vệ khỏi năng lượng tiêu cực, xua đuổi tà khí.	4.8	234	701	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/obsidian-1.jpg"]
6	Vòng Tay Đá Mã Não Đỏ 8mm	vong-tay-da-ma-nao-do-8mm	Vòng tay mã não đỏ tự nhiên 8mm, tăng sức sống, năng lượng, giúp thành công trong công việc.	4.7	167	445	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/ma-nao-do-1.jpg", "https://example.com/ma-nao-do-2.jpg"]
7	Vòng Tay Đá Lapis Lazuli 8mm	vong-tay-da-lapis-lazuli-8mm	Vòng tay đá Lapis Lazuli xanh coban 8mm, khai mở trí tuệ, tăng cường khả năng giao tiếp.	4.6	124	298	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/lapis-1.jpg"]
8	Vòng Tay Đá Mắt Mèo Xanh Lá 6mm	vong-tay-da-mat-meo-xanh-la-6mm	Vòng tay đá mắt mèo xanh lá 6mm, thu hút tài lộc, giúp kinh doanh thuận lợi.	4.5	98	256	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/mat-meo-1.jpg", "https://example.com/mat-meo-2.jpg"]
9	Vòng Tay Trầm Hương Thiên Nhiên 12mm	vong-tay-tram-huong-thien-nhien-12mm	Vòng tay trầm hương thiên nhiên Khánh Hòa 12mm, mùi thơm dịu, mang lại bình an và may mắn.	4.9	178	412	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/tram-huong-1.jpg", "https://example.com/tram-huong-2.jpg"]
10	Vòng Tay Trầm Hương Tốc 10mm	vong-tay-tram-huong-toc-10mm	Vòng tay trầm hương tốc 10mm, vân gỗ đẹp, thơm nhẹ, phù hợp mọi lứa tuổi.	4.7	145	334	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/tram-toc-1.jpg"]
11	Vòng Tay Gỗ Sưa Đỏ 12mm	vong-tay-go-sua-do-12mm	Vòng tay gỗ sưa đỏ quý hiếm 12mm, vân gỗ đẹp tự nhiên, mang lại phú quý, sang trọng.	4.8	132	289	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/go-sua-1.jpg", "https://example.com/go-sua-2.jpg"]
12	Vòng Tay Gỗ Huyết Rồng 10mm	vong-tay-go-huyet-rong-10mm	Vòng tay gỗ huyết rồng 10mm, màu đỏ tự nhiên, bảo vệ sức khỏe, xua đuổi tà ma.	4.6	109	245	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/huyet-rong-1.jpg"]
13	Vòng Tay Bạc 925 Họa Tiết Rồng	vong-tay-bac-925-hoa-tiet-rong	Vòng tay bạc 925 khắc họa tiết rồng phượng tinh xảo, mạ bạc cao cấp, sang trọng.	4.9	167	378	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/bac-rong-1.jpg", "https://example.com/bac-rong-2.jpg"]
14	Vòng Tay Bạc 925 Mix Đá Onyx	vong-tay-bac-925-mix-da-onyx	Vòng tay bạc 925 kết hợp đá Onyx đen, thiết kế hiện đại, phong cách cá tính.	4.7	143	312	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/bac-onyx-1.jpg"]
15	Vòng Tay Charm Bi May Mắn	vong-tay-charm-bi-may-man	Vòng tay charm với các viên bi đá phong thủy mix, mang lại may mắn và tài lộc.	4.5	198	523	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/charm-1.jpg", "https://example.com/charm-2.jpg"]
16	Vòng Tay Charm Tỳ Hưu Vàng	vong-tay-charm-ty-huu-vang	Vòng tay charm Tỳ Hưu mạ vàng 24k kết hợp đá obsidian, thu hút tài lộc mạnh mẽ.	4.8	221	612	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/ty-huu-1.jpg"]
17	Vòng Tay Tết Dây Đỏ Charm Vàng	vong-tay-tet-day-do-charm-vang	Vòng tay tết dây đỏ handmade kèm charm vàng 24k, mang lại may mắn và bình an.	4.6	245	687	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/tet-day-1.jpg", "https://example.com/tet-day-2.jpg"]
18	Vòng Tay Tết Dây Phong Thủy 5 Màu	vong-tay-tet-day-phong-thuy-5-mau	Vòng tay tết dây 5 màu theo phong thủy ngũ hành, cân bằng năng lượng, vượng khí.	4.7	189	534	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/5-mau-1.jpg"]
19	Vòng Tay Đá Thạch Anh Tóc Vàng 8mm	vong-tay-da-thach-anh-toc-vang-8mm	Vòng tay thạch anh tóc vàng Brazil 8mm, tóc dày đẹp, thu hút tài lộc và thành công.	4.9	178	467	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/toc-vang-1.jpg", "https://example.com/toc-vang-2.jpg"]
20	Vòng Tay Đá Phỉ Thúy Miến Điện	vong-tay-da-phi-thuy-mien-dien	Vòng tay đá phỉ thúy Miến Điện A, màu xanh đậm tự nhiên, mang lại bình an và sức khỏe.	4.8	134	345	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/phi-thuy-1.jpg"]
21	Vòng Tay Đá Citrine Vàng 10mm	vong-tay-da-citrine-vang-10mm	Vòng tay đá Citrine vàng chanh 10mm, nam châm thu hút tiền bạc, công danh.	4.7	156	423	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/citrine-1.jpg", "https://example.com/citrine-2.jpg"]
22	Vòng Tay Đá Garnet Đỏ 8mm	vong-tay-da-garnet-do-8mm	Vòng tay đá Garnet đỏ 8mm, tăng cường năng lượng, sức sống, thúc đẩy tình yêu.	4.6	123	298	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/garnet-1.jpg"]
23	Vòng Tay 7 Chakra	vong-tay-7-chakra	Vòng tay 7 viên đá Chakra cân bằng năng lượng toàn thân, hòa hợp thân - tâm - trí.	4.8	267	745	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/7-chakra-1.jpg", "https://example.com/7-chakra-2.jpg"]
24	Vòng Tay Mix Đá Phong Thủy Tài Lộc	vong-tay-mix-da-phong-thuy-tai-loc	Vòng tay mix các loại đá thu hút tài lộc: mắt hổ, citrine, thạch anh tóc vàng.	4.7	198	556	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/mix-tai-loc-1.jpg"]
25	Vòng Tay Cặp Đôi Thạch Anh Hồng Đen	vong-tay-cap-doi-thach-anh-hong-den	Vòng tay cặp đôi thạch anh hồng và obsidian đen, tượng trưng âm dương hòa hợp.	4.9	234	623	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/cap-doi-1.jpg", "https://example.com/cap-doi-2.jpg"]
26	Vòng Tay Cặp Tỳ Hưu Ngọc Phỉ Thúy	vong-tay-cap-ty-huu-ngoc-phi-thuy	Vòng tay cặp charm Tỳ Hưu ngọc phỉ thúy, mang lại tài lộc cho đôi lứa.	4.8	187	478	2026-01-28 10:06:52.819	\N	\N	\N	\N	\N	f	["https://example.com/ty-huu-cap-1.jpg"]
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: nguyenvanhung
--

COPY public.reviews (id, "productId", rating, comment, "createdAt", "createdBy", "deletedAt", "deletedBy", "isDeleted") FROM stdin;
1	1	5	Vòng đẹp lắm, đá bóng mượt, vân rõ nét. Mang rất hợp tay!	2026-01-18 10:16:42.546	\N	\N	\N	f
2	1	5	Chất lượng tuyệt vời, giao hàng nhanh. Sẽ ủng hộ shop lâu dài	2026-01-20 10:16:42.546	\N	\N	\N	f
3	1	4	Đá đẹp, đúng mô tả. Giá hơi cao nhưng chất lượng xứng đáng	2026-01-23 10:16:42.546	\N	\N	\N	f
4	1	5	Mang được 1 tuần rồi, cảm giác rất tốt. Công việc cũng thuận lợi hơn	2026-01-25 10:16:42.546	\N	\N	\N	f
5	1	5	Vòng đẹp xuất sắc, đúng như hình. Shop tư vấn nhiệt tình	2026-01-27 10:16:42.546	\N	\N	\N	f
6	2	5	Màu tím rất đẹp, trong suốt, đá tự nhiên 100%	2026-01-16 10:16:42.546	\N	\N	\N	f
7	2	5	Vòng đeo rất sang, mình rất thích. Ngủ ngon hơn từ khi đeo	2026-01-19 10:16:42.546	\N	\N	\N	f
8	2	4	Sản phẩm tốt, đóng gói cẩn thận. Chỉ hơi nhỏ so với tay mình thôi	2026-01-22 10:16:42.546	\N	\N	\N	f
9	2	5	Thạch anh tím đẹp lắm, năng lượng rất tốt	2026-01-24 10:16:42.546	\N	\N	\N	f
10	3	5	Màu hồng xinh xắn quá! Mang rất dịu dàng, nữ tính	2026-01-17 10:16:42.546	\N	\N	\N	f
11	3	5	Vòng đẹp, đá trong, màu hồng pastel nhẹ nhàng. Rất hài lòng	2026-01-21 10:16:42.546	\N	\N	\N	f
12	3	5	Chất lượng tuyệt vời, đúng như mô tả. Sẽ mua thêm làm quà	2026-01-23 10:16:42.546	\N	\N	\N	f
13	3	4	Vòng ổn, đẹp như hình. Giá hợp lý	2026-01-26 10:16:42.546	\N	\N	\N	f
14	5	5	Đá đen bóng lóng, rất đẹp. Mang cảm giác an toàn	2026-01-15 10:16:42.546	\N	\N	\N	f
15	5	5	Obsidian chất lượng cao, năng lượng mạnh mẽ	2026-01-18 10:16:42.546	\N	\N	\N	f
16	5	4	Vòng đẹp, đá tự nhiên. Giao hàng nhanh	2026-01-22 10:16:42.546	\N	\N	\N	f
17	5	5	Rất hài lòng với sản phẩm này. Chất lượng tốt	2026-01-25 10:16:42.546	\N	\N	\N	f
18	9	5	Trầm thơm nhẹ nhàng, mang rất thoải mái. Đáng đồng tiền	2026-01-13 10:16:42.546	\N	\N	\N	f
19	9	5	Chất lượng trầm tuyệt vời, thơm tự nhiên không pha tạp	2026-01-16 10:16:42.546	\N	\N	\N	f
20	9	5	Vòng đẹp, vân gỗ tự nhiên. Mang thấy thanh thản	2026-01-20 10:16:42.546	\N	\N	\N	f
21	16	5	Tỳ Hưu đẹp, mạ vàng bền. Rất ưng ý	2026-01-14 10:16:42.546	\N	\N	\N	f
22	16	5	Vòng đẹp lắm, charm Tỳ Hưu tinh xảo. Mang thu hút vượng khí	2026-01-18 10:16:42.546	\N	\N	\N	f
23	16	4	Sản phẩm tốt, giá hợp lý. Đóng gói kỹ càng	2026-01-23 10:16:42.546	\N	\N	\N	f
24	23	5	Vòng 7 màu rất đẹp, đủ màu sắc. Cân bằng năng lượng tốt	2026-01-19 10:16:42.546	\N	\N	\N	f
25	23	5	Đá đẹp, màu sắc rực rỡ. Mang rất thích	2026-01-22 10:16:42.546	\N	\N	\N	f
26	23	5	Chất lượng xuất sắc, đúng như mô tả	2026-01-25 10:16:42.546	\N	\N	\N	f
27	25	5	Vòng cặp đôi rất đẹp và ý nghĩa. Tặng người yêu rất hài lòng	2026-01-17 10:16:42.546	\N	\N	\N	f
28	25	5	Thiết kế đẹp, đá chất lượng. Cả 2 vòng đều ưng ý	2026-01-21 10:16:42.546	\N	\N	\N	f
29	25	5	Quà tặng ý nghĩa, shop đóng gói rất đẹp	2026-01-24 10:16:42.546	\N	\N	\N	f
\.


--
-- Data for Name: sizes; Type: TABLE DATA; Schema: public; Owner: nguyenvanhung
--

COPY public.sizes (id, name, value, "createdAt", "createdBy", "updatedAt", "updatedBy", "deletedAt", "deletedBy", "isDeleted") FROM stdin;
1	14cm	14	2026-01-28 10:05:36.664	\N	\N	\N	\N	\N	f
2	15cm	15	2026-01-28 10:05:36.664	\N	\N	\N	\N	\N	f
3	16cm	16	2026-01-28 10:05:36.664	\N	\N	\N	\N	\N	f
4	17cm	17	2026-01-28 10:05:36.664	\N	\N	\N	\N	\N	f
5	18cm	18	2026-01-28 10:05:36.664	\N	\N	\N	\N	\N	f
6	19cm	19	2026-01-28 10:05:36.664	\N	\N	\N	\N	\N	f
7	20cm	20	2026-01-28 10:05:36.664	\N	\N	\N	\N	\N	f
8	Freesize	0	2026-01-28 10:05:36.664	\N	\N	\N	\N	\N	f
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyenvanhung
--

SELECT pg_catalog.setval('public.categories_id_seq', 20, true);


--
-- Name: colors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyenvanhung
--

SELECT pg_catalog.setval('public.colors_id_seq', 56, true);


--
-- Name: product_variants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyenvanhung
--

SELECT pg_catalog.setval('public.product_variants_id_seq', 473, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyenvanhung
--

SELECT pg_catalog.setval('public.products_id_seq', 26, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyenvanhung
--

SELECT pg_catalog.setval('public.reviews_id_seq', 29, true);


--
-- Name: sizes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nguyenvanhung
--

SELECT pg_catalog.setval('public.sizes_id_seq', 8, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: colors colors_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_pkey PRIMARY KEY (id);


--
-- Name: product_categories product_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT product_categories_pkey PRIMARY KEY ("productId", "categoryId");


--
-- Name: product_variants product_variants_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT product_variants_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: sizes sizes_pkey; Type: CONSTRAINT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.sizes
    ADD CONSTRAINT sizes_pkey PRIMARY KEY (id);


--
-- Name: categories_name_key; Type: INDEX; Schema: public; Owner: nguyenvanhung
--

CREATE UNIQUE INDEX categories_name_key ON public.categories USING btree (name);


--
-- Name: product_variants_productId_sizeId_colorId_key; Type: INDEX; Schema: public; Owner: nguyenvanhung
--

CREATE UNIQUE INDEX "product_variants_productId_sizeId_colorId_key" ON public.product_variants USING btree ("productId", "sizeId", "colorId");


--
-- Name: product_variants_sku_key; Type: INDEX; Schema: public; Owner: nguyenvanhung
--

CREATE UNIQUE INDEX product_variants_sku_key ON public.product_variants USING btree (sku);


--
-- Name: products_slug_key; Type: INDEX; Schema: public; Owner: nguyenvanhung
--

CREATE UNIQUE INDEX products_slug_key ON public.products USING btree (slug);


--
-- Name: product_categories product_categories_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT "product_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: product_categories product_categories_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT "product_categories_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: product_variants product_variants_colorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT "product_variants_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES public.colors(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: product_variants product_variants_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT "product_variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: product_variants product_variants_sizeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT "product_variants_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES public.sizes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: reviews reviews_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nguyenvanhung
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: nguyenvanhung
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict XeXKgneRms5piedQNd25kbW9xqblP9SqNSMBMxTroov3EngNkOeSLxQEVJIlUZY

