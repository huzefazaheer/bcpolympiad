import { Link } from 'react-router-dom'

import './home.css'
import logo from "../resources/logo.png"
import locationtag from '../resources/location.svg'
import emailicon from '../resources/emailicon.svg'

export default function Home() {
	return (	
		<>
			<Hero />
			<CallToAction />
			<Time />
		</>
	)
}

function Hero() {
	return (
		<>
			<div id="hero" class="hero-sec">
			<h2 className='titletext montserrat regular'><span className='hero-heading'>BCP Kharian is bringing you </span><br/> <span className='hero-title'>Olympiad Season V </span><br/>
				<span className='hero-subtitle'>The premier sporting event.</span></h2>
				<div className="hero-img">
					<img src={logo} alt="" />
				</div>
			</div>
		</>
	)
}

function CallToAction() {
	return (
		<>
			<div id="calltoaction" class="calltoaction-sec montserrat regular">
				
				<div className="uppercont"><div className="left"><div className="box"><div className='dates'><p className='date1'>21</p><p>22</p></div><p className='jan'>January</p></div></div>
				<div className="right"><div className="location"><object type="image/svg+xml" data={locationtag}></object><p className='beaconhouse'>Beaconhouse Kharian Campus</p></div><p className="calltoactionpara">Get ready for two days filled with thrilling competitions, exciting sports activities, and memorable moments at Olympiad Season Five.</p></div></div>
				<div className="btngroup">
					<button className='button-dark'>Register Now</button>
					<button className="button-light"><object type="image/svg+xml" data={emailicon}></object></button></div>
			</div>
		</>
	)
}

//make clock tick

function Time() {

	let countDownDate = new Date("Jan 24, 2025 08:00:00").getTime();

	return (
		<>
			<div id="location" class="location-sec">
				<h3 className='montserrat medium detailtxt'>
					2Games    16Days    2Socials
				</h3>
				<ul id="clock" className='montserrat regular'><li>
					<p>00</p>
					<h4>Days</h4>
				</li>
				<li>
					<p>:</p>
				</li>
				<li>
					<p>00</p>
					<h4>Hours</h4>
				</li>
				<li>
					<p>:</p>
				</li>
				<li>
					<p>00</p>
					<h4>Minutes</h4>
				</li>
				<li>
					<p>:</p>
				</li>
				<li>
					<p>00</p>
					<h4>Seconds</h4>
				</li></ul>
			</div>
		</>
	)
}
