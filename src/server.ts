import express from 'express';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
  return res.json({
    message: 'Hello World!'
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));