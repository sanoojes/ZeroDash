// TODO: Separate Live and NON Live data (maybe check every 15s-1m or an option to refresh)
// TODO: Sanitize Admin ONLY stuff
// TODO: ADD Docker Support
// TODO: ADD Network, Wifi, Bluetooth information
// TODO: DO NOT OVER SHARE STUFF

import * as si from "systeminformation";
import { pick } from "@/utils/object";
// import { bytesToMB } from "@/utils/convert";

// TODO: Split this fn, make it modular so that its easy to get and manage data (for diff roles)
// TODO: Checkout performance, benchmark (low priority right nows)
export async function getMetrics() {
	console.log("call");

	// TODO: limit data used for diff users
	// Example:
	// Do not share CPU Info and other critical system information
	// Only share Load, Mem available, CPU usage (maybe only to the authed users, admin or normal/some rolled users)
	const data = (await si.get({
		cpu: "*",
		mem: "*",
		time: "*",
		system: "*",
		osInfo: "*",
		disksIO: "*",
		diskLayout: "*",
		currentLoad: "*",
		// networkStats: "*",
	})) as Data;

	type Data = {
		cpu: si.Systeminformation.CpuData;
		mem: si.Systeminformation.MemData;
		time: si.Systeminformation.TimeData;
		system: si.Systeminformation.SystemData;
		osInfo: si.Systeminformation.OsData;
		disksIO: si.Systeminformation.DisksIoData;
		diskLayout: si.Systeminformation.DiskLayoutData[];
		currentLoad: si.Systeminformation.CurrentLoadData;
		networkStats: si.Systeminformation.NetworkStatsData[];
	};

	// TODO: setup docker
	// const dockerAll = await si.dockerAll();
	// console.log(dockerAll);

	const cpu = pick(data.cpu, [
		"brand",
		"speed",
		"cores",

		// TODO: Admin Only
		"vendor",
		"manufacturer",
		"physicalCores",
	]);

	const load = pick(data.currentLoad, [
		"avgLoad",
		"currentLoad",
		"currentLoadUser",
		"currentLoadSystem",
		"currentLoadIdle",
	]);

	const mem = pick(
		data.mem,
		[
			"total",
			"free",
			"used",
			"active",
			"available",
			"swapfree",
			"swaptotal",
			"swapused",
		],
		// bytesToMB, // NOTE: Do it client side ? idk
	);

	const io = pick(data.disksIO, ["rIO_sec", "wIO_sec", "tIO_sec", "ms"]);

	const disks = data.diskLayout.map((v) =>
		pick(v, [
			"type",
			"name",
			"size",
			"vendor",
			"temperature",

			// TODO: Admin Only
			"device",
			"serialNum",
			"interfaceType",
			"firmwareRevision",

			// Important: Needs `smartmontools` on linux to get it
			// TODO: Admin Only and sanitize
			"smartData",
		]),
	);

	// TODO: Maybe admin only, idk it needs review
	const sys = pick(data.system, [
		"model",
		"virtual",
		"raspberry",
		"manufacturer",
	]);

	const osInfo = pick(data.osInfo, [
		"arch",
		"distro",
		"release",
		"platform",

		// TODO: ADMIN Only
		"kernel",
		"hostname",
	]);

	// const networkStats = data.networkStats.map((v) =>
	// 	pick(v, [
	// 		"iface",
	// 		"operstate",
	// 		"rx_sec",
	// 		"rx_bytes",
	// 		"rx_dropped",
	// 		"rx_errors",
	// 		"tx_sec",
	// 		"tx_bytes",
	// 		"tx_dropped",
	// 		"tx_errors",
	// 	]),
	// );

	const metrics = {
		io,
		cpu,
		mem,
		sys,
		load,
		time: data.time,
		disks,
		osInfo,
		// networkStats,
	};

	return metrics;
}
