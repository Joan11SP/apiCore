create database core;

use core

create table partners
(
	idPartner				int primary key auto_increment,
	identification			varchar(25) not null,
	typeIdentification		char(5) not null,
	names					varchar(55) not null,
	lastName				varchar(35) not null,
	mothersLastName			varchar(35) null,
	typePartner				char(1),
	phone					varchar(35) not null,
	email					varchar(70) null,
	domicile				varchar(255),
	birthDate				date not null,
	createAt				datetime default now()

);

create table accounts
(
	idAccount				int not null,
	numAccount				varchar(25) not null,
	name					varchar(100) not null,
	partnerId				int not null,
	typeAccount				tinyint,	
	acceptDebit				bit,
	acceptCredit			bit,
	availableBalance		double,
	blockedBalance			double,
	lastMovement			datetime default null,
	status					char(1),
	createAt				datetime default now()
);
-- insert into accounts (idAccount, numAccount, name, partnerId, typeAccount, acceptDebit, acceptCredit, availableBalance, blockedBalance, status)

create table transactions
(
	idTransaction				int auto_increment primary key,
	sign						char(1),
	typeTransaction				char(10),
	value						double,
	accountNumber				varchar(25),
	affectedAccountNumber		varchar(30),
	balance						double,
	observation					varchar(25),
	createAt					datetime(3),
	connectionIp				varchar(20),
	reference					varchar(65),
	identificationBenef			varchar(35),
	nameBenef					varchar(60),
	idBank						varchar(15) null
);

create table interbankTransaction
(
	idInterbank					int auto_increment primary key,
	type						varchar(15),
	identificationOrigin		varchar(25),
	nameOrigin					varchar(35),
	accountOrigin				varchar(45),
	value						double,
	observation					varchar(25),
	identificationDes			varchar(25),
	nameDestiantion				varchar(35)
	accountType					char(2),
	idBank						varchar(25),
	status						tinyint(1),
	createAt					datetime default now()
);



INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('1851349145', 'CED', 'John', 'Doe', '', 'N', '(555) 555-1234', 'johndoe@example.com', '', '1973-01-22', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('2341318394', 'CED', 'Jane', 'Smith', '', 'N', '(555) 555-5678', 'janesmith@example.com', '', '1983-02-22', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('1355100958', 'CED', 'Bob', 'Johnson', '', 'N', '(555) 555-9012', 'bobjohnson@example.com', '', '1974-11-12', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('0321338637', 'CED', 'Emily', 'Davis', '', 'N', '(555) 555-3456', 'emilydavis@example.com', '', '1974-11-30', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('2240163167', 'CED', 'William', 'Brown', '', 'N', '(555) 555-6789', 'williambrown@example.com', '', '1974-11-22', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('2158803047', 'CED', 'Laura', 'Wilson', '', 'N', '(555) 555-1234', 'laurawilson@example.com', '', '1984-12-14', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('2019800895', 'CED', 'Michael', 'Garcia', '', 'N', '(555) 555-9012', 'michaelgarcia@example.com', '', '1984-12-14', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('1147241344', 'CED', 'Stephanie', 'Lee', '', 'N', '(555) 555-3456', 'stephanielee@example.com', '', '1983-02-13', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('2365355064', 'CED', 'David', 'Hernandez', '', 'N', '(555) 555-6789', 'davidhernandez@example.com', '', '2000-11-10', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('1586790631', 'CED', 'Jessica', 'Perez', '', 'N', '(555) 555-9012', 'jessicaperez@example.com', '', '1988-11-13', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('1216496176', 'CED', 'Mark', 'Thompson', '', 'N', '(555) 555-1234', 'markthompson@example.com', '', '1999-01-17', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('0221252251', 'CED', 'Lisa', 'Rodriguez', '', 'N', '(555) 555-5678', 'lisarodriguez@example.com', '', '1999-01-17', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('1618545350', 'CED', 'Julia', 'Kim', '', 'N', '(555) 555-1234', 'juliakim@example.com', '', '2002-11-11', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('2173183635', 'CED', 'Max', 'Brown', '', 'N', '(555) 555-5678', 'maxbrown@example.com', '', '2007-10-07', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('0556994034', 'CED', 'Oliver', 'Martinez', '', 'N', '(555) 555-9012', 'olivermartinez@example.com', '', '2001-11-03', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('1211141251', 'CED', 'Sophie', 'Lee', '', 'N', '(555) 555-3456', 'sophielee@example.com', '', '1982-04-12', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('1003928475', 'CED', 'Mia', 'Nguyen', '', 'N', '(555) 555-9012', 'mianuguyen@example.com', '', '1980-05-22', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('2350156813', 'CED', 'Lucas', 'Kim', '', 'N', '(555) 555-5678', 'lucaskim@example.com', '', '1980-05-22', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('0327372132', 'CED', 'Isabella', 'Hernandez', '', 'N', '(555) 555-1234', 'isabellahernandez@example.com', '', '1980-09-26', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('0711859168', 'CED', 'Ethan', 'Kim', '', 'N', '(555) 555-5678', 'ethankim@example.com', '', '1983-03-06', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('0321120121', 'CED', 'Ava', 'Patel', '', 'N', '(555) 555-9012', 'avapatel@example.com', '', '1983-08-01', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('2038578981', 'CED', 'William', 'Kim', '', 'N', '(555) 555-1234', 'williamkim@example.com', '', '1983-08-01', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('0400402382', 'CED', 'Ella', 'Lee', '', 'N', '(555) 555-5678', 'ellalee@example.com', '', '1983-08-01', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('1460634900', 'CED', 'Noah', 'Martin', '', 'N', '(555) 555-9012', 'noahmartin@example.com', '', '1983-09-11', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('0905916115', 'CED', 'Emma', 'Garcia', '', 'N', '(555) 555-1234', 'emmagarcia@example.com', '', '1983-09-11', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('0815084319', 'CED', 'Aiden', 'Martinez', '', 'N', '(555) 555-5678', 'aidenmartinez@example.com', '', '1983-09-11', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('0142500868', 'CED', 'Chloe', 'Nguyen', '', 'N', '(555) 555-9012', 'chloenguyen@example.com', '', '1988-12-13', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('0914629687', 'CED', 'Liam', 'Brown', '', 'N', '(555) 555-1234', 'liambrown@example.com', '', '2002-01-25', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('2208583293', 'CED', 'Jasmine', 'Brown', '', 'N', '(555) 555-1234', 'jasminebrown@example.com', '', '1990-11-19', '2024-10-30 04:35:42');
INSERT INTO partners (identification, typeIdentification, names, lastName, mothersLastName, typePartner, phone, email, domicile, birthDate, createAt) VALUES('1003134828', 'CED', 'Stefan', 'Kupidura', '', 'N', '(555) 555-1234', 'stefankupidura@example.com', '', '1978-12-25', '2024-10-30 04:35:42');


INSERT INTO accounts (idAccount, numAccount, name, partnerId, typeAccount, acceptDebit, acceptCredit, availableBalance, blockedBalance, status, createAt, lastMovement) VALUES(10545, '7055075247', 'Test', 30, 1, 1, 1, 9938.0, 0.0, 'A', '2024-10-30 04:50:27', '2024-11-07 04:54:11');
INSERT INTO accounts (idAccount, numAccount, name, partnerId, typeAccount, acceptDebit, acceptCredit, availableBalance, blockedBalance, status, createAt, lastMovement) VALUES(10547, '8621421376', 'Test 2', 28, 1, 1, 1, 137.0, 0.0, 'A', '2024-11-04 20:32:24', '2024-11-07 04:54:11');

INSERT INTO transactions (sign, typeTransaction, value, accountNumber, affectedAccountNumber, balance, observation, createAt, connectionIp, reference, identificationBenef, nameBenef, idBank) VALUES('-', 'TRANSFER', 10.5, '7055075247', '8621421376', 9959.0, 'Pruebas', '2024-11-07 04:49:27', '192.168.10.70', '464564', '0914629687', 'Liam Brown', NULL);
INSERT INTO transactions (sign, typeTransaction, value, accountNumber, affectedAccountNumber, balance, observation, createAt, connectionIp, reference, identificationBenef, nameBenef, idBank) VALUES('+', 'TRANSFER', 10.5, '8621421376', '7055075247', 116.0, 'Pruebas', '2024-11-07 04:49:27', '192.168.10.70', '464564', '0914629687', 'Liam Brown', NULL);
INSERT INTO transactions (sign, typeTransaction, value, accountNumber, affectedAccountNumber, balance, observation, createAt, connectionIp, reference, identificationBenef, nameBenef, idBank) VALUES('-', 'TRANSFER', 10.5, '7055075247', '8621421376', 9948.5, 'Pruebas', '2024-11-06 23:51:42.144000000', '192.168.10.70', '464564', '0914629687', 'Liam Brown', NULL);
INSERT INTO transactions (sign, typeTransaction, value, accountNumber, affectedAccountNumber, balance, observation, createAt, connectionIp, reference, identificationBenef, nameBenef, idBank) VALUES('+', 'TRANSFER', 10.5, '8621421376', '7055075247', 126.5, 'Pruebas', '2024-11-06 23:51:42.144000000', '192.168.10.70', '464564', '0914629687', 'Liam Brown', NULL);
INSERT INTO transactions (sign, typeTransaction, value, accountNumber, affectedAccountNumber, balance, observation, createAt, connectionIp, reference, identificationBenef, nameBenef, idBank) VALUES('-', 'TRANSFER', 10.5, '7055075247', '8621421376', 9938.0, 'Pruebas', '2024-11-06 23:54:11.544000000', '192.168.10.70', '464564', '0914629687', 'Liam Brown', NULL);
INSERT INTO transactions (sign, typeTransaction, value, accountNumber, affectedAccountNumber, balance, observation, createAt, connectionIp, reference, identificationBenef, nameBenef, idBank) VALUES('+', 'TRANSFER', 10.5, '8621421376', '7055075247', 137.0, 'Pruebas', '2024-11-06 23:54:11.545000000', '192.168.10.70', '464564', '0914629687', 'Liam Brown', NULL);





