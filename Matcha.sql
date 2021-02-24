-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 192.168.99.102
-- Generation Time: Feb 22, 2021 at 01:21 PM
-- Server version: 8.0.23
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Matcha`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`%` PROCEDURE `delete_like` ()  BEGIN
        DELETE FROM blocked WHERE HOUR(TIMEDIFF(created_at, now())) >= 5 AND dlt = 1;
    END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `blocked`
--

CREATE TABLE `blocked` (
  `id` int NOT NULL,
  `blocker` int NOT NULL,
  `blocked` int NOT NULL,
  `dlt` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int NOT NULL,
  `visitor_id` int NOT NULL,
  `visited_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `visitor_id`, `visited_id`, `created_at`) VALUES
(1, 1, 2, '2021-02-18 15:56:56'),
(2, 1, 5, '2021-02-18 15:57:03'),
(3, 1, 19, '2021-02-18 16:00:42'),
(4, 1, 3, '2021-02-18 17:26:21'),
(5, 1, 4, '2021-02-18 18:14:24'),
(6, 1, 6, '2021-02-18 18:29:41'),
(7, 1, 7, '2021-02-20 09:30:53'),
(8, 1, 12, '2021-02-20 09:30:56'),
(9, 1, 14, '2021-02-20 09:31:00'),
(10, 1, 16, '2021-02-20 09:33:00'),
(11, 1, 17, '2021-02-20 11:20:11'),
(12, 1, 8, '2021-02-20 14:31:37'),
(13, 1, 10, '2021-02-20 14:37:45'),
(14, 1, 15, '2021-02-20 14:38:11'),
(15, 1, 9, '2021-02-20 14:42:27'),
(16, 1, 11, '2021-02-20 14:42:30'),
(17, 1, 20, '2021-02-20 15:46:55'),
(18, 2, 15, '2021-02-21 17:25:30');

-- --------------------------------------------------------

--
-- Table structure for table `imgProfil`
--

CREATE TABLE `imgProfil` (
  `id` int NOT NULL,
  `users_id` int NOT NULL,
  `image` varchar(255) NOT NULL,
  `pointer` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `imgProfil`
--

INSERT INTO `imgProfil` (`id`, `users_id`, `image`, `pointer`) VALUES
(1, 1, '_XG9QQCrYOcismn-sxqtEfile-1613573422970.jpeg', 0),
(2, 1, '1uc7B6qNE34U4dFyuCIrOfile-1613573425166.jpeg', 1),
(3, 1, '2THVqG4lhbq4IpafW_D5ffile-1613573391583.jpeg', 2),
(4, 1, '9eAaRpB5Py4KT1jhcOmP0file-1613573439520.jpeg', 3),
(5, 1, 'apchqSAKEbNxlbuLsNQd3file-1613573440952.jpeg', 4),
(6, 2, 'CO6_ad6DlriGBMtTv11Bmfile-1613573409821.jpeg', 0),
(7, 2, 'dvWCqxET097hdBn2B0Wh1file-1613573387244.jpeg', 1),
(8, 2, 'e0UMjiO-ig4CVbBkeWP2Bfile-1613573427654.jpeg', 2),
(9, 2, 'dvWCqxET097hdBn2B0Wh1file-1613573387244.jpeg', 3),
(10, 2, 'k3GlJpk3N_ycOdSXycByGfile-1613573471176.jpeg', 4),
(11, 3, 'kgdOnGDQPZ6FvagyTqft4file-1613573473343.jpeg', 0),
(12, 3, 'laohiKiU-RNJjgvocBrHjfile-1613573429329.jpeg', 1),
(13, 4, 'luUkEtlqN03RF_18D5Jgdfile-1613573414137.jpeg', 2),
(14, 4, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 3),
(15, 4, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 4),
(16, 5, 'n5F9uE0PCgiDpLdmXPo4hfile-1613573360996.jpeg', 0),
(17, 5, 'laohiKiU-RNJjgvocBrHjfile-1613573429329.jpeg', 1),
(18, 5, 'luUkEtlqN03RF_18D5Jgdfile-1613573414137.jpeg', 2),
(19, 5, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 3),
(20, 5, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 4),
(21, 6, 'n5F9uE0PCgiDpLdmXPo4hfile-1613573360996.jpeg', 0),
(22, 6, 'laohiKiU-RNJjgvocBrHjfile-1613573429329.jpeg', 1),
(23, 6, 'luUkEtlqN03RF_18D5Jgdfile-1613573414137.jpeg', 2),
(24, 6, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 3),
(25, 6, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 4),
(26, 7, 'n5F9uE0PCgiDpLdmXPo4hfile-1613573360996.jpeg', 0),
(27, 7, 'laohiKiU-RNJjgvocBrHjfile-1613573429329.jpeg', 1),
(28, 7, 'luUkEtlqN03RF_18D5Jgdfile-1613573414137.jpeg', 2),
(29, 7, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 3),
(30, 7, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 4),
(31, 8, 'n5F9uE0PCgiDpLdmXPo4hfile-1613573360996.jpeg', 0),
(32, 8, 'laohiKiU-RNJjgvocBrHjfile-1613573429329.jpeg', 1),
(33, 8, 'luUkEtlqN03RF_18D5Jgdfile-1613573414137.jpeg', 2),
(34, 8, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 3),
(35, 8, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 4),
(36, 9, 'n5F9uE0PCgiDpLdmXPo4hfile-1613573360996.jpeg', 0),
(37, 9, 'laohiKiU-RNJjgvocBrHjfile-1613573429329.jpeg', 1),
(38, 9, 'luUkEtlqN03RF_18D5Jgdfile-1613573414137.jpeg', 2),
(39, 9, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 3),
(40, 9, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 4),
(41, 10, 'n5F9uE0PCgiDpLdmXPo4hfile-1613573360996.jpeg', 0),
(42, 10, 'laohiKiU-RNJjgvocBrHjfile-1613573429329.jpeg', 1),
(43, 10, 'luUkEtlqN03RF_18D5Jgdfile-1613573414137.jpeg', 2),
(44, 10, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 3),
(45, 10, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 4),
(46, 11, 'n5F9uE0PCgiDpLdmXPo4hfile-1613573360996.jpeg', 0),
(47, 11, 'laohiKiU-RNJjgvocBrHjfile-1613573429329.jpeg', 1),
(48, 11, 'luUkEtlqN03RF_18D5Jgdfile-1613573414137.jpeg', 2),
(49, 11, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 3),
(50, 11, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 4),
(51, 12, 'n5F9uE0PCgiDpLdmXPo4hfile-1613573360996.jpeg', 0),
(52, 12, 'laohiKiU-RNJjgvocBrHjfile-1613573429329.jpeg', 1),
(53, 12, 'luUkEtlqN03RF_18D5Jgdfile-1613573414137.jpeg', 2),
(54, 12, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 3),
(55, 12, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 4),
(56, 13, 'n5F9uE0PCgiDpLdmXPo4hfile-1613573360996.jpeg', 0),
(57, 13, 'laohiKiU-RNJjgvocBrHjfile-1613573429329.jpeg', 1),
(58, 13, 'luUkEtlqN03RF_18D5Jgdfile-1613573414137.jpeg', 2),
(59, 13, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 3),
(60, 13, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 4),
(61, 14, 'n5F9uE0PCgiDpLdmXPo4hfile-1613573360996.jpeg', 0),
(62, 14, 'laohiKiU-RNJjgvocBrHjfile-1613573429329.jpeg', 1),
(63, 14, 'luUkEtlqN03RF_18D5Jgdfile-1613573414137.jpeg', 2),
(64, 14, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 3),
(65, 14, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 4),
(66, 15, 'n5F9uE0PCgiDpLdmXPo4hfile-1613573360996.jpeg', 0),
(67, 15, 'laohiKiU-RNJjgvocBrHjfile-1613573429329.jpeg', 1),
(68, 15, 'luUkEtlqN03RF_18D5Jgdfile-1613573414137.jpeg', 2),
(69, 15, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 3),
(70, 15, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 4),
(71, 16, 'n5F9uE0PCgiDpLdmXPo4hfile-1613573360996.jpeg', 0),
(72, 16, 'laohiKiU-RNJjgvocBrHjfile-1613573429329.jpeg', 1),
(73, 16, 'luUkEtlqN03RF_18D5Jgdfile-1613573414137.jpeg', 2),
(74, 16, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 3),
(75, 16, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 4),
(76, 17, 'n5F9uE0PCgiDpLdmXPo4hfile-1613573360996.jpeg', 0),
(77, 17, 'laohiKiU-RNJjgvocBrHjfile-1613573429329.jpeg', 1),
(78, 17, 'luUkEtlqN03RF_18D5Jgdfile-1613573414137.jpeg', 2),
(79, 17, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 3),
(80, 17, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 4),
(81, 18, 'n5F9uE0PCgiDpLdmXPo4hfile-1613573360996.jpeg', 0),
(82, 18, 'laohiKiU-RNJjgvocBrHjfile-1613573429329.jpeg', 1),
(83, 18, 'luUkEtlqN03RF_18D5Jgdfile-1613573414137.jpeg', 2),
(84, 18, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 3),
(85, 18, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 4),
(86, 19, 'n5F9uE0PCgiDpLdmXPo4hfile-1613573360996.jpeg', 0),
(87, 19, 'laohiKiU-RNJjgvocBrHjfile-1613573429329.jpeg', 1),
(88, 19, 'luUkEtlqN03RF_18D5Jgdfile-1613573414137.jpeg', 2),
(89, 19, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 3),
(90, 19, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 4),
(91, 20, 'n5F9uE0PCgiDpLdmXPo4hfile-1613573360996.jpeg', 0),
(92, 20, 'laohiKiU-RNJjgvocBrHjfile-1613573429329.jpeg', 1),
(93, 20, 'luUkEtlqN03RF_18D5Jgdfile-1613573414137.jpeg', 2),
(94, 20, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 3),
(95, 20, 'lvv-sV0htWwmqmaMHRtTzfile-1613573475670.jpeg', 4);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int NOT NULL,
  `liker` int NOT NULL,
  `liked` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int NOT NULL,
  `users_id` int NOT NULL,
  `city` varchar(255) NOT NULL,
  `lat` float(10,6) NOT NULL,
  `long` float(10,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `users_id`, `city`, `lat`, `long`) VALUES
(1, 1, 'Oulad', 32.876572, -6.986470),
(2, 2, 'Khouribga', 32.876572, -6.986470),
(3, 3, 'Khouribga', 32.856571, -6.976470),
(4, 4, 'Khouribga', 32.866570, -6.966470),
(5, 5, 'Oulad', 33.289970, -8.253730),
(6, 6, 'Oulad', 32.846569, -6.946470),
(7, 7, 'Timoulilt', 32.246571, -6.446470),
(8, 8, 'Bni', 32.746571, -6.646470),
(9, 9, 'Bni', 32.716572, -6.656470),
(10, 10, 'Bni', 32.716530, -6.656170),
(11, 11, 'Bni', 32.776531, -6.626170),
(12, 12, 'Afourar', 32.176529, -6.526170),
(13, 14, 'Afourar', 32.116531, -6.522170),
(14, 15, 'Tachraft', 32.816528, -6.422170),
(15, 16, 'Braksa', 32.856529, -6.422170),
(16, 17, 'Tachraft', 32.836529, -6.412170),
(17, 18, 'Tachraft', 32.834530, -6.412130),
(18, 19, 'Maadna', 32.839531, -6.492130),
(19, 20, 'Tachraft', 32.819530, -6.412130);

-- --------------------------------------------------------

--
-- Table structure for table `matchs`
--

CREATE TABLE `matchs` (
  `id` int NOT NULL,
  `user1` int NOT NULL,
  `user2` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`id`, `name`) VALUES
(1, '#chess'),
(2, '#sport'),
(3, '#wine'),
(4, '#party'),
(5, '#wine'),
(6, '#weed'),
(7, '#football'),
(8, '#tennis'),
(9, '#tool'),
(10, '#aliceInChain'),
(11, '#raid'),
(12, '#tech'),
(13, '#docker'),
(14, '#roger'),
(15, '#aykona'),
(16, '#catrsist'),
(17, '#reading'),
(18, '#magicians'),
(19, '#wick'),
(20, '#luther');

-- --------------------------------------------------------

--
-- Table structure for table `tag_user`
--

CREATE TABLE `tag_user` (
  `id` int NOT NULL,
  `users_id` int NOT NULL,
  `tag_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tag_user`
--

INSERT INTO `tag_user` (`id`, `users_id`, `tag_id`) VALUES
(1, 1, 12),
(3, 1, 10),
(4, 10, 3),
(5, 1, 11),
(6, 10, 10),
(7, 1, 6),
(8, 10, 18),
(9, 2, 10),
(10, 3, 15),
(11, 2, 16),
(12, 2, 1),
(13, 2, 13),
(14, 2, 20),
(15, 3, 16),
(16, 3, 1),
(17, 3, 13),
(18, 3, 7),
(20, 3, 20),
(21, 3, 18),
(22, 3, 11),
(23, 4, 11),
(24, 4, 17),
(25, 4, 14),
(26, 4, 15),
(27, 4, 16),
(28, 4, 17),
(29, 4, 18),
(30, 4, 19),
(31, 4, 20),
(32, 4, 1),
(33, 5, 10),
(34, 5, 11),
(35, 5, 12),
(36, 5, 13),
(37, 5, 14),
(38, 5, 15),
(39, 5, 16),
(40, 5, 17),
(41, 6, 1),
(42, 6, 14),
(43, 6, 3),
(44, 6, 4),
(45, 6, 5),
(46, 6, 6),
(47, 6, 7),
(48, 6, 8),
(49, 6, 9),
(50, 6, 10),
(51, 7, 11),
(52, 7, 12),
(53, 7, 13),
(54, 7, 14),
(55, 7, 18),
(56, 7, 17),
(57, 7, 16),
(58, 7, 15),
(59, 8, 19),
(60, 8, 20),
(61, 8, 1),
(62, 8, 2),
(63, 8, 6),
(64, 8, 5),
(65, 8, 3),
(66, 8, 4),
(67, 9, 10),
(68, 9, 9),
(69, 9, 8),
(70, 9, 7),
(71, 10, 14),
(72, 10, 13),
(73, 10, 12),
(74, 10, 11),
(75, 1, 19),
(76, 1, 20),
(77, 11, 1),
(78, 11, 2),
(79, 11, 3),
(80, 11, 4),
(81, 11, 6),
(82, 11, 5),
(83, 12, 2),
(84, 12, 4),
(85, 12, 5),
(86, 12, 7),
(87, 12, 12),
(88, 13, 4),
(89, 13, 7),
(90, 13, 2),
(91, 13, 14),
(92, 13, 11),
(93, 14, 14),
(94, 14, 12),
(95, 14, 8),
(96, 14, 7),
(97, 14, 3),
(98, 14, 4),
(99, 14, 2),
(100, 14, 1),
(101, 15, 1),
(102, 15, 20),
(103, 15, 19),
(104, 15, 18),
(105, 15, 17),
(106, 15, 16),
(107, 15, 15),
(108, 15, 14),
(109, 15, 13),
(110, 15, 12),
(111, 16, 9),
(112, 16, 8),
(113, 16, 7),
(114, 16, 6),
(115, 16, 5),
(116, 16, 4),
(117, 16, 3),
(118, 16, 2),
(119, 17, 3),
(120, 17, 2),
(121, 17, 20),
(122, 17, 19),
(123, 17, 18),
(124, 17, 17),
(125, 17, 16),
(126, 17, 12),
(127, 17, 13),
(128, 17, 11),
(129, 17, 10);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `oauth_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `vkey` varchar(255) NOT NULL,
  `verify` int NOT NULL DEFAULT '0',
  `age` int DEFAULT NULL,
  `gender` enum('Male','Women','Other') DEFAULT NULL,
  `type` enum('Male','Women','Other') DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `fameRating` int DEFAULT '1',
  `status` int DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `oauth_id`, `email`, `userName`, `firstName`, `lastName`, `password`, `vkey`, `verify`, `age`, `gender`, `type`, `bio`, `fameRating`, `status`) VALUES
(1, NULL, 'hassanseffiani@gmail.com', 'hsf', 'hsf', 'killer', '$2b$10$D5ea72JMufBMzhERPMKGE.c0Ec1UGYV4vU2ubC5UM519CrKHNlG8q', '8ed36dad89cc210327dc5f1bf7b125af8257cb2d17fdeed0a5a35363c18d91ed', 1, 18, 'Male', 'Other', 'Biography for user1', 600, 2),
(2, NULL, 'hassanseffiani1@gmail.com', 'lkahba', 'hsf', 'killer', '$2b$10$0aytWTd9Oo9PPtQIWGgofeiGtYkXnOJ0fjIVzrdrPoKoToTRx8NSW', '38f5a1f3990219e246ba81c0b44e38d0011225e74fea1c7ff7aba97f9e5e6eee', 1, 22, 'Women', 'Male', 'Biography for user2', 200, 2),
(3, NULL, 'hassanseffiani2@gmail.com', 'hsf2', 'hsf', 'killer', '$2b$10$1ObGsxs1JuJSGlVC5sRgnOFReiW3RnZ8G7zGuK1hwp91SQq1UuJJe', '6728794d2be2ee19a7cc92edd3667ba692666bf6320d8533a479d8de1070e7b1', 1, 20, 'Male', 'Women', 'Biography for user3', 400, 2),
(4, NULL, 'hassanseffiani3@gmail.com', 'chalotiya', 'hsf', 'killer', '$2b$10$07mGEi/zHYm9kSV.pQqn9u/n5xYMhRoPgVI3/lMqXoyXbIUIe/u2m', 'dc2c19b64d0a577c53e31241e2c7a9ba252c33b43accf00ba1b59d2956914601', 1, 21, 'Women', 'Male', 'Biography for user4', 300, 2),
(5, NULL, 'hassanseffiani4@gmail.com', 'hsf4', 'hsf', 'killer', '$2b$10$7beU0B32KM99ymOXv/Dpde52.CYFW68lTRMVVdR3/ilp8CPaSMwCS', 'f42561845afb82441da46e8c171e68e1dccbcbb019781f9d09b48ff7fd56e0e1', 1, 22, 'Male', 'Women', 'Biography for user5', 700, 1),
(6, NULL, 'hassanseffiani5@gmail.com', 'hsf5', 'hsf', 'killer', '$2b$10$X.qe0BAaax7Pf7IceKnDu.y0MT5CCQ9Gjd.PauUS8puVzlyhePSZe', 'e9456c8ddf6d785b5e6c3edf0ba5acf3da8c6b9d364b148335e49456e97db76e', 1, 23, 'Women', 'Male', 'Biography for user6', 600, 2),
(7, NULL, 'hassanseffiani6@gmail.com', 'hsf6', 'hsf', 'killer', '$2b$10$fltwxcJGeTGEvIQ5MmefLeIp4MCNWdybrT/OtRIGAq4Fgd2F51KAO', '6bb02f4cd101c8f1b335a09a2b5348c333b8f829615daf995b848ab78cf23071', 1, 24, 'Male', 'Women', 'Biography for user7', 800, 2),
(8, NULL, 'hassanseffiani7@gmail.com', 'hsf7', 'hsf', 'killer', '$2b$10$opuDzuh2.ORq.IX0.1yJN.BY7/Qx0c4CxWDmOyGXh.3S7csAfusEG', '2c63da54c98c898388830940fb940d00572a26ca46e690f1b363b32c93e2b539', 1, 25, 'Women', 'Male', 'Biography for user8', 100, 2),
(9, NULL, 'hassanseffiani8@gmail.com', 'hsf8', 'hsf', 'killer', '$2b$10$KYuyqzSZ8EjE960Dbl7xsu2MSD7Irh0eJ6BZM/rEzp62sc0Qq1H7W', '97be55b68b72a7c0ef398f6669ba35504f2723657e87e7abda012f141e2c953f', 1, 26, 'Male', 'Women', 'Biography for user9', 600, 2),
(10, NULL, 'hassanseffiani9@gmail.com', 'hsf9', 'hsf', 'killer', '$2b$10$t0yakHHvl9BiOvzBJizlZOIFRYO6u0/ZzCbSLcH38D.1yPJPBRb3e', '350ed02542008080850a19376e54df7d7640c9474149946ddaf91f05a34b22ef', 1, 27, 'Women', 'Male', 'Biography for user10', 400, 2),
(11, NULL, 'hassanseffiani10@gmail.com', 'hsf10', 'hsf', 'killer', '$2b$10$psqCNSH9xJ14P5DzbZZoW.jNliWNOCUfwuXj6zB8V.ldUHizTPzXm', '03079b90a25d19a503d3ce87577aff440cef60aae89b30cc9f56a19fcc0b69ab', 1, 28, 'Male', 'Women', 'Biography for user11', 600, 2),
(12, NULL, 'hassanseffiani11@gmail.com', 'hsf11', 'hsf', 'killer', '$2b$10$cuHKksM4huTW0iiWOBZMUeb4yRhtwf9nyJDI3YYcz46H06Yugarb6', '975ed4f9217b165e7193aa9de03acb4d03f235d2e33c7b3fd6f2bc9c05b361d0', 1, 29, 'Women', 'Male', 'Biography for user12', 500, 2),
(13, NULL, 'hassanseffiani12@gmail.com', 'hsf12', 'hsf', 'killer', '$2b$10$R0v4yUm/ykxS9HLbV0ue2eJNfGAUBoafP8QHeb.IwcFDOZD74Zn6u', '8ad44838a863f5bc0189b452f289e93c46994507bcb32ece87f29c1ab1ee0f34', 1, 30, 'Male', 'Women', 'Biography for user13', 300, 1),
(14, NULL, 'hassanseffiani13@gmail.com', 'hsf13', 'hsf', 'killer', '$2b$10$avNtLEI/MmShi9M8YpAjeuocP2kbCyS1O9.52hL7E5vDIYmy18dQG', '538eb74b99ddbdc7c67677642f5865ca8f8fb785692883aa7586458f7e40b35c', 1, 31, 'Women', 'Women', 'Biography for user14', 300, 2),
(15, NULL, 'hassanseffiani14@gmail.com', 'hsf14', 'hsf', 'killer', '$2b$10$uwS0wjqJIsaOEv94tEMmVOxJTEiNDXfLjozitKOeJNRhCs84ofmV6', '68539e1c7c9498700fd885300c4c7da495062e08b7c5b386f95b94f90203cd79', 1, 32, 'Male', 'Women', 'Biography for user15', 700, 2),
(16, NULL, 'hassanseffiani15@gmail.com', 'hsf15', 'hsf', 'killer', '$2b$10$7z6yGS.kX3XGwZ5fgDuSfe27KVq.qADD25HgMeC5svOejRNoZ8662', '3bb2d8045d1481f43e4fa1fe78a14ca572742d8c7cae702e6ff7e5f7a0eafbf1', 1, 33, 'Women', 'Male', 'Biography for user16', 400, 2),
(17, NULL, 'hassanseffiani16@gmail.com', 'hsf16', 'hsf', 'killer', '$2b$10$YbEhn1UB06grkgYMyCP89.r5BoZY/6lkbFfZ4Dshse/qsby5Gdgb6', '8aeb7b2d8667ccd9dcc6f962365b05f12bf0c95844086c86f71633d77c8fdd0e', 1, 34, 'Male', 'Women', 'Biography for user17', 200, 2),
(18, NULL, 'hassanseffiani17@gmail.com', 'hsf17', 'hsf', 'killer', '$2b$10$nIsn0FxruNFy9RLJEVb2OuU0KEDFi0mL3F6nLi3N0QHhRGGew3CEe', '441067776d2b5140951c37755bb169647ba2da4f8cef3b8b4c360ca8c1ebf053', 1, 35, 'Women', 'Male', 'Biography for user18', 500, 1),
(19, NULL, 'hassanseffiani18@gmail.com', 'hsf18', 'hsf', 'killer', '$2b$10$ypXVlIQA6QNw0wsTMAAY3Ockgs8XgoR.IT31EACljkj7MAqftNokW', '05274b6d1c81e24c3f8c0bae50cbef090e73cdfeca5481c169dcaad8b4bc74ba', 1, 36, 'Male', 'Other', 'Biography for user19', 600, 1),
(20, NULL, 'hassanseffiani19@gmail.com', 'hsf19', 'hsf', 'killer', '$2b$10$0.0CMfeqrB7EuXukxRYhMul045HWVFQV.QvcCGYnSzpEABzTgZbsi', '9f02304ae5018042d2a8d4b627052111fc86fb595a2e181b843209e4aad7e648', 1, 37, 'Women', 'Male', 'Biography for user20', 900, 1),
(21, NULL, 'hassanseffiani20@gmail.com', 'hsf20', 'hsf', 'killer', '$2b$10$EUjrBMO51JdAsKo5yAX9NeNZ9MZL/K9o6gtI9TnSyK1nb/Gm58mfa', '5dfb5741b2d4e8d90dc9d5b24e5c1b84c42c22a8a76933c0c49381de8c49d20c', 1, 38, 'Male', 'Women', 'Biography for user21', 700, 1),
(22, '100162585403909249676', 'hassanseffiani@gmail.com', 'Oli Hsf', 'Oli', 'Hsf', '*', 'ya29.A0AfH6SMDHYkBb5L8kONA2cmRGJgkx3405sX1D9YbTvDjdAJJrMeKOPexWiuGMKHxeQJDA6v2ciUY8PujlyoRHEGhiHDJqo-Uvq_I10Ln51cRV_hu6G2yx_uAHwXJl81bga7u-O_qrS16fGyZZUmBVfdeV8Kk0', 0, 18, 'Male', 'Other', 'Biography for user21=2', 900, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocked`
--
ALTER TABLE `blocked`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `imgProfil`
--
ALTER TABLE `imgProfil`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indexes for table `matchs`
--
ALTER TABLE `matchs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tag_user`
--
ALTER TABLE `tag_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blocked`
--
ALTER TABLE `blocked`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `imgProfil`
--
ALTER TABLE `imgProfil`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `matchs`
--
ALTER TABLE `matchs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tag_user`
--
ALTER TABLE `tag_user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `imgProfil`
--
ALTER TABLE `imgProfil`
  ADD CONSTRAINT `imgProfil_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tag_user`
--
ALTER TABLE `tag_user`
  ADD CONSTRAINT `tag_user_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tag_user_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`%` EVENT `myevent` ON SCHEDULE EVERY 1 SECOND STARTS '2021-02-18 15:09:19' ON COMPLETION NOT PRESERVE ENABLE DO CALL delete_like()$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
