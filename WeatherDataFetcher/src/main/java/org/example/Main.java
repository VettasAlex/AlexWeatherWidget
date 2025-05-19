package org.example;

import static spark.Spark.*;

import org.json.JSONObject;

public class Main {
    public static void main(String[] args) {
        DataFetcher fetcher = new DataFetcher();

        post("/trigger-fetch", (req, res) -> {
            fetcher.fetchAndStoreWeatherData("Thessaloniki");
            return "Daily weather fetched and stored!";
        });


        post("/log-momentary", (req, res) -> {
            res.type("text/plain");

            JSONObject body = new JSONObject(req.body());
            String city = body.getString("city");
            double temperature = body.getDouble("temperature");
            int humidity = body.getInt("humidity");

            fetcher.insertMomentaryWeather(city, temperature, humidity);

            return "Momentary weather logged!";
        });


        port(8080);
    }
}
