const express = require('express')
const cors = require('cors');
const app = express()

const PORT = 3000

app.use(cors())
app.use(express.json());


app.listen(PORT, () => {
    console.log("Server start")
})

app.post('/calculation', (req, res) => {
    try {
        const expression = req.body.data.join('')
        const result = parseFloat(eval(expression).toFixed(2))
        res.send({result})
    } catch (e) {
        res.status(500).send({message: 'calculation error'})
    }
})

app.use((req, res) => {
    res.status(404)
        .send('Error 404')
})
