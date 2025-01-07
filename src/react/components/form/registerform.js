import { useState } from 'react'

import Select from 'react-select'

const options = [
	{ value: 'football', label: 'Football', agegroup: '', teamname: '' },
	{ value: 'basketball', label: 'Basketball', agegroup: '', teamname: '' },
	{
		value: 'cricket',
		label: 'Cricket',
		agegroup: '',
		teamname: '',
		gametype: '',
	},
	{ value: 'tabletennis', label: 'Table Tennis' },
	{
		value: 'badminton',
		label: 'Badminton',
		agegroup: '',
		teamname: '',
		gametype: '',
	},
	{ value: 'snooker', label: 'Snooker' },
	{ value: 'egames', label: 'E-games', games: [] },
	{ value: 'chess', label: 'Chess' },
	{ value: 'ludo', label: 'Ludo' },
]

const socialsoptions = [
	{ value: 'yes', label: 'Yes' },
	{ value: 'no', label: 'No' },
]

const genderoptions = [
	{ value: 'm', label: 'Male' },
	{ value: 'f', label: 'Female' },
]

export default function RegisterPerson({ personData, setPersonData, errors }) {
	const [firstdash, setfirstdash] = useState(false)
	const [seconddash, setseconddash] = useState(false)

	return (
		<>
			<div className="formcontainer">
			<p className='subtitle register'>Now that's the spirit, in a few short steps you will sucessfully be registered for BCP Olympiad. Please fill out this form below</p>
				<div className="inputcontainer">
					<div className="forminput">
						<label htmlFor="namefirst">First Name</label>
						<input
							type="text"
							name="firstname"
							id="namefirst"
							value={personData.firstname}
							onChange={(event) => {
								setPersonData({
									...personData,
									firstname: event.target.value,
								})
							}}
							required
						/>
						<p className="error">{errors.firstname}</p>
					</div>
					<div className="forminput">
						<label htmlFor="namelast">Last Name</label>
						<input
							type="text"
							name="lastname"
							id="namelast"
							value={personData.lastname}
							onChange={(event) => {
								setPersonData({ ...personData, lastname: event.target.value })
							}}
							required
						/>
						<p className="error">{errors.lastname}</p>
					</div>
				</div>
				<div className="inputcontainer">
					<div className="forminput dropdown">
						<label htmlFor="gender">Gender</label>
						<Select
							id="gender"
							className="react-select-container"
							classNamePrefix="react-select"
							options={genderoptions}
							value={personData.gender}
							onChange={(value) => {
								setPersonData({ ...personData, gender: value })
							}}
						/>
						<p className="error">{errors.gender}</p>
					</div>
					<div className="forminput">
						<label htmlFor="age">Age</label>
						<input
							type="number"
							name="age"
							id="age"
							value={personData.age}
							onChange={(event) => {
								setPersonData({ ...personData, age: event.target.value })
							}}
						/>
						<p className="error">{errors.age}</p>
					</div>
				</div>
				<div className="inputcontainer">
					<div className="forminput">
						<label htmlFor="cnic">CNIC Number</label>
						<input
							type="tel"
							placeholder="XXXXX-XXXXXXX-X"
							name="cnic"
							id="cnic"
							value={personData.cnic}
							onChange={(event) => {
								if (event.target.value.length <= 15) {
									if (event.target.value.length == 5 && firstdash == false) {
										setPersonData({
											...personData,
											cnic: event.target.value.replace(/\s/g, '') + '-',
										})
										setfirstdash(true)
									} else if (
										event.target.value.length == 13 &&
										seconddash == false
									) {
										setPersonData({
											...personData,
											cnic: event.target.value.replace(/\s/g, '') + '-',
										})
										setseconddash(true)
									} else {
										setPersonData({
											...personData,
											cnic: event.target.value.replace(/\s/g, ''),
										})
									}
									if (event.target.value.length < 5 && firstdash == true) {
										setfirstdash(false)
									}
									if (event.target.value.length < 13 && seconddash == true) {
										setseconddash(false)
									}
								}
							}}
						/>
						<p className="error">{errors.cnic}</p>
					</div>
					<div className="forminput">
						<label htmlFor="phone">Phone Number</label>
						<input
							type="tel"
							name="phone"
							id="phone"
							value={personData.phone}
							onChange={(event) => {
								if (event.target.value.length <= 12) {
									setPersonData({
										...personData,
										phone: event.target.value.replace(/\s/g, ''),
									})
								}
							}}
						/>
						<p className="error">{errors.phone}</p>
					</div>
				</div>
				<div className="inputcontainer specialinput">
					<label className="speciallabel" htmlFor="socialsincluded">
						Do you want socials included?
					</label>
					<div>
						<Select
							id="socialsincluded"
							className="react-select-container"
							classNamePrefix="react-select"
							options={socialsoptions}
							value={personData.socials}
							onChange={(value) => {
								setPersonData({ ...personData, socials: value })
							}}
						/>
						<p className="error special">{errors.socials}</p>
					</div>
				</div>
				<div className="inputcontainer specialinput">
					<label className="speciallabel" for="sports">
						Choose sports
					</label>

					<div>
						<Select
							id="sports"
							className="react-select-container"
							classNamePrefix="react-select"
							options={options}
							value={personData.sports}
							onChange={(selectedOption) => {
								setPersonData({ ...personData, sports: selectedOption })
							}}
							isMulti={true}
						/>

						<p className="error special">{errors.sports}</p>
					</div>
				</div>
			</div>
		</>
	)
}
