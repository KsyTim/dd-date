const getDayInfo = date => {
  const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const monthName = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  const day = date.trim().slice(0, 2);
  const month = date.trim().slice(3, 5);
  const year = date.trim().slice(6);
  const newDate = new Date(`${date.trim().slice(3, 5)}.${date.trim().slice(0, 2)}.${date.trim().slice(6)}`);
  const getWeekNumber = (date) => {
    const resDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const monthStart = new Date(Date.UTC(newDate.getUTCFullYear(), +month-1, 1));
    const week = Math.ceil(( ( (resDate - monthStart) / 86400000) + 1)/7);
    if (monthStart.getDay() === 0) {
      if(+day === 30 || +day === 31) {
        return 6;
      }      
    } 
    if (monthStart.getMonth() === 1) {
      if (+day === 28 || +day === 29) {
        if (monthStart.getDay() !== 1) {
          return 5;
        }
      }
    }
    if (monthStart.getDay() === 6) {
      if (+day === 28) {
        return 5;
      } else if (+day === 31) {
        return 6;
      }
    }
    if (+day === 1) {
      if (week > 6) {
        return 1;
      }
    } 
    return week;
  }
  const weekName = week[newDate.getDay()];
  const weekNumber = getWeekNumber(newDate);
  const resMonth = monthName[newDate.getMonth()];
  const resYear = newDate.getFullYear();
  return `${weekName}, ${weekNumber} неделя ${resMonth} ${resYear} года`
}

const result = document.querySelector('.result');
result.insertAdjacentHTML('beforeend', 
  `
    <p>${getDayInfo('01.01.2022')}</p>
    <p>${getDayInfo('15.12.2021')}</p>
  `
);
console.log(getDayInfo('01.01.2022'));
console.log(getDayInfo('15.12.2021'));
// console.log(getDayInfo('28.01.2022'));
// console.log(getDayInfo('28.02.2022'));
// console.log(getDayInfo('31.01.2022'));