--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-09-28 19:38:27

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
-- TOC entry 220 (class 1259 OID 65552)
-- Name: mascotas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mascotas (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    raza character varying(50) NOT NULL,
    especie character varying(10) NOT NULL,
    id_user integer NOT NULL
);


ALTER TABLE public.mascotas OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 65551)
-- Name: mascotas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mascotas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mascotas_id_seq OWNER TO postgres;

--
-- TOC entry 4864 (class 0 OID 0)
-- Dependencies: 219
-- Name: mascotas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mascotas_id_seq OWNED BY public.mascotas.id;


--
-- TOC entry 218 (class 1259 OID 65542)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    password_hash character varying(100) NOT NULL,
    nombre character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    correo character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 65541)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4865 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4702 (class 2604 OID 65555)
-- Name: mascotas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mascotas ALTER COLUMN id SET DEFAULT nextval('public.mascotas_id_seq'::regclass);


--
-- TOC entry 4700 (class 2604 OID 65545)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4858 (class 0 OID 65552)
-- Dependencies: 220
-- Data for Name: mascotas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mascotas (id, nombre, raza, especie, id_user) FROM stdin;
3	dick	aria	perro	5
4	Dick	Aria	perro	13
\.


--
-- TOC entry 4856 (class 0 OID 65542)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, password_hash, nombre, created_at, correo) FROM stdin;
5	$2b$10$oVdCuPdDKWadJtXbPAVHFOikF/Zq3fCRf0eLa0CXK4HL2K/M1kR6a	Daniel	2025-09-28 18:07:37.583739	daniel@gmail.com
13	$2b$10$5ietr.kLuatYvbTGlcNpv.uVvQHkchnOIkiy3PuxgEjWWUiA8tHzq	Daniell	2025-09-28 18:41:13.016277	daniel@gmail.com
\.


--
-- TOC entry 4866 (class 0 OID 0)
-- Dependencies: 219
-- Name: mascotas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mascotas_id_seq', 4, true);


--
-- TOC entry 4867 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- TOC entry 4708 (class 2606 OID 65557)
-- Name: mascotas mascotas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mascotas
    ADD CONSTRAINT mascotas_pkey PRIMARY KEY (id);


--
-- TOC entry 4704 (class 2606 OID 65564)
-- Name: users unique_nombre; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_nombre UNIQUE (nombre);


--
-- TOC entry 4706 (class 2606 OID 65548)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4709 (class 2606 OID 65558)
-- Name: mascotas mascotas_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mascotas
    ADD CONSTRAINT mascotas_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2025-09-28 19:38:28

--
-- PostgreSQL database dump complete
--

