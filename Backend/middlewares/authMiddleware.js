const jwt = require('jsonwebtoken');
const SECRET_KEY = 'fgOEC9QpRFOvOUYvd8ZON5d717IOopBs'; // 这个应该和创建JWT时使用的秘钥相同

function authenticate(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  // 从 "Bearer YOUR_TOKEN" 中提取令牌
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader; // 从"Bearer "后开始

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // 你可以将解码后的用户信息存储在请求对象中
    // console.log('decoded的内容是：', decoded);
    next(); // 转到下一个中间件或路由处理器
  } catch (err) {
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
}

module.exports = authenticate;
