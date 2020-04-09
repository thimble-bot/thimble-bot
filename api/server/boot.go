package server

import (
	"github.com/gofiber/fiber"
	"github.com/spf13/viper"
)

// Boot will start the server on the provided port
func Boot(app *fiber.App) {
	port := viper.Get("port")

	if port == nil {
		port = 3000
	}

	app.Listen(port)
}
