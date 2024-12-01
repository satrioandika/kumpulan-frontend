// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
	"use strict";

	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	const forms = document.querySelectorAll(".needs-validation");

	// Loop over them and prevent submission
	Array.from(forms).forEach((form) => {
		form.addEventListener(
			"submit",
			(event) => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				} else {
					
					Swal.fire({
						title: "Success!",
						text: "Form has been submitted successfully.",
						icon: "success",
						confirmButtonText: "OK",
					}).then((result) => {
						if (result.isConfirmed) {
							event.preventDefault();
						}
					});
				}

				form.classList.add("was-validated");
			},
			false
		);
	});
})();

async function formDone() {
	const nilai = document.getElementsByClassName("was-validate");
	if (nilai === true) {
		await Swal.fire({
			title: "Good job!",
			text: "You clicked the button!",
			icon: "success",
		});
	}
}

document.getElementById("sweet").addEventListener("click", function () {
	formDone();
});

$(document).ready(function () {
	$("#datepicker").datepicker({
		format: "dd/mm/yyyy",
		language: "id",
	});
});
