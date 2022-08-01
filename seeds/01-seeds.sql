INSERT INTO users (name, email, password)
  VALUES
    ('Legolas','deadeye@mirkwood.for','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    ('Gimli','BigD@moria.mine','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    ('Bilbo','elflover2890@underhill.shire','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    ('Gandalf','whitenotgrey@mithrandir.wiz','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    ('Aragorn','juststridin@king.tru','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code)
  VALUES
    (1,'Mirkwood','The greatest forest of the Northern world','https://tinyurl.com/2s4xm6c7','https://tinyurl.com/5y9tdmjt',5000,0,100000,6000,'Middle Earth','Anduin Avenue','Mirkwood','Rhovanion','MW1 TT0'),
    (2,'Moria Mines','Totally not a tomb','https://tinyurl.com/2cnyf6wd','https://tinyurl.com/5n7rw5xs',1000,50000,10000,100000,'Middle Earth','Misty Mountain Way','Khazad-dum','Misty Mountains','M0M MMW'),
    (3,'Bag End','The Shire''s pride and joy','https://tinyurl.com/589fymh9','https://tinyurl.com/mtkzwn76',50,0,6,12,'Middle Earth','Bagshot Row','Hobbiton','The Shire','BE1 HTS');
INSERT INTO reservations (property_id,guest_id,start_date,end_date)
  VALUES
    (3,4,'2022-10-20','2022-10-29'), -- Gandalf goes to Bag-End --
    (1,5,'2022-11-01','2022-11-10'), -- Aragorn goes to Mirkwood --
    (2,1,'2022-11-09','2022-11-21'); -- Legolas goes to Moria --
INSERT INTO property_reviews (property_id,guest_id,reservation_id,rating,message)
  VALUES 
    (3,4,1,4,'Best host I''ve ever known but the ceiling could be taller'),
    (1,5,2,5,'I''ve never sang so much in my life'),
    (2,1,3,2,'Barely any trees, didn''t see daylight the whole time I was there');