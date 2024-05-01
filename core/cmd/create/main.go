package main

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"log"
	mathRand "math/rand"
	"os"
	"time"

	"github.com/tealeg/xlsx/v3"
)

/* Generates a random data for the given cell */
func GenCellsData(i int) interface{} {

	// Returning a random number for values ranging from 16 to 20
	if i > 15 {
		return mathRand.Intn(1000)
	}

	// Returning a random string for values ranging from 10 to 15
	if i > 9 {
		b := make([]byte, 16)
		_, err := rand.Read(b)
		if err != nil {
			log.Fatalln(err)
		}
		return hex.EncodeToString(b)
	}

	// Retuning a random name for values from 10 to 0
	randomNames := []string{
		"John",
		"Ava",
		"Alfred",
		"Jack",
		"Lana",
		"Nora",
		"Ervin",
		"Angela",
		"Emanuel",
		"Julia",
		"Tailor",
		"Daniel",
		"Mia",
		"Jeff",
		"My name is Jeff", // Definitely different than the humble jeff
		"Luke",
		"Derek",
		"Layon", // Definitely real names, ps, DON'T ASK WHAT AFTER HEARING THEM
		"Ligma", // Definitely real names, ps, DON'T ASK WHAT AFTER HEARING THEM
	}
	nameIndex := mathRand.Intn(len(randomNames) - 1)

	return randomNames[nameIndex]
}

/* Populates the given worksheet with sample data */
func populate(sheet *xlsx.Sheet, rowCount int) {
	for i := 0; i < rowCount; i++ {
		row := sheet.AddRow()

		for j := 0; j < 20; j++ {
			cell := row.AddCell()
			cell.SetValue(GenCellsData(j))
		}
	}
}

/* The desired place to store sample files */
const sampleFilesPath = "/cmd/samples/"

/* This function creates 4 sample files with row sizes of 1k, 5k, 10k and 20k */
func main() {
	fmt.Println("Creating the sample files")
	st := time.Now()

	// Getting the current working directory
	wd, err := os.Getwd()
	if err != nil {
		log.Fatalln(err)
	}

	// Deleting the sample files director
	os.RemoveAll(wd + sampleFilesPath)
	os.Mkdir(wd+sampleFilesPath, os.ModePerm)

	// Creating the file and a sample sheet
	wb := xlsx.NewFile()
	wb.AddSheet("Sheet1")

	// Getting the sample sheet
	sheet := wb.Sheet["Sheet1"]

	// Storing a sample with 1k items
	populate(sheet, 1000)
	err = wb.Save(wd + sampleFilesPath + "sample-1k.xlsx")
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println("Stored the 1k sample file...")

	// Storing a sample with 5k items
	populate(sheet, 4000)
	err = wb.Save(wd + sampleFilesPath + "sample-5k.xlsx")
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println("Stored the 5k sample file...")

	// Storing a sample with 10k items
	populate(sheet, 5000)
	err = wb.Save(wd + sampleFilesPath + "sample-10k.xlsx")
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println("Stored the 10k sample file...")

	// Storing a sample with 20k items
	populate(sheet, 10000)
	err = wb.Save(wd + sampleFilesPath + "sample-20k.xlsx")
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println("Stored the 20k sample file...")

	dt := time.Since(st)
	fmt.Printf("Sucessfully, created all of the sample files in %dms\n", dt.Milliseconds())
}
