const express = require('express');
const path = require('path');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

// 1. Cabeçalhos de Segurança
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Armazenamento local de sessões (substituir por Redis/Banco em produção)
const activeSessions = new Set();

// 2. Proteção contra Rate Limiting / Spam
const requestCounts = new Map();
const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const count = requestCounts.get(ip) || 0;
  if (count >= 5) {
    return res.status(429).json({ success: false, message: 'Muitas tentativas. Aguarde 1 minuto.' });
  }
  requestCounts.set(ip, count + 1);
  setTimeout(() => requestCounts.set(ip, (requestCounts.get(ip) || 1) - 1), 60000);
  next();
};

app.use(express.static(path.join(__dirname, 'public')));

// 3. Rota de Autenticação / Captura de Dados
app.post('/api/access', rateLimiter, (req, res) => {
  const { name, email, phone } = req.body;

  // Sanitização estrita de entradas
  const cleanName = typeof name === 'string' ? name.trim() : '';
  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const cleanPhone = typeof phone === 'string' ? phone.replace(/\D/g, '') : '';

  if (cleanName.length < 3 || !cleanEmail.includes('@') || cleanPhone.length < 10) {
    return res.status(400).json({ success: false, message: 'Dados de acesso inválidos.' });
  }

  // Persistir dados no banco de dados aqui...

  // Criação da sessão segura
  const sessionToken = crypto.randomBytes(32).toString('hex');
  activeSessions.add(sessionToken);

  // Envio do token via Cookie HttpOnly
  res.cookie('session_token', sessionToken, {
    httpOnly: true, // Impede roubo via JavaScript no navegador (XSS)
    secure: process.env.NODE_ENV === 'production', // Apenas HTTPS em ambiente de produção
    sameSite: 'strict', // Impede ataques CSRF
    maxAge: 3600000 // Expira em 1 hora
  });

  return res.status(200).json({ success: true, message: 'Acesso autorizado.' });
});

// 4. Middleware de Validação do Token
const requireAuth = (req, res, next) => {
  const token = req.cookies.session_token;
  if (!token || !activeSessions.has(token)) {
    return res.status(401).json({ success: false, message: 'Acesso negado. Faça login.' });
  }
  next();
};

// 5. Rota Protegida (Os dados restritos SÓ saem do servidor AQUI)
app.get('/api/protected-data', requireAuth, (req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      title: "Painel Restrito",
      content: "Este conteúdo foi entregue com segurança após a validação da sessão no servidor."
    }
  });
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));