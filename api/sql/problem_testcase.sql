CREATE TABLE `problem_testcase` (
  `id` int(50) unsigned NOT NULL AUTO_INCREMENT,
  `problemid` int(50) NOT NULL,
  `input` text NOT NULL,
  `output` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
