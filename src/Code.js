/**
 * AssoConnect Sync for Google Sheets
 * Designed by Ludovic ARNAUD
 * Implemented with the assistance of Google Gemini.
 */

function onOpen()
{
	SpreadsheetApp.getUi()
		.createMenu('AssoConnect')
		.addItem('Importer Personnes', 'importerPersonnes')
		.addItem('Importer Structures', 'importerStructures')
		.addToUi();
}

function importerPersonnes()
{
	const importer = new PersonnesImporter();
	importer.import();
}

function importerStructures()
{
	const importer = new StructuresImporter();
	importer.import();
}
