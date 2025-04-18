const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const pool = require('./DB');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS 설정은 라우트보다 위에!
const allowList = ['https://golden-sorbet-e61f3c.netlify.app'];
const corsOptions = {
  origin: function (origin, callback) {
    console.log('CORS 요청 origin 👉', origin);
    if (!origin || allowList.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ 차단된 origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight 처리도 위에 있어야 함

app.use(express.json());

app.get('/', (req, res) => res.send('✅ 서버 작동 중'));

app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT current_database();');
    res.json({ db: result.rows[0].current_database });
  } catch (err) {
    res.status(500).json({ error: 'DB 연결 실패' });
  }
});

// 👇 여기서부터 로그인 등 API 라우트들 들어가면 됨
