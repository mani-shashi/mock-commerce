import express from 'express';
import cors from 'cors';
import db, { initializeDatabase } from './config/db.js';
import loadInitialData from './config/loadData.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

initializeDatabase();
loadInitialData();

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

