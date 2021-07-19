const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let datama = {
  items: [
    {
      name: "Burger",
      number: "$5.99",
      category: "Food",
      id: 2
    },
    {
      name: "Plushie",
      number: "$17.38",
      category: "Fun",
      id: 3
    },
    {
      name: "Computer",
      number: "$1999.99",
      category: "Electronics",
      id: 4
    },
    {
      name: "Oxygen",
      number: "$0.00",
      category: "Air",
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
