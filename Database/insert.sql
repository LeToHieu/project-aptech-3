INSERT INTO Users (username, userimage, password, email, phone, role)
VALUES
('user1', 'Images/2d72e1ad-b6bf-4088-a3a8-d4c835a0d9f5.jpeg', 'password1', 'user1@example.com', '1234567890', 0),
('user2', 'Images/2d72e1ad-b6bf-4088-a3a8-d4c835a0d9f5.jpeg', 'password2', 'user2@example.com', '9876543210', 0),
('user3', 'Images/2d72e1ad-b6bf-4088-a3a8-d4c835a0d9f5.jpeg', 'password3', 'user3@example.com', '1234567890', 0),
('user4', 'Images/2d72e1ad-b6bf-4088-a3a8-d4c835a0d9f5.jpeg', 'password4', 'user4@example.com', '9876543210', 0),
('user5', 'Images/2d72e1ad-b6bf-4088-a3a8-d4c835a0d9f5.jpeg', 'password5', 'user5@example.com', '1234567890', 0),
('user6', 'Images/2d72e1ad-b6bf-4088-a3a8-d4c835a0d9f5.jpeg', 'password6', 'user6@example.com', '9876543210', 0),
('user7', 'Images/2d72e1ad-b6bf-4088-a3a8-d4c835a0d9f5.jpeg', 'password7', 'user7@example.com', '1234567890', 0),
('user8', 'Images/2d72e1ad-b6bf-4088-a3a8-d4c835a0d9f5.jpeg', 'password8', 'user8@example.com', '9876543210', 0),
('user9', 'Images/2d72e1ad-b6bf-4088-a3a8-d4c835a0d9f5.jpeg', 'password9', 'user9@example.com', '1234567890', 0),
('user10', 'Images/2d72e1ad-b6bf-4088-a3a8-d4c835a0d9f5.jpeg', 'password10', 'user10@example.com', '9876543210', 0);


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
  ('Media 1', 'Images/42eba6f3-1bdd-4269-a810-ccb2ce4ac095.jpg', 'Videos/065b66ee-f2a8-4897-92df-83f27deadbef.mp4', 120.50, 9.99, 1, '2023-07-30 12:34:56'),
  ('Media 2', 'Images/42eba6f3-1bdd-4269-a810-ccb2ce4ac095.jpg', 'Videos/065b66ee-f2a8-4897-92df-83f27deadbef.mp4', 180.25, 14.95, 2, '2023-07-30 10:20:30'),
  ('Media 3', 'Images/42eba6f3-1bdd-4269-a810-ccb2ce4ac095.jpg', 'Videos/065b66ee-f2a8-4897-92df-83f27deadbef.mp4', 90.75, 12.50, 1, '2023-07-30 09:15:45'),
  ('Media 4', 'Images/42eba6f3-1bdd-4269-a810-ccb2ce4ac095.jpg', 'Videos/065b66ee-f2a8-4897-92df-83f27deadbef.mp4', 150.30, 8.99, 3, '2023-07-30 14:45:00'),
  ('Media 5', 'Images/42eba6f3-1bdd-4269-a810-ccb2ce4ac095.jpg', 'Videos/065b66ee-f2a8-4897-92df-83f27deadbef.mp4', 240.20, 21.75, 2, '2023-07-30 16:30:10'),
  ('Media 6', 'Images/42eba6f3-1bdd-4269-a810-ccb2ce4ac095.jpg', 'Videos/065b66ee-f2a8-4897-92df-83f27deadbef.mp4', 180.10, 16.49, 1, '2023-07-30 18:20:05'),
  ('Media 7', 'Images/42eba6f3-1bdd-4269-a810-ccb2ce4ac095.jpg', 'Videos/065b66ee-f2a8-4897-92df-83f27deadbef.mp4', 120.90, 11.25, 3, '2023-07-30 22:05:30'),
  ('Media 8', 'Images/42eba6f3-1bdd-4269-a810-ccb2ce4ac095.jpg', 'Videos/065b66ee-f2a8-4897-92df-83f27deadbef.mp4', 210.45, 9.99, 2, '2023-07-30 20:40:15'),
  ('Media 9', 'Images/42eba6f3-1bdd-4269-a810-ccb2ce4ac095.jpg', 'Videos/065b66ee-f2a8-4897-92df-83f27deadbef.mp4', 160.15, 13.50, 1, '2023-07-30 13:15:20'),
  ('Media 10', 'Images/42eba6f3-1bdd-4269-a810-ccb2ce4ac095.jpg', 'Videos/065b66ee-f2a8-4897-92df-83f27deadbef.mp4', 190.75, 18.25, 3, '2023-07-30 11:10:25');


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

INSERT INTO Order_Detail (order_id, album_id, media_id, price)
VALUES
  (1, 1, NULL, 50.00),
  (2, NULL, 1, 20.00),
  (3, 2, NULL, 35.00),
  (4, NULL, 2, 15.00),
  (5, 3, NULL, 45.00),
  (1, NULL, 3, 25.00),
  (2, 4, NULL, 40.00),
  (3, NULL, 5, 30.00),
  (4, 5, NULL, 55.00),
  (5, NULL, 4, 28.00);

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