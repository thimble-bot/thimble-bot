package main

import (
	"log"

	"github.com/gofiber/fiber"
	"github.com/jozsefsallai/thimble-bot/api/server"
	"github.com/spf13/viper"
)

func init() {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")

	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			log.Fatal("Config file coult not be found at ./config.yml")
		} else {
			log.Fatal(err)
		}
	}
}

func main() {
	app := fiber.New()

	server.SetMiddleware(app)
	server.SetRoutes(app)
	server.Boot(app)
}
