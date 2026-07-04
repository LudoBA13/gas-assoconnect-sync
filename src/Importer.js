class Importer
{
	constructor(type)
	{
		if (this.constructor === Importer)
		{
			throw new Error('Cannot instantiate abstract class Importer');
		}
		this.type = type;
	}

	import()
	{
		const template = HtmlService.createTemplateFromFile('UploadDialog');
		template.importerType = this.type;
		const html = template.evaluate().setWidth(400);
		SpreadsheetApp.getUi().showModalDialog(html, 'Importer les ' + this.type);
	}

	static getDataFromXLSXFile(fileData)
	{
		let tmpSheetFile;

		try
		{
			const decodedData = Utilities.base64Decode(fileData.data);
			const blob = Utilities.newBlob(decodedData, fileData.mimeType, fileData.name);

			const resource = {
				title: fileData.name.split('.').slice(0, -1).join('.'),
				mimeType: MimeType.GOOGLE_SHEETS,
			};
			tmpSheetFile = Drive.Files.create(resource, blob);

			const tmpSpreadsheet = SpreadsheetApp.openById(tmpSheetFile.id);
			const tmpSheet       = tmpSpreadsheet.getSheets()[0];
			const data           = tmpSheet.getDataRange().getValues();

			if (data.length === 0)
			{
				throw new Error('The selected XLSX file is empty or could not be read.');
			}

			return data;
		}
		finally
		{
			if (tmpSheetFile && tmpSheetFile.id)
			{
				try
				{
					Drive.Files.remove(tmpSheetFile.id);
				}
				catch (e)
				{
					console.error('Cleanup Error: Failed to remove temporary file with ID ' + tmpSheetFile.id + '. Error: ' + e.message);
				}
			}
		}
	}

	verifyContent(rows)
	{
		throw new Error('verifyContent must be implemented');
	}

	processContent(rows)
	{
		throw new Error('processContent must be implemented');
	}
}
