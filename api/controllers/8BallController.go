package controllers

import (
	"crypto/sha256"
	"encoding/binary"
	"fmt"
	"io"
	"math/rand"

	"github.com/gofiber/fiber"
)

// EightBallController will return a seeded answer based on the user's input
func EightBallController(ctx *fiber.Ctx) {
	fmt.Println(ctx.Route())
	query := ctx.Query("q")

	if len(query) == 0 {
		ctx.Status(422).JSON(&fiber.Map{
			"ok":    false,
			"error": "Please ask a valid question.",
		})
		return
	}

	answers := []string{
		"Certainly so!",
		"Undoubtedly yes!",
		"Definitely.",
		"Very much yes!",
		"Yep!",
		"Most likely, yeah!",
		"Maybe-maybe...",
		"Probably.",
		"I cannot tell you that right now.",
		"Negative.",
		"I think the answer is no.",
		"Not really.",
		"Nope.",
		"No.",
		"Very doubtful.",
	}

	hasher := sha256.New()
	io.WriteString(hasher, query)

	var seed uint64 = binary.BigEndian.Uint64(hasher.Sum(nil))
	rand.Seed(int64(seed))

	answer := answers[rand.Intn(len(answers))]

	ctx.JSON(&fiber.Map{
		"ok":     true,
		"answer": answer,
		"query":  query,
	})
}
