class StructuresImporter extends Importer
{
	constructor()
	{
		super('Structures');
	}

	verifyContent(rows)
	{
		if (rows.length === 0)
		{
			return false;
		}
		return rows[0].includes('Code VIF');
	}

	processContent(rows)
	{
		SheetPatcher.patchOrCreate('ACStructures', rows);
	}
}
