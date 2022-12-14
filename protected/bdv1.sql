-- MySQL Script generated by MySQL Workbench
-- Thu Oct  6 21:31:09 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ametista
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ametista` ;

-- -----------------------------------------------------
-- Schema ametista
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ametista` DEFAULT CHARACTER SET utf8 ;
USE `ametista` ;

-- -----------------------------------------------------
-- Table `ametista`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ametista`.`User` (
  `cpf` VARCHAR(100) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NULL,
  `password` VARCHAR(100) NOT NULL,
  `status` VARCHAR(100) NULL,
  `user_level` INT NULL,
  `user_image` VARCHAR(100) NULL,
  PRIMARY KEY (`cpf`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ametista`.`LogStatusUser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ametista`.`LogStatusUser` (
  `idLogStatus` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(100) NULL,
  PRIMARY KEY (`idLogStatus`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ametista`.`Client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ametista`.`Client` (
  `cpf` VARCHAR(100) NOT NULL,
  `name` VARCHAR(100) NULL,
  `email` VARCHAR(100) NULL,
  `phone` VARCHAR(100) NULL,
  PRIMARY KEY (`cpf`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ametista`.`Language`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ametista`.`Language` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `language` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ametista`.`Subject`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ametista`.`Subject` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `category` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ametista`.`Request`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ametista`.`Request` (
  `id` CHAR(10) NOT NULL,
  `Client_cpf` VARCHAR(100) NOT NULL,
  `category` VARCHAR(100) NULL,
  `subject` VARCHAR(100) NULL,
  `created_at` TIMESTAMP NULL,
  `ended_at` TIMESTAMP NULL,
  `description` VARCHAR(100) NULL,
  `deadline` TIMESTAMP NULL,
  `priority` INT NULL,
  `comment` VARCHAR(100) NULL,
  `status` VARCHAR(100) NULL,
  `idLanguage` INT NOT NULL,
  `idSubject` INT NOT NULL,
  PRIMARY KEY (`id`, `Client_cpf`),
  INDEX `fk_Request_Client1_idx` (`Client_cpf` ASC) ,
  INDEX `fk_Request_Language1_idx` (`idLanguage` ASC) ,
  INDEX `fk_Request_Subject1_idx` (`idSubject` ASC) ,
  CONSTRAINT `fk_Request_Client1`
    FOREIGN KEY (`Client_cpf`)
    REFERENCES `ametista`.`Client` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Request_Language1`
    FOREIGN KEY (`idLanguage`)
    REFERENCES `ametista`.`Language` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Request_Subject1`
    FOREIGN KEY (`idSubject`)
    REFERENCES `ametista`.`Subject` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ametista`.`LogStatusUser_has_User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ametista`.`LogStatusUser_has_User` (
  `idLogStatus` INT NOT NULL,
  `User_cpf` VARCHAR(100) NOT NULL,
  `registered_at` TIMESTAMP NULL,
  PRIMARY KEY (`idLogStatus`, `User_cpf`),
  INDEX `fk_LogStatusUser_has_User_User1_idx` (`User_cpf` ASC) ,
  INDEX `fk_LogStatusUser_has_User_LogStatusUser1_idx` (`idLogStatus` ASC) ,
  CONSTRAINT `fk_LogStatusUser_has_User_LogStatusUser1`
    FOREIGN KEY (`idLogStatus`)
    REFERENCES `ametista`.`LogStatusUser` (`idLogStatus`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_LogStatusUser_has_User_User1`
    FOREIGN KEY (`User_cpf`)
    REFERENCES `ametista`.`User` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ametista`.`LogStatusRequest`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ametista`.`LogStatusRequest` (
  `id` INT NOT NULL,
  `status` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ametista`.`LogStatusRequest_has_Request`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ametista`.`LogStatusRequest_has_Request` (
  `idLogStatus` INT NOT NULL,
  `idRequest` CHAR(10) NOT NULL,
  `registered_at` TIMESTAMP NULL,
  PRIMARY KEY (`idLogStatus`, `idRequest`),
  INDEX `fk_LogStatusRequest_has_Request_Request1_idx` (`idRequest` ASC) ,
  INDEX `fk_LogStatusRequest_has_Request_LogStatusRequest1_idx` (`idLogStatus` ASC) ,
  CONSTRAINT `fk_LogStatusRequest_has_Request_LogStatusRequest1`
    FOREIGN KEY (`idLogStatus`)
    REFERENCES `ametista`.`LogStatusRequest` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_LogStatusRequest_has_Request_Request1`
    FOREIGN KEY (`idRequest`)
    REFERENCES `ametista`.`Request` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ametista`.`User_has_Request`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ametista`.`User_has_Request` (
  `User_cpf` VARCHAR(100) NOT NULL,
  `Request_id` CHAR(10) NOT NULL,
  `registered_at` TIMESTAMP NULL,
  PRIMARY KEY (`User_cpf`, `Request_id`),
  INDEX `fk_User_has_Request_Request1_idx` (`Request_id` ASC) ,
  INDEX `fk_User_has_Request_User1_idx` (`User_cpf` ASC) ,
  CONSTRAINT `fk_User_has_Request_User1`
    FOREIGN KEY (`User_cpf`)
    REFERENCES `ametista`.`User` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Request_Request1`
    FOREIGN KEY (`Request_id`)
    REFERENCES `ametista`.`Request` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ametista`.`User_has_Language`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ametista`.`User_has_Language` (
  `cpfUser` VARCHAR(100) NOT NULL,
  `idLanguage` INT NOT NULL,
  PRIMARY KEY (`cpfUser`, `idLanguage`),
  INDEX `fk_User_has_Language_Language1_idx` (`idLanguage` ASC) ,
  INDEX `fk_User_has_Language_User1_idx` (`cpfUser` ASC) ,
  CONSTRAINT `fk_User_has_Language_User1`
    FOREIGN KEY (`cpfUser`)
    REFERENCES `ametista`.`User` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Language_Language1`
    FOREIGN KEY (`idLanguage`)
    REFERENCES `ametista`.`Language` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ametista`.`Area`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ametista`.`Area` (
  `id` INT NOT NULL,
  `name` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ametista`.`Area_has_User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ametista`.`Area_has_User` (
  `Area_id` INT NOT NULL,
  `User_cpf` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`Area_id`, `User_cpf`),
  INDEX `fk_Area_has_User_User1_idx` (`User_cpf` ASC) ,
  INDEX `fk_Area_has_User_Area1_idx` (`Area_id` ASC) ,
  CONSTRAINT `fk_Area_has_User_Area1`
    FOREIGN KEY (`Area_id`)
    REFERENCES `ametista`.`Area` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Area_has_User_User1`
    FOREIGN KEY (`User_cpf`)
    REFERENCES `ametista`.`User` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ametista`.`Area_has_Subject`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ametista`.`Area_has_Subject` (
  `Area_id` INT NOT NULL,
  `Subject_id` INT NOT NULL,
  PRIMARY KEY (`Area_id`, `Subject_id`),
  INDEX `fk_Area_has_Subject_Subject1_idx` (`Subject_id` ASC) ,
  INDEX `fk_Area_has_Subject_Area1_idx` (`Area_id` ASC) ,
  CONSTRAINT `fk_Area_has_Subject_Area1`
    FOREIGN KEY (`Area_id`)
    REFERENCES `ametista`.`Area` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Area_has_Subject_Subject1`
    FOREIGN KEY (`Subject_id`)
    REFERENCES `ametista`.`Subject` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
