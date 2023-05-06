const { nanoId, nanoid } = require('nanoid');
let books = require('../Databases/books.data.js');


const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(16);
    const finished = pageCount === readPage ? true : false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if (name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400);
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        }).code(400);
        return response;
    }

    const newBookData = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };
    books.push(newBookData);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            }
        })
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan'
    })
    response.code(500);

    return response;
}

const getAllBookHandler = (request, h) => {
    const { finished, reading, name } = request.query

    let newBooks = books

    if (name !== undefined) {
        newBooks = books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()))
    }
    if (reading !== undefined) {
        const isReading = reading == 0 ? false : true
        newBooks = books.filter(book => book.reading === isReading)
    }

    if (finished !== undefined) {
        const isFinished = finished == 0 ? false : true
        newBooks = books.filter(book => book.finished === isFinished)
    }

    return h.response({
        status: 'success',
        data: {
            "books": newBooks.map(book => {
                return {
                    "id": book.id,
                    "name": book.name,
                    "publisher": book.publisher
                }
            })
        }
    }).code(200)
}

const getBookByHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.filter(book => book.id === bookId)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                "book": book
            }
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    }).code(404);
    return response;
}

const editBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const updatedAt = new Date().toISOString();
    const index = books.findIndex((b) => b.id === bookId);


    if (name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        }).code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        }).code(400);
        return response;
    }

    if (index !== -1) {
        let updatedBook = books[index]
        updatedBook.name = name
        updatedBook.year = year
        updatedBook.author = author
        updatedBook.summary = summary
        updatedBook.publisher = publisher
        updatedBook.pageCount = pageCount
        updatedBook.readPage = readPage
        updatedBook.reading = reading

        books[index] = updatedBook

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        }).code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
    }).code(404);
    return response;
}

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((b) => b.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus'
        }).code(200);
        return response
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    }).code(404);
    return response
}

module.exports = { addBookHandler, getAllBookHandler, getBookByHandler, editBookByIdHandler, deleteBookByIdHandler }