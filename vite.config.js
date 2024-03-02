export default {
  server: {
    hmr: false,
    port: 5000,
    proxy: {
      "/proxy": {
        target: "https://emfytest.amocrm.ru",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ""),
      },
    },
  },
};

//eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE0ZjZkOTM5Njg5YzNiMzJjOGQ0MGM4YjBmMTc4ODQyNjBlNzFiZGJiNWFkZDk2ODUzZGIyNTVlNTUyMTFiNmM1ZmRiZWZlMGM3MDllMThiIn0.eyJhdWQiOiJhZWEyM2YzYy0zYjljLTQwY2ItYWM3Yy01MTE4M2VkNDc3ZGIiLCJqdGkiOiIxNGY2ZDkzOTY4OWMzYjMyYzhkNDBjOGIwZjE3ODg0MjYwZTcxYmRiYjVhZGQ5Njg1M2RiMjU1ZTU1MjExYjZjNWZkYmVmZTBjNzA5ZTE4YiIsImlhdCI6MTcwOTQyMDY0OSwibmJmIjoxNzA5NDIwNjQ5LCJleHAiOjE3MTQ0MzUyMDAsInN1YiI6IjkzOTcwMzQiLCJncmFudF90eXBlIjoiIiwiYWNjb3VudF9pZCI6MzE2MDc4MTAsImJhc2VfZG9tYWluIjoiYW1vY3JtLnJ1IiwidmVyc2lvbiI6Miwic2NvcGVzIjpbImNybSIsImZpbGVzIiwiZmlsZXNfZGVsZXRlIiwibm90aWZpY2F0aW9ucyIsInB1c2hfbm90aWZpY2F0aW9ucyJdLCJoYXNoX3V1aWQiOiJkMDlhMTkzNC1iY2Y3LTRjOTktYTFkNi00ZmUyNWM4ZmM3MmIifQ.hiB7Wg2N2fFFgRNjEo7QM4VJxZPntDGtL4H1tyanZsr1HCJ7emShs303nTb1NGpVk2MBW2QJCT5dmpKTJhdP-tM-GLE_0XOrqPI6ctM7jjbD7GzJ67HfkEWEw7VObOSv2rmdwlsda9643q0SYZEZCjxdwXWfgiJHxFFLe4g9l2bGKvH0GJ5tO1q7mhdfgOCWaT5EJ0ArJTx6j6VlZgQWSUDiyFYRkrDvdHqIw6HBeRAUQZyEwZyf7jOZY1NSBTxCOF6bNtxM9FjaSm7OfTIXKNQ0k6Wm-bJWjLKM7VRk_2ubgaz4CRVogUzBDSkyUsxw__jToEj-KecN8xYAveEROA
