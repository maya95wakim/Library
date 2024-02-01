const Book = require('../models/book.js')
const myCache = require('../util/node-cache.js')

exports.getCart = async (req, res, next) => {
    const userId = req.userId
    try {
        const cart = await myCache.get(userId)
        if (!cart) {
            const error = new Error('user has no cart')
            error.statusCode = 400
            throw error
        }
        const books = await
            Promise.all(cart.books.map(async (book) => {
                const bookEntity = await Book.findByPk(book.bookId)
                mappedBook = { title: bookEntity.title, description: bookEntity.description, qty: book.quantity }
                return mappedBook
            }))
        if (!books) {
            const error = new Error('user has no books in cart')
            error.statusCode = 400
            throw error
        }
        res.status(200).json({ message: 'this is the cart', books: books, totalPrice: cart.totalPrice })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }

}

exports.addToCart = async (req, res, next) => {
    const bookId = req.params.bookId
    console.log(bookId)
    const userId = req.userId
    let cart
    try {
        const book = await Book.findByPk(bookId)
        if (!book) {
            const error = new Error('the book is not found')
            throw error
        }
        if(book.count<=0){
            const error = new Error('the book is out of stock')
            throw error
        }
        userCache = await myCache.get(userId)
        if (!userCache) {
            cart = {
                books: [{ bookId: bookId, quantity: 1 }],
                totalPrice: book.price
            }
            myCache.set(userId, cart)
        }
        else {
            let alreadyAdded = false
            userCache.books.forEach(element => {
                if (element.bookId == bookId) {
                    element.quantity++
                    alreadyAdded = true
                }
            })
            if (!alreadyAdded) {
                userCache.books.push({ bookId: bookId, quantity: 1 })
            }
            userCache.totalPrice = userCache.totalPrice + book.price
            myCache.set(userId, userCache)
            cart = userCache
        }
        return res.status(200).json({ message: 'the items has been added successfully', cart: cart })
    } catch (err) {
        err.statusCode = 500
        next(err)
    }
}

exports.deleteCartItem = async (req, res, next) => {
    const bookId = req.params.bookId
    const userId = req.userId

    const cart = await myCache.get(userId)
    if (!cart) {
        const error = new Error('user has no cart')
        error.statusCode = 400
        throw error
    }
    const books = cart.books.filter(book => book.bookId !== bookId)
    const bookInDb = await Book.findByPk(bookId)
    if (!bookInDb) {
        const error = new Error('the book is not in the cart')
        error.statusCode = 400
        throw error
    }
    const totalPrice = cart.totalPrice - bookInDb.price
    const newCart = { books: books, totalPrice: totalPrice }
    myCache.set(userId, newCart)
    return res.status(200).json({ message: "the book has been deleted from your cart", newCart })
}