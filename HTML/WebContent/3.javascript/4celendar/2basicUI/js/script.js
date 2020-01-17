function main(){
   let curTime = new Date();
   
   setTimeView();
   setTimeDateView(curTime);
   setCalendarYearMonth(curTime);
   setCalendarDate(curTime);
   setMoveBtn();
   setTimeWindowMinimumBtn();
   setCalendarWindowCtlBtnMinimumBtn();
}

function setTimeWindowMinimumBtn(){
	let timeWindowCtlBtn = document.getElementById('timeWindowCtlBtn');
	timeWindowCtlBtn.addEventListener('click',
			()=>{
				let timeWindowCtlBtn = document.getElementById('timeWindowCtlBtn');
				let timeMain = document.getElementById('timeMain');
				let timeView = document.getElementById('timeView');
				let timeDateView = document.getElementById('timeDateView');
				
				if(timeWindowCtlBtn.innerText == '-'){
					timeMain.setAttribute('class','minimum');
					timeView.setAttribute('class','minimum');
					timeDateView.setAttribute('class','minimum');
					
					timeWindowCtlBtn.innerHTML='ㅁ';
				}else{
					timeMain.removeAttribute('class');
					timeView.removeAttribute('class');
					timeDateView.removeAttribute('class');
					
					timeWindowCtlBtn.innerHTML='-';
				}
			})
}
function setCalendarWindowCtlBtnMinimumBtn(){
	let calendarWindowCtlBtn = document.getElementById('calendarWindowCtlBtn');
	calendarWindowCtlBtn.addEventListener('click',
			()=>{
				let calendarWindowCtlBtn = document.getElementById('calendarWindowCtlBtn');
				let calendarMain = document.getElementById('calendarMain');
				let calendarYearMonth = document.getElementById('calendarYearMonth');
				let calendarDate = document.getElementById('calendarDate');
				let calendarBeforeBtn = document.getElementById('calendarBeforeBtn');
				let calendarAfterBtn = document.getElementById('calendarAfterBtn');
				
				if(calendarWindowCtlBtn.innerText == '-'){
					calendarMain.setAttribute('class','minimum');
					calendarYearMonth.setAttribute('class','minimum');
					calendarDate.setAttribute('class','minimum');
					calendarBeforeBtn.setAttribute('class','minimum');
					calendarAfterBtn.setAttribute('class','minimum');
					
					calendarWindowCtlBtn.innerHTML='ㅁ';
				}else{
					calendarMain.removeAttribute('class');
					calendarYearMonth.removeAttribute('class');
					calendarDate.removeAttribute('class');
					calendarBeforeBtn.removeAttribute('class');
					calendarAfterBtn.removeAttribute('class');
					
					calendarWindowCtlBtn.innerHTML='-';
				}
			})
}

function setMoveBtn(){
   let calendarBeforeBtn = document.getElementById('calendarBeforeBtn');
   let calendarAfterBtn = document.getElementById('calendarAfterBtn');
   
   calendarBeforeBtn.addEventListener('click', moveCalendar);
   calendarAfterBtn.addEventListener('click', moveCalendar);
}

function moveCalendar(event){
   let oldYearMonth = document.getElementById('calendarYearMonth');
   let temp = oldYearMonth.innerText.split(' '/*'년'*/);
   console.log(temp);
   let oldYear = temp[0].split('년');
   console.log(oldYear);
   let oldMonth = temp[1].split('월');
   console.log(oldMonth);
   
   let other = 0;
   if(event.target.id == 'calendarBeforeBtn'){
	   other = 2;
   }
   
   let moveDate = new Date(
		   oldYear[0],
		   oldMonth[0] - other,
		   1
   ) 
   setCalendarYearMonth(moveDate);
   setCalendarDate(moveDate);
}


function setTimeView(){
   let timeView = document.getElementById('timeView');
   setInterval(()=>{
	  let curTime = new Date();
      timeView.innerHTML = 
      convertHour(curTime.getHours())+':'+
      makeTwoWords(curTime.getMinutes())+':'+
      makeTwoWords(curTime.getSeconds());
   },1000);
}

function makeTwoWords(num){
   if(num<10) {
      return '0'+num;
   }
   return num;
}
function convertHour(h){
   let str='오전 ';
   if (h > 12){
      h -= 12;
      str='오후 ';
   }
   return str+makeTwoWords(h);
}

function setTimeDateView(curTime){
   let timeDateView = document.getElementById('timeDateView');
   timeDateView.innerHTML = curTime.getFullYear()+'년 ';
   timeDateView.innerHTML += (curTime.getMonth()+1)+'월 ';
   timeDateView.innerHTML += curTime.getDate()+'일 ';
   timeDateView.innerHTML += getDay(curTime.getDay());
}

function getDay(day){
   let dayArr = ['일','월','화','수','목','금','토'];
   return dayArr[day]+'요일';
}

function getYearMonth(curTime){
   return curTime.getFullYear()+'년 '+ (curTime.getMonth()+1)+'월';
}
function setCalendarYearMonth(curTime){
   let calendarYearMonth = document.getElementById('calendarYearMonth')
   calendarYearMonth.innerHTML = getYearMonth(curTime);
}

function setCalendarDate(curTime){
   let calendarDate = document.getElementById('calendarDate');
   
   calendarDate.innerHTML='';
   
   let firstDaylastDate = getCurrentCalendar(
         curTime.getFullYear(),
         curTime.getMonth()
   );
   
   calendarDate.appendChild(createTable(
         firstDaylastDate.firstDay,
         firstDaylastDate.lastDate
      )
   );
}

function createTable(day, endDate){
   let dayArr=['일','월','화','수','목','금','토'];

   let table = document.createElement('table');
   
   //let day = 3; // 수요일
   let dateCnt = 1; // 1 ~ 31 일까지 증가
   //let endDate = 31;
   let maxI = (endDate+day)/7+1;
   
   for(let i=0;i<maxI;i++){
      let tr = document.createElement('tr');
      for(let j=0;j<7;j++){
         let td = document.createElement('td');
         if(i == 0){
            td.innerHTML = dayArr[j];
         } else if(i==1 && j<day){
             td.innerHTML = '';
         } else {
            td.innerHTML = dateCnt++;
         }
         tr.appendChild(td);
         if (dateCnt > endDate){
            break;
         }
      }
      table.appendChild(tr);
   }
   return table;
}

function getCurrentCalendar(year, month){
   return {
      firstDay:new Date(year,month, 1).getDay(),
      lastDate:32 - new Date(year,month,32).getDate()
   }
}

