const mongoose = require("mongoose"); // імпортуємо mongoose
// const DB_HOST = 'mongodb+srv://Alina:KXVg2cDqxNQAbz8I@cluster0.dcb0b.mongodb.net/db_contacts?retryWrites=true&w=majority&appName=Cluster0'
const app = require('./app');

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true); // помогает избежать ошибок, связанных с неправильными запросами, где могут быть использованы несуществующие или неправильные поля. Это делает код более безопасным и предсказуемым.

mongoose.connect(DB_HOST) //викликаємо для підключення до бази
  .then(() => {app.listen(PORT)})
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

//   process.exit(1) используется для того, чтобы остановить выполнение приложения в случае, 
// если подключение к базе данных не удалось, так как дальнейшая работа без успешного подключения 
// может быть бесполезной или даже привести к непредсказуемым последствиям.

