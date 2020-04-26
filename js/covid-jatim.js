let fetchDataJatim = async() => {
	let jatimDataStatistik = $("#jatimStatistik");
	let jatimLastUpdate = $("#jatimLastUpdated");
	let dataJatim = "";

	let buildDataJatim = (title,icon,total,color) => {
		let schemaStat = `
						<div class="col-md-4 mb-4">
							<div class="card info-ina bg-${color} w-100">
								<div class="card-body">
									<div class="d-flex justify-content-between flex-wrap">
										<div class="icon">
											<span class="${icon}"></span>
										</div>
										<div class="text-right">
											<h3>${title}</h3>
											<p class="info_ina_total">
												<span class="inaKasus">${total}</span> Orang
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>`;
		dataJatim += schemaStat;
	}
	fetch('https://literasistmj.000webhostapp.com/province/jawa%20timur')
	.then(res => {
		return res.json();
	}).then(res => {
		return res.data[0];
	}).then(data => {
		buildDataJatim("Jumlah Kasus","fa fa-plus",data.kasus_positif,"primary");
		buildDataJatim("Jumlah Meninggal","far fa-sad-tear",data.kasus_meninggal,"danger");
		buildDataJatim("Jumlah Sembuh","far fa-smile-wink",data.kasus_sembuh,"success");

		jatimDataStatistik.html(dataJatim)
	});
}

let generateJatimDatatable = () => {
	let link = "https://literasistmj.000webhostapp.com/jatim";
	let data = "";
	let jatimDataTable = $("#jatimDataTable");
	let appendTemplate = (data) => {
		jatimDataTable.append(`
			<tr>
				<td>${data.zona}</td>
				<td>${data.jumlah_kasus}</td>
				<td>${data.jumlah_odp}</td>
				<td>${data.jumlah_pdp}</td>
				<td>${data.jumlah_positif}</td>
				<td>${data.jumlah_sembuh}</td>
				<td>${data.jumlah_meninggal}</td>
			</tr>
		`);
	}

	fetch(link).then(res => {
		return res.json();
	}).then(res => {
		res.data.forEach( row => {
			appendTemplate(row);
		});
	});
}

fetchDataJatim();
generateJatimDatatable();

