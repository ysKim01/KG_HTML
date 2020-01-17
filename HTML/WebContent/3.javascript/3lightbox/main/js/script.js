function main(){
	let thumbImg = document.getElementsByClassName('thumb');
	for(let i=0;i<thumbImg.length;i++){
		console.log('thumbImgLength : ' + thumbImg.length);
		thumbImg[i].addEventListener('click', LightBoxOpen);
	}
	let btnClose = document.querySelector('.btnClose');
	btnClose.addEventListener('click', LightBoxClose);
	let indicator = document.querySelector('indicator');
	for(let i=0;i<indicator.children.length;i++){
		console.log('indicatorLength : ' + indicator.length);
		indicator.children[i].addEventListener('click', IndicatorClicked);
	}
}
function imgChange(event){
	let img = getImage();
	initImage(img);
	img[event.target.id-1].setAttribute('class','active');
	
	setCarInfo(event.target.id-1);
}
function LightBoxOpen(event){
	imgChange(event);
	
	console.log(event.target);
	let lightBox = document.querySelector('#lightBox');
	let block = document.querySelector('#block');
	
	lightBox.setAttribute('class','active');
	block.setAttribute('class', 'active');
}
function LightBoxClose(){
	let lightBox = document.querySelector('#lightBox');
	let block = document.querySelector('#block');
	
	lightBox.removeAttribute('class');
	block.removeAttribute('class');
}

function initImage(img){
	for(let i=0;i<img.length;i++){
		img[i].removeAttribute('class');
	}
}
function getImage(){
	let figure = document.querySelector('figure');
	return figure.children;
}
function setCarInfo(carNumber){
	let carNameArr = ['머큐리 NSX GT3', '포르쉐 911 GT2 RS 클럽에디션', '람보르기니 SC18 콘셉트'];
	let carDataArr = [
		['GT3','3501cc','정보없음','정보없음', '465,000유로'],
		['3.8가솔린','3800cc','700hp','11.81/100km', '정보없음'],
		['SC18','6498cc','770hp','정보없음', '정보없음']
	];
	let carName = document.querySelector('#carName');
	let modelName = document.querySelector('#modelName');
	let displacement = document.querySelector('#displacement');
	let maxOutput = document.querySelector('#maxOutput');
	let milege = document.querySelector('#milege');
	let price = document.querySelector('#price');
	
	carName.innerHTML = carNameArr[carNumber];
	modelName.innerHTML = carDataArr[carNumber][0];
	displacement.innerHTML = carDataArr[carNumber][1];
	maxOutput.innerHTML = carDataArr[carNumber][2];
	milege.innerHTML = carDataArr[carNumber][3];
	price.innerHTML = carDataArr[carNumber][4];
}

function IndicatorClicked(event){
	let img = getImage();
	initImage(img);
	console.log(event.target.id);
	img[event.target.id-1].setAttribute('class','active');
	
	setCarInfo(event.target.id-1);
}





