package middleware

import (
	"github.com/gofiber/fiber"
	"github.com/jozsefsallai/thimble-bot/api/utils"
	"github.com/spf13/cast"
	"github.com/spf13/viper"
)

// EnsureAuthorized ensures that all requests are authorized
func EnsureAuthorized(ctx *fiber.Ctx) {
	token := ctx.Locals("token")
	if token == "" {
		ctx.Status(401).JSON(&fiber.Map{
			"ok":    false,
			"error": "Authorization token not provided.",
		})
		return
	}

	tokens := viper.Get("tokens")
	if tokens == nil {
		ctx.Next()
		return
	}

	tokensSlice := cast.ToStringSlice(viper.Get("tokens"))

	if !utils.InStringArray(tokensSlice, token.(string)) {
		ctx.Status(401).JSON(&fiber.Map{
			"ok":    false,
			"error": "The supplied token is invalid.",
		})
		return
	}

	ctx.Next()
}
