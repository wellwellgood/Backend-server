const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./DB');
dotenv.config();

const app = express();

// 🎯 정확히 허용할 origin만!
const allowList = ['https://golden-sorbet-e6f13c.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    console.log('CORS 요청 origin 👉', origin);
    if (!origin || allowList.includes(origin)) {
      callback(null, true); // ✅ 허용
    } else {
      console.log('❌ 차단된 origin:', origin);
      callback(new Error('Not allowed by CORS')); // ❌ 차단
    }
  },
  credentials: true, // 세션/쿠키 허용
};

// ✅ 모든 요청에 적용
app.use(cors(corsOptions));
// ✅ Preflight(사전 요청)도 허용
app.options('*', cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => res.send('✅ 서버 작동 중'));

// (선택) DB 테스트용 라우트
// app.get('/api/db-test', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT current_database();');
//     res.json({ db: result.rows[0].current_database });
//   } catch (err) {
//     res.status(500).json({ error: 'DB 연결 실패' });
//   }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ 서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
