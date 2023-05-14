const mongoose = require("mongoose");
const Navigation = new mongoose.Schema(
  {
    idNavigation: {
      type: mongoose.Schema.Types.ObjectId
    },
    
    linktext: {
      type: String
    },

    linkurl: {
      type: String
    },
    diceptionlink : {
      type: String
    },

    linkimg: {
      type: String
    }

);

module.exports = mongoose.model("Navigation", AdressSchema);
