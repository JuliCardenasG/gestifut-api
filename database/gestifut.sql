-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 27-05-2018 a las 21:55:57
-- Versión del servidor: 5.7.22-0ubuntu0.16.04.1
-- Versión de PHP: 7.1.17-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestifut`
--
CREATE DATABASE IF NOT EXISTS `gestifut` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `gestifut`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calendars`
--

CREATE TABLE `calendars` (
  `id` int(11) NOT NULL,
  `tournament_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `calendars`
--

INSERT INTO `calendars` (`id`, `tournament_id`) VALUES
(29, 44);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clasifications`
--

CREATE TABLE `clasifications` (
  `id` int(11) NOT NULL,
  `tournament_id` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `goals_scored` int(11) DEFAULT NULL,
  `goals_against` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clasifications`
--

INSERT INTO `clasifications` (`id`, `tournament_id`, `team_id`, `goals_scored`, `goals_against`, `points`) VALUES
(1, 44, 167, 2, 1, 3),
(2, 44, 168, 4, 2, 4),
(3, 44, 169, 5, 1, 4),
(4, 44, 170, 3, 6, 3),
(5, 44, 171, 2, 3, 3),
(6, 44, 172, 2, 5, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `goalscorers`
--

CREATE TABLE `goalscorers` (
  `id` int(11) NOT NULL,
  `match_id` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `player_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matchdays`
--

CREATE TABLE `matchdays` (
  `id` int(11) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  `matchday_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `matchdays`
--

INSERT INTO `matchdays` (`id`, `tournament_id`, `matchday_number`) VALUES
(82, 16, 1),
(83, 16, 2),
(84, 17, 1),
(85, 17, 2),
(86, 17, 3),
(87, 17, 4),
(88, 17, 5),
(89, 18, 1),
(90, 19, 1),
(91, 19, 2),
(92, 19, 3),
(93, 20, 1),
(94, 20, 2),
(95, 20, 3),
(96, 20, 4),
(97, 20, 5),
(98, 21, 1),
(99, 21, 2),
(100, 21, 3),
(101, 21, 4),
(102, 21, 5),
(103, 22, 1),
(104, 22, 2),
(105, 22, 3),
(106, 23, 1),
(107, 23, 2),
(108, 23, 3),
(109, 24, 1),
(110, 24, 2),
(111, 24, 3),
(112, 25, 1),
(113, 26, 1),
(114, 26, 2),
(115, 26, 3),
(116, 27, 1),
(117, 27, 2),
(118, 28, 1),
(119, 28, 2),
(120, 29, 1),
(121, 29, 2),
(122, 29, 3),
(123, 30, 1),
(124, 30, 2),
(125, 31, 1),
(126, 31, 2),
(127, 32, 1),
(128, 32, 2),
(129, 33, 1),
(130, 33, 2),
(131, 36, 1),
(132, 36, 2),
(133, 38, 1),
(134, 38, 2),
(135, 39, 1),
(136, 39, 2),
(137, 40, 1),
(138, 40, 2),
(139, 41, 1),
(140, 41, 2),
(141, 42, 1),
(142, 42, 2),
(143, 42, 3),
(144, 43, 1),
(145, 43, 2),
(146, 43, 3),
(147, 43, 4),
(148, 43, 5),
(149, 44, 1),
(150, 44, 2),
(151, 44, 3),
(152, 44, 4),
(153, 44, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matches`
--

CREATE TABLE `matches` (
  `id` int(11) NOT NULL,
  `matchday_id` int(11) DEFAULT NULL,
  `team_local_id` int(11) DEFAULT NULL,
  `team_visitor_id` int(11) DEFAULT NULL,
  `team_local_goals` int(11) DEFAULT NULL,
  `team_visitor_goals` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `matches`
--

INSERT INTO `matches` (`id`, `matchday_id`, `team_local_id`, `team_visitor_id`, `team_local_goals`, `team_visitor_goals`, `date`) VALUES
(173, 149, 167, 172, 2, 0, NULL),
(174, 149, 168, 171, 3, 1, NULL),
(175, 149, 169, 170, 4, 0, NULL),
(176, 150, 167, 171, 0, 1, NULL),
(177, 150, 172, 170, 2, 3, NULL),
(178, 150, 168, 169, 1, 1, NULL),
(179, 151, 167, 170, 0, 0, NULL),
(180, 151, 171, 169, 0, 0, NULL),
(181, 151, 172, 168, 0, 0, NULL),
(182, 152, 167, 169, 0, 0, NULL),
(183, 152, 170, 168, 0, 0, NULL),
(184, 152, 171, 172, 0, 0, NULL),
(185, 153, 167, 168, 0, 0, NULL),
(186, 153, 169, 172, 0, 0, NULL),
(187, 153, 170, 171, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `team_id` int(11) DEFAULT NULL,
  `name` varchar(191) COLLATE utf8_bin DEFAULT NULL,
  `number` varchar(45) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `players`
--

INSERT INTO `players` (`id`, `team_id`, `name`, `number`) VALUES
(1, 167, 'Jugador 1', '1'),
(2, 167, 'Jugador 2', '2'),
(3, 167, 'Jugador 4', '4'),
(4, 167, 'Jugador 3', '3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `tournament_id` int(11) DEFAULT NULL,
  `name` varchar(191) COLLATE utf8_bin NOT NULL,
  `image` varchar(191) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `teams`
--

INSERT INTO `teams` (`id`, `tournament_id`, `name`, `image`) VALUES
(167, 44, 'Equipo 1', 'public/img/6e91f170-61c5-11e8-8d74-610674a02bf6.png'),
(168, 44, 'Equipo 3', 'public/img/6e921880-61c5-11e8-8d74-610674a02bf6.png'),
(169, 44, 'Equipo 2', 'public/img/6e91f171-61c5-11e8-8d74-610674a02bf6.png'),
(170, 44, 'Equipo 6', 'public/img/6e923f91-61c5-11e8-8d74-610674a02bf6.png'),
(171, 44, 'Equipo 5', 'public/img/6e923f90-61c5-11e8-8d74-610674a02bf6.png'),
(172, 44, 'Equipo 4', 'public/img/6e921881-61c5-11e8-8d74-610674a02bf6.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tournaments`
--

CREATE TABLE `tournaments` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `name` varchar(191) COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(191) COLLATE utf8_bin DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT '0',
  `image` varchar(191) COLLATE utf8_bin DEFAULT NULL,
  `teams_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `tournaments`
--

INSERT INTO `tournaments` (`id`, `admin_id`, `name`, `description`, `is_public`, `image`, `teams_number`) VALUES
(44, 1, 'Nuevo torneo 2', 'Descripción del nuevo torneo', 1, 'public/img/6e8bafe0-61c5-11e8-8d74-610674a02bf6.png', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(191) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(191) COLLATE utf8_bin DEFAULT NULL,
  `image` varchar(191) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `image`) VALUES
(1, 'Julián', 'juli@email.com', '$2b$05$Idtl3niMlwxphZOW.tfTm.6MjtspvLmL1GuzO67gk48LK7y2VCvBy', 'public/img/user.jpg'),
(2, 'Pepe', 'pepe@email.com', '$2b$05$hxA0cZmulSqnsNvXx.YMrOFqDW9LnC1DSsZboLvD0er7eaDJHV0FW', 'public/img/1526839694.png'),
(3, 'Cliente 1', 'cliente1@email.com', '$2b$05$q19wNe1YQAHOtqJifmEWSOi3TxxhEIOHGK2bSe3m.4E7OC6iLh1au', 'public/img/1526842211.png'),
(4, 'princesa', 'princesa@email.com', '$2b$05$URTHJzkSiLLElFommHYgEexipOgdht21xMek9ivM7WFdSTZaovAdK', 'public/img/user.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calendars`
--
ALTER TABLE `calendars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_calendars_tournament_id_idx` (`tournament_id`);

--
-- Indices de la tabla `clasifications`
--
ALTER TABLE `clasifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_clasification_tournament_id_idx` (`tournament_id`),
  ADD KEY `fk_clasification_team_id_idx` (`team_id`);

--
-- Indices de la tabla `goalscorers`
--
ALTER TABLE `goalscorers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_goalscorers_match_id_idx` (`match_id`),
  ADD KEY `fk_goalscorers_team_id_idx` (`team_id`),
  ADD KEY `fk_goalscorers_player_id_idx` (`player_id`);

--
-- Indices de la tabla `matchdays`
--
ALTER TABLE `matchdays`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_matches_team_local_id_idx` (`team_local_id`),
  ADD KEY `fk_matches_team_visitor_id_idx` (`team_visitor_id`),
  ADD KEY `matchday_id` (`matchday_id`);

--
-- Indices de la tabla `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_players_team_id_idx` (`team_id`);

--
-- Indices de la tabla `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_teams_tournament_id_idx` (`tournament_id`);

--
-- Indices de la tabla `tournaments`
--
ALTER TABLE `tournaments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tournaments_admin_id_idx` (`admin_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calendars`
--
ALTER TABLE `calendars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT de la tabla `clasifications`
--
ALTER TABLE `clasifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `matchdays`
--
ALTER TABLE `matchdays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;
--
-- AUTO_INCREMENT de la tabla `matches`
--
ALTER TABLE `matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=188;
--
-- AUTO_INCREMENT de la tabla `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;
--
-- AUTO_INCREMENT de la tabla `tournaments`
--
ALTER TABLE `tournaments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `calendars`
--
ALTER TABLE `calendars`
  ADD CONSTRAINT `fk_calendars_tournament_id` FOREIGN KEY (`tournament_id`) REFERENCES `tournaments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `clasifications`
--
ALTER TABLE `clasifications`
  ADD CONSTRAINT `fk_clasification_team_id` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_clasification_tournament_id` FOREIGN KEY (`tournament_id`) REFERENCES `tournaments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `goalscorers`
--
ALTER TABLE `goalscorers`
  ADD CONSTRAINT `fk_goalscorers_match_id` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_goalscorers_player_id` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_goalscorers_team_id` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `fk_matches_matchday_id` FOREIGN KEY (`matchday_id`) REFERENCES `matchdays` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_matches_team_local_id` FOREIGN KEY (`team_local_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_matches_team_visitor_id` FOREIGN KEY (`team_visitor_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `fk_players_team_id` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `fk_teams_tournament_id` FOREIGN KEY (`tournament_id`) REFERENCES `tournaments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tournaments`
--
ALTER TABLE `tournaments`
  ADD CONSTRAINT `fk_tournaments_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
