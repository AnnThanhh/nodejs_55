#- tất cả các lệnh sql đều phải luôn viết hoa tất cả các chữ
#- tên của database, table, column: viết thường và có _ để tạo khoảng cách (snake case) ví dụ: nguoi_dung
#- đặt tên không khoảng trắng, không có ký tự đặc biệt, không có số ở đầu câu

#tạo database
CREATE DATABASE demo_nodejs55

#xóa database (học để biết - không sử dụng)
DROP DATABASE demo_nodejs55

#tạo TABLE
# B1: TÔ ĐEN
# B2: RUN CURRENT
# B3: REFRESH WORKSPACE
CREATE TABLE nguoi_dung (
	id INT PRIMARY KEY AUTO_INCREMENT,
	full_name VARCHAR(255),
	email VARCHAR(255),
	phone INT(10),
	gender VARCHAR(10),
	address VARCHAR(255)
)

#Xóa table 
DROP TABLE nguoi_dung



#rename table
RENAME TABLE `User` TO `Users`

#add/delete column
#BEST PRACTICE - TẠO MỚI THAY VÌ XÓA CỘT
ALTER TABLE nguoi_dung
ADD birthday DATE

ALTER TABLE nguoi_dung
DROP COLUMN birthday

#update datatype
ALTER TABLE nguoi_dung
MODIFY gender VARCHAR(12)

#soft deleted

#bài tập 1: tạo 1 table food: có id (int), name (string - 30), description (string 255), image (string 255), price (int), tag (string 255)

#ràng buộc dữ liệu
#default: đặt các giá trị mặt định cho cột nếu không có giá trị
#not null unique: không được null, phải duy nhất
CREATE TABLE `food` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`name` VARCHAR(30),
	`description` VARCHAR(255) DEFAULT "Chưa có thông tin",
	`image` VARCHAR(255),
	`price` INT,
	`tag` VARCHAR(255)
)
DROP TABLE `food`

CREATE TABLE `User` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`full_name` VARCHAR(255),
	`email` VARCHAR(255) NOT NULL UNIQUE,
	`phone` INT(10),
	`gender` VARCHAR(10),
	`address` VARCHAR(255)
)
DROP TABLE `User`

#thêm dữ liệu 
INSERT INTO nguoi_dung(full_name, email, phone, gender ) VALUES
("Nguyễn Văn Minh", "minhnguyen@gmail.com", 0912345678, "Nam"),
("Trần Thị Lan", "lantran@hotmail.com", 0923456789, "Nữ"),
("Lê Hoàng Anh", "anhle@hotmail.com", 0934567890, "Nam"),
("Phạm Ngọc Hân", "hanpham@hotmail.com", 0945678901, "Nữ"),
("Đỗ Minh Tuấn", "tuando@hotmail.com", 0956789012, "Nam"),
("Bùi Thị Mai", "maibui@hotmail.com", 0967890123, "Nữ"),
("Võ Quốc Bảo", "baovo@hotmail.com", 0978901234, "Nam"),
("Huỳnh Thanh Tâm", "tamhuynh@hotmail.com", 0989012345, "Nữ"),
("Phan Nhật Quang", "quangphan@hotmail.com", 0990123456, "Nam"),
("Ngô Thị Diễm", "diemngo@hotmail.com", 0901234567, "Nữ");
 