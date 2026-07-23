function updatePersonRelations()
{
	const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	const sourceSheet = spreadsheet.getSheetByName('ACPersonnes');
	if (!sourceSheet)
	{
		throw new Error('Sheet ACPersonnes not found.');
	}

	const data = sourceSheet.getDataRange().getValues();
	const headers = data[0];
	const personIdIdx = headers.indexOf('ID du Contact');
	const structuresIdx = headers.indexOf('structures');

	if (personIdIdx === -1 || structuresIdx === -1)
	{
		throw new Error('Headers "ID du Contact" or "structures" not found.');
	}

	const relationRows = [['compositeId', 'personId', 'structureId']];
	const structureRegex = /profile\/(\d+)/g;

	for (let i = 1; i < data.length; i++)
	{
		const personId = data[i][personIdIdx];
		const structures = data[i][structuresIdx];
		if (structures)
		{
			for (const match of structures.matchAll(structureRegex))
			{
				const structureId = match[1];
				relationRows.push([`${personId}_${structureId}`, personId, structureId]);
			}
		}
	}

	SheetPatcher.patchOrCreate('ACPersonnes_Structures', relationRows);
}
