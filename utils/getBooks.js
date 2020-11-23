import Book from '../models/Book'
import User from '../models/User'

export const getBooks = async(books) => {
    let allBooks = []
    for(let i=0; i<books.length; i++){
        const eachBook = await Book.findById(books[i].bookId)
        if(eachBook) {
            const user = await User.findById(eachBook.userId)
            let book = {
                name: eachBook.name,
                author: eachBook.author,
                image: eachBook.image,
                user: user.firstName
            }
            allBooks.push(book)
        }    
    }

    if(allBooks.length > 0){
        return allBooks
    }else{
        return false
    }
}