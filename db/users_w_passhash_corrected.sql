-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-05-2017 a las 02:57:31
-- Versión del servidor: 10.1.22-MariaDB
-- Versión de PHP: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `u600314227_bicoy`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `RowID` bigint(20) NOT NULL,
  `UserID` bigint(20) NOT NULL,
  `PassHash` text COLLATE utf8_unicode_ci NOT NULL,
  `Forename` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `MiddleName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FirstSurname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `SecondSurname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Phone` int(20) NOT NULL,
  `UserGroup` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `CompanyID` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Status` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'inactive',
  `LastMod` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifierID` bigint(20) NOT NULL,
  `LastIP` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `FFD` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'false'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`RowID`, `UserID`, `PassHash`, `Forename`, `MiddleName`, `FirstSurname`, `SecondSurname`, `Email`, `Phone`, `UserGroup`, `CompanyID`, `Status`, `LastMod`, `ModifierID`, `LastIP`, `FFD`) VALUES
(1, 730300606, '6941f70eebb7314a974a508498b950669a6180fe07a86f8926634c6f70710b04', 'Sofia', 'Sharon', 'Jimenez', 'Mora', 'Jimenez@cfia.com', 81891387, 'editor', 'cfia', 'FALSE', '2016-11-25 00:00:00', 119719940, '236.117.164.18', ''),
(2, 540296096, '11a80318e06948432cfeaa32053ec0604612d7a01beb5537b88e9e29c420934c', 'Sharon', 'Sharon', 'Jimenez', 'Quesada', 'Jimenez@bac san jose.com', 85328719, 'technician', 'bac san jose', 'FALSE', '2017-06-28 00:00:00', 119719940, '183.180.128.3', ''),
(3, 435037716, '6c656245d7db91909f24e22eca56593e267efe475430ce94763e97c192f83f7d', 'Erick', 'Nicole', 'Chaverria', 'Rodriguez', 'Chaverria@boston scientific.com', 85440604, 'viewer', 'boston scientific', 'TRUE', '2017-09-15 00:00:00', 540296096, '243.124.121.16', ''),
(4, 616433553, '0dfbdb6148171b48b06f4d829a5c753ba27b97a6d385bafd30a605cacb117ba8', 'Ramiro', 'Nicole', 'Araya', 'Alvarez', 'Araya@hpe.com', 89163665, 'none', 'hpe', 'FALSE', '2016-04-12 00:00:00', 129438171, '149.138.159.6', ''),
(5, 444888697, '648306867598c98b2d6f54b0ed3a110b38fbc386ac7b6d47b64385f6a5a249ce', 'Maria', 'Sofia', 'Salas', 'Alfaro', 'Salas@hpe.com', 84964846, 'guess', 'hpe', 'FALSE', '2017-06-24 00:00:00', 119719940, '152.118.158.6', ''),
(6, 459779329, '7e486a43eb58adf4ba770435d4ec212aca62e9bf869b19be2f239c59c7600123', 'Catalina', 'Sharon', 'Mora', 'Alvarez', 'Mora@bac san jose.com', 88460476, 'technician', 'bac san jose', 'FALSE', '2015-01-18 00:00:00', 730300606, '161.156.179.21', ''),
(8, 119719940, '67a44257327a4df319099641a325cb97ad93055bb511f3c3e6484d5ffc783568', 'Fernanda', 'Erick', 'Araya', 'Gonzalez', 'Araya@boston scientific.com', 81182754, 'viewer', 'boston scientific', 'TRUE', '2017-09-17 00:00:00', 540296096, '208.182.127.15', ''),
(9, 270049781, 'ef1e841b49ed01280c0380375269d25855ef1be8553179f7c4c5c428c5666c58', 'Maria', 'Ramiro', 'Rodriguez', 'Mora', 'Rodriguez@banco nacional.com', 87277913, 'admin', 'banco nacional', 'TRUE', '2015-09-08 00:00:00', 444888697, '210.152.125.30', ''),
(14, 8211524631, '2ff52f1446a801cd680dbd56157d7e3bc598076c1fae8f0495ed11c8b801041b', 'esteban', 'allan', 'alfaro', 'salas', 'undefined', 0, 'administrator', 'NONE', 'inactive', '2017-03-06 12:25:26', 0, '', 'false'),
(15, 8211524631, 'NONE', 'esteban', 'allan', 'alfaro', 'salas', 'undefined', 0, 'administrator', 'NONE', 'inactive', '2017-03-06 12:25:33', 0, '', 'false'),
(16, 8211524631, 'NONE', 'esteban', 'allan', 'alfaro', 'salas', 'undefined', 0, 'administrator', 'NONE', 'inactive', '2017-03-06 12:25:29', 0, '', 'false'),
(13, 511202213, '444', 'alfonso', 'allan', 'jimenez', 'angulo', 'undefined', 0, 'viewer', 'SerranoSA', 'inactive', '2017-02-24 23:26:05', 0, '', 'false'),
(17, 8211524631, 'NONE', 'esteban', 'allan', 'alfaro', 'salas', 'undefined', 0, 'administrator', 'NONE', 'inactive', '2017-03-06 12:25:37', 0, '', 'false'),
(18, 8211524631, 'NONE', 'esteban', 'allan', 'alfaro', 'salas', 'undefined', 0, 'administrator', 'NONE', 'inactive', '2017-03-06 12:25:41', 0, '', 'false'),
(19, 8211524631, 'NONE', 'esteban', 'allan', 'alfaro', 'salas', 'undefined', 0, 'administrator', 'NONE', 'inactive', '2017-03-06 12:25:44', 0, '', 'false'),
(20, 111610825, 'NONE', 'javier', 'NONE', 'gonzalez', 'murillo', 'undefined', 0, 'Guest', 'FireINC', 'inactive', '2017-03-07 03:00:53', 0, '', 'false'),
(21, 111610825, 'NONE', 'javier', 'NONE', 'gonzalez', 'murillo', 'undefined', 0, 'Guest', 'FireINC', 'inactive', '2017-03-07 03:00:54', 0, '', 'false'),
(22, 99881225, 'NONE', 'mariano', 'NONE', 'velez', 'cardona', 'undefined', 0, 'Viewer', 'FireINC', 'active', '2017-03-13 00:28:03', 0, '', 'false'),
(23, 131937220, 'e622511df8bf6d63c1b057f9340af6619be22db0c79c9017a1d0c7a11e833295', 'Jose', 'Harold', 'Jimenez', 'Quesada', 'Jimenez@bac san jose.com', 87445492, 'developer', 'bac san jose', 'TRUE', '2017-01-14 00:00:00', 616433553, '211.151.205.6', ''),
(7, 129438171, '6117277', 'Fernanda', 'Sharon', 'Quesada', 'Gonzalez', 'Quesada@bac san jose.com', 87547639, 'admin', 'bac san jose', 'TRUE', '2015-04-21 00:00:00', 459779329, '198.164.222.29', ''),
(10, 362295981, '5513947', 'Jorge', 'Nicole', 'Chaverria', 'Rodriguez', 'Chaverria@bac san jose.com', 89533296, 'technician', 'bac san jose', 'FALSE', '2016-08-07 00:00:00', 129438171, '190.120.166.4', ''),
(11, 345100213, '5256865', 'Fernanda', 'Erick', 'Alfaro', 'Quesada', 'Alfaro@bac san jose.com', 87183572, 'editor', 'bac san jose', 'TRUE', '2015-03-25 00:00:00', 444888697, '176.202.148.4', ''),
(12, 594929479, '215fb2c827737c3b1a13d66eed4055bd870f0314c298bd461f92a83a5976ff37', 'Maria', 'Ana', 'Quesada', 'Mora', 'Quesada@cfia.com', 82594518, 'editor', 'cfia', 'FALSE', '2017-04-27 00:00:00', 540296096, '161.167.210.12', ''),
(24, 111610819, 'f226724bac26b888d6fa223c50c57ed0fbf85e93afd747e205116fc454ab872b', '', NULL, '', '', '', 0, 'administrator', '', 'inactive', '2017-04-12 02:11:21', 0, '', 'false'),
(25, 111610820, '31073216d2300a8050cac7e11a2eef2f42b7eba6d1bb96309487df365083fe3a', '', NULL, '', '', '', 0, 'administrator', '', 'inactive', '2017-04-12 02:11:26', 0, '', 'false');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`RowID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `RowID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
