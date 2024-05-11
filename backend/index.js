import express from "express"

const app = express();
const PORT = 5100

app.listen(PORT, () => {
    console.log(`server has started http://localhost:${PORT}/`)
})