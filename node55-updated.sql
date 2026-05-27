-- -------------------------------------------------------------
-- TablePlus 7.0.8(708)
--
-- https://tableplus.com/
--
-- Database: mydb
-- Generation Time: 2026-05-27 13:46:27.0120
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `Articles`;
CREATE TABLE `Articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `imageUrl` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `views` int NOT NULL DEFAULT '0',
  `userId` int DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Articles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ChatGroupMembers`;
CREATE TABLE `ChatGroupMembers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `chatGroupId` int DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `chatGroupId` (`chatGroupId`),
  CONSTRAINT `ChatGroupMembers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `ChatGroupMembers_ibfk_2` FOREIGN KEY (`chatGroupId`) REFERENCES `ChatGroups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ChatGroups`;
CREATE TABLE `ChatGroups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ownerId` int DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ownerId` (`ownerId`),
  CONSTRAINT `ChatGroups_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `ChatMessages`;
CREATE TABLE `ChatMessages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chatGroupId` int DEFAULT NULL,
  `userIdSender` int DEFAULT NULL,
  `messageText` text COLLATE utf8mb4_unicode_ci,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `chatGroupId` (`chatGroupId`),
  KEY `userIdSender` (`userIdSender`),
  CONSTRAINT `ChatMessages_ibfk_1` FOREIGN KEY (`chatGroupId`) REFERENCES `ChatGroups` (`id`),
  CONSTRAINT `ChatMessages_ibfk_2` FOREIGN KEY (`userIdSender`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Foods`;
CREATE TABLE `Foods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Chưa có thông tin',
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` text COLLATE utf8mb4_unicode_ci,
  `age` int DEFAULT NULL,
  `totpSecret` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `googleId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `codeChangePass` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Articles` (`id`, `title`, `content`, `imageUrl`, `views`, `userId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Tiêu đề đã cập nhật', 'Nội dung mới đã được chỉnh sửa', NULL, 120, 1, 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 10:10:17'),
(2, 'Express.js là gì?', 'Express.js là framework web tối giản và linh hoạt cho Node.js, cung cấp các tính năng mạnh mẽ để xây dựng web và API.', NULL, 85, 1, 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(3, 'Prisma ORM cơ bản', 'Prisma là ORM thế hệ mới cho Node.js và TypeScript, giúp truy vấn database dễ dàng và type-safe.', NULL, 64, 2, 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(4, 'Sequelize vs Prisma', 'So sánh hai ORM phổ biến nhất trong hệ sinh thái Node.js: Sequelize (truyền thống) và Prisma (hiện đại).', NULL, 210, 2, 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(5, 'REST API với Express', 'Hướng dẫn xây dựng RESTful API hoàn chỉnh với Express.js, bao gồm CRUD, middleware và xử lý lỗi.', NULL, 300, 3, 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(6, 'Bài viết mới từ cURL', 'Nội dung bài viết test từ cURL command', NULL, 0, 1, 0, 0, NULL, '2026-05-26 10:09:43', '2026-05-26 10:09:43');

INSERT INTO `ChatGroupMembers` (`id`, `userId`, `chatGroupId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(2, 2, 1, 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(3, 3, 1, 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(4, 4, 1, 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(5, 2, 2, 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(6, 3, 2, 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(7, 1, 3, 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(8, 4, 3, 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35');

INSERT INTO `ChatGroups` (`id`, `name`, `ownerId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Nhóm học Node.js', 1, 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(2, 'Dev Team Backend', 2, 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(3, 'Thảo luận Database', 1, 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35');

INSERT INTO `ChatMessages` (`id`, `chatGroupId`, `userIdSender`, `messageText`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'Chào mừng mọi người đến với nhóm học Node.js!', 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(2, 1, 2, 'Cảm ơn admin, mình rất vui được tham gia.', 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(3, 1, 3, 'Hôm nay học bài gì vậy mọi người?', 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(4, 2, 2, 'Team ơi, API đăng nhập đã xong rồi nhé.', 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(5, 2, 3, 'Tốt lắm, mình sẽ test trong chiều nay.', 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(6, 3, 1, 'Mọi người dùng MySQL hay PostgreSQL?', 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(7, 3, 4, 'Mình đang dùng MySQL với Prisma, khá ngon.', 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35');

INSERT INTO `Foods` (`id`, `name`, `description`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Phở bò', 'Món ăn truyền thống Việt Nam với nước dùng đậm đà', 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(2, 'Bún chả', 'Bún chả Hà Nội thơm ngon nổi tiếng', 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(3, 'Cơm tấm', 'Cơm tấm Sài Gòn với sườn nướng và bì chả', 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(4, 'Bánh mì', 'Bánh mì Việt Nam giòn rụm với nhân đa dạng', 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35'),
(5, 'Gỏi cuốn', 'Cuốn tươi với tôm, thịt và rau sống thanh mát', 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35');

INSERT INTO `Users` (`id`, `email`, `fullName`, `avatar`, `age`, `totpSecret`, `googleId`, `password`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`, `codeChangePass`) VALUES
(1, 'admin@cyber.vn', 'Admin Cyber', NULL, 30, NULL, NULL, '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVwBiCZmDa', 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35', NULL),
(2, 'alice@cyber.vn', 'Alice Nguyen', NULL, 25, NULL, NULL, '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVwBiCZmDa', 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35', NULL),
(3, 'bob@cyber.vn', 'Bob Tran', NULL, 28, NULL, NULL, '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVwBiCZmDa', 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35', NULL),
(4, 'charlie@cyber.vn', 'Charlie Le', NULL, 22, NULL, NULL, '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVwBiCZmDa', 0, 0, NULL, '2026-05-26 09:19:35', '2026-05-26 09:19:35', NULL),
(5, 'phuong@gmail.com', NULL, NULL, NULL, NULL, NULL, '$2b$10$GPWnMFJYZ47iPBTjifnYCe2wSdAByawYvK2Q9PX6Be4nHIbSw54wq', 0, 0, NULL, '2026-05-26 09:20:37', '2026-05-26 09:20:37', NULL),
(6, 'test@gmail.com', 'Nguyen Van Test', NULL, NULL, NULL, NULL, '$2b$10$86Sjm9AZuwkeORb/l4RjZuvIpAT3sAsfO2KAlB4M0OmMU8.3Zlspi', 0, 0, NULL, '2026-05-26 10:03:47', '2026-05-26 14:28:31', '06e01c7b23719ff6897b75a9826334bcf43e1f11');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;