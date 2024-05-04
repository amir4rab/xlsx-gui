package processor

import (
	"errors"

	"github.com/tealeg/xlsx/v3"
)

/* Parses the given xlsx file */
func ParseFile(b *[]byte) (*xlsx.File, error) {
	wb, err := xlsx.OpenBinary(*b)
	return wb, err
}

/* Reads the name of sheets */
func GetSheets(wb *xlsx.File, sheets *[]string) error {
	for _, name := range wb.Sheets {
		*sheets = append(*sheets, name.Name)
	}

	return nil
}

/* Reads the requested rows while skipping others */
func GetRows(wb *xlsx.File, sheetName string, rows *[]*xlsx.Row, offset uint, page uint) (uint, error) {
	sheet, ok := wb.Sheet[sheetName]
	if !ok {
		return 0, errors.New("THE PROVIDED SHEET DOESN'T EXISTS")
	}

	// Getting the end point
	end := offset + page

	var i uint
	sheet.ForEachRow(func(r *xlsx.Row) error {
		// Appending items if they are in the desired zone
		if i >= offset && i < end {
			*rows = append(*rows, r)
		}

		// Updating the index
		i++

		// Returning nil since there were no errors
		return nil
	})

	// Calculating the pages count
	totalPages := uint(i/page) + 1

	// Returning nil since there were no errors
	return totalPages, nil
}
