const easyvk = require('easyvk')
const { getRandomItemFromArray, getTomorrow, oneDay } = require('./utils');
const { username, password, owner_id, album_id } = require('./config');
const emojis = require('emojis-list')

const ANSWERS = ['Да', 'Нет']

const fetchPhotos = async vk => {
  let photoResponse = await vk.call('photos.get', {
    owner_id,
    album_id,
    count: 1000,
  });
  const { items } = photoResponse;
  return items;
};

const getRandomPhoto = async vk => {
  let groupPhotoUrls;
  let photos = await fetchPhotos(vk);

  groupPhotoUrls = photos.map(photo => (
    `photo${owner_id}_${photo.id}`
  ));

  return getRandomItemFromArray(groupPhotoUrls);
};

const getAnswer = () => `${getRandomItemFromArray(ANSWERS)} ${getRandomItemFromArray(emojis)}`;

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
})
