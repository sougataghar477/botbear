const got = require('got');
require('dotenv').config();

//Made by: @sougataghar477
module.exports = {
  name: 'nasa',
  ping: true,
  description: 'This command will give random image from NASA',
  permission: 100,
  category: 'Random command',
  execute: async (channel, user, input, perm) => {
    try {
      if (module.exports.permission > perm) {
        return;
      }
      let url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}`;
      switch (input[2]) {
        case 'random': {
          let nasa = await got(`${url}&count=1`, { timeout: 10000 }).json();
      
          return `Random Astronomy Picture Of The Day (${nasa[0].date}): ${nasa[0].title} - ${nasa[0].hdurl}`;
        }
        default: {
          let nasa = await got(url, { timeout: 10000 }).json();
          
          return `Astronomy Picture Of The Day: ${nasa.title} - ${nasa.hdurl}`;
        }
      }
      
 } catch (err) {
      console.log(err);
      if (err.name) {
        if (err.name === 'TimeoutError') {
          return `FeelsDankMan api error: ${err.name}`;
        }
      }
      return 'FeelsDankMan Error';
    }
  },
};
