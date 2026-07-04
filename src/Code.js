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

function processUploadedFile(fileName, data, type)
{
	const blob = Utilities.newBlob(data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', fileName);
	
	const resource =
	{
		title: fileName + ' (imported)',
		mimeType: MimeType.GOOGLE_SHEETS
	};
	
	const tempFile = Drive.Files.insert(resource, blob);
	
	try
	{
		const ss = SpreadsheetApp.openById(tempFile.id);
		const sheet = ss.getSheets()[0];
		const rows = sheet.getDataRange().getValues();
		
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
	finally
	{
		Drive.Files.remove(tempFile.id);
	}
}
