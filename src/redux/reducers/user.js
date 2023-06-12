const initialState = { 
	user: {},
	token:"",
}

const userReducer = (state = initialState ,action) => {
	switch (action.type) {
		case 'LOGIN':
			return{
				...state,
				user: action.payload
			}
		case 'TOKEN': return{
			...state,
			token: action.payload
		}

		case 'NEWUSER': {
			const newUser = action.payload;
			return{
			...state,
			user: newUser
		}}
		default: return state
	}
}

export default userReducer