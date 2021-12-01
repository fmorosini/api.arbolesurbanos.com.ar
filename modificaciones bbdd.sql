ALTER TABLE public.arboles ADD usuario varchar(50) NULL;
-- setear usuarios para que la columna no tenga nulos
ALTER TABLE public.arboles ALTER COLUMN usuario SET NOT NULL;

CREATE TABLE public.usuarios (
	uid varchar(50) NOT NULL,
	email varchar(100) NOT NULL,
	nombre varchar(50) NULL,
	apellido varchar(50) NULL,
	CONSTRAINT usuarios_pk PRIMARY KEY (uid)
);
CREATE UNIQUE INDEX usuarios_email_idx ON public.usuarios (email);

ALTER TABLE public.arboles ADD CONSTRAINT arboles_fk FOREIGN KEY (usuario) REFERENCES public.usuarios(uid);