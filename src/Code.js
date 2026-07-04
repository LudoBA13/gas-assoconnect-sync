/**
 * AssoConnect Sync for Google Sheets
 * Designed by Ludovic ARNAUD
 * Implemented with the assistance of Google Gemini.
 */

function onOpen()
{
	SpreadsheetApp.getUi()
		.createMenu('AssoConnect')
		.addItem('Importer Personnes', 'importPersonnes')
		.addItem('Importer Structures', 'importStructures')
		.addToUi();
}

function importPersonnes()
{
	const importer = new PersonnesImporter();
	importer.import();
}

function importStructures()
{
	const importer = new StructuresImporter();
	importer.import();
}

function processUploadedFile(fileData, type)
{
	const rows = Importer.getDataFromXLSXFile(fileData);
	
	let importer;
	if (type === 'Personnes')
	{
		importer = new PersonnesImporter();
	}
	else if (type === 'Structures')
	{
		importer = new StructuresImporter();
	}
	else
	{
		throw new Error('Unknown importer type');
	}
	
	if (importer.verifyContent(rows))
	{
		importer.processContent(rows);
	}
	else
	{
		throw new Error('Le format du fichier est invalide pour cet import.');
	}
}
