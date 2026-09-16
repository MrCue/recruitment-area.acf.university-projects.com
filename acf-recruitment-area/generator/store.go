package main

import (
	"database/sql"

	_ "modernc.org/sqlite"
)

type Detachment struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
	//TODO: Change this to town
	LocalAuthority LocalAuthority `json:"localAuthority"`
	GeoLocation    GeoLocation    `json:"geoLocation"`
	Status         string         `json:"status"`
}

type GeoLocation struct {
	Latitude  float64 `json:"lat"`
	Longitude float64 `json:"lng"`
}

type LocalAuthority struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

type OtherYouthOrganisation struct {
	Id           int         `json:"id"`
	Organisation string      `json:"organisation"`
	Name         string      `json:"name"`
	GeoLocation  GeoLocation `json:"geoLocation"`
}

type School struct {
	Id             int            `json:"id"`
	Name           string         `json:"name"`
	LocalAuthority LocalAuthority `json:"localAuthority"`
	Address        string         `json:"address"`
	GeoLocation    GeoLocation    `json:"geoLocation"`
	Type           string         `json:"type"`
	Pupils         int            `json:"pupils"`
}

type Town struct {
	Id             int            `json:"id"`
	Name           string         `json:"name"`
	LocalAuthority LocalAuthority `json:"localAuthority"`
}

type Store struct {
	db *sql.DB
}

func NewStore(dbPath string) (*Store, error) {
	db, err := sql.Open("sqlite", dbPath)
	if err != nil {
		return nil, err
	}

	s := &Store{db: db}
	return s, nil
}

func (s *Store) GetAllDetachments() ([]Detachment, error) {
	rows, err := s.db.Query(
		`SELECT 
    				d.id, d.name, d.local_authority, d.latitude, d.longitude, d.status, 
    				la.name 
				FROM detachments AS d 
				    INNER JOIN local_authorities AS la ON d.local_authority = la.id
				ORDER BY d.name ASC
		`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var list []Detachment
	for rows.Next() {
		var detachment Detachment
		var localAuthority LocalAuthority
		var geoLocation GeoLocation
		if err := rows.Scan(&detachment.Id, &detachment.Name, &localAuthority.Id, &geoLocation.Latitude, &geoLocation.Longitude, &detachment.Status, &localAuthority.Name); err != nil {
			return nil, err
		}

		detachment.LocalAuthority = localAuthority
		detachment.GeoLocation = geoLocation
		list = append(list, detachment)
	}
	return list, nil
}

func (s *Store) GetAllOtherYouthOrganisations() ([]OtherYouthOrganisation, error) {
	rows, err := s.db.Query(
		`SELECT 
    				o.id, o.organisation, o.name, o.latitude, o.longitude
				FROM other_youth_organisations AS o
				ORDER BY o.name ASC
		`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var list []OtherYouthOrganisation
	for rows.Next() {
		var otherYouthOrganisation OtherYouthOrganisation
		var geoLocation GeoLocation
		if err := rows.Scan(
				&otherYouthOrganisation.Id,
				&otherYouthOrganisation.Organisation,
				&otherYouthOrganisation.Name,
				&geoLocation.Latitude,
				&geoLocation.Longitude,
			); err != nil {
			return nil, err
		}

		otherYouthOrganisation.GeoLocation = geoLocation
		list = append(list, otherYouthOrganisation)
	}
	return list, nil
}

func (s *Store) GetAllSchools() ([]School, error) {
	rows, err := s.db.Query(
		`SELECT 
    				s.id, s.name, s.local_authority, s.address, s.latitude, s.longitude, s.type, s.pupils, 
    				la.name 
				FROM schools AS s 
				    INNER JOIN local_authorities AS la ON s.local_authority = la.id
				ORDER BY s.name ASC
		`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var list []School
	for rows.Next() {
		var school School
		var localAuthority LocalAuthority
		var geoLocation GeoLocation
		if err := rows.Scan(&school.Id, &school.Name, &localAuthority.Id, &school.Address, &geoLocation.Latitude, &geoLocation.Longitude, &school.Type, &school.Pupils, &localAuthority.Name); err != nil {
			return nil, err
		}

		school.LocalAuthority = localAuthority
		school.GeoLocation = geoLocation
		list = append(list, school)
	}
	return list, nil
}
