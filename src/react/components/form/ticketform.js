import { useState } from 'react'

import Select from 'react-select'

const options = [{ value: 'normal', label: 'Standard Ticket' }]

export default function RegisterTicket({ personData, setPersonData, errors }) {
	return (
		<>
			<div className="formcontainer">
				<div className="inputcontainer">
					<div className="forminput">
						<label htmlFor="namefirst">Name</label>
						<input
							type="text"
							name="firstname"
							id="namefirst"
							value={personData.name}
							onChange={(event) => {
								setPersonData({
									...personData,
									name: event.target.value,
								})
							}}
							required
						/>
						<p className="error">{errors.name}</p>
					</div>
					<div className="forminput">
						<label htmlFor="namelast">Email</label>
						<input
							type="text"
							name="lastname"
							id="namelast"
							value={personData.email}
							onChange={(event) => {
								setPersonData({ ...personData, email: event.target.value })
							}}
							required
						/>
						<p className="error">{errors.email}</p>
					</div>
				</div>

				<div className="inputcontainer specialinput">
					<label className="speciallabel" for="sports">
						Choose ticket type
					</label>

					<div>
						<Select
							id="sports"
							className="react-select-container"
							classNamePrefix="react-select"
							options={options}
							value={personData.ticket}
							onChange={(selectedOption) => {
								setPersonData({ ...personData, ticket: selectedOption })
							}}
							isMulti={false}
						/>

						<p className="error special">{errors.ticket}</p>
					</div>
				</div>
			</div>
		</>
	)
}
