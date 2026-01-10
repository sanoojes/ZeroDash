import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
	path: "/api/v1/realtime",
});

socket.on("device:metrics", (e) => {
	console.log("device:metrics", e);
});

function App() {
	return (
		<>
			<h1 className="text-3xl font-bold underline">Hello world!</h1>
		</>
	);
}

export default App;
