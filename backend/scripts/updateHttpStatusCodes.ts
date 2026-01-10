// Script adapted from https://github.com/w3cj/stoker/blob/f623a4e13f579111d938fbc1dbd526f564abda5d/scripts/update-http-statuses.ts

import { Project, VariableDeclarationKind } from "ts-morph";

interface JsonCodeComment {
	doc: string;
	description: string;
}

interface JsonCode {
	code: number;
	phrase: string;
	constant: string;
	comment: JsonCodeComment;
	isDeprecated?: boolean;
}

const run = async () => {
	console.log("Updating http status files");

	const CODES_URL =
		"https://raw.githubusercontent.com/prettymuchbryce/http-status-codes/refs/heads/master/codes.json";

	const FILE_CODES = "src/lib/http/httpStatusCodes.ts";
	const FILE_PHRASES = "src/lib/http/httpStatusPhrases.ts";

	const project = new Project({
		tsConfigFilePath: "tsconfig.json",
	});

	const response = await fetch(CODES_URL);
	if (!response.ok) {
		throw new Error(`Error retrieving codes: ${response.statusText}`);
	}
	const Codes = (await response.json()) as JsonCode[];

	const timestamp = new Date().toUTCString();
	const header = (label: string) =>
		`// Generated file. DO NOT EDIT !!
// ${label} retrieved on ${timestamp} from ${CODES_URL}`;

	const statusCodeFile = project.createSourceFile(
		FILE_CODES,
		{},
		{ overwrite: true },
	);

	statusCodeFile.insertStatements(0, header("Codes"));

	Codes.forEach(({ code, constant, comment, isDeprecated }) => {
		statusCodeFile
			.addVariableStatement({
				isExported: true,
				declarationKind: VariableDeclarationKind.Const,
				declarations: [{ name: constant, initializer: code.toString() }],
			})
			.addJsDoc({
				description: `${isDeprecated ? "@deprecated\n" : ""}${comment.doc}\n\n${comment.description}`,
			});
	});

	const phrasesFile = project.createSourceFile(
		FILE_PHRASES,
		{},
		{ overwrite: true },
	);

	phrasesFile.insertStatements(0, header("Phrases"));

	Codes.forEach(({ constant, phrase, comment, isDeprecated }) => {
		phrasesFile
			.addVariableStatement({
				isExported: true,
				declarationKind: VariableDeclarationKind.Const,
				declarations: [{ name: constant, initializer: `"${phrase}"` }],
			})
			.addJsDoc({
				description: `${isDeprecated ? "@deprecated\n" : ""}${comment.doc}\n\n${comment.description}`,
			});
	});

	await project.save();

	const biome = Bun.spawnSync({
		cmd: ["bunx", "biome", "check", "--write", FILE_CODES, FILE_PHRASES],
		stdout: "inherit",
		stderr: "inherit",
	});

	if (biome.exitCode !== 0) {
		throw new Error("Biome failed");
	}

	console.log(`Successfully generated ${FILE_CODES} and ${FILE_PHRASES}`);
};

run();
