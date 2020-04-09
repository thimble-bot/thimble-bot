package utils

// InStringArray checks if a provided value is inside of a string array
func InStringArray(haystack []string, needle string) bool {
	for _, val := range haystack {
		if val == needle {
			return true
		}
	}

	return false
}
