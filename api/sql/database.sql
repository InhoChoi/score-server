create database if not exists test;
use test;

#auth_token
CREATE TABLE `auth_token` (
  `id` int(50) unsigned NOT NULL AUTO_INCREMENT,
  `userid` int(50) NOT NULL,
  `token` text NOT NULL,
  `expiredAt` timestamp NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


#problem_submit
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

#problem_testcase
CREATE TABLE `problem_testcase` (
  `id` int(50) unsigned NOT NULL AUTO_INCREMENT,
  `problemid` int(50) NOT NULL,
  `input` text NOT NULL,
  `output` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#problem
CREATE TABLE `problem` (
  `id` int(50) unsigned NOT NULL AUTO_INCREMENT,
  `userid` int(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` text NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#user
CREATE TABLE `user` (
  `id` int(50) unsigned NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `email` TEXT NOT NULL,
  `password` TEXT NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
