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
	const catBirth = jsonParse.birthYmd;
	const replaceBirth = catBirth.replaceAll('-', '');
	console.log('catBirth', catBirth);
	console.log('replaceBirth', replaceBirth);
	$('#s_cattleNo').text(catNum);
	$('#s_cattleAge').text('-');
	$('#s_cattleSancha').text('-');
	$('#s_cattleLevel').text('-');
	$('#s_motherNo').text('-');
	$('#s_gFatherKpn').text(jsonParse.sexNm);
	$('#s_ggFatherNo').text(replaceBirth);
	$('#s_cattle_real').text('-');
	$('#s_removeHorn').text('-');
	$('#s_cattleRemark').text('-');
}

function APIOwnerName(apiData) {
	const jsonParse = apiData.response.body.items.item;
	const ownerName = jsonParse[0].farmerNm;
	console.log('ownerName', ownerName);
	const fixName = ownerName.replace(ownerName[ownerName.length - 2], '*');
	$('#s_cattleOwner').text(fixName);
}

/**
 * ?????????
 */
function spinnerStart() {
	spinner.classList.add('start');
}

function spinnerStop() {
	spinner.classList.remove('start');
}

// ???????????? ????????????
const cattleNoArr = [];

// ???????????? ????????? ????????? ?????????
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

// ????????? ?????? ????????? close
descentClose.addEventListener('click', function () {
	descentWindow.classList.remove('open');
	leftBtn.classList.remove('appear');
	rightBtn.classList.remove('appear');
	countPa = 0;
	cattleNoArr.splice(0);
});

// ??? ?????????
let cattleNoSlice = '';
let countPa = 0;
parents.forEach((pa, idx) => {
	pa.addEventListener('click', function () {
		if (countPa < 1) {
			console.log('??? ?????????---------------------------------------------');
			const cattleNo = pa.children[1].children[2].textContent;
			cattleNoSlice = cattleNo;
			if (!cattleNo.includes(`-`)) {
				cattleNoArr.push(cattleNoSlice);
			} else {
				alert('???????????? ????????????.');
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
						alert('???????????? ????????????.');
						// console.log('????????? cattleNoArr111', cattleNoArr);
						cattleNoArr.pop();
						cattleNoSlice = cattleNoArr[cattleNoArr.length - 1];
						// console.log('????????? cattleNoArr222', cattleNoArr);
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
			// ?????? ??? ?????????
			const cattleNo = pa.children[1].children[2].textContent;
			console.log(
				'?????? ??? ?????????---------------------------------------------'
			);
			console.log('?????? ??? ????????? cattleNo', cattleNo);
			console.log('?????? ??? ????????? cattleNoSlice', cattleNoSlice);
			console.log(
				'?????? ??? ????????? splice index',
				cattleNoArr.lastIndexOf(cattleNoSlice) + 1
			);
			console.log('???????????? cattleNoArr', cattleNoArr);
			console.log('splice cattleNoArr', cattleNoArr);
			if (cattleNo == '' || cattleNo == null || cattleNo == undefined) {
				alert('???????????? ????????????.');
				return;
			}
			if (!cattleNo.includes(`-`)) {
				cattleNoArr.splice(cattleNoArr.lastIndexOf(cattleNoSlice) + 1);
				cattleNoArr.push(cattleNo);
			} else {
				alert('???????????? ????????????.');
				return;
			}
			console.log('?????? ??? ????????? cattleNoArr', cattleNoArr);
			console.log('cattleNoSlice.includes("-")', cattleNo.includes(`-`));
			cattleNoSlice = cattleNo;
			console.log('?????? ??? ????????? cattleNo = cattleNoSlice', cattleNoSlice);
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
						alert('???????????? ????????????.');
						// console.log('??????????????? cattleNoArr111', cattleNoArr);
						cattleNoArr.pop();
						cattleNoSlice = cattleNoArr[cattleNoArr.length - 1];
						// console.log('??????????????? cattleNoArr222', cattleNoArr);
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
					console.log(apiData);
					const jsonParse = apiData.response.body.items.item;
					console.log(jsonParse);
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

// ??????, ?????? ????????? ?????? ???
function ifUndefined() {
	if (cattleNoSlice == undefined) {
		alert('???????????? ????????????.');
		return;
	}
}

const COUNT = 1;
// ?????? ?????????
leftBtn.addEventListener('click', function (e) {
	console.log('??????---------------------------------------------');
	console.log('???????????? cattleNoSlice', cattleNoSlice);
	rightBtn.classList.add('appear');
	cattleNoSlice = cattleNoArr[cattleNoArr.lastIndexOf(cattleNoSlice) - COUNT];
	const indexOf = cattleNoArr.indexOf(cattleNoSlice);
	console.log('?????? cattleNoSlice', cattleNoSlice);
	console.log('?????? cattleNoArr', cattleNoArr);
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

// ?????? ?????????
rightBtn.addEventListener('click', function () {
	leftBtn.classList.add('appear');
	console.log('??????---------------------------------------------');
	console.log('???????????? cattleNoSlice', cattleNoSlice);
	cattleNoSlice = cattleNoArr[cattleNoArr.indexOf(cattleNoSlice) + COUNT];
	console.log('?????? cattleNoSlice', cattleNoSlice);
	console.log('?????? cattleNoArr', cattleNoArr);
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
