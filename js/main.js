/* ==========================================================================
   «АвтоПрайм» — общие скрипты: меню, подбор на главной, карточки, анимации,
   модальное окно записи на тест-драйв
   ========================================================================== */

(function () {
  "use strict";

  var params = new URLSearchParams(window.location.search);
  var staticMode = params.has("shot");

  /* --- Мобильное меню ----------------------------------------------------- */

  var burger = document.getElementById("burger");
  var mobileMenu = document.getElementById("mobileMenu");

  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      var opened = mobileMenu.classList.toggle("is-open");
      burger.classList.toggle("is-open", opened);
      burger.setAttribute("aria-expanded", opened ? "true" : "false");
    });

    mobileMenu.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        mobileMenu.classList.remove("is-open");
        burger.classList.remove("is-open");
      }
    });
  }

  /* --- Популярные автомобили на главной ----------------------------------- */

  var popularGrid = document.getElementById("popularGrid");

  if (popularGrid && typeof CARS !== "undefined") {
    var popular = CARS.filter(function (car) {
      return car.popular;
    }).slice(0, 4);
    popularGrid.innerHTML = popular.map(createCarCard).join("");
  }

  /* --- Панель подбора ----------------------------------------------------- */

  var brandSelect = document.getElementById("searchBrand");
  var bodySelect = document.getElementById("searchBody");
  var budgetSelect = document.getElementById("searchBudget");
  var searchForm = document.getElementById("searchForm");

  function fillSelect(select, values, placeholder) {
    if (!select) {
      return;
    }
    var options = [placeholder];
    values.forEach(function (value) {
      options.push(value);
    });
    select.innerHTML = options
      .map(function (value) {
        return '<option value="' + value + '">' + value + "</option>";
      })
      .join("");
  }

  if (typeof CARS !== "undefined") {
    var brands = CARS.map(function (car) {
      return car.brand;
    }).filter(function (value, index, list) {
      return list.indexOf(value) === index;
    });

    fillSelect(brandSelect, brands, "Любая марка");
    fillSelect(bodySelect, BODY_TYPES, "Любой кузов");

    if (budgetSelect) {
      budgetSelect.innerHTML =
        '<option value="">Любой бюджет</option>' +
        '<option value="1600000">до 1,6 млн ₽</option>' +
        '<option value="2300000">до 2,3 млн ₽</option>' +
        '<option value="3000000">до 3 млн ₽</option>' +
        '<option value="4000000">до 4 млн ₽</option>';
    }
  }

  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var query = new URLSearchParams();
      var brand = brandSelect ? brandSelect.value : "";
      var body = bodySelect ? bodySelect.value : "";
      var budget = budgetSelect ? budgetSelect.value : "";

      if (brand && brand !== "Любая марка") {
        query.set("brand", brand);
      }
      if (body && body !== "Любой кузов") {
        query.set("body", body);
      }
      if (budget) {
        query.set("max", budget);
      }

      window.location.href = "catalog.html" + (query.toString() ? "?" + query.toString() : "");
    });
  }

  /* --- Появление секций при прокрутке ------------------------------------ */

  var revealElements = document.querySelectorAll(".reveal");

  if (staticMode) {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
  } else if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }

  /* --- Модальное окно «Запись на тест-драйв» ----------------------------- */

  var modalMarkup =
    '<div class="modal" id="modal">' +
    '<div class="modal__backdrop" data-close></div>' +
    '<div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="modalTitle">' +
    '<button class="modal__close" type="button" data-close aria-label="Закрыть окно">' +
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
    "</button>" +
    '<h2 class="modal__title" id="modalTitle">Запись на тест-драйв</h2>' +
    '<p class="modal__text">Оставьте контакты — менеджер перезвонит в течение 10 минут ' +
    "и подберёт удобное время.</p>" +
    '<form class="modal__form" id="modalForm" novalidate>' +
    '<div class="field"><label for="modalName">Имя</label>' +
    '<input class="input" id="modalName" name="name" type="text" placeholder="Как к вам обращаться" autocomplete="name"></div>' +
    '<div class="field"><label for="modalPhone">Телефон</label>' +
    '<input class="input" id="modalPhone" name="phone" type="tel" placeholder="+7 (___) ___-__-__" autocomplete="tel"></div>' +
    '<div class="field"><label for="modalCar">Автомобиль</label>' +
    '<select class="select" id="modalCar" name="car"></select></div>' +
    '<label class="checkbox"><input type="checkbox" id="modalAgree" checked> ' +
    "Согласен на обработку персональных данных</label>" +
    '<p class="form-status" id="modalStatus"></p>' +
    '<button class="btn btn--primary btn--block" type="submit">Отправить заявку</button>' +
    "</form></div></div>";

  document.body.insertAdjacentHTML("beforeend", modalMarkup);

  var modal = document.getElementById("modal");
  var modalForm = document.getElementById("modalForm");
  var modalStatus = document.getElementById("modalStatus");
  var modalCar = document.getElementById("modalCar");

  if (modalCar && typeof CARS !== "undefined") {
    modalCar.innerHTML =
      '<option value="">Любой автомобиль</option>' +
      CARS.map(function (car) {
        return (
          '<option value="' +
          car.id +
          '">' +
          car.brand +
          " " +
          car.model +
          "</option>"
        );
      }).join("");
  }

  function openModal(carId) {
    if (!modal) {
      return;
    }
    if (carId && modalCar) {
      modalCar.value = carId;
    }
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    var nameInput = document.getElementById("modalName");
    if (nameInput) {
      setTimeout(function () {
        nameInput.focus();
      }, 120);
    }
  }

  function closeModal() {
    if (!modal) {
      return;
    }
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    if (modalStatus) {
      modalStatus.textContent = "";
      modalStatus.className = "form-status";
    }
  }

  function isPhoneValid(value) {
    return value.replace(/\D/g, "").length >= 10;
  }

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-modal]");
    if (trigger) {
      event.preventDefault();
      openModal(trigger.getAttribute("data-car") || "");
      return;
    }
    if (event.target.closest("[data-close]")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  if (modalForm) {
    modalForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = document.getElementById("modalName").value.trim();
      var phone = document.getElementById("modalPhone").value.trim();
      var agree = document.getElementById("modalAgree").checked;

      if (name.length < 2) {
        modalStatus.textContent = "Укажите имя — минимум 2 символа.";
        modalStatus.className = "form-status is-error";
        return;
      }
      if (!isPhoneValid(phone)) {
        modalStatus.textContent = "Введите телефон в формате +7 (978) 000-00-00.";
        modalStatus.className = "form-status is-error";
        return;
      }
      if (!agree) {
        modalStatus.textContent = "Необходимо согласие на обработку данных.";
        modalStatus.className = "form-status is-error";
        return;
      }

      modalStatus.textContent =
        "Спасибо, " + name + "! Заявка принята, менеджер перезвонит в течение 10 минут.";
      modalStatus.className = "form-status is-success";
      modalForm.querySelector("button[type=submit]").disabled = true;
      setTimeout(function () {
        modalForm.reset();
        modalForm.querySelector("button[type=submit]").disabled = false;
        closeModal();
      }, 3500);
    });
  }
})();
