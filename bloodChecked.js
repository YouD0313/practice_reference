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

/**
 * 스피너
 */
function spinnerStart() {
	spinner.classList.add('start');
}

function spinnerStop() {
	spinner.classList.remove('start');
}

// 개체번호 배열담기
const cattleNoArr = [];

// 상세보기 클릭시 팝업창 띄우기
descentInfo.forEach((openP, idx) => {
	const cattleNo = openP.textContent;
	openP.addEventListener('click', function () {
		cattleNoArr.push(cattleNo);
		console.log(cattleNoArr);
		noClick.classList.add('noClick');
		only_level_1.classList.remove('hidden');
		spinnerStart();
		$.ajax({
			url:
				'http://www.xn--289al3w02jixo.kr/dev/web/getCattleInfo.html?code=' +
				cattleNo,
			success: function (data) {
				console.log(data);
				text(data);
				spinnerStop();
				descentWindow.classList.add('open');
				noClick.classList.remove('noClick');
			},
		});
	});
});

// 팝업창 닫기 클릭시 close
descentClose.addEventListener('click', function () {
	descentWindow.classList.remove('open');
	cattleNoArr.splice(0);
});

// 부 클릭시
let count = 0;
function parent() {
	console.log('fun count++', count);
	parents.forEach((pa, idx) => {
		pa.addEventListener('click', function () {
			const cattleNo = pa.children[1].children[2].textContent;
			const cattleNoSlice = cattleNo.slice(-9);
			console.log(cattleNo.slice(-9));
			cattleNoArr.push(cattleNoSlice);
			console.log(cattleNoArr);
			spinnerStart();
			noClick.classList.add('noClick');
			$.ajax({
				url:
					'http://www.xn--289al3w02jixo.kr/dev/web/getCattleInfo.html?code=' +
					cattleNoSlice,
				success: function (data) {
					console.log(data);
					spinnerStop();
					noClick.classList.remove('noClick');
					only_level_1.classList.add('hidden');
					text(data);
				},
			});
			count++;
			console.log('if foreach count++', typeof count, count);
		});
	});
}

window.onload = function () {
	if (count < 1) {
		parent();
	} else if (count > 0) {
		return;
	}
};

// 클릭횟수
let countPre = 0;
let otherClick = 0;
let changePreNum = '';

// 이전 클릭시
leftBtn.addEventListener('click', function () {
	console.log('이전---------------------------------------------');
	let preGetCattleNo = 0;
	preGetCattleNo = cattleNoArr[cattleNoArr.length - 2 - countPre];
	console.log('이전 캐틀배열', cattleNoArr);
	console.log('이전 가져오는 캐틀배열', preGetCattleNo);
	console.log('이전 preGetCattleNo', cattleNoArr.indexOf(preGetCattleNo));
	if (preGetCattleNo == undefined) {
		alert('이전 데이터가 없습니다.');
		return;
	} else if (otherClick > 0) {
		preGetCattleNo = cattleNoArr[cattleNoArr.length - 2];
	}
	console.log('이전222 캐틀배열', cattleNoArr);
	console.log('이전222 가져오는 캐틀배열', preGetCattleNo);
	spinnerStart();
	changePreNum = preGetCattleNo;
	console.log('이전 changePreNum', changePreNum);
	noClick.classList.add('noClick');
	$.ajax({
		url:
			'http://www.xn--289al3w02jixo.kr/dev/web/getCattleInfo.html?code=' +
			preGetCattleNo,
		success: function (data) {
			console.log(data);
			spinnerStop();
			noClick.classList.remove('noClick');
			only_level_1.classList.add('hidden');
			text(data);
			if (cattleNoArr.indexOf(preGetCattleNo) == 0) {
				only_level_1.classList.remove('hidden');
				return;
			}
		},
	});
	countPre++;

	// 다른 부 클릭시
	parents.forEach((pa, idx) => {
		pa.addEventListener('click', function () {
			console.log('다른 부 클릭시 count++', typeof count, count);
			const cattleNo = pa.children[1].children[2].textContent;
			// const cattleNoSlice = cattleNo.slice(-9);
			preGetCattleNo = cattleNo.slice(-9);
			cattleNoArr.pop();
			cattleNoArr.pop();
			cattleNoArr.push(preGetCattleNo);
			console.log(cattleNoArr);
			spinnerStart();
			noClick.classList.add('noClick');
			console.log(preGetCattleNo);
			console.log('다른 부 클릭시 배열 총 인덱스', cattleNoArr.length - 1);
			$.ajax({
				url:
					'http://www.xn--289al3w02jixo.kr/dev/web/getCattleInfo.html?code=' +
					preGetCattleNo,
				success: function (data) {
					console.log(data);
					spinnerStop();
					noClick.classList.remove('noClick');
					only_level_1.classList.add('hidden');
					text(data);
				},
			});
			otherClick++;
			console.log('다른 부 클릭시 otherClick', otherClick);
			return preGetCattleNo;
		});
	});
	console.log('다음버튼 클릭시 바닥 배열 총 인덱스', cattleNoArr.length - 1);
});

let countNext = 0;
// 다음 클릭시
rightBtn.addEventListener('click', function (e) {
	console.log('다음---------------------------------------------');
	console.log('다음 changePreNum', changePreNum);
	let nextGetCattleNo = 0;
	let getPreNo = cattleNoArr[cattleNoArr.indexOf(changePreNum) + 1];
	console.log('getPreNo index', cattleNoArr.indexOf(getPreNo) + 1 + countNext);
	if (countNext == 0) {
		nextGetCattleNo = getPreNo;
	} else if (countNext > 0) {
		nextGetCattleNo = cattleNoArr[cattleNoArr.indexOf(getPreNo) + countNext];
	}
	if (nextGetCattleNo == undefined) {
		alert('다음 데이터가 없습니다.');
		return;
	}
	console.log('다음 요소index 옆의 index', cattleNoArr.indexOf(getPreNo) + 1);
	console.log('다음 배열 총 인덱스', cattleNoArr.length - 1);
	console.log('다음 캐틀배열', cattleNoArr);
	console.log('다음 가져오는 캐틀배열', nextGetCattleNo);
	noClick.classList.add('noClick');
	spinnerStart();
	$.ajax({
		url:
			'http://www.xn--289al3w02jixo.kr/dev/web/getCattleInfo.html?code=' +
			nextGetCattleNo,
		success: function (data) {
			console.log(data);
			spinnerStop();
			noClick.classList.remove('noClick');
			only_level_1.classList.add('hidden');
			text(data);
		},
	});
	countNext++;
});
