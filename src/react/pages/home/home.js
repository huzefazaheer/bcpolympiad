import { Link } from 'react-router-dom'

import './home.css'
import logo from "../resources/logo.png"
import locationtag from '../resources/location.svg'
import emailicon from '../resources/emailicon.svg'
import { useEffect, useState } from 'react'

const countdownDate = new Date("2025-01-24T08:00:00")

const getTimeRemaining = function(){
	const total = countdownDate - new Date()
	const days = Math.floor(total / (1000 * 60 * 60 * 24))
	const hours = Math.floor((total / (1000 * 60 * 60 )) % 24)
	const minutes = Math.floor((total / (1000 * 60 )) % 60)
	const seconds = Math.floor((total / (1000)) % 60)
	return {days, hours, minutes, seconds}
}

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
				<div className="uppercont"><div className="left"><div className="box"><div className='dates'><ul>
					<li>
						<p>24,</p>
						<p className='th'>th</p>
					</li>
					<li>
						<p>25,</p>
						<p className='th'>th</p>
					</li>
					<li>
						<p>26</p>
						<p className='th'>th</p>
					</li>
				</ul></div><p className='jan'>January</p></div></div>
				<div className="right"><div className="location"><object type="image/svg+xml" data={locationtag}></object><p className='beaconhouse'>Beaconhouse Kharian Campus</p></div><p className="calltoactionpara">Get ready for three days filled with thrilling competitions, exciting sports activities, and memorable moments at Olympiad Season Five.</p></div></div>
				<div className="btngroup">
					<button className='button-dark' onClick={(e) => {
      e.preventDefault();
      window.location.href='./register';
      }}>Register Now</button>
					<button className="button-light"><object type="image/svg+xml" data={emailicon}></object></button></div>
			</div>
		</>
	)
}

//make clock tick

function Time() {

	const [timeLeft, setTimeLeft] = useState(() => (getTimeRemaining))

	useEffect(()=>{
		const timer = setInterval(() =>{
			setTimeLeft(getTimeRemaining, 1000)
		})
		return ()=>{
			clearInterval(timer)
		}
	})

	return (
		<>
			<div id="location" class="location-sec">
				<h3 className='montserrat medium detailtxt'>
					11-Games    3-Days    3-Socials
				</h3>
				<ul id="clock" className='montserrat regular'><li>
					<p className='t'>{timeLeft.days}</p>
					<h4>Days</h4>
				</li>
				<li>
					<p>:</p>
				</li>
				<li>
					<p className='t'>{timeLeft.hours}</p>
					<h4>Hours</h4>
				</li>
				<li>
					<p>:</p>
				</li>
				<li>
					<p className='t'>{timeLeft.minutes}</p>
					<h4>Minutes</h4>
				</li>
				<li>
					<p>:</p>
				</li>
				<li>
					<p className='t'>{timeLeft.seconds}</p>
					<h4>Seconds</h4>
				</li></ul>
			</div>
		</>
	)
}
