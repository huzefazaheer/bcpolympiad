import { Route, Routes } from 'react-router-dom'
import './style.css'
import NavigationBar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import Home from './pages/home/home'
import Register from './pages/register/register'

export default function App() {
	return (
		<>
			<NavigationBar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
			</Routes>

			<Footer />
		</>
	)
}
