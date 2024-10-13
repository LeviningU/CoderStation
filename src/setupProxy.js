const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware({
            target: 'http://localhost:7001',
            pathFilter: "/res",
            changeOrigin: true,
        }),
        createProxyMiddleware({
            target: 'http://localhost:7001',
            pathFilter: "/api",
            changeOrigin: true,
        }),
        createProxyMiddleware({
            target: 'http://localhost:7001',
            pathFilter: "/static",
            changeOrigin: true,
        })
    );
}