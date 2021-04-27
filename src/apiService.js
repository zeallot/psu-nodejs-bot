const { owner_id, album_id } = require('./config');
const { getRandomItemFromArray } = require('./utils');
const emojis = require('emojis-list');

const ANSWERS = ['Да', 'Нет'];

const fetchPhotos = async vk => {
  let photoResponse = await vk.call('photos.get', {
    owner_id,
    album_id,
    count: 1000,
  });
  const { items } = photoResponse;
  return items;
};

module.exports = {
  getRandomPhoto: async vk => {
    let groupPhotoUrls;
    let photos = await fetchPhotos(vk);

    groupPhotoUrls = photos.map(photo => (
      `photo${owner_id}_${photo.id}`
    ));

    return getRandomItemFromArray(groupPhotoUrls);
  },

  getAnswer: () => `${getRandomItemFromArray(ANSWERS)} ${getRandomItemFromArray(emojis)}`,

};
