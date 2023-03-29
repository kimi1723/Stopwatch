const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const historyBtn = document.querySelector('.history');
const stopwatch = document.querySelector('.stopwatch');
const time = document.querySelector('.time');
const timeList = document.querySelector('.time-list');
const infoBtn = document.querySelector('.info');
const modalShadow = document.querySelector('.modal-shadow');
const closeModalBtn = document.querySelector('.close');
const timings = document.querySelector('.timings');
let countTime;
let minutes = 0,
	seconds = 0;

let timesArr = [];
const handleStart = () => {
	clearInterval(countTime);

	countTime = setInterval(() => {
		seconds++;
		stopwatch.textContent = `${minutes}:0${seconds}`;

		if (seconds > 59) {
			seconds = 0;
			minutes++;
			stopwatch.textContent = `${minutes}:0${seconds}`;
		} else if (seconds > 9) {
			stopwatch.textContent = `${minutes}:${seconds}`;
		}
	}, 100);
};

const handlePause = () => {
	clearInterval(countTime);
};

const handleStop = () => {
	time.textContent = `Last lap: ${stopwatch.textContent} `;

	if (stopwatch.textContent !== '0:00') {
		time.style.visibility = 'visible';
		timesArr.push(stopwatch.textContent);
	}
	clearStuff();
};

const handleReset = () => {
	clearStuff();
	time.textContent = '';
	timesArr = [];
};

const clearStuff = () => {
	timeList.textContent = '';
	clearInterval(countTime);
	stopwatch.textContent = '0:00';
	seconds = 0;
	minutes = 0;
};

const showHistory = () => {
	let num = 1;

	timeList.textContent = '';

	const newTime = document.createElement('li');

	timesArr.forEach(time => {
		const newTime = document.createElement('li');
		newTime.innerHTML = `Lap number ${num}: <span>${time} </span>`;
		timeList.append(newTime);
		num++;
	});
};

const showModal = () => {
	console.log(modalShadow.style.display);
	if (modalShadow.style.display !== 'block') {
		modalShadow.style.display = 'block';
	} else {
		modalShadow.style.display = 'none';
	}
	modalShadow.classList.toggle('modal-animation');
};

startBtn.addEventListener('click', handleStart);
pauseBtn.addEventListener('click', handlePause);
stopBtn.addEventListener('click', handleStop);
resetBtn.addEventListener('click', handleReset);
historyBtn.addEventListener('click', showHistory);
infoBtn.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', showModal);
window.addEventListener('click', e => (e.target === modalShadow ? showModal() : false));
