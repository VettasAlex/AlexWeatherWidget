package org.example;

import static spark.Spark.*;

import org.json.JSONObject;

public class Main {
    public static void main(String[] args) {
        // Set the port for the backend
        port(8080);

        // CORS setup (this runs before every request)
        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            response.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        });

        // Handle preflight OPTIONS request
        options("/*", (request, response) -> {
            response.status(200);
            return "OK";
        });

        // POST route that logs temperature
        post("/log-momentary", (request, response) -> {
    System.out.println("Received JSON:");
    String body = request.body();
    System.out.println(body);

    // Parse JSON
    JSONObject json = new JSONObject(body);
    String city = json.getString("city");
    double temperature = json.getDouble("temperature");
    int humidity = json.getInt("humidity");

    // Insert into DB
    DataFetcher fetcher = new DataFetcher();
    fetcher.insertMomentaryWeather(city, temperature, humidity);

    response.type("text/plain");
    return "Logged successfully and inserted into DB";
});

    }
}
