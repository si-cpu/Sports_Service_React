const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        ["/local", "/game", "/logo"],
        createProxyMiddleware({
            target: "http://localhost:3000",
            changeOrigin: true,
            router: {
                "/game": "https://api-gw.sports.naver.com/schedule",
                "/logo": "https://sports-phinf.pstatic.net",
            },
            pathRewrite: {
                "^/game/": "/",
                "^/logo/": "/",
            },
        })
    );
};
