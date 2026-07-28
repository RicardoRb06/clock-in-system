import express from 'express';

const app = express();
const PORT = 8080;

app.listen(PORT, () => {
    console.log("server open and running on port" + PORT)
})
