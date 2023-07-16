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


CREATE TABLE Permissions(
	Id INT NOT NULL IDENTITY PRIMARY KEY,
	permission_name VARCHAR(255) NOT NULL,
);

CREATE TABLE Permission_User(
	user_id INT NOT NULL,
	permission_id INT NOT NULL,
	PRIMARY KEY (user_id, permission_id),
	FOREIGN KEY (user_id) REFERENCES Users(id),
	FOREIGN KEY (permission_id) REFERENCES Permissions(id),
);

CREATE TABLE Categories(
	Id INT NOT NULL IDENTITY PRIMARY KEY,
	category_name VARCHAR(255) NOT NULL,
	description VARCHAR(255),
);

CREATE TABLE Artists(
	Id INT NOT NULL IDENTITY PRIMARY KEY,
	artist_name VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
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
	price DECIMAL(10,2) NOT NULL DEFAULT 0,
	category_id INT NOT NULL,
	created_at DATETIME DEFAULT GETDATE(),
	FOREIGN KEY (category_id) REFERENCES Categories(Id)
);
Alter table Medias ADD created_at DATETIME DEFAULT GETDATE();
SELECT * FROM Medias;

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

INSERT INTO Users (username, password, email, role)
VALUES ('user1', 'password1', 'user1@example.com', 1),
       ('user2', 'password2', 'user2@example.com', 2),
       ('user3', 'password3', 'user3@example.com', 1),
       ('user4', 'password4', 'user4@example.com', 2),
       ('user5', 'password5', 'user5@example.com', 1),
       ('user6', 'password6', 'user6@example.com', 2),
       ('user7', 'password7', 'user7@example.com', 1),
       ('user8', 'password8', 'user8@example.com', 2),
       ('user9', 'password9', 'user9@example.com', 1),
       ('user10', 'password10', 'user10@example.com', 2);

INSERT INTO Permissions (permission_name)
VALUES ('Admin'),
       ('User'),
       ('Guest'),
       ('Manager'),
       ('Developer'),
       ('Editor'),
       ('Subscriber'),
       ('Contributor'),
       ('Moderator'),
       ('Superuser');

INSERT INTO Permission_User (user_id, permission_id)
VALUES (1, 1),
       (1, 2),
       (2, 2),
       (3, 2),
       (4, 3),
       (5, 3),
       (6, 3),
       (7, 2),
       (8, 2),
       (9, 2);

INSERT INTO Categories (category_name, description)
VALUES ('Pop', 'Popular music'),
       ('Rock', 'Rock and Roll'),
       ('Hip Hop', 'Hip hop music'),
       ('Country', 'Country music'),
       ('Jazz', 'Jazz music'),
       ('Blues', 'Blues music'),
       ('Classical', 'Classical music'),
       ('Electronic', 'Electronic music'),
       ('R&B', 'Rhythm and Blues'),
       ('Folk', 'Folk music');

INSERT INTO Artists (artist_name, description)
VALUES ('Adele', 'British singer-songwriter'),
       ('Ed Sheeran', 'English singer-songwriter'),
       ('BTS', 'South Korean boy band'),
       ('Taylor Swift', 'American singer-songwriter'),
       ('Post Malone', 'American rapper and singer'),
       ('Drake', 'Canadian rapper and singer'),
       ('Ariana Grande', 'American singer and actress'),
       ('Eminem', 'American rapper'),
       ('Coldplay', 'British rock band'),
       ('Shawn Mendes', 'Canadian singer-songwriter');

INSERT INTO Albums (album_name, price, description)
VALUES ('21', 12.99, 'Second studio album by Adele'),
       ('x', 14.99, 'Second studio album by Ed Sheeran'),
       ('Map of the Soul: 7', 16.99, 'Seventh studio album by BTS'),
       ('1989', 13.99, 'Fifth studio album by Taylor Swift'),
       ('Hollywood Bleeding', 15.99, 'Third studio album by Post Malone'),
       ('Views', 12.99, 'Fourth studio album by Drake'),
       ('Thank U, Next', 11.99, 'Fifth studio album by Ariana Grande'),
       ('The Slim Shady LP', 10.99, 'Second studio album by Eminem'),
       ('A Head Full of Dreams', 14.99, 'Seventh studio album by Coldplay'),
       ('Illuminate', 12.99, 'Second studio album by Shawn Mendes');

INSERT INTO Medias (media_name, price, category_id)
VALUES ('Hello', 1.29, 1),
       ('Shape of You', 1.29, 2),
       ('Dynamite', 1.29, 3),
       ('Bad Blood', 1.29, 4),
       ('Circles', 1.29, 5),
       ('One Dance', 1.29, 6),
       ('7 Rings', 1.29, 7),
       ('Lose Yourself', 1.29, 8),
       ('Viva la Vida', 1.29, 9),
       ('Stitches', 1.29, 10);

INSERT INTO Artist_Album (artist_id, album_id)
VALUES (1, 1), (1, 2), (1,3),
       (2, 2), (2,3), (2,5),
       (3, 3),
       (4, 4),
       (5, 5),
       (6, 6),
       (7, 7),
       (8, 8),
       (9, 9),
       (10, 10);
SELECT * FROM Artist_Album;
DELETE Artist_Album;
Select * from Artists Join Artist_Album ON Artists.Id = Artist_Album.artist_id JOIN Albums ON Artist_Album.album_id = Albums.ID

INSERT INTO Artist_Media (artist_id, media_id)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (5, 5),
       (6, 6),
       (7, 7),
       (8, 8),
       (9, 9),
       (10, 10);

INSERT INTO Promotions (promotion_name, discount, description, start_date, end_date)
VALUES ('Summer Sale', 0.2, '20% off all items', '2023-06-01', '2023-08-31'),
       ('Holiday Sale', 0.1, '10% off all items', '2023-12-01', '2023-12-31'),
       ('New Year Sale', 0.15, '15% off all items', '2024-01-01', '2024-01-31'),
       ('Spring Sale', 0.25, '25% off all items', '2024-03-01', '2024-03-31'),
       ('Black Friday', 0.3, '30% off all items', '2024-11-29', '2024-11-30'),
       ('Cyber Monday', 0.2, '20% off all items', '2024-12-02', '2024-12-02');

INSERT INTO Promotion_Album (promotion_id, album_id)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (5, 5),
       (6, 6),
       (1, 7),
       (2, 8),
       (3, 9),
       (4, 10);

INSERT INTO Promotion_Media (promotion_id, media_id)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (5, 5),
       (6, 6),
       (1, 7),
       (2, 8),
       (3, 9),
       (4, 10);

INSERT INTO Feedbacks (user_id, content, created_at)
VALUES (1, 'Great album!', '2023-06-15'),
       (2, 'Love this song!', '2023-07-01'),
       (3, 'The shipping was fast and the quality is good.', '2023-07-05'),
       (4, 'Awesome album!', '2023-07-06'),
       (5, 'This is my new favorite song!', '2023-07-07'),
       (6, 'The lyrics are so powerful.', '2023-07-07'),
       (7, 'I can''t stop listening to this album.', '2023-07-07'),
       (8, 'The beat is so catchy!', '2023-07-06'),
       (9, 'The vocals are amazing.', '2023-07-05'),
       (10, 'This song is perfect for a road trip.', '2023-07-04');

INSERT INTO Album_Feedback (album_id, feedback_id)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (5, 5),
       (6, 6),
       (7, 7),
       (8, 8),
       (9, 9),
       (10, 10);

INSERT INTO Media_Feedback (media_id, feedback_id)
VALUES (1, 1),
       (2, 2),
       (3, 3),
       (4, 4),
       (5, 5);

INSERT INTO Orders (user_id, total_amount)
VALUES (1, 29.99),
       (2, 17.50),
       (3, 42.75),
       (4, 12.99),
       (5, 55.00),
       (6, 9.99),
       (7, 37.50),
       (8, 24.99),
       (9, 19.95),
       (10, 8.50);

INSERT INTO Order_Detail (order_id, album_id, price)
VALUES (1, 1, 9.99),
       (1, 2, 14.99),
       (2, NULL, 17.50),
       (3, 3, 12.99),
       (3, 4, 29.76),
       (3, NULL, 0.99),
       (4, NULL, 12.99),
       (5, 5, 10.00),
       (5, NULL, 45.00),
       (6, 6, 9.99),
       (7, 7, 19.99),
       (7, NULL, 17.51),
       (8, 8, 12.49),
       (9, 9, 9.99),
       (10, 10, 8.50);

INSERT INTO Orders (user_id, total_amount)
VALUES (1, 29.99),
       (2, 17.50),
       (3, 42.75),
       (4, 12.99),
       (5, 55.00),
       (6, 9.99),
       (7, 37.50),
       (8, 24.99),
       (9, 19.95),
       (10, 8.50);

INSERT INTO Order_Detail (order_id, media_id, price)
VALUES (1, 1, 9.99),
       (1, 2, 14.99),
       (2, NULL, 17.50),
       (3, 3, 12.99),
       (3, 4, 29.76),
       (3, NULL, 0.99),
       (4, NULL, 12.99),
       (5, 5, 10.00),
       (5, NULL, 45.00),
       (6, 6, 9.99),
       (7, 7, 19.99),
       (7, NULL, 17.51),
       (8, 8, 12.49),
       (9, 9, 9.99),
       (10, 10, 8.50);

CREATE PROCEDURE RegisterUser
    @Username VARCHAR(255),
    @UserImage VARCHAR(255),
    @Password VARCHAR(255),
	@Phone VARCHAR(20),
    @Email VARCHAR(255)
AS
BEGIN
    INSERT INTO Users (username, userimage, password, phone, email)
    VALUES (@Username, @UserImage, @Password, @Phone, @Email);
	SELECT * FROM Users WHERE Id = @@IDENTITY;
END

EXEC RegisterUser 'cuong', 'image', 'cuong123', '01234567', 'cuong@gmail.com';
SELECT * FROM Users


CREATE PROCEDURE loginUser
    @Username VARCHAR(255),
    @Password VARCHAR(255)
AS
BEGIN
	SELECT * FROM Users WHERE username = @Username AND password = @Password;
END

CREATE PROCEDURE UpdateCategory
    @Id int,
    @category_name varchar(255),
    @description varchar(255)
AS
BEGIN
    UPDATE Categories
    SET category_name = @category_name, description = @description
    WHERE Id = @Id;
	SELECT * FROM Categories WHERE Id = @Id
END

CREATE PROCEDURE InsertCategory
    @category_name VARCHAR(255),
    @description VARCHAR(255)
AS
BEGIN
    INSERT INTO Categories (category_name, description)
    VALUES (@category_name, @description);
	SELECT * FROM Categories WHERE ID = @@IDENTITY
END

CREATE PROCEDURE InsertArtist
    @artist_name VARCHAR(255),
    @description VARCHAR(255)
AS
BEGIN
    INSERT INTO Artists (artist_name, description) VALUES (@artist_name, @description);
	SELECT * FROM Artists WHERE ID = @@IDENTITY
END

CREATE PROCEDURE UpdateArtist
    @id INT,
    @artist_name VARCHAR(255),
    @description VARCHAR(255)
AS
BEGIN
    UPDATE Artists SET artist_name = @artist_name, description = @description WHERE Id = @id;
	SELECT * FROM Artists WHERE ID = @id
END


CREATE PROCEDURE InsertAlbum
    @album_name VARCHAR(255),
    @price DECIMAL(10,2),
    @description VARCHAR(255)
AS
BEGIN
    INSERT INTO Albums (album_name, price, description)
    VALUES (@album_name, @price, @description);
	SELECT * FROM Albums WHERE ID = @@IDENTITY
END

CREATE PROCEDURE UpdateAlbum
    @id INT,
    @album_name VARCHAR(255),
    @price DECIMAL(10,2),
    @description VARCHAR(255)
AS
BEGIN
    UPDATE Albums SET album_name = @album_name, price = @price, description = @description WHERE Id = @id;
	SELECT * FROM Albums WHERE ID = @id
END

CREATE PROCEDURE InsertMedia
	@media_name VARCHAR(255),
	@media_image VARCHAR(255),
	@media_url VARCHAR(255),
	@price DECIMAL(10,2),
	@category_id INT
AS
BEGIN
	INSERT INTO Medias (media_name, media_image, media_url, price, category_id)
	VALUES (@media_name, @media_image, @media_url, @price, @category_id);
	SELECT * FROM Medias WHERE ID = @@IDENTITY
END;

CREATE PROCEDURE UpdateMedia
	@media_id INT,
	@media_name VARCHAR(255),
	@media_image VARCHAR(255),
	@media_url VARCHAR(255),
	@price DECIMAL(10,2),
	@category_id INT
AS
BEGIN
	UPDATE Medias
	SET media_name = @media_name,
		media_image = @media_image,
		media_url = @media_url,
		price = @price,
		category_id = @category_id
	WHERE ID = @media_id;
	SELECT * FROM Medias WHERE ID = @media_id;
END;

EXEC InsertMedia 'Tên media', 'Đường dẫn ảnh', 'Đường dẫn media', 10.99, 1;
EXEC UpdateMedia 1, 'Tên media mới', 'Đường dẫn ảnh mới', 'Đường dẫn media mới', 15.99, 2;
