// TODO: support paths like `hello.world`, `a.b.c`, `a.0.b.1.c` etc...
export function pick<T extends object, K extends keyof T>(
	source: T,
	keys: K[],
	convert?: (v: T[K]) => T[K],
): Pick<T, K> {
	const out = {} as Pick<T, K>;
	for (const key of keys)
		out[key] = convert ? convert(source[key]) : source[key];
	return out;
}
