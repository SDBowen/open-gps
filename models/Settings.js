const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create schema
const SettingsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  language: {
    type: String
  },
  devices: [
    {
      name: {
        type: String,
        required: true
      },
      key: {
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

const Settings = mongoose.model('settings', SettingsSchema);

module.exports = Settings;
