package controllers

import "github.com/gofiber/fiber"

// HomeController will redirect the user to the bot's website.
func HomeController(ctx *fiber.Ctx) {
	ctx.Redirect("https://bot.thimble.cx")
}
