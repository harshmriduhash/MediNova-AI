import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.tsx'
import './index.css'

// Debug-friendly bootstrap: catch render errors and show them in the DOM so blank pages reveal the problem.
const rootEl = document.getElementById("root") ?? (() => {
	const d = document.createElement('div')
	d.id = 'root'
	document.body.appendChild(d)
	return d
})()

try {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	createRoot(rootEl!).render(<App />)
	// eslint-disable-next-line no-console
	console.log('App mounted')
} catch (err) {
	// Print error to console and render a visible error message so users see it instead of a blank page.
	// eslint-disable-next-line no-console
	console.error('Render error', err)
	try {
		createRoot(rootEl!).render(
			<div style={{ padding: 20 }}>
				<h1 style={{ color: 'crimson' }}>App failed to render</h1>
				<pre style={{ whiteSpace: 'pre-wrap' }}>{String(err)}</pre>
			</div>
		)
	} catch (e) {
		// if even rendering the error UI fails, fallback to writing into document
		// eslint-disable-next-line no-console
		console.error('Error while rendering fallback UI', e)
		document.body.innerHTML = `<h1 style="color:crimson;padding:20px">App failed to render</h1><pre>${String(
			err
		)}</pre>`
	}
}
