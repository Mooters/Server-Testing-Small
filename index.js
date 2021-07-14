const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let datama = {
  items: [
    {
      name: "Item 1",
      number: "15.02",
      category: "food",
      id: 2
    },
    {
      name: "Item 2",
      number: "12376.38",
      category: "hobbies",
      id: 3
    },
    {
      name: "Item 3",
      number: "00.00",
      category: "air",
      id: 4
    },
    {
      name: "Item 4",
      number: "asdf",
      category: "asdf",
      id: 5
    }
  ]
}

app.get('/', (request, response) => {
  response.send('<h1>Welcome to Database</h1>')
})

app.get('/api/datama', (request, response) => {
  response.json(datama.items)
})

app.get('/api/datama/:id', (request, response) => {
  const id = Number(request.params.id)
  const entry = datama.items.find(x => x.id === id)

  if (entry) {
    response.json(entry)
      } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const maxId = datama.items.length > 0
    ? Math.max(...datama.items.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/datama', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'price missing'
    })
  }

  if (!body.category) {
    return response.status(400).json({
      error: 'category missing'
    })
  }

  const entry = {
    name: body.name,
    number: body.number,
    category: body.category,
    id: generateId(),
  }

  datama.items = datama.items.concat(entry)

  response.json(entry)
})

app.delete('/api/datama/:id', (request, response) => {
  const id = Number(request.params.id)
  datama.items = datama.items.filter(x => x.id !== id)
  console.log(datama)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
