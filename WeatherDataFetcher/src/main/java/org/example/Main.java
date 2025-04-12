package org.example;


public class Main {
    public static void main(String[] args) {
        DataFetcher fetcher = new DataFetcher();
        fetcher.fetchAndStoreWeatherData("Thessaloniki");
    }
}