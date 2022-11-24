import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];
export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
  body('fullName', 'Укажите имя').isLength({ min: 3 }),
  body('role', 'Укажите статус').optional().isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на аватар').optional().isURL(),
];
export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите тект статьи').isLength({ min: 3 }).isString(),
  body('tags', 'Неверный формат тегов(укажите массив)').optional().isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
export const productCreateValidation = [
  body('productUrl', 'Неверная ссылка на изображение').optional().isString(),
  body('title', 'Введите название товара').isLength({ min: 3 }).isString(),
  body('types', 'Неверный формат типов(укажите массив)').isArray(),
  body('sizes', 'Неверный формат размеров(укажите массив)').isArray(),
  body('price', 'Введите цену товара').isNumeric(),
  body('categoryId', 'Введите ID категории').isLength({ min: 3 }).isString(),
  body('rating', 'Введите цену товара').isNumeric(),
];

export const categoryCreateValidation = [
  body('title', 'Введите название категории').isLength({ min: 3 }).isString(),
];

export const orderCreateValidation = [
  body('products', 'Введите id товаров[]').isArray(),
  body('fullName', 'Укажите имя').isLength({ min: 3 }).isString(),
  body('email', 'Неверный формат почты').isEmail(),
  body('phone', 'Введите номер телефона').isLength({ min: 11 }).isString(),
  body('totalPrice', 'Введите стоимость заказа').isNumeric(),
];
export const restoreEmailValidation = [body('email', 'Неверный формат почты').isEmail()];
