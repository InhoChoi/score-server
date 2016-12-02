CREATE TABLE `auth_token` (
  `id` int(50) unsigned NOT NULL AUTO_INCREMENT,
  `userid` int(50) NOT NULL,
  `token` text NOT NULL,
  `expiredAt` timestamp NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
