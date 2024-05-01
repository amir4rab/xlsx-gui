package processor

import (
	"errors"

	"github.com/tealeg/xlsx/v3"
)

/* Sets the given cols to empty to preserve space */
func SetColsToEmpty(wb *xlsx.File, sheetName string, cols []bool, startPoint uint) error {
	sheet, ok := wb.Sheet[sheetName]
	if !ok {
		return errors.New("THE PROVIDED SHEET DOESN'T EXISTS")
	}

	var i uint
	sheet.ForEachRow(func(r *xlsx.Row) error {
		// Only applying operations after a certain point
		if i >= startPoint {

			var j uint
			r.ForEachCell(func(c *xlsx.Cell) error {
				// Settings
				if cols[j] {
					c.SetValue(nil)
				}

				j++
				return nil
			})
		}

		// Updating the index
		i++

		// Returning nil since there were no errors
		return nil
	})

	return nil
}
