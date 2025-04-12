
USE weather_app;
CREATE TABLE IF NOT EXISTS weather_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(50) NOT NULL,
    temperature FLOAT,
    humidity INT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO weather_data (city, temperature, humidity) 
VALUES ('Thessaloniki', 23.5, 65), ('Athens', 25.3, 60);