package org.example;

import static spark.Spark.*;


public class MainServer {
    public static void main(String[] args) {
        port(8080); 
        DataFetcher fetcher = new DataFetcher();

        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }
        
            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
        
            return "OK";
        });
        
        // CORS setup
        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*"); 
            response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            response.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        });

        // called by js
        post("/trigger-fetch", (req, res) -> {
            fetcher.fetchAndStoreWeatherData("Thessaloniki");
            return "Weather fetched and stored!";
        });
    }
}
