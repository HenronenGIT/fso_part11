const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7)
	}
	return null
}

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1 })

	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body

	const token = getTokenFrom(request)
	if (!token) {
		return response.status(401).json({ error: 'token missing' })
	}
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)

	const blog = new Blog(
		{
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
			user: user._id
		}
	)

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
	try {
		const newBody = request.body
		const newBlog = {
			title: newBody.title,
			author: newBody.author,
			url: newBody.url,
			likes: newBody.likes
		}

		const updatedBlog = await Blog
			.findByIdAndUpdate(request.params.id, newBlog, { new: true })
		response.json(updatedBlog)
	} catch (error) {
		next(error)
	}
})

module.exports = blogsRouter