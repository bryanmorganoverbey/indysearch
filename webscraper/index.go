// web scraper
package main

import (
	"fmt"
	"io/ioutil"
	"bytes"
  "log"
  "net/http"
  "github.com/PuerkitoBio/goquery"
)

func main() {
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
		company := s.Find(".list-info").Text()

		// get the location
		location := s.Find(".location").Text()

		// get the link
		link, _ := s.Find(".list-title").Attr("href")



		// print the job
		fmt.Printf("%s (%s) - %s - %s\n", title, company, location, link)

		fmt.Println()
	})
}
