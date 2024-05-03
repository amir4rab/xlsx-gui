package binder

import (
	"encoding/json"
	"sync"
	"syscall/js"

	"github.com/amir4rab/xlsx-gui/core/internal/processor"
	"github.com/tealeg/xlsx/v3"
)

var wb *xlsx.File
var initialized bool

type readFileRes struct {
	Successful bool `json:"successful"`
	Size       int  `json:"size"`
}

func readFile(this js.Value, inputs []js.Value) interface{} {
	// Checking if the file exists
	if len(inputs) != 1 {
		res := readFileRes{Successful: false, Size: 0}
		b, _ := json.Marshal(res)
		return string(b)
	}

	// Copying the file form js to go
	jsUintIntArray := inputs[0]
	length := jsUintIntArray.Get("length").Int()
	file := make([]byte, length)
	js.CopyBytesToGo(file, jsUintIntArray)

	// Parsing the file
	var err error
	wb, err = processor.ParseFile(&file)
	if err != nil {
		res := readFileRes{Successful: false, Size: 0}
		b, _ := json.Marshal(res)
		return string(b)
	} else {
		initialized = true
	}

	// Returning the result as successful
	res := readFileRes{Successful: true, Size: len(file)}
	b, _ := json.Marshal(res)
	return string(b)
}

type getSheetsRes struct {
	Successful bool     `json:"successful"`
	Sheets     []string `json:"sheets"`
}

func getSheets(this js.Value, inputs []js.Value) interface{} {
	var sheets []string

	// Checking if the file exists
	if !initialized {
		res := getSheetsRes{Successful: false, Sheets: sheets}
		b, _ := json.Marshal(res)
		return string(b)
	}

	// Getting the headers
	err := processor.GetSheets(wb, &sheets)
	if err != nil {
		res := getSheetsRes{Successful: false, Sheets: sheets}
		b, _ := json.Marshal(res)
		return string(b)
	}

	res := getSheetsRes{Successful: true, Sheets: sheets}
	b, _ := json.Marshal(res)
	return string(b)
}

type getTopRowsRes struct {
	Successful bool       `json:"successful"`
	Rows       [][]string `json:"rows"`
}

func getTopRows(this js.Value, inputs []js.Value) interface{} {
	var rows []*xlsx.Row

	// Checking if the file exists
	if !initialized || len(inputs) != 1 {
		res := getTopRowsRes{Successful: false, Rows: [][]string{}}
		b, _ := json.Marshal(res)
		return string(b)
	}

	sheet := inputs[0].String()

	// Getting the headers
	err := processor.GetRows(wb, sheet, &rows, 0, 10)
	if err != nil {
		res := getTopRowsRes{Successful: false, Rows: [][]string{}}
		b, _ := json.Marshal(res)
		return string(b)
	}

	// Parsing the rows into string
	var parsedRows [][]string
	for _, row := range rows {
		var r []string
		row.ForEachCell(func(c *xlsx.Cell) error {
			r = append(r, c.Value)
			return nil
		})
		parsedRows = append(parsedRows, r)
	}

	res := getTopRowsRes{Successful: true, Rows: parsedRows}
	b, _ := json.Marshal(res)
	return string(b)
}

/* Binds the core library actions to the javascript environment */
func Bind() {
	js.Global().Set("readXLSXFile", js.FuncOf(readFile))
	js.Global().Set("getXLSXSheets", js.FuncOf(getSheets))
	js.Global().Set("getXLSXTopRows", js.FuncOf(getTopRows))

	// Hanging the main function
	wg := sync.WaitGroup{}
	wg.Add(1)
	wg.Wait()
}
