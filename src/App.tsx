import { BrowserRouter } from "react-router-dom";
import AddVideo from "./components/AddVideo/AddVideo";
import Layout from "./layout/Layout";

function App() {
	return (
		<>
			<BrowserRouter>
				<Layout />

				<AddVideo
					open={false}
					onClose={function (): void {
						throw new Error("Function not implemented.");
					}}
				/>
			</BrowserRouter>
		</>
	);
}

export default App;
