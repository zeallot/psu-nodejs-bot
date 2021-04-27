const easyvk = require('easyvk')
const { getTomorrow, oneDay } = require('./utils');
const { username, password, owner_id } = require('./config');
const { getRandomPhoto, getAnswer } = require('./apiService');

let publish_date = getTomorrow();

easyvk({ username, password }).then(async vk => {
  setInterval(async () => {
    vk.call('wall.post', {
      owner_id,
      message: getAnswer(),
      attachments: await getRandomPhoto(vk),
      publish_date,
    })
    publish_date += oneDay
  }, 500)
});
