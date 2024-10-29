import path from 'path';
import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import careRoutes from './routes/careRoutes.js'
import postRoutes from './routes/postRoutes.js'
import fanpageRoutes from './routes/fanpageRoutes.js'
import cors from 'cors'


connectDB();

const app = express();

app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cares', careRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/fanpages', fanpageRoutes);



app.use(cors());

const NODE_ENV = 'production';

const __dirname = path.resolve();

if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './FE/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, './FE/build/index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in development mode on port 5000`
  )
);

