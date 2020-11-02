const validateBook = (name, author) => {
    const errors = {}
    if(name === undefined || name.trim() === ''){
        errors.name = 'Name can not be empty'
    }
    if(author === undefined || author.trim() === ''){
        errors.author = 'Author can not be empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

const validateUser = (
    firstName,
    lastName,
    username,
    password,
    city
) => {
    const errors = {}
    if(firstName === undefined || firstName.trim() === '') {
        errors.firstName = 'First name can not be empty'
    }

    if(lastName === undefined || lastName.trim() === '') {
        errors.lastName = 'Last name can not be empty'
    }

    if(username === undefined ||username.trim() === '') {
        errors.username = 'Username can not be empty'
    }

    if(password === undefined || password.trim() === '') {
        errors.password = 'Password can not be empty'
    }

    if(city === undefined || city.trim() === '') {
        errors.city = 'City can not be empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

const validateLogin = (username, password) => {
    const errors = {}
    if(username === undefined || username.trim() === ''){
        errors.username = 'Username can not be empty'
    }

    if(password === undefined || password.trim() === ''){
        errors.password = 'Password can not be empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

const validateRequest = (booksToGive, booksToReceive) => {
    const errors = {}
    if(!Array.isArray(booksToGive)){
        errors.booksToGive = 'Books to give should be an array'
    }
    if(!Array.isArray(booksToReceive)){
        errors.booksToReceive = 'Books to receive should be an array'
    }

    if(Array.isArray(booksToReceive) && booksToReceive.length < 1){
        errors.booksToReceive = 'Books to receive should not be empty'
    }

    if(Array.isArray(booksToGive) && booksToGive.length < 1){
        errors.booksToGive = 'Books to give should not be empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

export {
    validateBook,
    validateUser,
    validateLogin,
    validateRequest
}
