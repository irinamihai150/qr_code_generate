import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App.tsx"
import "./index.css"
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

const lightTheme = createTheme({
	type: "light",
	theme: {
		colors: {},
	},
})

const darkTheme = createTheme({
	type: "dark",
	theme: {
		colors: {},
	},
})
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<NextThemesProvider
			defaultTheme='system'
			attribute='class'
			value={{
				light: lightTheme.className,
				dark: darkTheme.className,
			}}
		>
			<NextUIProvider theme={darkTheme}>
				<App />
			</NextUIProvider>
		</NextThemesProvider>
	</React.StrictMode>
)
