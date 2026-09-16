package main

import (
	"encoding/json"
	"log"
	"os"
)

type Handler struct {
	store *Store
}

func WriteJSON[T any](filename string, data T) error {
	file, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")

	return encoder.Encode(data)
}

func main() {
	store, err := NewStore("_data/database.sqlite")
	if err != nil {
		log.Fatalf("Failed to initialize store: %v", err)
	}

	detachments, _ := store.GetAllDetachments()
	if err := WriteJSON("_generated/detachments.json", detachments); err != nil {
		log.Fatalf("Failed to save detachments JSON %v", err)
	}
	log.Printf("Generated detachments: %v", len(detachments))


	otherYouthOrganisations, _ := store.GetAllOtherYouthOrganisations()
	if err := WriteJSON("_generated/other-youth-organisations.json", otherYouthOrganisations); err != nil {
		log.Fatalf("Failed to save other youth organisations JSON %v", err)
	}
	log.Printf("Generated other youth organisations: %v", len(otherYouthOrganisations))


	schools, _ := store.GetAllSchools()
	if err := WriteJSON("_generated/schools.json", schools); err != nil {
		log.Fatalf("Failed to save schools JSON %v", err)
	}
	log.Printf("Generated schools: %v", len(schools))

	log.Printf("All JSON files generated from SQLite database")
}
