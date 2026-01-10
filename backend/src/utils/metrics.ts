import fs from "node:fs";
import os from "node:os";
import { performance } from "node:perf_hooks";

export function getDeviceMetrics() {
	const isLinux = os.platform() === "linux";

	const mem = isLinux
		? getLinuxMem()
		: { total: os.totalmem(), available: os.freemem() };

	const cpus = os.cpus();
	const usage = cpus.map((cpu) => {
		const t = cpu.times;
		const totalTick = t.user + t.nice + t.sys + t.idle + t.irq;
		return totalTick > 0 ? (1 - t.idle / totalTick) * 100 : 0;
	});

	return {
		timestamp: round(performance.now()),
		load: os.loadavg().map((v) => round(v)),
		memory: {
			total: mem.total,
			available: mem.available,
			usedPercent: round((1 - mem.available / mem.total) * 100),
		},
		cpu: {
			cores: cpus.length,
			model: cpus[0]?.model ?? cpus[1]?.model,
			usage: usage.map((v) => round(v)),
			avgUsage: round(usage.reduce((a, b) => a + b, 0) / usage.length),
		},
		uptimeSec: os.uptime(),
		platform: os.platform(),
		arch: os.arch(),
		hostname: os.hostname(),
	};
}

function getLinuxMem() {
	const text = fs.readFileSync("/proc/meminfo", "utf8");
	let total = 0;
	let available = 0;

	for (const line of text.split("\n")) {
		if (line.startsWith("MemTotal:")) {
			total = parseInt(line.split(/\s+/)[1], 10) * 1024;
		}
		if (line.startsWith("MemAvailable:")) {
			available = parseInt(line.split(/\s+/)[1], 10) * 1024;
		}
	}

	return { total, available };
}

function round(n: number, d = 2) {
	return Math.round(n * 10 ** d) / 10 ** d;
}
