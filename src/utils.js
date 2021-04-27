let oneDay = 86400;
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();

module.exports = {
  getRandomItemFromArray: (array) => {
    return array[Math.floor(Math.random() * array.length)]
  },

  oneDay,

  getTomorrow: () => {
    return Date.UTC(year, month, day, 1) / 1000;
  },
}
