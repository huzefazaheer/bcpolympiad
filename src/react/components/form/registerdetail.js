import { useState } from 'react'
import Select from 'react-select'

export default function RegisterDetail({
	personData,
	setPersonData,
	errors,
	gamelist,
	setgamelist,
	setSkippable,
}) {
	let badminton = false
	let badmintonindex = 0
	let tabletennis = false
	let tabletennisindex = 0
	let football = false
	let footballindex = 0
	let basketball = false
	let basketballindex = 0
	let cricket = false
	let cricketindex = 0
	let egames = false
	let egamesindex = 0
	if (personData.sports != undefined) {
		for (let i = 0; i < personData.sports.length; i++) {
			switch (personData.sports[i].value) {
				case 'badminton':
					badminton = true
					badmintonindex = i
					break
				case 'tabletennis':
					tabletennis = true
					tabletennisindex = i

					break
				case 'football':
					football = true
					footballindex = i

					break
				case 'basketball':
					basketball = true
					basketballindex = i

					break
				case 'cricket':
					cricket = true
					cricketindex = i

					break
				case 'egames':
					egames = true
					egamesindex = i

					break
				default:
					break
			}
		}
	}
	return (
		<>
			<div className="formcontainer">
			<p className='subtitle register'>We’re so excited to see you {personData.firstname}, now that we know more about you, we just need to a little more information</p>
				{football ? (
					<TeamNameInput
						sportname={'Football'}
						sportref={'football'}
						personData={personData}
						errorname={errors.football}
						index={footballindex}
						setPersonData={setPersonData}
					/>
				) : (
					''
				)}

				{basketball ? (
					<TeamNameInput
						sportname={'Basketball'}
						sportref={'basketball'}
						personData={personData}
						errorname={errors.basketball}
						index={basketballindex}
						setPersonData={setPersonData}
					/>
				) : (
					''
				)}

				{cricket ? (
					<TeamNameInput
						sportname={'Cricket'}
						sportref={'cricket'}
						personData={personData}
						errorname={errors.cricket}
						index={cricketindex}
						setPersonData={setPersonData}
					/>
				) : (
					''
				)}

				{egames ? (
					<EgamesInput
						errorname={errors.egames}
						index={egamesindex}
						personData={personData}
						setPersonData={setPersonData}
						gamelist={gamelist}
						setgamelist={setgamelist}
					/>
				) : (
					''
				)}

				{badminton ? (
					<TeamTypeInput
						sportname={'Badminton'}
						sportref={'badminton'}
						personData={personData}
						errorname={errors.badminton}
						index={badmintonindex}
						setPersonData={setPersonData}
					/>
				) : (
					''
				)}

				{tabletennis ? (
					<TeamTypeInput
						sportname={'Table Tennis'}
						sportref={'tabletennis'}
						personData={personData}
						errorname={errors.tabletennis}
						index={tabletennisindex}
						setPersonData={setPersonData}
					/>
				) : (
					''
				)}
			</div>
		</>
	)
}

function TeamNameInput({
	sportname,
	sportref,
	personData,
	errorname,
	index,
	setPersonData,
}) {
	var ageoptions = [{ value: 'above', label: 'Under 23' }]
	if (personData.age <= 17) {
		ageoptions.push({ value: 'under', label: 'Under 17' })
	}
	let sportdata = personData.sportname
	return (
		<div className="inputcontainer detailcontainer">
			<label htmlFor="agegroup">
				<b>{sportname}</b>
			</label>

			<Select
				id="agegroup"
				className="react-select-container"
				classNamePrefix="react-select"
				options={ageoptions}
				onChange={(event) => {
					let newpersondata = personData.sports
					newpersondata[index].agegroup = event
					setPersonData({ ...personData, sports: newpersondata })
				}}
			/>
			<div className="forminput detailform">
				<label htmlFor="teamname">Team Name</label>
				<input
					type="text"
					name="teamname"
					id="teamname"
					value={personData.sports[index].teamname}
					onChange={(event) => {
						let newpersondata = personData.sports
						newpersondata[index].teamname = event.target.value
						setPersonData({ ...personData, sports: newpersondata })
					}}
					required
				/>
			</div>
			<p className="error">{errorname}</p>
		</div>
	)
}

function EgamesInput({
	errorname,
	index,
	setPersonData,
	personData,
	gamelist,
	setgamelist,
}) {
	const egamesoptions = [
		{ value: 'tekken', label: 'Tekken' },
		{ value: 'fifa', label: 'FIFA' },
		{ value: 'pubg', label: 'Pubg' },
	]
	return (
		<div className="inputcontainer detailcontainer">
			<label htmlFor="socialsincluded">
				<b>Egames</b>
			</label>

			<Select
				id="socialsincluded"
				className="react-select-container"
				classNamePrefix="react-select"
				options={egamesoptions}
				value={personData.sports[index].games}
				isMulti={true}
				onChange={(event) => {
					let newpersondata = personData.sports
					newpersondata[index].games = event
					setPersonData({ ...personData, sports: newpersondata })
					let _gamelist = []
					personData.sports[index].games.forEach((item) =>
						_gamelist.push(item.value)
					)
					setgamelist(_gamelist)
				}}
			/>
			<div
				className="forminput detailform"
				id={gamelist.includes('pubg') ? '' : 'disabled'}
			>
				<label htmlFor="teamname">Team Name</label>
				<input
					type="text"
					name="teamname"
					id="teamname"
					value={personData.sports[index].teamname}
					onChange={(event) => {
						let newpersondata = personData.sports
						newpersondata[index].teamname = event.target.value
						setPersonData({ ...personData, sports: newpersondata })
					}}
					required
				/>
			</div>
			<p className="error">{errorname}</p>
		</div>
	)
}

function TeamTypeInput({
	sportname,
	sportref,
	personData,
	errorname,
	setPersonData,
	index,
}) {
	const gametypeoptions = [
		{ value: 'one', label: 'Singles' },
		{ value: 'two', label: 'Doubles' },
	]
	let ageoptions = [{ value: 'above', label: 'Under 25' }]
	if (personData.age <= 16) {
		ageoptions.push({ value: 'under', label: 'Under 16' })
	}
	return (
		<div className="inputcontainer detailcontainer">
			<label htmlFor="gametype">
				<b>{sportname}</b>
			</label>
			<Select
				id="agegroup"
				className="react-select-container"
				classNamePrefix="react-select"
				options={ageoptions}
				value={personData.sports[index].agegroup}
				onChange={(event) => {
					let newpersondata = personData.sports
					newpersondata[index].agegroup = event
					setPersonData({ ...personData, sports: newpersondata })
				}}
			/>
			<Select
				id="gametype"
				className="react-select-container"
				classNamePrefix="react-select"
				options={gametypeoptions}
				value={personData.sports[index].gametype}
				onChange={(event) => {
					let newpersondata = personData.sports
					newpersondata[index].gametype = event
					setPersonData({ ...personData, newpersondata })
				}}
			/>

			<div
				className="forminput detailform"
				id={
					personData.sports[index].gametype != undefined
						? personData.sports[index].gametype == ''
							? 'disabled'
							: personData.sports[index].gametype.value == 'one'
							? 'disabled'
							: ''
						: 'disabled'
				}
			>
				<label htmlFor="teamname">Team Name</label>
				<input
					type="text"
					name="teamname"
					id="teamname"
					required
					value={personData.sports[index].teamname}
					onChange={(event) => {
						let newpersondata = personData.sports
						newpersondata[index].teamname = event.target.value
						setPersonData({ ...personData, sports: newpersondata })
					}}
				/>
			</div>
			<p className="error">{errorname}</p>
		</div>
	)
}
