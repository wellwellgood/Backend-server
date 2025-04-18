const express = require('express');
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

app.listen(PORT, () => console.log(`✅ 서버가 ${PORT}번 포트에서 실행 중입니다.`));
