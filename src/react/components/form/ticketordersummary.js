export default function TicketOrderSummary({
	personData,
	setPersonData,
	setBill,
}) {
	function calculateTotal() {
		let total = 0
		if (personData.ticket.value == 'vip') {
			total = 4200
		} else {
			total = 1500
		}

		setBill(total)
		return total
	}

	return (
		<>
			<div className="formcontainer">
				<tbody>
					<tr>
						<td>
							<p>Name:</p>
						</td>
						<td>
							<p>{personData.name}</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>Email:</p>
						</td>
						<td>
							<p>{personData.email}</p>
						</td>
					</tr>
					<tr>
						<td>
							<p>Ticket type:</p>
						</td>
						<td>
							<p>{personData.ticket.label}</p>
						</td>
					</tr>
					{/* <tr>
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
					</tr> */}
				</tbody>
				<h5>Your total amount is: PKR {calculateTotal()}</h5>
			</div>
		</>
	)
}
