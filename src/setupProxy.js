const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://users-8a52.onrender.com',
      changeOrigin: true,
    })
  );
};
