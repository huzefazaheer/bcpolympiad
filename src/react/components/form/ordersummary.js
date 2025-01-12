export default function OrderSummary({ personData, setPersonData, setBill }) {
	let sportslist = ''
	let gamesindex = null
	for (let i = 0; i < personData.sports.length; i++) {
		sportslist = sportslist + personData.sports[i].label + '\n'
		if (personData.sports[i].value == 'egames') {
			gamesindex = i
			console.log(gamesindex)
		}
	}

	function calculateTotal() {
		let total = 0
		
		for (let i = 0; i < personData.sports.length; i++) {
			
			if (personData.sports[i].value == 'egames') {
				for (let j = 0; j < personData.sports[i].games.length; j++) {
					switch (personData.sports[i].games[j].value){
						case 'tekken':
							total = total + 4500
							break
						case 'fifa':
							total = total + 4500
							break
						case 'pubg':
							total = total + 3500
							break
					}
				}
				break
			}
			
			let sportname = personData.sports[i].value

			if(sportname == 'badminton' || sportname == 'tabletennis'){
				if(personData.sports[i].gametype.value == 'one'){
					total = total + 3500
				}else{
					total = total + 3000
				}
			}else if(sportname == 'cricket' || sportname == 'volleyball' || sportname == 'basketball' || sportname == 'football'){
				total = total + 3000
			}else if(sportname == 'chess' || sportname == 'ludo' || sportname == 'strongman'){
				total = total + 4000
			}
			
		}
		console.log(personData)
		setBill(total)
		return total
	}

	return (
		<>
			<div className="formcontainer">
			<p className='subtitle register'>You've completed your order successfully,
			Take a screenshot of this tab and pay to one of the following numbers: <br/> IBAN Number: PK17UNIL0109000313175556</p>
				<tbody>
					<tr>
						<td>
							<p>Name:</p>
						</td>
						<td>
							<p>
								{personData.firstname} {personData.lastname}
							</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>Gender:</p>
						</td>
						<td>
							<p>{personData.gender.label}</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>Age:</p>
						</td>
						<td>
							<p>{personData.age}</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>CNIC:</p>
						</td>
						<td>
							<p>{personData.cnic}</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>Phone number:</p>
						</td>
						<td>
							<p>{personData.phone}</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>Socials included:</p>
						</td>
						<td>
							<p>{personData.socials.label}</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>Games:</p>
						</td>
						<td>
							<p>{sportslist}</p>
						</td>
					</tr>
				</tbody>
				<h5 className="total">Your total amount is: PKR {calculateTotal()}</h5>
			</div>
		</>
	)
}
