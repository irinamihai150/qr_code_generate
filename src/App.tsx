// @/src/App.tsx
import { useCallback, useState } from "react"
import { generate as shortid } from "shortid"
import { Input, Button, Container, Row, Spacer } from "@nextui-org/react"
import { useTheme as useNextTheme } from "next-themes"
import { Switch, useTheme } from "@nextui-org/react"

import { getQRCode } from "./QrCodeUtils"

export const App = () => {
	const [value, setValue] = useState<string>("")
	const [qr, setQr] = useState<string>("")
	const { setTheme } = useNextTheme()
	const { isDark } = useTheme()

	const generateQRCode = useCallback(() => {
		const qrValue = getQRCode(value)
		if (!qrValue) return
		setQr(qrValue)
	}, [value, setQr])

	const downloadFile = useCallback(() => {
		const elm = document.createElement("a")
		elm.href = qr
		elm.download = shortid()
		elm.click()
	}, [qr])

	return (
		<div>
			<Switch
				checked={isDark}
				onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
			/>
			<h2 style={{ textAlign: "center", margin: "1em" }}> Qr Code Generator</h2>
			<Container
				display='flex'
				direction='row'
				justify='center'
				alignItems='center'
			>
				<Spacer y={6} />

				<Input
					clearable
					rounded
					placeholder='Insert Url Here'
					color='primary'
					value={value}
					onChange={(e) => setValue(e.target.value)}
					size='lg'
				/>
				<Spacer x={1} />
				<Button onClick={generateQRCode} shadow size='lg'>
					Generate
				</Button>

				{qr && (
					<Row justify='center' align='center'>
						<Spacer y={4} />
						<img src={qr} />
						<Button onClick={downloadFile} color='success' shadow size='lg'>
							Download
						</Button>
					</Row>
				)}
			</Container>
		</div>
	)
}
