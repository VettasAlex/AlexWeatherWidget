package org.example;

import static spark.Spark.*;


public class MainServer {
    public static void main(String[] args) {
        port(8080); // o html server mou
        DataFetcher fetcher = new DataFetcher();

        // called by js
        post("/trigger-fetch", (req, res) -> {
            fetcher.fetchAndStoreWeatherData("Thessaloniki");
            return "Weather fetched and stored!";
        });
    }
}
