class StructuresImporter extends Importer
{
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
		return rows;
	}
}
