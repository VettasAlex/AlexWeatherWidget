package org.example;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import org.json.JSONArray;
import org.json.JSONObject;

public class DataFetcher {

    // SKG coordinates
    private static final String API_URL = "https://api.open-meteo.com/v1/forecast?latitude=40.6401&longitude=22.9444&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,relative_humidity_2m_min&timezone=auto";
    private static final String DB_URL = "jdbc:mysql://weather-db:3306/weather_app";
    private static final String DB_USER = "root";
    private static final String DB_PASS = "12345";

    //RETRY IF CONNECTION FAIL
    private Connection connectWithRetry(int maxRetries, int waitMillis) throws InterruptedException {
        int attempt = 0;
        while (attempt < maxRetries) {
            try {
                return DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
            } catch (Exception e) {
                attempt++;
                System.out.println("Attempt " + attempt + " failed to connect to DB. Retrying in " + waitMillis + "ms...");
                Thread.sleep(waitMillis);
            }
        }
        throw new RuntimeException("Failed to connect to DB after " + maxRetries + " attempts.");
    }
    public void fetchAndStoreWeatherData(String city) {
        try {
            HttpURLConnection connection = (HttpURLConnection) new URL(API_URL).openConnection();
            connection.setRequestMethod("GET");

            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder jsonBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                jsonBuilder.append(line);
            }

            reader.close();
            connection.disconnect();

            JSONObject json = new JSONObject(jsonBuilder.toString());
            JSONObject daily = json.getJSONObject("daily");

            JSONArray dates = daily.getJSONArray("time");
            JSONArray tempMax = daily.getJSONArray("temperature_2m_max");
            JSONArray tempMin = daily.getJSONArray("temperature_2m_min");
            JSONArray humidityMax = daily.getJSONArray("relative_humidity_2m_max");
            JSONArray humidityMin = daily.getJSONArray("relative_humidity_2m_min");

            try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
                String query = "INSERT INTO daily_weather (city, date, avg_temperature, avg_humidity) VALUES (?, ?, ?, ?)";
                try (PreparedStatement stmt = conn.prepareStatement(query)) {
                    // Only today's data (index 0)
                    String date = dates.getString(0);
                    double avgTemp = (tempMax.getDouble(0) + tempMin.getDouble(0)) / 2;
                    double avgHumidity = (humidityMax.getDouble(0) + humidityMin.getDouble(0)) / 2;

                    stmt.setString(1, city);
                    stmt.setString(2, date);
                    stmt.setDouble(3, avgTemp);
                    stmt.setDouble(4, avgHumidity);
                    stmt.executeUpdate();

                    System.out.println("Inserted today's data for " + date);
                }
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void insertMomentaryWeather(String city, double temperature, int humidity) {
        String query = "INSERT INTO weather_data (city, temperature, humidity) VALUES (?, ?, ?)";


        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, city);
            stmt.setDouble(2, temperature);
            stmt.setInt(3, humidity);
            stmt.executeUpdate();

            System.out.println("Momentary weather inserted successfully.");

        } catch (Exception e) {
            System.err.println("Failed to insert momentary weather:");
            e.printStackTrace();
        }
    }
}
