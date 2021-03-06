

$(document).on("keypress", 'form', function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        e.preventDefault();
        return false;
    }
});


$('#sid').on('keyup change', () => {
	var raw = $('#sid').val();
	// var content = document.createTextNode($('#sid').val());
	// console.log(content);
	// console.log("whoa whoa stop dude");
	// $('#results').append(content);

	if (raw == "sibaruak") {

		$('#results').html('');

		$('#searchimg').css("display", "none");
		$('#notfoundimg').css("display","none");
		$('#birthdayimg').css("display", "block");
		let el = document.createElement('div');
		el.classList.add("bg-info");
		el.classList.add("text-white");
		el.classList.add("m-2");
		el.classList.add("p-2");
		el.classList.add("container-sm");
		el.classList.add("rounded-lg");
		el.innerHTML = `welcome to the club nyama`;

		$('#results').append(el);

	} else {
		if (raw.length > 2) {
			axios.get(`http://3.86.167.42/nims/${raw}`)
			.then((res) => {
				
				if (res.data.count === 0) {
					
					$('#birthdayimg').css("display","none");
					$('#searchimg').css("display", "none")
					$('#notfoundimg').css("display", "block");
					$('#results').html(res.data.message);

				} else {
					// clear old search results
					$('#results').html('');

					res.data.data.forEach(d => {

						let el = document.createElement('div');
						let basic = document.createElement('div');
						let jurusan = document.createElement('div');

						el.classList.add("el");
						el.classList.add("d-flex");
						// el.classList.add("d-fade");
						// el.classList.add("flex-row");
						el.classList.add("bg-info");
						el.classList.add("text-white");
						el.classList.add("m-2");
						el.classList.add("p-2");
						el.classList.add("container-sm");
						el.classList.add("rounded-lg");
						el.classList.add("justify-content-between");

						basic.classList.add('pl-1');
						jurusan.classList.add('pr-1')


						basic.innerHTML = `${d.nama} ${d.tpb !== 'NULL' ? d.tpb : '' } ${d.s1 !== 'NULL' ? d.s1 : ''} ${d.s2 !== 'NULL' ? d.s2 : ''} ${d.s3 !== 'NULL' ? d.s3 : ''}`
						jurusan.innerHTML = `${d.fakultas} ${d.jurusan}`
					
						el.appendChild(basic);
						el.appendChild(jurusan);

						$('#results').append(el);
					})

					$('#birthdayimg').css("display","none");
					$('#searchimg').css("display", "block")
					$('#notfoundimg').css("display", "none");
				}
			});
		} else {
			$('#results').html("Go ahead...");
		}
	}

});
