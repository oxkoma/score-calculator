function setFeildsToggle(event) {
	input = document.querySelector('input[name="history"]');
	select = document.querySelector('option[value="history"]');

	if(event.target.value == 'nmt') {
		input.removeAttribute('disabled');
		select.setAttribute('disabled', '');
	}
	if(event.target.value == 'zno') {
		input.setAttribute('disabled', '');
		input.value = '';
		select.removeAttribute('disabled');	
	};
}

function printResult(result) {
	let element = document.getElementById('form_calc');
	element.insertAdjacentHTML('beforeEnd',`<div class="answer-text">Ваш конкурсний бал:  ${result}</div>`);
}

function getRate(rate_array) {
	const reg_rate = 1.04; //регіональний коефіцієнт
	const ind_rate = 1.0; //галузевий коефіцієнт

	switch(rate_array.length){
		case 0 :
			return result = 1;
			break;
		case 1 :
			if(rate_array[0] == 'A') return result = ind_rate 
			else return result = reg_rate;
			break;
		case 2 :
			return result = reg_rate * ind_rate;
			break;
	};
}

function retrieveFormValue(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
	//коефіцієнти по предметам
	const rates = {
		'mova': 0.35,
		'math': 0.4,
		'history' : 0.25,
		'biology': 0.5,
		'physics' : 0.5,
		'foreign' : 0.25,
		'literature' : 0.25,
		'geographic' : 0.25,
	};

	const check_rate = formData.getAll('check-k');
	//коефіцієнт по хімії (якщо спеціальність медицина та інше - коеф. 0,35; інакше - 0,5)
	values.speciality == 'med' 
		? rates.chemistry = 0.35 
		: rates.chemistry = 0.5;

	const free_sub = formData.get('free_ch');
	rates[free_sub] ? rate_free = rates[free_sub] : rate_free = 0;
	
	values.test == 'zno' 
		? result = getRate(check_rate) * ((values.mova * rates.mova + values.math * rates.math + values.free * rate_free) / (rates.mova + rates.math + rate_free))
		: result =getRate(check_rate) * ((values.mova * rates.mova + values.math * rates.math + values.history * rates.history + values.free * rate_free) / (rates.mova + rates.math + rates.history + rate_free));

	printResult(result.toFixed(3));
};

const form = document.getElementById('form_calc'); 
form.addEventListener('submit', retrieveFormValue);

document.querySelectorAll("input[name='test']").forEach((input) => {
	input.addEventListener('change', setFeildsToggle);
});
