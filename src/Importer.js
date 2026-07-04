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
		template.importerType = "'" + this.type + "'";
		const html = template.evaluate().setWidth(400).setHeight(200);
		SpreadsheetApp.getUi().showModalDialog(html, 'Importer un fichier');
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
