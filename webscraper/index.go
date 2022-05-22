// web scraper
package main


import (
	"fmt"
	"io/ioutil"
	"bytes"
  "log"
  "net/http"
  "github.com/PuerkitoBio/goquery"
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

func main() {

	// import sqlite3 connector library

	db, err := sql.Open("sqlite3", "../backend/sqlite-database/event-db.sqlite")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// get the url
	url := "https://www.visitindy.com/indianapolis-things-to-do-events"

	// create a new request
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Fatal(err)
	}

	// set the user agent
	req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36")

	// create a new client
	client := &http.Client{}

	// make the request
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}

	// read the response
	htmlData, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	// close the response
	resp.Body.Close()

	// create a new document
	doc, err := goquery.NewDocumentFromReader(bytes.NewReader(htmlData))
	if err != nil {
		log.Fatal(err)
	}


	// find the job listings
	doc.Find(".list-grid-item").Each(func(i int, s *goquery.Selection) {
		// get the job title
		title := s.Find(".list-title").Text()

		// get the date
		date := s.Find(".list-info").Text()

		// get the location
		location := s.Find(".location").Text()

		// get the link from the a tag in the list-title div
		link, _ := s.Find(".list-title a").Attr("href")

		// TODO: // if there is a link but no location, visit the link and get the location
		// if link != "" && location == "" {
		// 	// create a new request
		// 	req, err := http.NewRequest("GET", link, nil)
		// 	if err != nil {
		// 		log.Fatal(err)
		// 	}




		// print the event
		fmt.Printf("%s (%s) - %s - %s\n", title, date, location, link)

		// insert the event into the database
		tx, err := db.Begin()
		if err != nil {
			log.Fatal(err)
		}
		stmt, err := tx.Prepare("INSERT INTO events (title, date, location, link) VALUES ("hello", date, location, link)")
		if err != nil {
			log.Fatal(err)
		}
		defer stmt.Close()
		_, err = stmt.Exec()
		if err != nil {
			log.Fatal(err)
		}

		tx.Commit()

		fmt.Println()
		defer db.Close()

	})
}
