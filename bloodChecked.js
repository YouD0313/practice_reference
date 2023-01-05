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

function APIcattleNum(apiData) {
	const jsonParse = apiData.response.body.items.item;
	const catNum = String(jsonParse.cattleNo);
	$('#s_cattleNo').text(catNum.slice(-9));
	$('#s_cattleAge').text('-');
	$('#s_cattleSancha').text('-');
	$('#s_cattleLevel').text('-');
	$('#s_motherNo').text('-');
	$('#s_gFatherKpn').text(jsonParse.sexNm);
	$('#s_ggFatherNo').text(jsonParse.birthYmd);
	$('#s_cattle_real').text('-');
	$('#s_removeHorn').text('-');
	$('#s_cattleRemark').text('-');
}

function APIOwnerName(apiData) {
	const jsonParse = apiData.response.body.items.item;
	const ownerName = jsonParse[0].farmerNm;
	const fixName = ownerName.replace(ownerName[ownerName.length - 2], '*');
	$('#s_cattleOwner').text(fixName);
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
		spinnerStart();
		noClick.classList.add('noClick');
		// only_level_1.classList.remove('hidden');
		// console.log(cattleNoArr);
		$.ajax({
			url:
				'http://www.xn--289al3w02jixo.kr/dev/web/getCattleInfo.html?code=' +
				cattleNo,
			success: function (data) {
				// console.log(data);
				spinnerStop();
				descentWindow.classList.add('open');
				noClick.classList.remove('noClick');
				text(data);
			},
		});
	});
});

// 팝업창 닫기 클릭시 close
descentClose.addEventListener('click', function () {
	descentWindow.classList.remove('open');
	leftBtn.classList.remove('appear');
	rightBtn.classList.remove('appear');
	countPa = 0;
	cattleNoArr.splice(0);
});

// 부 클릭시
let cattleNoSlice = '';
let countPa = 0;
parents.forEach((pa, idx) => {
	pa.addEventListener('click', function () {
		if (countPa < 1) {
			console.log('부 클릭시---------------------------------------------');
			const cattleNo = pa.children[1].children[2].textContent;
			cattleNoSlice = cattleNo;
			if (!cattleNo.includes(`-`)) {
				cattleNoArr.push(cattleNoSlice);
			} else {
				alert('데이터가 없습니다.');
				return;
			}
			if (cattleNoArr.length > 1) {
				leftBtn.classList.add('appear');
			}
			spinnerStart();
			noClick.classList.add('noClick');
			console.log(cattleNoArr);
			console.log('cattleNoSlice.includes("-")', cattleNoSlice.includes(`-`));
			$.ajax({
				url:
					'http://www.xn--289al3w02jixo.kr/dev/web/getCattleInfo.html?code=' +
					cattleNoSlice,
				success: function (data) {
					console.log(data);
					const jsonData = Object.values(data);
					const setJsonData = new Set(jsonData);
					// console.log('jsonData', jsonData);
					// console.log('setJsonData', setJsonData.size);
					spinnerStop();
					noClick.classList.remove('noClick');
					if (setJsonData.size < 2) {
						alert('데이터가 없습니다.');
						// console.log('부클릭 cattleNoArr111', cattleNoArr);
						cattleNoArr.pop();
						cattleNoSlice = cattleNoArr[cattleNoArr.length - 1];
						// console.log('부클릭 cattleNoArr222', cattleNoArr);
						return;
					}
					// only_level_1.classList.add('hidden');
					text(data);
				},
			});
			$.ajax({
				url:
					'https://cors-anywhere.herokuapp.com/http://data.ekape.or.kr/openapi-data/service/user/mtrace/breeding/cattle?serviceKey=BXMOIXHQ6j6JamY907IfqH3Oc2nqt9by37k4TpVPVpaJpM4L9Tbg2jqdBRMW9VRvguzVRwk70Kt%2Fc9chiKoLlw%3D%3D&cattleNo=410002' +
					+cattleNoSlice,
				dataType: 'json',
				success: function (apiData) {
					APIcattleNum(apiData);
				},
			});
			$.ajax({
				url:
					'https://cors-anywhere.herokuapp.com/http://data.ekape.or.kr/openapi-data/service/user/mtrace/breeding/cattleMove?serviceKey=BXMOIXHQ6j6JamY907IfqH3Oc2nqt9by37k4TpVPVpaJpM4L9Tbg2jqdBRMW9VRvguzVRwk70Kt%2Fc9chiKoLlw%3D%3D&cattleNo=410002' +
					+cattleNoSlice,
				dataType: 'json',
				success: function (apiData) {
					APIOwnerName(apiData);
				},
			});
		} else if (countPa > 0) {
			// 다른 부 클릭시
			const cattleNo = pa.children[1].children[2].textContent;
			console.log(
				'다른 부 클릭시---------------------------------------------'
			);
			console.log('다른 부 클릭시 cattleNo', cattleNo);
			console.log('다른 부 클릭시 cattleNoSlice', cattleNoSlice);
			console.log(
				'다른 부 클릭시 splice index',
				cattleNoArr.lastIndexOf(cattleNoSlice) + 1
			);
			console.log('가져오는 cattleNoArr', cattleNoArr);
			console.log('splice cattleNoArr', cattleNoArr);
			if (cattleNo == '' || cattleNo == null || cattleNo == undefined) {
				alert('데이터가 없습니다.');
				return;
			}
			if (!cattleNo.includes(`-`)) {
				cattleNoArr.splice(cattleNoArr.lastIndexOf(cattleNoSlice) + 1);
				cattleNoArr.push(cattleNo);
			} else {
				alert('데이터가 없습니다.');
				return;
			}
			console.log('다른 부 클릭시 cattleNoArr', cattleNoArr);
			console.log('cattleNoSlice.includes("-")', cattleNo.includes(`-`));
			cattleNoSlice = cattleNo;
			console.log('다른 부 클릭시 cattleNo = cattleNoSlice', cattleNoSlice);
			if (cattleNo == cattleNoArr[cattleNoArr.length - 1]) {
				rightBtn.classList.remove('appear');
				leftBtn.classList.add('appear');
			}
			spinnerStart();
			noClick.classList.add('noClick');
			$.ajax({
				url:
					'http://www.xn--289al3w02jixo.kr/dev/web/getCattleInfo.html?code=' +
					cattleNoSlice,
				success: function (data) {
					console.log(data);
					const jsonData = Object.values(data);
					const setJsonData = new Set(jsonData);
					// console.log('jsonData', jsonData);
					// console.log('setJsonData', setJsonData.size);
					spinnerStop();
					noClick.classList.remove('noClick');
					if (setJsonData.size < 2) {
						alert('데이터가 없습니다.');
						// console.log('다른부클릭 cattleNoArr111', cattleNoArr);
						cattleNoArr.pop();
						cattleNoSlice = cattleNoArr[cattleNoArr.length - 1];
						// console.log('다른부클릭 cattleNoArr222', cattleNoArr);
						return;
					}
					// only_level_1.classList.add('hidden');
					text(data);
				},
			});
			$.ajax({
				url:
					'https://cors-anywhere.herokuapp.com/http://data.ekape.or.kr/openapi-data/service/user/mtrace/breeding/cattle?serviceKey=BXMOIXHQ6j6JamY907IfqH3Oc2nqt9by37k4TpVPVpaJpM4L9Tbg2jqdBRMW9VRvguzVRwk70Kt%2Fc9chiKoLlw%3D%3D&cattleNo=410002' +
					+cattleNoSlice,
				dataType: 'json',
				success: function (apiData) {
					APIcattleNum(apiData);
				},
			});
			$.ajax({
				url:
					'https://cors-anywhere.herokuapp.com/http://data.ekape.or.kr/openapi-data/service/user/mtrace/breeding/cattleMove?serviceKey=BXMOIXHQ6j6JamY907IfqH3Oc2nqt9by37k4TpVPVpaJpM4L9Tbg2jqdBRMW9VRvguzVRwk70Kt%2Fc9chiKoLlw%3D%3D&cattleNo=410002' +
					+cattleNoSlice,
				dataType: 'json',
				success: function (apiData) {
					APIOwnerName(apiData);
				},
			});
		}
		countPa++;
	});
});

// 이전, 다음 데이터 없을 때
function ifUndefined() {
	if (cattleNoSlice == undefined) {
		alert('데이터가 없습니다.');
		return;
	}
}

const COUNT = 1;
// 이전 클릭시
leftBtn.addEventListener('click', function (e) {
	console.log('이전---------------------------------------------');
	console.log('가져오는 cattleNoSlice', cattleNoSlice);
	rightBtn.classList.add('appear');
	cattleNoSlice = cattleNoArr[cattleNoArr.lastIndexOf(cattleNoSlice) - COUNT];
	const indexOf = cattleNoArr.indexOf(cattleNoSlice);
	console.log('이전 cattleNoSlice', cattleNoSlice);
	console.log('이전 cattleNoArr', cattleNoArr);
	spinnerStart();
	noClick.classList.add('noClick');
	$.ajax({
		url:
			'http://www.xn--289al3w02jixo.kr/dev/web/getCattleInfo.html?code=' +
			cattleNoSlice,
		success: function (data) {
			// console.log(data);
			spinnerStop();
			noClick.classList.remove('noClick');
			// only_level_1.classList.add('hidden');
			text(data);
			// if (indexOf == 0) {
			//    only_level_1.classList.remove('hidden');
			// }
		},
	});
	$.ajax({
		url:
			'https://cors-anywhere.herokuapp.com/http://data.ekape.or.kr/openapi-data/service/user/mtrace/breeding/cattle?serviceKey=BXMOIXHQ6j6JamY907IfqH3Oc2nqt9by37k4TpVPVpaJpM4L9Tbg2jqdBRMW9VRvguzVRwk70Kt%2Fc9chiKoLlw%3D%3D&cattleNo=410002' +
			+cattleNoSlice,
		dataType: 'json',
		success: function (apiData) {
			APIcattleNum(apiData);
		},
	});
	$.ajax({
		url:
			'https://cors-anywhere.herokuapp.com/http://data.ekape.or.kr/openapi-data/service/user/mtrace/breeding/cattleMove?serviceKey=BXMOIXHQ6j6JamY907IfqH3Oc2nqt9by37k4TpVPVpaJpM4L9Tbg2jqdBRMW9VRvguzVRwk70Kt%2Fc9chiKoLlw%3D%3D&cattleNo=410002' +
			+cattleNoSlice,
		dataType: 'json',
		success: function (apiData) {
			APIOwnerName(apiData);
		},
	});
	if (cattleNoSlice == cattleNoArr[0]) {
		leftBtn.classList.remove('appear');
	}
});

// 다음 클릭시
rightBtn.addEventListener('click', function () {
	leftBtn.classList.add('appear');
	console.log('다음---------------------------------------------');
	console.log('가져오는 cattleNoSlice', cattleNoSlice);
	cattleNoSlice = cattleNoArr[cattleNoArr.indexOf(cattleNoSlice) + COUNT];
	console.log('다음 cattleNoSlice', cattleNoSlice);
	console.log('다음 cattleNoArr', cattleNoArr);
	spinnerStart();
	noClick.classList.add('noClick');
	$.ajax({
		url:
			'http://www.xn--289al3w02jixo.kr/dev/web/getCattleInfo.html?code=' +
			cattleNoSlice,
		success: function (data) {
			// console.log(data);
			spinnerStop();
			noClick.classList.remove('noClick');
			// only_level_1.classList.add('hidden');
			text(data);
		},
	});
	$.ajax({
		url:
			'https://cors-anywhere.herokuapp.com/http://data.ekape.or.kr/openapi-data/service/user/mtrace/breeding/cattle?serviceKey=BXMOIXHQ6j6JamY907IfqH3Oc2nqt9by37k4TpVPVpaJpM4L9Tbg2jqdBRMW9VRvguzVRwk70Kt%2Fc9chiKoLlw%3D%3D&cattleNo=410002' +
			+cattleNoSlice,
		dataType: 'json',
		success: function (apiData) {
			APIcattleNum(apiData);
		},
	});
	$.ajax({
		url:
			'https://cors-anywhere.herokuapp.com/http://data.ekape.or.kr/openapi-data/service/user/mtrace/breeding/cattleMove?serviceKey=BXMOIXHQ6j6JamY907IfqH3Oc2nqt9by37k4TpVPVpaJpM4L9Tbg2jqdBRMW9VRvguzVRwk70Kt%2Fc9chiKoLlw%3D%3D&cattleNo=410002' +
			+cattleNoSlice,
		dataType: 'json',
		success: function (apiData) {
			APIOwnerName(apiData);
		},
	});
	if (cattleNoSlice == cattleNoArr[cattleNoArr.length - 1]) {
		rightBtn.classList.remove('appear');
	}
});
