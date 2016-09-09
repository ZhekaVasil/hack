-- phpMyAdmin SQL Dump
-- version 4.4.15.5
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 09 2016 г., 16:50
-- Версия сервера: 5.7.11
-- Версия PHP: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `project`
--

-- --------------------------------------------------------

--
-- Структура таблицы `vid`
--

CREATE TABLE IF NOT EXISTS `vid` (
  `#` int(50) NOT NULL,
  `idvid` varchar(50) NOT NULL,
  `thumbnail` varchar(200) NOT NULL,
  `audurl` varchar(200) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `vid`
--

INSERT INTO `vid` (`#`, `idvid`, `thumbnail`, `audurl`) VALUES
(39, 'gwqSi_ToNPs', 'https://i.ytimg.com/vi/gwqSi_ToNPs/maxresdefault.jpg', 'null');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `vid`
--
ALTER TABLE `vid`
  ADD PRIMARY KEY (`#`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `vid`
--
ALTER TABLE `vid`
  MODIFY `#` int(50) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=82;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
