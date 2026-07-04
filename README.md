# AssoConnect Sync for Google Sheets

This Google Apps Script (GAS) extension facilitates the integration of data from [AssoConnect](https://www.assoconnect.com/) into Google Sheets. Designed to bridge the gap caused by limited API access in AssoConnect, this tool allows users to import and synchronize their data seamlessly.

## Features

- **Data Import:** Easily import "Structures" and "Personnes" data from AssoConnect's Excel exports.
- **Relationship Management:** Automatically reconstructs and maintains the N:M relationships between Structures and Personnes.
- **User-Friendly Interface:** Adds a custom menu directly within your Google Spreadsheet for quick access to import functions.
- **Automated Processing:** Automatically converts and maps AssoConnect Excel file formats into your Google Sheet structure.

## Prerequisites

- Access to a Google Spreadsheet.
- Valid "Structures" or "Personnes" export files in Excel format (.xlsx) generated from AssoConnect.
- A moderate understanding of AssoConnect and how to select a file for upload into a Google Sheet.

## Getting Started

1.  Open the Google Spreadsheet where you wish to import the data.
2.  Use the "AssoConnect" menu added to the top toolbar of your spreadsheet.
3.  Select the corresponding option ("Import Structures" or "Import Personnes").
4.  Follow the prompts to upload the relevant AssoConnect Excel file.
5.  The script will process the file, import the data, and update the N:M relationships accordingly.

## Credits & Localization

This project was designed by Ludovic ARNAUD and implemented with the assistance of Google Gemini.

Please note that while the user interface (UI) is localized in French, all code, symbols, and documentation are written in English.
