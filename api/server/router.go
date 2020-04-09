package server

import (
	"github.com/gofiber/fiber"
	"github.com/jozsefsallai/thimble-bot/api/controllers"
	"github.com/jozsefsallai/thimble-bot/api/middleware"
)

// SetRoutes will assign the controllers to individual routes
func SetRoutes(app *fiber.App) {
	app.Get("/", controllers.HomeController)
	app.Get("/v1/8ball", middleware.EnsureAuthorized, controllers.EightBallController)
}
