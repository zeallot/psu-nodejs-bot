const easyvk = require('easyvk')
const { getTomorrow, oneDay } = require('./utils');
const { username, password, owner_id } = require('./config');
const { getRandomPhoto, getAnswer } = require('./apiService');

let publish_date = getTomorrow();

easyvk({ username, password }).then(async vk => {
  let count = 0;
  const interval = setInterval(async () => {
    vk.call('wall.post', {
      owner_id,
      message: getAnswer(),
      attachments: await getRandomPhoto(vk),
      publish_date,
    }).catch((e) => {
      const { error_code: code, error_msg: msg } = e;
      console.error(`Error! Code: ${code}, message: ${msg}.`)
      clearInterval(interval);
    });
    count++
    console.log('Posts postponed ', count);
    publish_date += oneDay
  }, 500)
});
