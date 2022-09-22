CREATE SCHEMA `law_docs_label` ;

CREATE TABLE `law_docs_label`.`expert` (
  `e_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `phone_num` CHAR(10) NOT NULL,
  `institution_name` VARCHAR(150) NOT NULL,
  `reg_num` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`e_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);