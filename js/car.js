/* ==========================================================================
   «АвтоПрайм» — карточка автомобиля: галерея, вкладки, кредитный калькулятор
   ========================================================================== */

(function () {
  "use strict";

  var params = new URLSearchParams(window.location.search);
  var car = findCarById(params.get("id")) || findCarById("kia-sportage");
  var staticMode = params.has("shot");

  document.title = car.brand + " " + car.model + " — АвтоПрайм";

  /* --- Заполнение основных данных ----------------------------------------- */

  var title = document.getElementById("carTitle");
  var subtitle = document.getElementById("carSub");
  var priceNode = document.getElementById("carPrice");
  var monthNode = document.getElementById("carMonth");
  var badgeNode = document.getElementById("carBadge");
  var testDriveButton = document.getElementById("carTestDrive");

  if (title) {
    title.textContent = car.brand + " " + car.model;
  }
  if (subtitle) {
    subtitle.textContent =
      car.year + " · " + car.body + " · " + car.engine + " · привод " + car.drive;
  }
  if (priceNode) {
    priceNode.textContent = formatPrice(car.price);
  }
  if (monthNode) {
    monthNode.innerHTML = "в кредит <b>" + monthlyLabel(car.price) + "</b> · первый взнос 20\u00A0%";
  }
  if (badgeNode) {
    badgeNode.textContent = car.badge || "В наличии";
  }
  if (testDriveButton) {
    testDriveButton.setAttribute("data-car", car.id);
  }

  document.querySelectorAll("[data-car-name]").forEach(function (node) {
    node.textContent = car.brand + " " + car.model;
  });

  /* --- Галерея ------------------------------------------------------------ */

  var galleryMain = document.getElementById("galleryMain");
  var galleryThumbs = document.getElementById("galleryThumbs");

  var galleryImages = car.gallery && car.gallery.length ? car.gallery : [car.image];

  if (galleryMain) {
    galleryMain.src = galleryImages[0];
    galleryMain.alt = car.brand + " " + car.model + " — вид спереди";
  }

  if (galleryThumbs) {
    galleryThumbs.innerHTML = galleryImages
      .map(function (src, index) {
        return (
          '<button class="gallery__thumb' +
          (index === 0 ? " is-active" : "") +
          '" type="button" data-src="' +
          src +
          '">' +
          '<img src="' +
          src +
          '" alt="' +
          car.brand +
          " " +
          car.model +
          " — кадр " +
          (index + 1) +
          '" loading="lazy">' +
          "</button>"
        );
      })
      .join("");

    galleryThumbs.addEventListener("click", function (event) {
      var button = event.target.closest(".gallery__thumb");
      if (!button || !galleryMain) {
        return;
      }
      galleryThumbs.querySelectorAll(".gallery__thumb").forEach(function (item) {
        item.classList.remove("is-active");
      });
      button.classList.add("is-active");
      galleryMain.src = button.getAttribute("data-src");
    });
  }

  /* --- Ключевые параметры ------------------------------------------------- */

  var specsNode = document.getElementById("carSpecs");

  if (specsNode) {
    var chipIcons = {
      engine: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13h14M7 13V9h10v4M9 9V6M15 9V6M4 17h16"/></svg>',
      power: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13 2-8 12h6l-1 8 8-12h-6z"/></svg>',
      kpp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>',
      drive: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17h18M5 17v3M19 17v3M7 7h4v4H7zM13 7h4v4h-4zM4 11h16"/></svg>',
    };

    specsNode.innerHTML = [
      { icon: chipIcons.engine, label: "Двигатель", value: car.engineValue + " л" },
      { icon: chipIcons.power, label: "Мощность", value: car.power + " л.с." },
      { icon: chipIcons.kpp, label: "Коробка", value: car.kpp },
      { icon: chipIcons.drive, label: "Привод", value: car.drive },
    ]
      .map(function (item) {
        return (
          '<li class="car-specs__item">' +
          item.icon +
          "<div><div class=\"car-specs__label\">" +
          item.label +
          '</div><div class="car-specs__value">' +
          item.value +
          "</div></div></li>"
        );
      })
      .join("");
  }

  /* --- Вкладки ------------------------------------------------------------ */

  var tabsNav = document.getElementById("tabsNav");
  var panels = document.querySelectorAll(".tabs__panel");

  if (tabsNav) {
    tabsNav.addEventListener("click", function (event) {
      var button = event.target.closest(".tabs__btn");
      if (!button) {
        return;
      }
      var target = button.getAttribute("data-tab");

      tabsNav.querySelectorAll(".tabs__btn").forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      panels.forEach(function (panel) {
        panel.classList.toggle("is-active", panel.id === "tab-" + target);
      });
    });
  }

  /* --- Вкладка «Характеристики» ------------------------------------------ */

  var specsPanel = document.getElementById("tab-specs");

  if (specsPanel) {
    var rows = [
      ["Год выпуска", car.year],
      ["Тип кузова", car.body],
      ["Двигатель", car.engine],
      ["Мощность", car.power + " л.с."],
      ["Коробка передач", car.kpp],
      ["Привод", car.drive],
      ["Топливо", car.fuel],
      ["Расход топлива", car.consumption.toString().replace(".", ",") + " л / 100 км"],
      ["Разгон 0–100 км/ч", car.acceleration.toString().replace(".", ",") + " с"],
      ["Объём багажника", car.trunk + " л"],
      ["Цвет", car.color],
      ["Гарантия", car.warranty],
    ];

    specsPanel.innerHTML =
      '<dl class="spec-list">' +
      rows
        .map(function (row) {
          return (
            '<div class="spec-row"><dt>' +
            row[0] +
            "</dt><dd>" +
            row[1] +
            "</dd></div>"
          );
        })
        .join("") +
      "</dl>";
  }

  /* --- Вкладка «Комплектации» ------------------------------------------- */

  var trimsPanel = document.getElementById("tab-trims");

  if (trimsPanel) {
    var trims = [
      ["Базовая", "Кондиционер, мультимедиа 8″, камера заднего вида, подогрев передних сидений", Math.round(car.price * 0.94)],
      ["Комфорт", "Климат-контроль, мультимедиа 10″, парктроники, камера 360°, запуск с кнопки", car.price],
      ["Премиум", "Панорамная крыша, кожаный салон, электрорегулировки, ассистенты ADAS", Math.round(car.price * 1.08)],
    ];

    trimsPanel.innerHTML =
      '<table class="equipment-table"><thead><tr>' +
      "<th>Комплектация</th><th>Оснащение</th><th>Цена</th>" +
      "</tr></thead><tbody>" +
      trims
        .map(function (trim) {
          return (
            "<tr><td>" +
            trim[0] +
            "</td><td>" +
            trim[1] +
            "</td><td>" +
            formatPrice(trim[2]) +
            "</td></tr>"
          );
        })
        .join("") +
      "</tbody></table>";
  }

  /* --- Вкладка «Описание» ------------------------------------------------- */

  var descriptionPanel = document.getElementById("tab-description");

  if (descriptionPanel) {
    descriptionPanel.innerHTML =
      "<h3>Об автомобиле</h3><p>" +
      car.description +
      "</p><h3>Ключевые особенности</h3><ul>" +
      car.features
        .map(function (feature) {
          return "<li>" + feature + "</li>";
        })
        .join("") +
      "</ul><h3>Условия покупки</h3>" +
      "<p>Автомобиль доступен в наличии в салоне «АвтоПрайм» в Симферополе. " +
      "Предусмотрены кредит от 4,9 % годовых, trade-in с оценкой за 15 минут " +
      "и страхование на выгодных условиях. Гарантия — " +
      car.warranty +
      ".</p>";
  }

  /* --- Вкладка «Отзывы» --------------------------------------------------- */

  var reviewsPanel = document.getElementById("tab-reviews");

  if (reviewsPanel && typeof REVIEWS !== "undefined") {
    reviewsPanel.innerHTML =
      '<div class="tab-reviews">' +
      REVIEWS.slice(0, 2)
        .map(function (review) {
          var stars = "";
          for (var i = 0; i < 5; i += 1) {
            stars +=
              '<svg viewBox="0 0 24 24" fill="' +
              (i < review.rating ? "currentColor" : "none") +
              '" stroke="currentColor" stroke-width="1.6"><path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9z"/></svg>';
          }
          return (
            '<article class="review"><div class="review__stars">' +
            stars +
            '</div><p class="review__text">' +
            review.text +
            '</p><div class="review__author"><div class="review__avatar">' +
            review.name.charAt(0) +
            "</div><div><div class=\"review__name\">" +
            review.name +
            '</div><div class="review__city">' +
            review.city +
            "</div></div></div></article>"
          );
        })
        .join("") +
      "</div>";
  }

  /* --- Кредитный калькулятор --------------------------------------------- */

  var costRange = document.getElementById("calcCost");
  var downRange = document.getElementById("calcDown");
  var termRange = document.getElementById("calcTerm");
  var paymentNode = document.getElementById("calcPayment");
  var creditSumNode = document.getElementById("calcCreditSum");
  var downSumNode = document.getElementById("calcDownSum");
  var termValueNode = document.getElementById("calcTermValue");
  var costValueNode = document.getElementById("calcCostValue");
  var downValueNode = document.getElementById("calcDownValue");

  function paintRange(range) {
    if (!range) {
      return;
    }
    var min = parseFloat(range.min);
    var max = parseFloat(range.max);
    var value = parseFloat(range.value);
    var percent = ((value - min) / (max - min)) * 100;
    range.style.background =
      "linear-gradient(90deg, var(--accent) 0%, var(--accent) " +
      percent +
      "%, rgba(255,255,255,0.16) " +
      percent +
      "%, rgba(255,255,255,0.16) 100%)";
  }

  function recalculateCredit() {
    if (!costRange || !downRange || !termRange) {
      return;
    }

    var cost = parseFloat(costRange.value);
    var downPercent = parseFloat(downRange.value);
    var term = parseFloat(termRange.value);
    var downSum = (cost * downPercent) / 100;
    var principal = cost - downSum;
    var monthlyRate = 0.049 / 12;
    var payment =
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));

    if (paymentNode) {
      paymentNode.innerHTML =
        formatNumber(payment) + " <small>₽ / мес</small>";
    }
    if (creditSumNode) {
      creditSumNode.textContent = formatPrice(principal);
    }
    if (downSumNode) {
      downSumNode.textContent = formatPrice(downSum);
    }
    if (costValueNode) {
      costValueNode.textContent = formatPrice(cost);
    }
    if (downValueNode) {
      downValueNode.textContent = downPercent + " %";
    }
    if (termValueNode) {
      termValueNode.textContent = term + " мес.";
    }

    [costRange, downRange, termRange].forEach(paintRange);
  }

  if (costRange) {
    costRange.min = Math.round((car.price * 0.8) / 1000) * 1000;
    costRange.max = Math.round((car.price * 1.2) / 1000) * 1000;
    costRange.step = 10000;
    costRange.value = car.price;

    [costRange, downRange, termRange].forEach(function (range) {
      if (range) {
        range.addEventListener("input", recalculateCredit);
      }
    });

    recalculateCredit();
  }

  /* --- Похожие автомобили ------------------------------------------------- */

  var relatedGrid = document.getElementById("relatedGrid");

  if (relatedGrid) {
    var related = CARS.filter(function (item) {
      return item.id !== car.id && item.body === car.body;
    });

    if (related.length < 3) {
      related = related.concat(
        CARS.filter(function (item) {
          return item.id !== car.id && related.indexOf(item) === -1;
        })
      );
    }

    relatedGrid.innerHTML = related.slice(0, 3).map(createCarCard).join("");
  }
})();
