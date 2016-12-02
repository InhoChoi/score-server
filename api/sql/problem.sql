CREATE TABLE `problem` (
  `id` int(50) unsigned NOT NULL AUTO_INCREMENT,
  `userid` int(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` text NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
