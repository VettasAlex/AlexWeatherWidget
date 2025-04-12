# 📚Alex's Weather Widget

A lightweight, scalable weather widget that supports both light and dark themes. 
It fetches real-time weather data for Thessaloniki, Greece, 
and logs daily averages for temperature and humidity at 08:00 AM.


---

## 🚀 Features

- **Real-time Weather Data**: Displays current temperature, humidity, and other weather details.
- **7-Day Weather Forecast**: Users can select a specific date to view weather data for the next 7 days.
- **Graphical Representation**: Shows a graph of minimum and maximum temperature for the next 7 days.
- **Light or Dark Mode**: Lets user choose between Light or Dark Mode.
- **Scalable Design**: Built with responsive layouts to ensure seamless integration across various screen sizes and applications.
- **Automated Daily Logging**: Records average temperature and humidity every day at 08:00 AM for historical analysis and future implementation.

---

## 📥Getting Started

### Prerequisites

- Docker installed on your machine.

### Installation

1. Clone the Repository
   git clone https://github.com/VettasAlex/AlexWeatherWidget.git
   cd weatherproject

2. Run the Application
   docker-compose up -d

3. Access the Application
   Open your browser and navigate to http://localhost:8080

4. Access the Database
   Use a MySQL client like HeidiSQL with the following details:
     - Host: localhost
     - Port: 3306
     - User: root
     - Password: 12345
     - Database: weather_app

---

## 🛠️ Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Java
- Database: MySQL (managed using HeidiSQL)
- Containerization: Docker

---

## 📝Daily Logging Details

- Time: 08:00 AM daily.
- Storage: Logged data is stored in the MySQL database for future reference and analysis.
- Data Logged:
  - Average Daily Temperature
  - Average Daily Humidity


---


*Developed by Vettas Alex for TechPro Academy*


