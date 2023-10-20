import express from 'express'
import { auth } from './auth';

const server = express();

server.use(express.json())
server.use('/auth', auth)




const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`)
})