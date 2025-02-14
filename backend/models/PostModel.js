//**************************************/
const mongoose = require('mongoose');

//**************************************/


const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },       
  content: { type: String, required: true },    
  date: { type: Date, default: Date.now },      
  reactions: {                                  
      thumbsUp: { type: Number, default: 0 },
      wow: { type: Number, default: 0 },
      heart: { type: Number, default: 0 },
      rocket: { type: Number, default: 0 },
      coffee: { type: Number, default: 0 },
      
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Author reference
}, { timestamps: true });

module.exports = mongoose.model('Posts',PostSchema);