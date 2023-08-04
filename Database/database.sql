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
	permission INT NOT NULL DEFAULT 0, 
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

INSERT INTO Users (username, userimage, password, email, phone, role)
VALUES
('user1', NULL, 'password1', 'user1@example.com', '1234567890', 0),
('user2', NULL, 'password2', 'user2@example.com', '9876543210', 0),
('user3', NULL, 'password3', 'user3@example.com', '1234567890', 0),
('user4', NULL, 'password4', 'user4@example.com', '9876543210', 0),
('user5', NULL, 'password5', 'user5@example.com', '1234567890', 0),
('user6', NULL, 'password6', 'user6@example.com', '9876543210', 0),
('user7', NULL, 'password7', 'user7@example.com', '1234567890', 0),
('user8', NULL, 'password8', 'user8@example.com', '9876543210', 0),
('user9', NULL, 'password9', 'user9@example.com', '1234567890', 0),
('user10', NULL, 'password10', 'user10@example.com', '9876543210', 0);

INSERT INTO Permissions (permission)
VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10);

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

INSERT INTO Artists (artist_name, artist_image, description)
VALUES
  ('Artist 1', 'image1.jpg', 'Description of Artist 1'),
  ('Artist 2', 'image2.jpg', 'Description of Artist 2'),
  ('Artist 3', 'image3.jpg', 'Description of Artist 3'),
  ('Artist 4', 'image4.jpg', 'Description of Artist 4'),
  ('Artist 5', 'image5.jpg', 'Description of Artist 5'),
  ('Artist 6', 'image6.jpg', 'Description of Artist 6'),
  ('Artist 7', 'image7.jpg', 'Description of Artist 7'),
  ('Artist 8', 'image8.jpg', 'Description of Artist 8'),
  ('Artist 9', 'image9.jpg', 'Description of Artist 9'),
  ('Artist 10', 'image10.jpg', 'Description of Artist 10');

INSERT INTO Albums (album_name, price, description)
VALUES
  ('Album 1', 19.99, 'Description of Album 1'),
  ('Album 2', 14.95, 'Description of Album 2'),
  ('Album 3', 12.50, 'Description of Album 3'),
  ('Album 4', 8.99, 'Description of Album 4'),
  ('Album 5', 21.75, 'Description of Album 5'),
  ('Album 6', 16.49, 'Description of Album 6'),
  ('Album 7', 11.25, 'Description of Album 7'),
  ('Album 8', 9.99, 'Description of Album 8'),
  ('Album 9', 13.50, 'Description of Album 9'),
  ('Album 10', 18.25, 'Description of Album 10');

INSERT INTO Medias (media_name, media_image, media_url, duration, price, category_id, created_at)
VALUES
  ('Media 1', 'image1.jpg', 'https://example.com/media1', 120.50, 9.99, 1, '2023-07-30 12:34:56'),
  ('Media 2', 'image2.jpg', 'https://example.com/media2', 180.25, 14.95, 2, '2023-07-30 10:20:30'),
  ('Media 3', 'image3.jpg', 'https://example.com/media3', 90.75, 12.50, 1, '2023-07-30 09:15:45'),
  ('Media 4', 'image4.jpg', 'https://example.com/media4', 150.30, 8.99, 3, '2023-07-30 14:45:00'),
  ('Media 5', 'image5.jpg', 'https://example.com/media5', 240.20, 21.75, 2, '2023-07-30 16:30:10'),
  ('Media 6', 'image6.jpg', 'https://example.com/media6', 180.10, 16.49, 1, '2023-07-30 18:20:05'),
  ('Media 7', 'image7.jpg', 'https://example.com/media7', 120.90, 11.25, 3, '2023-07-30 22:05:30'),
  ('Media 8', 'image8.jpg', 'https://example.com/media8', 210.45, 9.99, 2, '2023-07-30 20:40:15'),
  ('Media 9', 'image9.jpg', 'https://example.com/media9', 160.15, 13.50, 1, '2023-07-30 13:15:20'),
  ('Media 10', 'image10.jpg', 'https://example.com/media10', 190.75, 18.25, 3, '2023-07-30 11:10:25');

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

INSERT INTO Order_Detail (order_id, album_id, media_id, status_order, price)
VALUES
  (1, 1, NULL, 1, 50.00),
  (2, NULL, 1, 0, 20.00),
  (3, 2, NULL, 1, 35.00),
  (4, NULL, 2, 0, 15.00),
  (5, 3, NULL, 1, 45.00),
  (1, NULL, 3, 1, 25.00),
  (2, 4, NULL, 1, 40.00),
  (3, NULL, 5, 0, 30.00),
  (4, 5, NULL, 1, 55.00),
  (5, NULL, 4, 1, 28.00);

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
    INSERT INTO Users (username, userimage, password, phone, email, role)
    VALUES (@Username, @UserImage, @Password, @Phone, @Email, 0);
	SELECT * FROM Users WHERE Id = @@IDENTITY;
END

EXEC RegisterUser 'cuong', 'image', 'cuong123', '01234567', 'cuong@gmail.com';
SELECT * FROM Users;


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
    @artist_name NVARCHAR(255),
	@artist_image NVARCHAR(255),
    @description NVARCHAR(255)
AS
BEGIN
    INSERT INTO Artists (artist_name, artist_image, description) VALUES (@artist_name, @artist_image, @description);
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
	@duration DECIMAL(10, 2),
	@price DECIMAL(10,2),
	@category_id INT
AS
BEGIN
	INSERT INTO Medias (media_name, media_image, media_url, duration, price, category_id)
	VALUES (@media_name, @media_image, @media_url, @duration, @price, @category_id);
	SELECT * FROM Medias WHERE ID = @@IDENTITY
END;
CREATE PROCEDURE UpdateMedia
	@media_id INT,
	@media_name VARCHAR(255),
	@media_image VARCHAR(255),
	@media_url VARCHAR(255),
	@duration DECIMAL(10, 2),
	@price DECIMAL(10,2),
	@category_id INT
AS
BEGIN
	UPDATE Medias
	SET media_name = @media_name,
		media_image = @media_image,
		media_url = @media_url,
		price = @price,
		duration = @duration,
		category_id = @category_id
	WHERE ID = @media_id;
	SELECT * FROM Medias WHERE ID = @media_id;
END;

EXEC InsertMedia 'Tên media', 'Đường dẫn ảnh', 'Đường dẫn media', 10.99, 1;
EXEC UpdateMedia 1, 'Tên media mới', 'Đường dẫn ảnh mới', 'Đường dẫn media mới', 15.99, 2;

CREATE PROCEDURE InsertPromotion
    @promotion_name VARCHAR(255),
    @discount DECIMAL(10,2),
    @description VARCHAR(255),
    @start_date DATE,
    @end_date DATE
AS
BEGIN
    INSERT INTO Promotions (promotion_name, discount, description, start_date, end_date)
    VALUES (@promotion_name, @discount, @description, @start_date, @end_date);
	SELECT * FROM Promotions WHERE Id = @@IDENTITY
END

CREATE PROCEDURE UpdatePromotion
    @id INT,
    @promotion_name VARCHAR(255),
    @discount DECIMAL(10,2),
    @description VARCHAR(255),
    @start_date DATE,
    @end_date DATE
AS
BEGIN
    UPDATE Promotions SET
        promotion_name = @promotion_name,
        discount = @discount,
        description = @description,
        start_date = @start_date,
        end_date = @end_date
    WHERE Id = @id;
	SELECT * FROM Promotions WHERE Id = @id
END

CREATE PROCEDURE UpdateOrder
  @order_id INT,
  @user_id INT,
  @order_date DATETIME,
  @total_amount DECIMAL(10, 2)
AS
BEGIN
  UPDATE Orders
  SET user_id = @user_id,
      order_date = @order_date,
      total_amount = @total_amount
  WHERE Id = @order_id
END;

CREATE PROCEDURE InsertOrder
  @user_id INT,
  @order_date DATETIME,
  @total_amount DECIMAL(10, 2)
AS
BEGIN
  INSERT INTO Orders (user_id, order_date, total_amount)
  VALUES (@user_id, @order_date, @total_amount)
END;

CREATE PROCEDURE InsertOrderDetail
    @order_id INT,
    @album_id INT,
    @media_id INT,
    @price DECIMAL(10,2)
AS
BEGIN
    INSERT INTO Order_Detail (order_id, album_id, media_id, price)
    VALUES (@order_id, @album_id, @media_id, @price);
    SELECT * FROM Order_Detail WHERE Id = @@IDENTITY;
END

CREATE PROCEDURE UpdateOrderDetail
    @Id INT,
    @order_id INT,
    @album_id INT,
    @media_id INT,
    @price DECIMAL(10,2)
AS
BEGIN
    UPDATE Order_Detail
    SET order_id = @order_id,
        album_id = @album_id,
        media_id = @media_id,
        price = @price
    WHERE Id = @Id;
END


CREATE TABLE Users(
	Id INT NOT NULL IDENTITY PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	userimage VARCHAR(255),
	password VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	role INT NOT NULL DEFAULT 0,
);

CREATE PROCEDURE UpdateUser
    @UserId INT,
    @Username VARCHAR(255),
    @UserImage VARCHAR(255),
    @Password VARCHAR(255),
    @Email VARCHAR(255),
    @Phone VARCHAR(20),
    @Role INT = 0
AS
BEGIN
    UPDATE Users
    SET username = @Username,
        userimage = @UserImage,
        password = @Password,
        email = @Email,
        phone = @Phone,
        role = @Role
    WHERE Id = @UserId;
	SELECT * FROM Users WHERE Id = @UserId;
END;

CREATE PROCEDURE UpdatePermissionUser 
    @user_id INT,
    @permission_id INT
AS
BEGIN
    
    -- Update the user's permission in the Permission_User table
    UPDATE Permission_User
    SET permission_id = @permission_id
    WHERE user_id = @user_id;
    
    -- Return the updated row from the Permission_User table
    SELECT *
    FROM Permission_User
    WHERE user_id = @user_id AND permission_id = @permission_id;
END

CREATE PROCEDURE InsertPermissionUser 
    @user_id INT,
    @permission_id INT
AS
BEGIN
    -- Check if the user and permission exist in the database
    
    -- Insert the new permission user row
    INSERT INTO Permission_User (user_id, permission_id)
    VALUES (@user_id, @permission_id);
    
    -- Return the newly inserted row from the Permission_User table
    SELECT *
    FROM Permission_User
    WHERE user_id = @user_id AND permission_id = @permission_id;
END