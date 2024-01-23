import { Toaster } from 'react-hot-toast'
import { RouterProvider } from "react-router-dom"
import router from "./router"

function App() {
	return <>
		<RouterProvider router={router} />
		<Toaster position="bottom-center" />
	</>
}

export default App