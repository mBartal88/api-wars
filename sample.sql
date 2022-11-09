DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.planets;
CREATE TABLE users (
	id serial NOT NULL,
	username text,
	password text
);


INSERT INTO users (username, password) VALUES ('test@mail.com', 'pbkdf2:sha256:260000$fzhY7spRm9q9sjC6$f83eddfec98fc5a0a540f2185cdbc2bdcf0de88b1199bd93934125522bf4ed49');


CREATE TABLE planets (
	id serial NOT NULL,
	name text,
	vote integer
);


INSERT INTO planets (name, vote) VALUES ('Hoth', 1);
