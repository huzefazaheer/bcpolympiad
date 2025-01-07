import { getDatabase, push, ref } from 'firebase/database'

export function writeUserData(person) {
	const db = getDatabase()

	let sportslist = []
	for (let i = 0; i < personData.sports.length; i++) {
		sportslist.push(personData.sports[i].value)
	}

	push(ref(db, 'participants/' + person.cnic), {
		name: person.firstname + ' ' + person.lastname,
		gender: person.gender.value,
		age: person.age,
		phone: person.phone,
		socials: person.socials.value,
		games: sportslist,
	})
}
