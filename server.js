const mongoose = require("mongoose"); // імпортуємо mongoose
const app = require('./app.js');

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true); // помогает избежать ошибок, связанных с неправильными запросами, где могут быть использованы несуществующие или неправильные поля. Это делает код более безопасным и предсказуемым.

mongoose.connect(DB_HOST) //викликаємо для підключення до бази
    .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

//   process.exit(1) используется для того, чтобы остановить выполнение приложения в случае, 
// если подключение к базе данных не удалось, так как дальнейшая работа без успешного подключения 
// может быть бесполезной или даже привести к непредсказуемым последствиям.