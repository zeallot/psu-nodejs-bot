const easyvk = require('easyvk')
const {
  username,
  password,
  ownerId,
  albumId,
} = require('./config');

let groupPhotoUrls = [];
let oneDay = 86400;
let dt = new Date()
let date = dt.getDate();
let month = dt.getMonth();
let year = dt.getFullYear();
let answers = ['Да 😎', 'Нет 😐']
let tomorrow = new Date(year, month, date, 8) / 1000 + oneDay;
let count = 0;

function getRandomItemFromArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}

easyvk({username, password}).then(async vk => {
  let photoCount = await vk.call('photos.get', {
    owner_id: ownerId,
    album_id: albumId,
  }).then(response => response.count);

  let groupPhotos = await vk.call('photos.get', {
    owner_id: ownerId,
    album_id: albumId,
    count: photoCount,
  }).then(response => response.items);

  groupPhotoUrls = groupPhotos.map(photo => (
    `photo${ownerId}_${photo.id}`
  ));

  setInterval(() => {
    vk.call('wall.post', {
      owner_id: ownerId,
      message: getRandomItemFromArray(answers),
      attachments: getRandomItemFromArray(groupPhotoUrls),
      publish_date: tomorrow,
    })
    count += 1;
    console.log('Постов отложено ' + count);
    tomorrow += oneDay;
  }, 500)
})
