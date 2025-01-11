import './register.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { getDatabase, push, ref } from 'firebase/database'

import RegisterPerson from '../../components/form/registerform'
import RegisterDetail from '../../components/form/registerdetail'
import OrderSummary from '../../components/form/ordersummary'

export default function Register() {
	async function writeUserData(person) {
		const db = getDatabase()
		let sportslist = [{}]
		for (let i = 0; i < personData.sports.length; i++) {
			let _game = {
				name: null,
				teamname: null,
				agegroup: null,
				gametype: null,
				gameslist: [],
			}
			_game.name = personData.sports[i].value
			if (personData.sports[i].teamname) {
				_game.teamname = personData.sports[i].teamname
			}
			if (personData.sports[i].agegroup) {
				_game.agegroup = personData.sports[i].agegroup.value
			}
			if (personData.sports[i].gametype) {
				_game.gametype = personData.sports[i].gametype.value
			}
			if (personData.sports[i].games) {
				for (let x = 0; x < personData.sports[i].games.length; x++) {
					_game.gameslist.push(personData.sports[i].games[x].value)
				}
			}
			sportslist.push(_game)
		}

		push(ref(db, 'participants/'), {
			cnic: person.cnic,
			name: person.firstname + ' ' + person.lastname,
			gender: person.gender.value,
			age: person.age,
			phone: person.phone,
			socials: person.socials.value,
			games: sportslist,
			amount: bill,
		})
	}

	const validateRegisteration = (data) => {
		const strEmpty = 'Field can not be empty'
		const idRegex = /(\d{5}-)(\d{7}-)(\d{1})/
		const phoneRegex = /([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/
		let _error = {
			firstname: '',
			lastname: '',
			gender: '',
			age: '',
			cnic: '',
			phone: '',
			socials: '',
			sports: '',
		}
		let noError = true
		if (!data.firstname) {
			_error.firstname = strEmpty
			noError = false
		} else {
			_error.firstname = ''
		}
		if (!data.lastname) {
			_error.lastname = strEmpty
			noError = false
		} else {
			_error.lastname = ''
		}
		if (!data.age) {
			_error.age = strEmpty
			noError = false
		} else if (data.age < 12) {
			_error.age = 'Age can not be less than 12'
			noError = false
		} else if (data.age > 25) {
			_error.age = 'Age can not be more than 25'
			noError = false
		} else {
			_error.age = ''
		}
		if (!data.gender) {
			_error.gender = strEmpty
			noError = false
		} else {
			_error.gender = ''
		}
		if (!data.socials) {
			_error.socials = strEmpty
			noError = false
		} else {
			_error.socials = ''
		}
		let glist = []
		for (let i = 0; i < data.sports.length; i++) {
			glist.push(data.sports[i].value)
		}
		if (Object.keys(data.sports).length === 0) {
			_error.sports = 'You must choose atleast one sport'
			noError = false
		} else if (data.gender.value == 'f') {
			if (glist.includes('football')) {
				_error.sports = 'Football is for boys only'
				noError = false
			} else if (glist.includes('cricket')) {
				_error.sports = 'Cricket is for boys only'
				noError = false
			}
		} else if (Object.keys(data.sports).length > 2) {
			_error.sports = 'You can only choose two sports max'
			noError = false
		} else {
			_error.sports = ''
		}

		if (!data.phone) {
			_error.phone = strEmpty
			noError = false
		} else if (phoneRegex.test(data.phone) == false) {
			_error.phone = 'Invalid phone number'
			noError = false
		} else {
			_error.phone = ''
		}

		if (!data.cnic) {
			_error.cnic = strEmpty
			noError = false
		} else if (idRegex.test(data.cnic) == false) {
			_error.cnic = 'Invalid cnic number'
			noError = false
		} else {
			_error.cnic = ''
		}

		setErrors(_error)

		return noError
	}
	const [gamelist, setgamelist] = useState([])
	let sportslist = []
	let _pointers = {
		badminton: 0,
		tabletennis: 0,
		football: 0,
		basketball: 0,
		cricket: 0,
		egames: 0,
	}
	const [isSkippable, setSkippable] = useState(true)
	const getSportslists = (data) => {
		for (let i = 0; i < data.sports.length; i++) {
			sportslist.push(data.sports[i].value)
			_pointers[data.sports[i].value] = i
		}
	}
	const checkSkippable = () => {
		console.log(sportslist)
		if (
			sportslist.includes('egames') ||
			sportslist.includes('badminton') ||
			sportslist.includes('tabletennis') ||
			sportslist.includes('football') ||
			sportslist.includes('cricket') ||
			sportslist.includes('basketball')
		) {
			setSkippable(false)
			return false
		} else {
			setSkippable(true)
			return true
		}
	}
	const validateDetail = (data) => {
		const strEmpty = 'Field can not be empty'
		const strNoAge = 'Age group can not be empty'
		let noError = true
		let _error = {
			badminton: '',
			tabletennis: '',
			football: '',
			basketball: '',
			cricket: '',
			egames: '',
		}

		if (sportslist.includes('egames')) {
			const egamesRef = data.sports[_pointers.egames]
			if (egamesRef.games.length == 0) {
				_error.egames = 'You have to select atleast one game'
				noError = false
			} else if (!egamesRef.teamname && gamelist.includes('pubg')) {
				_error.egames = strEmpty
				noError = false
			} else {
				_error.egames = ''
			}
		}

		if (sportslist.includes('badminton')) {
			const badmintonRef = data.sports[_pointers.badminton]
			if (!badmintonRef.gametype) {
				_error.badminton = 'Must choose either singles or doubles'
				noError = false
			} else if (
				!badmintonRef.teamname &&
				badmintonRef.gametype.value == 'two'
			) {
				_error.badminton = strEmpty
				noError = false
			} else if (!badmintonRef.agegroup) {
				_error.badminton = strNoAge
				noError = false
			} else {
				_error.badminton = ''
			}
		}

		if (sportslist.includes('tabletennis')) {
			const tabletennisRef = data.sports[_pointers.tabletennis]
			if (!tabletennisRef.gametype) {
				_error.tabletennis = 'Must choose either singles or doubles'
				noError = false
			} else if (
				!tabletennisRef.teamname &&
				tabletennisRef.gametype.value == 'two'
			) {
				_error.tabletennis = strEmpty
				noError = false
			} else if (!tabletennisRef.agegroup) {
				_error.tabletennis = strNoAge
				noError = false
			} else {
				_error.tabletennis = ''
			}
		}

		if (sportslist.includes('football')) {
			const footballRef = data.sports[_pointers.football]
			if (!footballRef.teamname) {
				_error.football = strEmpty
				noError = false
			} else if (!footballRef.agegroup) {
				_error.football = strNoAge
				noError = false
			} else {
				_error.football = ''
			}
		}

		if (sportslist.includes('cricket')) {
			const cricketRef = data.sports[_pointers.cricket]
			if (!cricketRef.teamname) {
				_error.cricket = strEmpty
				noError = false
			} else if (!cricketRef.agegroup) {
				_error.cricket = strNoAge
				noError = false
			} else {
				_error.cricket = ''
			}
		}

		if (sportslist.includes('basketball')) {
			const basketballRef = data.sports[_pointers.basketball]
			if (!basketballRef.teamname) {
				_error.basketball = strEmpty
				noError = false
			} else if (!basketballRef.agegroup) {
				_error.basketball = strNoAge
				noError = false
			} else {
				_error.basketball = ''
			}
		}

		setErrors2(_error)

		return noError
	}

	const [errors, setErrors] = useState({
		firstname: '',
		lastname: '',
		gender: '',
		age: '',
		cnic: '',
		phone: '',
		socials: '',
		sports: '',
	})
	const [errors2, setErrors2] = useState({
		badminton: '',
		tabletennis: '',
		football: '',
		volleyball: '',
		basketball: '',
		cricket: '',
		egames: '',
	})
	const navigate = useNavigate()
	const [page, setpage] = useState(0)
	const [personData, setPersonData] = useState({
		firstname: '',
		lastname: '',
		gender: '',
		age: '',
		cnic: '',
		phone: '',
		socials: '',
		sports: [],
	})
	const [bill, setBill] = useState(0)

	const formtitles = [
		'',
		'Enter your details',
		'Tell us more about ' + personData.firstname,
		'Order Summary',
		'Purchase Confirmed',
	]
	let form = [
		<RegisterWelcome />,
		<RegisterPerson
			personData={personData}
			setPersonData={setPersonData}
			errors={errors}
			setErrors={setErrors}
		/>,
		<RegisterDetail
			personData={personData}
			setPersonData={setPersonData}
			errors={errors2}
			seterrors={setErrors2}
			gamelist={gamelist}
			setgamelist={setgamelist}
			setSkippable={setSkippable}
		/>,
		<OrderSummary
			personData={personData}
			setPersonData={setPersonData}
			setBill={setBill}
		/>,
		<RegisterEnd />,
	]

	return (
		<>
			<div class="registersec montserrat regular">
				<p className='title register'>Register</p>

				<form method="post" to="#">
					{form[page]}
					

					<div className="buttongroup">
						<button
							disabled={page == 0}
							class="button-light register"
							id={page == 0 || page == 4 ? 'disabled' : ''}
							onClick={(e) => {
								e.preventDefault()
								if (page == 2) {
									setPersonData({ ...personData, sports: [] })
									setpage((currpage) => currpage - 1)
								} else if (page == 3) {
									if (isSkippable) {
										setpage((currpage) => currpage - 2)
										setPersonData({ ...personData, sports: [] })
									} else {
										setpage((currpage) => currpage - 1)
									}
								} else {
									setpage((currpage) => currpage - 1)
								}
							}}
						>
							Back
						</button>
						<button
							class="button-dark register"
							id={page == 0 || page == 4 ? 'onlybutton' : ''}
							onClick={(e) => {
								e.preventDefault()
								if (page == 1) {
									//validate form
									if (validateRegisteration(personData)) {
										console.log('Valid response')
										// console.log(JSON.stringify(personData))
										getSportslists(personData)
										if (checkSkippable()) {
											setpage((currpage) => currpage + 2)
										} else {
											setpage((currpage) => currpage + 1)
										}
									} else {
										console.log('Invalid response')
									}
								} else if (page == 2) {
									// validate detail form
									if (validateDetail(personData)) {
										console.log('Valid response')
										// console.log(JSON.stringify(personData))
										setpage((currpage) => currpage + 1)
									} else {
										console.log('Invalid response')
									}
								} else if (page == 3) {
									console.log(JSON.stringify(personData))
									writeUserData(personData)
									setpage((currpage) => currpage + 1)
								} else if (page == 4) {
									navigate('/')
								} else {
									setpage((currpage) => currpage + 1)
								}
							}}
						>
							{page == 3 ? 'Confirm Order' : page == 4 ? 'Go Back' : 'Next'}
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

function RegisterWelcome() {
	return (
		<>
			<div className="formcontainer">
				<p className='subtitle register'>Are you ready to sign up for Kharian’s biggest sporting event? In just a few steps you can join this premier event</p>
				<ul>
					<p>
					</p>
					<p>
					</p>
				</ul>

			</div>
		</>
	)
}

function RegisterEnd() {
	const date = new Date()
	return (
		<>
			<div className="formcontainer">
				<h4>Thank you for registering to Kharian Sports Fest</h4>
				<p>Below are the ways you can submit your payment</p>
				<ul>
					<li>
						<h5>Online Payments</h5>
						<br />
						<ul>
							<li>
								<h4>Bank transfer</h4>
								<p>
									Account title: Hamza Ahmed Noor Account # 12287901592403{' '}
									<br />
									Bank: HBL
								</p>
								<br />
							</li>

							<li>
								<h4>Easypaisa / Jazzcash</h4>
								<p>
									Account title: Syed Hassan Mehdi <br />
									Account number: 03270766997
								</p>
							</li>

							<li>
								<br />
								<h4>
									Please send the screenshot of proof of payment to one of these
									numbers on whatsapp
								</h4>
								<ul>
									<li className="futura">+92-330-5740212</li>
									<li className="futura">+92-347-5368049</li>
								</ul>
							</li>
						</ul>
					</li>
					<br />
					<li>
						<h5>In person</h5>
						<p>
							In person payments will be taken on the {date.getDate()}th of
							June, 6:00 evening, in Lemon Pepper, Kharian Cantt
						</p>
						<p>For any queries please do not hesitate to contact us</p>
						<p>+92-327-0766997</p>
					</li>
				</ul>
			</div>
		</>
	)
}
