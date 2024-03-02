export default {
  server: {
    hmr: false, // опасно чокидар роботает быстро, можно получить бан на amocrm
    port: 5000,
    proxy: {
      "/proxy": {
        target: "https://agetest.amocrm.ru",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ""),
      },
    },
  },
};
