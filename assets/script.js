// initialize some state variablr
let nav = 0 ;
// this is to kepp track in which month the calendar is
let clicked = null;
// for the clickanble day in the calendar
let event;
if(localStorage.getItem('events')){
    event = JSON.parse.localStorage.getItem('events');
}else {
    event = [];
}
// initialize event and then load event from localStorage. If there is no event set event to an empty array

// initialize some constant variable
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const calendar = document.getElementById('calendar');

// initialize function load
function load(){
    // load the current day for references
    const dt = new Date();
    if(nav != 0){
        dt.setMonth(new Date().getMonth() + nav);
    }
    // get the date month and year from dt
    const date = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    // get how many day in this month
    // do this by constructing a new Date onject and passing the value for the next month and the value zero to get the last day in this month
    const daysInMonth = new Date(year, month+1, 0).getDate();
    const maxDateInPrevMonth = new Date(year, month, 0).getDate();
    console.log(maxDateInPrevMonth);
    // get the first date in this month
    const firstDayinMonth = new Date(year, month, 1)
    
    const dateString = firstDayinMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: "numeric",
        month: 'numeric',
        day: 'numeric'
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
    let displayMonth = dt.toLocaleDateString('en-us', {month: 'long'});
    document.getElementById('month-display').innerText = `${displayMonth} ${year}`;
    // Clear the calendar div from the square
    calendar.innerHTML = '';

    for(let i=1; i<=42; ++i){
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        if(i>paddingDays && i<=paddingDays + daysInMonth){
            daySquare.innerHTML = i-paddingDays;
            daySquare.addEventListener('click', ()=> console.log('click on', i-paddingDays));
        }else {
            daySquare.classList.add('padding');
            if(i<=paddingDays){
                daySquare.innerHTML = maxDateInPrevMonth - (paddingDays - i);
            }else if(i>paddingDays + daysInMonth){
                daySquare.innerHTML = i-(paddingDays + daysInMonth);
            }
        }

        calendar.appendChild(daySquare);
    }
}

function initButton(){
    document.getElementById('next-button').addEventListener('click', ()=> {
        nav++;
        load();
    });
    document.getElementById('back-button').addEventListener('click', ()=> {
        nav--;
        load();
    });
}

initButton();
load();