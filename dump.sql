--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-06-25 19:39:13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 218 (class 1259 OID 18762)
-- Name: data_post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.data_post (
    id integer NOT NULL,
    name_post character varying(40) NOT NULL,
    text_post text NOT NULL,
    data_create timestamp with time zone DEFAULT now(),
    data_update timestamp with time zone DEFAULT now(),
    is_public boolean DEFAULT false,
    user_id integer
);


ALTER TABLE public.data_post OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 18761)
-- Name: data_post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.data_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.data_post_id_seq OWNER TO postgres;

--
-- TOC entry 4869 (class 0 OID 0)
-- Dependencies: 217
-- Name: data_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.data_post_id_seq OWNED BY public.data_post.id;


--
-- TOC entry 220 (class 1259 OID 26940)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 26939)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 4870 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4700 (class 2604 OID 18765)
-- Name: data_post id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_post ALTER COLUMN id SET DEFAULT nextval('public.data_post_id_seq'::regclass);


--
-- TOC entry 4704 (class 2604 OID 26943)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4861 (class 0 OID 18762)
-- Dependencies: 218
-- Data for Name: data_post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.data_post (id, name_post, text_post, data_create, data_update, is_public, user_id) FROM stdin;
1	Name1	<p><span style="text-decoration: underline;"><em>some text</em></span></p>	2025-06-09 12:03:09.7467+03	2025-06-09 12:03:09.7467+03	t	\N
2	Name2	<p><strong>1234567890</strong></p>	2025-06-09 12:19:14.251136+03	2025-06-09 12:19:14.251136+03	t	\N
3	Name2	<p><strong>1234567890</strong></p>	2025-06-09 12:48:46.572447+03	2025-06-09 12:48:46.572447+03	t	\N
4	name4	<p>some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text some text&nbsp;</p>	2025-06-10 12:03:43.903183+03	2025-06-10 12:03:43.903183+03	t	\N
8	first	<p>123123123123123</p>	2025-06-24 11:28:39.168661+03	2025-06-25 14:36:19.03772+03	t	1
6	1234567	<p>123123131231й</p>	2025-06-23 11:26:46.01361+03	2025-06-25 14:49:40.880015+03	t	1
\.


--
-- TOC entry 4863 (class 0 OID 26940)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, email, password_hash, created_at) FROM stdin;
1	user	user@gmail.com	$2b$10$t11vCEyuslZ0KLTtXguspuZsJ5.q9xJ4AGR.kHPg/.nVwlF3m7MOS	2025-06-14 15:15:02.063299+03
2	user2	user2@gmail.com	$2b$10$ULrFqDh0i6pkSYppce2wTOLO1.gahxIG9oSTA99Ht7kYH/8GEsrwW	2025-06-14 15:43:25.708584+03
\.


--
-- TOC entry 4871 (class 0 OID 0)
-- Dependencies: 217
-- Name: data_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.data_post_id_seq', 8, true);


--
-- TOC entry 4872 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);


--
-- TOC entry 4707 (class 2606 OID 18771)
-- Name: data_post data_post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_post
    ADD CONSTRAINT data_post_pkey PRIMARY KEY (id);


--
-- TOC entry 4709 (class 2606 OID 26952)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4711 (class 2606 OID 26948)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4713 (class 2606 OID 26950)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4714 (class 2606 OID 26953)
-- Name: data_post fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.data_post
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


-- Completed on 2025-06-25 19:39:14

--
-- PostgreSQL database dump complete
--

