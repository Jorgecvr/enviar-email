const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

// Middleware para interpretar o corpo das requisições como JSON
app.use(bodyParser.json());

// Configuração do transportador de email com Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // você pode usar outro serviço de email, se necessário
  auth: {
    user: 'jorgealmeidacarvalho13@gmail.com',  // Substitua pelo seu e-mail
    pass: 'qylz bzvb zawb ejnu',            // Substitua pela sua senha (ou senha de app, se usar Gmail)
  },
});

// Endpoint para enviar o email
app.post('/send-email', (req, res) => {
  const { subject, body, to } = req.body;

  const mailOptions = {
    from: 'jorgealmeidacarvalho13@gmail.com',  // E-mail de origem
    to: to || 'jorgealmeidacarvalho13@gmail.com', // Destinatário
    subject: subject || 'Assunto do Email', // Assunto do e-mail
    text: body || 'Corpo do email predefinido.', // Corpo do email
  };

  // Enviar o e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ message: 'Erro ao enviar o email.', error: error.toString() });
    }
    res.status(200).send({ message: 'Email enviado com sucesso!', info });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
