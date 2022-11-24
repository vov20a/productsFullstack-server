import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import {
  registerValidation,
  postCreateValidation,
  categoryCreateValidation,
  productCreateValidation,
  orderCreateValidation,
} from './validations.js';
import { checkAuthAndAdmin, handleValidationErrors } from './utils/index.js';
import {
  UserController,
  PostController,
  CategoryController,
  ProductController,
  OrderController,
  MailController,
} from './controllers/index.js';

mongoose
  // .connect(
  //   'mongodb+srv://admin:AlexeevVova1960@cluster0.7t7uam2.mongodb.net/vova?retryWrites=true&w=majority',
  // )
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB error:', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use(express.json());

//для управления портами-разрешает frontend
app.use(cors());

app.use('/uploads', express.static('uploads'));

//load file-image
app.post('/upload', checkAuthAndAdmin, upload.single('image'), (req, res) => {
  res.json({
    URL: `/uploads/${req.file.originalname}`,
  });
});

//email send
app.post('/mail', MailController.postMail);

//restore password
app.post('/auth/restore', handleValidationErrors, UserController.checkEmail);
app.post('/auth/password', handleValidationErrors, UserController.updateUser);

//auth
app.post('/auth/login', handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuthAndAdmin, UserController.getMe);
app.delete('/auth/:id', checkAuthAndAdmin, UserController.deleteUser);
//users
app.post(
  '/auth/create',
  registerValidation,
  handleValidationErrors,
  checkAuthAndAdmin,
  UserController.create,
);
app.patch(
  '/auth/edit/:id',
  registerValidation,
  handleValidationErrors,
  checkAuthAndAdmin,
  UserController.edit,
);
app.get('/auth/users', checkAuthAndAdmin, UserController.getAll);
app.get('/auth/user/:id', checkAuthAndAdmin, UserController.getOne);
app.get('/auth/count', UserController.getCount);

//CRUD POSTS
app.post(
  '/posts',
  checkAuthAndAdmin,
  postCreateValidation,
  handleValidationErrors,
  PostController.create,
); //create one post
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id', checkAuthAndAdmin, PostController.remove);
app.patch('/posts/:id', checkAuthAndAdmin, handleValidationErrors, PostController.update);

//CRUD CATEGORIES
app.post(
  '/categories',
  checkAuthAndAdmin,
  categoryCreateValidation,
  handleValidationErrors,
  CategoryController.create,
);
app.get('/categories', CategoryController.getAll);
app.get('/categories/:id', CategoryController.getOne);
app.delete('/categories/:id', checkAuthAndAdmin, CategoryController.remove);
app.patch('/categories/:id', checkAuthAndAdmin, handleValidationErrors, CategoryController.update);
//CRUD PRODUCTS
app.get('/products/count', ProductController.getCount);
app.post(
  '/products',
  checkAuthAndAdmin,
  productCreateValidation,
  handleValidationErrors,
  ProductController.create,
);
app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.getOne);
app.get('/products/categories/:categoryId', ProductController.getProductsByCategory);
app.delete('/products/:id', checkAuthAndAdmin, ProductController.remove);
app.patch('/products/:id', checkAuthAndAdmin, handleValidationErrors, ProductController.update);
//CRUD ORDERS
app.get('/orders/count', OrderController.getCount);
app.post(
  '/orders',
  checkAuthAndAdmin,
  orderCreateValidation,
  handleValidationErrors,
  OrderController.create,
);
app.get('/orders', checkAuthAndAdmin, OrderController.getAll);
app.get('/orders/:id', checkAuthAndAdmin, OrderController.getOne);
app.delete('/orders/:id', checkAuthAndAdmin, OrderController.remove);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
