export const userInfo = info =>{
	return{
		type: "LOGIN",
		payload: info
	}
}

export const tokenUser = token =>{
	return {
		type: "TOKEN",
		payload: token
	}
}

export const newUser = user =>{
	return {
		type: "NEWUSER",
		payload: user
	}
}