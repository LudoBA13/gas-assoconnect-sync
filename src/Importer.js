class Importer
{
	constructor()
	{
		if (this.constructor === Importer)
		{
			throw new Error('Cannot instantiate abstract class Importer');
		}
	}

	import()
	{
		const ui = SpreadsheetApp.getUi();
		const response = ui.prompt('AssoConnect', 'Veuillez saisir l\'ID du fichier Excel depuis Google Drive :', ui.ButtonSet.OK_CANCEL);
		
		if (response.getSelectedButton() !== ui.Button.OK)
		{
			return;
		}

		const fileId = response.getResponseText();
		if (!fileId)
		{
			ui.alert('Erreur', 'ID de fichier invalide.', ui.Button.OK);
			return;
		}

		const file = DriveApp.getFileById(fileId);
		const blob = file.getBlob();
		const resource =
		{
			title: file.getName() + ' (imported)',
			mimeType: MimeType.GOOGLE_SHEETS
		};
		
		// Note: Requires "Drive API" to be enabled in Advanced Google Services
		const tempFile = Drive.Files.insert(resource, blob);
		
		try
		{
			const ss = SpreadsheetApp.openById(tempFile.id);
			const sheet = ss.getSheets()[0];
			const rows = sheet.getDataRange().getValues();
			
			if (this.verifyContent(rows))
			{
				const processedRows = this.processContent(rows);
				// TODO: Load into the current sheet
				ui.alert('Succès', 'Fichier importé avec succès.', ui.Button.OK);
			}
			else
			{
				ui.alert('Erreur', 'Le format du fichier est invalide pour cet import.', ui.Button.OK);
			}
		}
		finally
		{
			Drive.Files.remove(tempFile.id);
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
