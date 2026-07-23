function updatePersonnesRelations()
{
	const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	const sourceSheet = spreadsheet.getSheetByName('ACStructures');
	if (!sourceSheet)
	{
		throw new Error('Sheet ACStructures not found.');
	}

	const data = sourceSheet.getDataRange().getValues();
	const headers = data[0];
	const personIdIndex = headers.indexOf('ID du Contact');
	const structuresIndex = headers.indexOf('structures');

	if (personIdIndex === -1 || structuresIndex === -1)
	{
		throw new Error('Headers "ID du Contact" or "structures" not found.');
	}

	const relationRows = [['personId', 'structureId']];
	const structureRegex = /profile\/(\d+)/g;

	for (let i = 1; i < data.length; i++)
	{
		const personId = data[i][personIdIndex];
		const structures = data[i][structuresIndex];
		if (structures)
		{
			for (const match of structures.matchAll(structureRegex))
			{
				relationRows.push([personId, match[1]]);
			}
		}
	}

	SheetPatcher.patchOrCreate('ACPersonnes_Structures', relationRows);
}
