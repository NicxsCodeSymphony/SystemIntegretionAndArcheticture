  -- phpMyAdmin SQL Dump
  -- version 5.2.1
  -- https://www.phpmyadmin.net/
  --
  -- Host: 127.0.0.1
  -- Generation Time: Apr 22, 2024 at 05:20 AM
  -- Server version: 10.4.28-MariaDB
  -- PHP Version: 8.2.4

  SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
  START TRANSACTION;
  SET time_zone = "+00:00";


  /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
  /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
  /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
  /*!40101 SET NAMES utf8mb4 */;

  --
  -- Database: `socialmedia`
  --

  -- --------------------------------------------------------

  --
  -- Table structure for table `accounts`
  --

  CREATE TABLE `accounts` (
    `id` int(11) NOT NULL,
    `name` varchar(50) NOT NULL,
    `username` varchar(50) NOT NULL,
    `password` varchar(50) NOT NULL,
    `birthdate` date NOT NULL,
    `gender` varchar(10) NOT NULL,
    `location` varchar(100) NOT NULL,
    `civilStatus` varchar(20) NOT NULL,
    `image` varchar(100) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  --
  -- Dumping data for table `accounts`
  --

  INSERT INTO `accounts` (`id`, `name`, `username`, `password`, `birthdate`, `gender`, `location`, `civilStatus`, `image`) VALUES
  (1, 'John Nico Edisan', 'nico', 'nico', '2024-04-03', 'Male', 'Bungtod, Bogo City, Cebu', 'Single', 'uploads/6625c1a2aa91f_huuuu.jpg'),
  (2, 'Izzy Baliguat', 'izzy', 'izzy', '2024-04-17', 'Female', 'Tajao, Toledo City, Cebu', 'Single', ''),
  (3, 'Avelline Jane Alegada', 'ave', 'ave', '2003-11-26', 'Female', 'Cabitoonan, Toledo City, Cebu', 'In a Relationship', 'uploads/6625c1e738f3b_images.jpg'),
  (4, 'Dhaniel Malinao', 'da', 'da', '2019-02-07', 'Male', 'Pelaez, Bogo, City Cebu', 'Single', 'uploads/6625c1331f37e_66252f99a948e_dhaniel.jpg');

  -- --------------------------------------------------------

  --
  -- Table structure for table `comments`
  --

  CREATE TABLE `comments` (
    `id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL,
    `friend_id` int(11) NOT NULL,
    `postId` int(11) NOT NULL,
    `comment` text NOT NULL,
    `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  --
  -- Dumping data for table `comments`
  --

  INSERT INTO `comments` (`id`, `user_id`, `friend_id`, `postId`, `comment`, `time`) VALUES
  (1, 1, 3, 2, 'asdasd', '2024-04-22 03:08:13'),
  (2, 1, 1, 1, 'SI DHANIEL KAY BAYOT PISOT BULKASEL ANIMAL', '2024-04-22 03:09:48');

  -- --------------------------------------------------------

  --
  -- Table structure for table `friends`
  --

  CREATE TABLE `friends` (
    `id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL,
    `friend_id` int(11) NOT NULL,
    `status` enum('Accepted','Rejected','','') NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  --
  -- Dumping data for table `friends`
  --

  INSERT INTO `friends` (`id`, `user_id`, `friend_id`, `status`, `created_at`) VALUES
  (1, 1, 3, 'Accepted', '2024-04-21 12:26:13'),
  (2, 1, 4, 'Accepted', '2024-04-22 01:46:10');

  -- --------------------------------------------------------

  --
  -- Table structure for table `friend_request`
  --

  CREATE TABLE `friend_request` (
    `id` int(11) NOT NULL,
    `sender_id` int(11) NOT NULL,
    `receiver_id` int(11) NOT NULL,
    `status` enum('Pending','Rejected','Accepted','') NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  --
  -- Dumping data for table `friend_request`
  --

  INSERT INTO `friend_request` (`id`, `sender_id`, `receiver_id`, `status`, `created_at`) VALUES
  (1, 3, 1, 'Accepted', '2024-04-21 12:26:13'),
  (2, 4, 1, 'Accepted', '2024-04-22 01:46:10'),
  (3, 3, 4, 'Pending', '2024-04-22 02:08:48');

  -- --------------------------------------------------------

  --
  -- Table structure for table `post`
  --

  CREATE TABLE `post` (
    `id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL,
    `caption` text NOT NULL,
    `imagePost` varchar(100) NOT NULL,
    `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  --
  -- Dumping data for table `post`
  --

  INSERT INTO `post` (`id`, `user_id`, `caption`, `imagePost`, `time`) VALUES
  (1, 1, 'Im under the water please help me', 'sample', '2024-04-21 12:26:46'),
  (2, 3, 'asdasd', 'sample', '2024-04-22 01:43:27');

  --
  -- Indexes for dumped tables
  --

  --
  -- Indexes for table `accounts`
  --
  ALTER TABLE `accounts`
    ADD PRIMARY KEY (`id`);

  --
  -- Indexes for table `comments`
  --
  ALTER TABLE `comments`
    ADD PRIMARY KEY (`id`),
    ADD KEY `user_id` (`user_id`),
    ADD KEY `friend_id` (`friend_id`),
    ADD KEY `postId` (`postId`);

  --
  -- Indexes for table `friends`
  --
  ALTER TABLE `friends`
    ADD PRIMARY KEY (`id`),
    ADD KEY `user_id` (`user_id`),
    ADD KEY `friend_id` (`friend_id`);

  --
  -- Indexes for table `friend_request`
  --
  ALTER TABLE `friend_request`
    ADD PRIMARY KEY (`id`),
    ADD KEY `receiver_id` (`receiver_id`),
    ADD KEY `sender_id` (`sender_id`);

  --
  -- Indexes for table `post`
  --
  ALTER TABLE `post`
    ADD PRIMARY KEY (`id`),
    ADD KEY `user_id` (`user_id`);

  --
  -- AUTO_INCREMENT for dumped tables
  --

  --
  -- AUTO_INCREMENT for table `accounts`
  --
  ALTER TABLE `accounts`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

  --
  -- AUTO_INCREMENT for table `comments`
  --
  ALTER TABLE `comments`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

  --
  -- AUTO_INCREMENT for table `friends`
  --
  ALTER TABLE `friends`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

  --
  -- AUTO_INCREMENT for table `friend_request`
  --
  ALTER TABLE `friend_request`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

  --
  -- AUTO_INCREMENT for table `post`
  --
  ALTER TABLE `post`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

  --
  -- Constraints for dumped tables
  --

  --
  -- Constraints for table `comments`
  --
  ALTER TABLE `comments`
    ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`id`),
    ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `accounts` (`id`),
    ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`postId`) REFERENCES `accounts` (`id`);

  --
  -- Constraints for table `friends`
  --
  ALTER TABLE `friends`
    ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`id`),
    ADD CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `accounts` (`id`);

  --
  -- Constraints for table `friend_request`
  --
  ALTER TABLE `friend_request`
    ADD CONSTRAINT `friend_request_ibfk_1` FOREIGN KEY (`receiver_id`) REFERENCES `accounts` (`id`),
    ADD CONSTRAINT `friend_request_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `accounts` (`id`);

  --
  -- Constraints for table `post`
  --
  ALTER TABLE `post`
    ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`id`);
  COMMIT;

  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
