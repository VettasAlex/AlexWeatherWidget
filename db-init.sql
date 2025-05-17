CREATE DATABASE IF NOT EXISTS weather_app;
USE weather_app;

CREATE TABLE IF NOT EXISTS weather_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(50) NOT NULL,
    temperature FLOAT,
    humidity INT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS daily_weather (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    avg_temperature FLOAT,
    avg_humidity FLOAT,
    UNIQUE KEY unique_city_date (city, date)
);


CREATE TABLE IF NOT EXISTS momentary_weather (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(50) NOT NULL,
    temperature FLOAT NOT NULL,
    humidity INT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

