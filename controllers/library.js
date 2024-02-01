const Book = require('../models/book.js')
const Author = require('../models/author.js')

exports.getBooks = async (req, res, next) => {
    const perPage=2
    const currentPage=req.params.page
    try {
        const books = await Book.findAll({offset:(currentPage-1)*perPage,limit:perPage},{include:Author})
        if (!books) {
            const error = new Error('there is no books available')
            error.statusCode = 404
            throw error
        }
        return res.status(200).json({ message: 'there are all the books', books: books })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.addBook = async (req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    const date = req.body.date
    const isbn = req.body.isbn
    const pages = req.body.pages
    const price = req.body.price
    const authorFirstName = req.body.authorFirstName
    const authorLastName = req.body.authorLastName
    try {
        let author = await Author.findOne({ where: {first_name: authorFirstName,last_name: authorLastName } })
        if (!author) {
            author = new Author({
                first_name: authorFirstName,
                last_name: authorLastName
            })
            author.save()
        }
            const book = await Book.findOne({ where: { isbn: isbn } })
            if (!book) {
                const newBook = await author.createBook({
                    title: title,
                    description: description,
                    date: date,
                    isbn: isbn,
                    pages: pages,
                    price:price
                })
                return res.status(201).json({ message: 'the book has been added successfully', newBook: newBook })
            }
            else {
                book.count++
                await book.save()
                await author.addBook(book)
                return res.status(201).json({ message: 'the book has been added up', newBook: book })
            }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.deleteBook=async (req,res,next)=>{
    const bookId=req.params.bookId
    try{
    const book=await Book.findByPk(bookId)
    if(!book){
        const error=new Error('book is not found')
        error.statusCode=404
        throw error
    }
    const result=await book.destroy()
    return res.status(200).json({message:"the book has been deleted"})
    } catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.updateBook=async (req,res,next)=>{
    const title = req.body.title
    const description = req.body.description
    const date = req.body.date
    const isbn = req.body.isbn
    const pages = req.body.pages
    const price = req.body.price
    const authorFirstName = req.body.authorFirstName
    const authorLastName = req.body.authorLastName
    const bookId=req.params.bookId
    try {
        let author = await Author.findOne({ where: {first_name: authorFirstName,last_name: authorLastName } })
        if (!author) {
            author = new Author({
                first_name: authorFirstName,
                last_name: authorLastName
            })
            author.save()
        }
        const book = await Book.findByPk(bookId)
            if (!book) {
                const error=new Error('book is not found')
                error.statusCode=400
                throw error
            }
            book.title=title
            book.description=description
            book.date=date
            book.isbn=isbn
            book.pages=pages
            book.price=price
            await book.save()
            await book.setAuthors([])
            await author.addBook(book)
            return res.status(200).json({ message: 'the book has been updated successfully', Book: book })
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}
