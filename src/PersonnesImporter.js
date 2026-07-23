class PersonnesImporter extends Importer
{
	constructor()
	{
		super('Personnes');
	}

	verifyContent(rows)
	{
		if (rows.length === 0)
		{
			return false;
		}
		return rows[0].includes('Prénom');
	}

	processContent(rows)
	{
		SheetPatcher.patchOrCreate('ACPersonnes', rows);
		updatePersonnesRelations();
	}
}
