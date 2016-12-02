CREATE TABLE `problem_submit` (
  `id` int(50) unsigned NOT NULL AUTO_INCREMENT,
  `problemid` int(50) NOT NULL,
  `userid` int(50) NOT NULL,
  `code` text NOT NULL,
  `status` text NOT NULL,
  `output` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
