const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const pool = require('./DB');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
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

app.use(cors({
  origin: 'https://golden-sorbet-e6f13c.netlify.app',
  credentials: true, // 세션/쿠키 사용 시 필요
}));

app.listen(PORT, () => console.log(`✅ 서버가 ${PORT}번 포트에서 실행 중입니다.`));
