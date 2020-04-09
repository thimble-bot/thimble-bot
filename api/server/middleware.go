package server

import (
	"github.com/gofiber/fiber"
	bearertoken "github.com/jozsefsallai/fiber-bearer-token"
)

// SetMiddleware will hook all the necessary middleware to the server app
func SetMiddleware(app *fiber.App) {
	app.Use(bearertoken.New(nil))
}
