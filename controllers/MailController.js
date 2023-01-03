import { send } from '../mail.js';

export const postMail = async (req, res) => {
  try {
    const email = req.body.email;
    const message = req.body.message;

    const mail = await send(email, message);
    return res.json({ mail });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: 'Не удалось отправить письмо',
    });
  }
};
