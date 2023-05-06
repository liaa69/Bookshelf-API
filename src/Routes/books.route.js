const { addBookHandler, getAllBookHandler, getBookByHandler, editBookByIdHandler, deleteBookByIdHandler } = require("../Handlers/books.handler.js");

const GET = [
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByHandler
    },
]

const POST = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    }
]

const PUT = [
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookByIdHandler,
    }
]

const DELETE = [
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookByIdHandler,
    }
]

const BookRouters = [...GET, ...POST, ...PUT, ...DELETE]

module.exports = BookRouters