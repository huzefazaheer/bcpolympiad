import { useState } from 'react'
import { Link } from 'react-router-dom'

import './navbar.css'

export default function NavigationBar() {
	const [menuOpen, setMenuOpen] = useState(false)

	window.onscroll = function() {
		document.getElementById("navbar").style.display = "hidden";
	} 

	return (
		<>
			<nav id='navbar' className='blur'>
				<div className="top">
					<div
						className="toggler"
						onClick={() => {
							setMenuOpen(!menuOpen)
						}}
					>
						<Link className="toggler" to="#">
						<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z" fill="#ffffff"></path> </g></svg>
						<p className='navtitle'>Olympiad</p>
						</Link>
					</div>
				</div>
				<ul className="menu" id={menuOpen ? 'active' : ''}>
					<li>
						<Link onClick={(e) => {
      e.preventDefault();
      window.location.href='./';
      }} className="montserrat regular">
							Home
						</Link>
					</li>
					<li>
						<Link to="/team" className="montserrat regular">
							The Team
						</Link>
					</li>
					<li>
						<Link onClick={(e) => {
      e.preventDefault();
      window.location.href='./register';
      }} className="montserrat regular">
						Register
						</Link>
					</li>
				</ul>
			</nav>
		</>
	)
}
