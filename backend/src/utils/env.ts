export function requireEnv(name: string): string {
	const value = process.env[name];
	if (!value) {
		console.error(`${name} is required but missing.`);
		process.exit(1);
	}
	return value;
}
