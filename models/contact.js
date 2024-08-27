const {Schema, model} = require('mongoose');

const handleMongooseError = require('../helpers/handleMongooseError.js');
const { required } = require('joi');


const contactSchema = new Schema({ // створюємо вимоги до обьекута
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
},
{ versionKey: false, timestamps: true } // об'ект налаштувань, вимоги до дати та часу створення об'екта
);

contactSchema.post('save', handleMongooseError) // фіксить викидвння помилки з неправильним статусом

const Contact = model('contact', contactSchema); // клас який буде працювати з колекцією

// module.exports = model('contact', contactSchema)

module.exports = Contact;