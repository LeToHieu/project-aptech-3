CREATE DATABASE MANAGE_MEDIA
USE MANAGE_MEDIA

CREATE TABLE Users(
	Id INT NOT NULL IDENTITY PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	userimage VARCHAR(255),
	password VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	role INT NOT NULL DEFAULT 0,
	
);

/*
CREATE TABLE Permissions(
	Id INT NOT NULL IDENTITY PRIMARY KEY,
	permission INT NOT NULL DEFAULT 0, 
	/* 0 = Admin, 1 = AdminPhu */
);

CREATE TABLE Permission_User(
	user_id INT NOT NULL,
	permission_id INT NOT NULL,
	PRIMARY KEY (user_id, permission_id),
	FOREIGN KEY (user_id) REFERENCES Users(id),
	FOREIGN KEY (permission_id) REFERENCES Permissions(id),
);
*/

CREATE TABLE Categories(
	Id INT NOT NULL IDENTITY PRIMARY KEY,
	category_name VARCHAR(255) NOT NULL,
	description VARCHAR(255),
);

CREATE TABLE Artists(
	Id INT NOT NULL IDENTITY PRIMARY KEY,
	artist_name NVARCHAR(255) NOT NULL,
	artist_image VARCHAR(255),
	description NVARCHAR(255) NOT NULL
);

CREATE TABLE Albums (
	ID INT NOT NULL IDENTITY PRIMARY KEY,
	album_name VARCHAR(255) NOT NULL,
	price DECIMAL(10,2) NOT NULL DEFAULT 0,
	description VARCHAR(255),
);

CREATE TABLE Medias (
	ID INT NOT NULL IDENTITY PRIMARY KEY,
	media_name VARCHAR(255) NOT NULL,
	media_image VARCHAR(255),
	media_url VARCHAR(255) NOT NULL,
	duration DECIMAL(10,2),
	price DECIMAL(10,2) NOT NULL DEFAULT 0,
	category_id INT NOT NULL,
	created_at DATETIME DEFAULT GETDATE(),
	FOREIGN KEY (category_id) REFERENCES Categories(Id)
);

CREATE TABLE Artist_Album (
	artist_id INT NOT NULL,
	album_id INT NOT NULL,
	PRIMARY KEY (artist_id, album_id),
	FOREIGN KEY (artist_id) REFERENCES Artists(Id),
	FOREIGN KEY (album_id) REFERENCES Albums(Id),
);

CREATE TABLE Artist_Media(
	artist_id INT NOT NULL,
	media_id INT NOT NULL,
	PRIMARY KEY(artist_id, media_id),
	FOREIGN KEY (artist_id) REFERENCES Artists(Id),
	FOREIGN KEY (media_id) REFERENCES Medias(Id),
);

CREATE TABLE Promotions(
	Id INT NOT NULL IDENTITY PRIMARY KEY,
	promotion_name VARCHAR(255) NOT NULL,
	discount DECIMAL(10,2) NOT NULL,
	description VARCHAR(255),
	start_date DATE,
	end_date DATE,
);

CREATE TABLE Promotion_Album(
	promotion_id INT NOT NULL,
	album_id INT NOT NULL,
	PRIMARY KEY (promotion_id, album_id),
	FOREIGN KEY (promotion_id) REFERENCES Promotions(Id),
	FOREIGN KEY (album_id) REFERENCES Albums(Id),
);

CREATE TABLE Promotion_Media(
	promotion_id INT NOT NULL,
	media_id INT NOT NULL,
	PRIMARY KEY (promotion_id, media_id),
	FOREIGN KEY (promotion_id) REFERENCES Promotions(Id),
	FOREIGN KEY (media_id) REFERENCES Medias(Id),
);

CREATE TABLE Feedbacks (
	ID INT NOT NULL IDENTITY PRIMARY KEY,
	user_id INT NOT NULL,
	content TEXT NOT NULL,
	created_at DATE DEFAULT GETDATE(),
	FOREIGN KEY (user_id) REFERENCES Users(Id),
);

CREATE TABLE Album_Feedback (
	Id INT NOT NULL IDENTITY PRIMARY KEY,
	album_id INT,
	feedback_id INT,
	FOREIGN KEY (album_id) REFERENCES Albums(id),
	FOREIGN KEY (feedback_id) REFERENCES Feedbacks(id),
);

CREATE TABLE Media_Feedback (
	Id INT NOT NULL IDENTITY PRIMARY KEY,
	media_id INT,
	feedback_id INT,
	FOREIGN KEY (media_id) REFERENCES Medias(id),
	FOREIGN KEY (feedback_id) REFERENCES Feedbacks(id),
);

CREATE TABLE Orders(
  Id INT NOT NULL IDENTITY PRIMARY KEY,
  user_id INT NOT NULL,
  order_date DATETIME DEFAULT GETDATE(),
  total_amount DECIMAL(10, 2) NOT NULL,
  status_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Order_Detail(
	Id INT NOT NULL IDENTITY PRIMARY KEY,
	order_id INT NOT NULL,
	album_id INT,
	media_id INT,
	price DECIMAL(10,2) NOT NULL,
	FOREIGN KEY (order_id) REFERENCES Orders(id),
	FOREIGN KEY (album_id) REFERENCES Albums(id),
	FOREIGN KEY (media_id) REFERENCES Medias(id),
);
