const descentInfo = document.querySelectorAll('.descentInfo');
const descentWindow = document.querySelector('#descent-window');
const descentClose = document.querySelector('#descent-close');
const parents = document.querySelectorAll('.parent');
const spinner = document.querySelector('.spinner');
const noClick = document.querySelector('body');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const homoe = document.querySelector('.home');
const only_level_1 = document.querySelector('#only_level_1');

function text(data) {
	$('#s_cattleNo').text(data.cattleNo);
	$('#s_cattleOwner').text(data.cattleOwner);
	$('#s_cattleAge').text(data.cattleAge);
	$('#s_cattleSancha').text(data.cattleSancha);
	$('#s_cattleLevel').text(data.cattleLevel);
	$('#s_motherNo').text(data.cattleMotherNo);
	$('#s_gFatherKpn').text(data.cattleSex);
	$('#s_ggFatherNo').text(data.cattleBirth);
	$('#s_cattle_real').text(data.cattleRealChild);
	$('#s_removeHorn').text(data.cattleRemoveHorn);
	$('#s_cattleRemark').text(data.remark);
	$('#cBreederName').text(data.breeder);
	$('#cBreederAddr').text(data.breederAddr);
	$('#cOwnerName').text(data.ownerName);
	$('#cOwnerAddr').text(data.ownerAddr);
	$('#coldnessWeight').text(data.coldnessWeight);
	$('#crossSection').text(data.crossSection);
	$('#backThickness').text(data.backThickness);
	$('#muscleFat').text(data.muscleFat);
	$('#coldnessWeight_level').text(data.coldnessWeight_level);
	$('#crossSection_level').text(data.crossSection_level);
	$('#backThickness_level').text(data.backThickness_level);
	$('#muscleFat_level').text(data.muscleFat_level);
	$('#father_kpn').text(data.father_kpn);
	$('#father_uniqNumber').text(data.father_uniqNumber);
	$('#grandFather_1_kpn').text(data.grandFather_1_kpn);
	$('#grandFather_1_uniqNumber').text(data.grandFather_1_registNumber);
	$('#grandMother_1_kpn').text(data.grandMother_1_kpn);
	$('#grandMother_1_uniqNumber').text(data.grandMother_1_uniqNumber);
	$('#mother_kpn').text(data.mother_kpn);
	$('#mother_uniqNumber').text(data.mother_uniqNumber);
	$('#grandFather_2_kpn').text(data.grandFather_2_kpn);
	$('#grandFather_2_registNumber').text(data.grandFather_2_uniqNumber);
	$('#grandMother_2_kpn').text(data.grandMother_2_kpn);
	$('#grandMother_2_uniqNumber').text(data.grandMother_2_uniqNumber);
}

window.onload = function () {
	sessionStorage.clear();
};

const sessionIdxArr = [];
let sessionIdx = 0;

function btnActive() {
	// console.log('sessionIdxArr.length', sessionIdxArr.length);
	if (sessionIdx == 1) {
		leftBtn.classList.remove('appear');
		return;
	}
	if (sessionIdxArr.length - 1 > 0) {
		leftBtn.classList.add('appear');
	}
	if (sessionIdxArr.length == sessionIdx) {
		rightBtn.classList.remove('appear');
	}
}

/**
 * 스피너
 */
function spinnerStart() {
	spinner.classList.add('start');
}

function spinnerStop() {
	spinner.classList.remove('start');
}

// 상세정보 클릭시
let count = 0;
descentInfo.forEach((openP, idx) => {
	openP.addEventListener('click', function () {
		// console.log('상세정보 클릭시---------------------------------------------');
		const cattleNo = openP.textContent;
		noClick.classList.add('noClick');
		only_level_1.classList.remove('hidden');
		spinnerStart();
		$.ajax({
			url:
				'http://www.xn--289al3w02jixo.kr/dev/web/getCattleInfo.html?code=' +
				cattleNo,
			success: function (data) {
				// console.log(data);
				text(data);
				spinnerStop();
				descentWindow.classList.add('open');
				noClick.classList.remove('noClick');
				count++;
				sessionStorage.setItem(count, JSON.stringify(data));
				sessionIdxArr.push(count);
				sessionIdx = count;
				btnActive();
				// console.log('상세정보 sessionIdx', sessionIdx);
				// console.log(sessionIdxArr);
				// console.log('상세정보 count', count);
			},
		});
	});
});

// 팝업창 닫기 클릭시 close
descentClose.addEventListener('click', function () {
	descentWindow.classList.remove('open');
	count = 0;
	sessionIdx = 0;
	countPa = 0;
	sessionIdxArr.splice(0);
	sessionStorage.clear();
});

// 부 클릭시
let cattleNoSlice = '';
let countPa = 0;
parents.forEach((pa, idx) => {
	pa.addEventListener('click', function () {
		if (countPa > 0) {
			if (sessionIdxArr.length > sessionIdx) {
				// console.log('IF 부클릭---------------------------------------------');
				// console.log('IF 부클릭 sessionIdx111', sessionIdx);
				for (let i = 1; i < 10; i++) {
					sessionStorage.removeItem(sessionIdx + i);
					sessionIdxArr.splice(sessionIdx + 1);
				}
				count = sessionIdx;
			}
		}
		// console.log('부클릭시---------------------------------------------');
		const cattleNo = pa.children[1].children[2].textContent;
		cattleNoSlice = cattleNo.slice(-9);
		spinnerStart();
		noClick.classList.add('noClick');
		$.ajax({
			url:
				'http://www.xn--289al3w02jixo.kr/dev/web/getCattleInfo.html?code=' +
				cattleNoSlice,
			success: function (data) {
				// console.log(data);
				const jsonData = Object.values(data);
				const setJsonData = new Set(jsonData);
				spinnerStop();
				noClick.classList.remove('noClick');
				if (setJsonData.size < 2) {
					alert('데이터가 없습니다.');
					return;
				}
				only_level_1.classList.add('hidden');
				text(data);
				count++;
				sessionStorage.setItem(count, JSON.stringify(data));
				sessionIdxArr.push(count);
				sessionIdx = count;
				const sessionIdxArrFix = new Set(sessionIdxArr);
				sessionIdxArr.splice(0);
				sessionIdxArrFix.forEach((item) => {
					sessionIdxArr.push(item);
				});
				btnActive();
				// console.log('set sessionIdxArr', sessionIdxArr);
				// console.log('부클릭 sessionIdx', sessionIdx);
				// console.log(sessionIdxArr);
				// console.log('부클릭 count', count);
				// console.log('부클릭 countPa', countPa);
			},
		});
		countPa++;
	});
});

leftBtn.addEventListener('click', function () {
	rightBtn.classList.add('appear');
	// console.log('이전---------------------------------------------');
	// console.log('이전 count', count);
	// console.log('이전 가져오는 sessionIdx', sessionIdx);
	// console.log(
	// 	'이전 배열',
	// 	sessionIdxArr[sessionIdxArr.indexOf(sessionIdx) - 1]
	// );
	const jsonD = JSON.parse(
		sessionStorage.getItem(sessionIdxArr[sessionIdxArr.indexOf(sessionIdx) - 1])
	);
	sessionIdx = sessionIdxArr[sessionIdxArr.indexOf(sessionIdx) - 1];
	btnActive();
	if (sessionIdx == 1) {
		only_level_1.classList.remove('hidden');
	}
	text(jsonD);
	// console.log('이전 sessionIdx', sessionIdx);
});

rightBtn.addEventListener('click', function () {
	// console.log('다음---------------------------------------------');
	// console.log('다음 가져오는 sessionIdx', sessionIdx);
	// console.log(
	// 	'다음 배열',
	// 	sessionIdxArr[sessionIdxArr.indexOf(sessionIdx) + 1]
	// );
	const jsonD = JSON.parse(
		sessionStorage.getItem(sessionIdxArr[sessionIdxArr.indexOf(sessionIdx) + 1])
	);
	sessionIdx = sessionIdxArr[sessionIdxArr.indexOf(sessionIdx) + 1];
	btnActive();
	text(jsonD);
	// console.log('다음 sessionIdx', sessionIdx);
	// console.log(jsonD);
});
