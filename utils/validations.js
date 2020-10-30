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

export default validateBook
