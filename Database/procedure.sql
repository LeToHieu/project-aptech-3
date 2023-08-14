
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
	@category_id INT,
    @artist_id INT
AS
BEGIN
	INSERT INTO Medias (media_name, media_image, media_url, duration, price, category_id)
	VALUES (@media_name, @media_image, @media_url, @duration, @price, @category_id);
    DECLARE @InsertedID INT
    SET @InsertedID = SCOPE_IDENTITY();
    INSERT INTO Artist_Media (artist_id, media_id)
    VALUES (@artist_id, @InsertedID);
    SELECT * FROM Medias WHERE ID = @InsertedID;
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
  @total_amount DECIMAL(10, 2)
AS
BEGIN
  UPDATE Orders
  SET total_amount = @total_amount
  WHERE Id = @order_id
END;

CREATE PROCEDURE InsertOrder
  @user_id INT,
  @order_date DATETIME,
  @total_amount DECIMAL(10, 2)
AS
BEGIN
  INSERT INTO Orders (user_id, order_date, total_amount)
  VALUES (@user_id, @order_date, @total_amount);
  SELECT * FROM Orders WHERE Id = @@IDENTITY
END;

CREATE PROCEDURE GetOrderByUserId
    @user_id INT
AS
BEGIN
    SELECT 
        * FROM Orders
    WHERE 
        user_id = @user_id
END

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
    INSERT INTO Permission_User (user_id, permission_id)
    VALUES (@user_id, @permission_id);
    
    SELECT *
    FROM Permission_User
    WHERE user_id = @user_id AND permission_id = @permission_id;
END
CREATE PROCEDURE GetOrderDetailsByOrderId
    @order_id INT
AS
BEGIN
    SELECT 
        Id,
        order_id,
        album_id,
        media_id,
        price
    FROM 
        Order_Detail
    WHERE 
        order_id = @order_id
END

CREATE PROCEDURE InsertFeedback
    @user_id INT,
    @content TEXT
AS
BEGIN
    INSERT INTO Feedbacks (user_id, content)
    VALUES (@user_id, @content);
    SELECT * FROM Feedbacks WHERE ID = @@IDENTITY;
END;

CREATE PROCEDURE InsertMediaFeedback
    @mediaId INT,
    @feedbackId INT
AS
BEGIN
    INSERT INTO Media_Feedback (media_id, feedback_id)
    VALUES (@mediaId, @feedbackId);
    SELECT * FROM Media_Feedback WHERE ID = @@IDENTITY;
END;

CREATE PROCEDURE InsertAlbumFeedback
    @album_id INT,
    @feedback_id INT
AS
BEGIN
    INSERT INTO Album_Feedback (album_id, feedback_id)
    VALUES (@album_id, @feedback_id);
    SELECT * FROM Album_Feedback WHERE Id = @@IDENTITY;
END;
