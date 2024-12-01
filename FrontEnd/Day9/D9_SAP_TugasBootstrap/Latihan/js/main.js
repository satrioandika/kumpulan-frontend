(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Sidebar Toggler
  $(".sidebar-toggler").click(function () {
    $(".sidebar, .content").toggleClass("open");
    return false;
  });

  // Progress Bar
  $(".pg-bar").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  // Calender
  $("#calender").datetimepicker({
    inline: true,
    format: "L",
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    dots: true,
    loop: true,
    nav: false,
  });

  // Chart Global Color
  Chart.defaults.color = "#6C7293";
  Chart.defaults.borderColor = "#000000";

  // Worldwide Sales Chart
  var ctx1 = $("#student-gpa").get(0).getContext("2d");
  var myChart1 = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["Satrio Andika", "Deni Saputra", "Tono Dika", "Banu Lana", "Bisma Arddi", "Rina Fitriani", "Adi Kurniawan", "Wulan Indah", "Dimas Wahyu", "Maya Putri"],
      datasets: [
        {
          label: "IPK",
          data: [4.0, 3.4, 3.7, 3.1, 3.9, 3.8, 3.2, 3.6, 3.4, 3.0],
          backgroundColor: "rgba(235, 22, 22, .7)",
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

  // Salse & Revenue Chart
  var ctx2 = $("#salse-revenue").get(0).getContext("2d");
  var myChart2 = new Chart(ctx2, {
    type: "line",
    data: {
      labels: ["20168", "2019", "2020", "2021", "2022", "2023", "2024"],
      datasets: [
        {
          label: "Alumni",
          data: [99, 120, 77, 100, 82, 166, 180],
          backgroundColor: "rgba(235, 22, 22, .5)",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

  // Single Line Chart
  var ctx3 = $("#line-chart").get(0).getContext("2d");
  var myChart3 = new Chart(ctx3, {
    type: "line",
    data: {
      labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
      datasets: [
        {
          label: "Salse",
          fill: false,
          backgroundColor: "rgba(235, 22, 22, .7)",
          data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

  // Single Bar Chart
  var ctx4 = $("#bar-chart").get(0).getContext("2d");
  var myChart4 = new Chart(ctx4, {
    type: "bar",
    data: {
      labels: ["Italy", "France", "Spain", "USA", "Argentina"],
      datasets: [
        {
          backgroundColor: ["rgba(235, 22, 22, .7)", "rgba(235, 22, 22, .6)", "rgba(235, 22, 22, .5)", "rgba(235, 22, 22, .4)", "rgba(235, 22, 22, .3)"],
          data: [55, 49, 44, 24, 15],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

  // Pie Chart
  var ctx5 = $("#pie-chart").get(0).getContext("2d");
  var myChart5 = new Chart(ctx5, {
    type: "pie",
    data: {
      labels: ["Italy", "France", "Spain", "USA", "Argentina"],
      datasets: [
        {
          backgroundColor: ["rgba(235, 22, 22, .7)", "rgba(235, 22, 22, .6)", "rgba(235, 22, 22, .5)", "rgba(235, 22, 22, .4)", "rgba(235, 22, 22, .3)"],
          data: [55, 49, 44, 24, 15],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

  // Doughnut Chart
  var ctx6 = $("#doughnut-chart").get(0).getContext("2d");
  var myChart6 = new Chart(ctx6, {
    type: "doughnut",
    data: {
      labels: ["Italy", "France", "Spain", "USA", "Argentina"],
      datasets: [
        {
          backgroundColor: ["rgba(235, 22, 22, .7)", "rgba(235, 22, 22, .6)", "rgba(235, 22, 22, .5)", "rgba(235, 22, 22, .4)", "rgba(235, 22, 22, .3)"],
          data: [55, 49, 44, 24, 15],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
})(jQuery);
