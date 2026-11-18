/* ==========================================================================
   «АвтоПрайм» — фильтры, сортировка и отрисовка каталога автомобилей
   ========================================================================== */

(function () {
  "use strict";

  var params = new URLSearchParams(window.location.search);

  var PRICE_MIN = 1000000;
  var PRICE_MAX = 4000000;

  var state = {
    brands: (params.get("brand") || "").split(",").filter(Boolean),
    bodies: (params.get("body") || "").split(",").filter(Boolean),
    kpps: (params.get("kpp") || "").split(",").filter(Boolean),
    drives: (params.get("drive") || "").split(",").filter(Boolean),
    max: parseInt(params.get("max"), 10) || PRICE_MAX,
    sort: params.get("sort") || "popular",
  };

  if (state.max < PRICE_MIN) {
    state.max = PRICE_MIN;
  }
  if (state.max > PRICE_MAX) {
    state.max = PRICE_MAX;
  }

  var brandsList = document.getElementById("filterBrands");
  var bodiesList = document.getElementById("filterBody");
  var kppList = document.getElementById("filterKpp");
  var driveList = document.getElementById("filterDrive");
  var priceRange = document.getElementById("priceRange");
  var priceMaxLabel = document.getElementById("priceMaxLabel");
  var sortSelect = document.getElementById("sortSelect");
  var grid = document.getElementById("catalogGrid");
  var foundLabel = document.getElementById("foundCount");
  var resetButton = document.getElementById("resetFilters");
  var priceLabel = document.getElementById("priceMaxLabel");

  function unique(values) {
    return values.filter(function (value, index, list) {
      return list.indexOf(value) === index;
    });
  }

  function checkboxItem(name, value, checked, count) {
    return (
      '<label class="filters__item">' +
      '<input type="checkbox" name="' +
      name +
      '" value="' +
      value +
      '"' +
      (checked ? " checked" : "") +
      ">" +
      "<span>" +
      value +
      "</span>" +
      '<span class="filters__item-count">' +
      count +
      "</span>" +
      "</label>"
    );
  }

  function renderFilters() {
    var brands = unique(
      CARS.map(function (car) {
        return car.brand;
      })
    );

    brandsList.innerHTML = brands
      .map(function (brand) {
        var count = CARS.filter(function (car) {
          return car.brand === brand;
        }).length;
        return checkboxItem("brand", brand, state.brands.indexOf(brand) !== -1, count);
      })
      .join("");

    bodiesList.innerHTML = BODY_TYPES.map(function (body) {
      var count = CARS.filter(function (car) {
        return car.body === body;
      }).length;
      return checkboxItem("body", body, state.bodies.indexOf(body) !== -1, count);
    }).join("");

    kppList.innerHTML = KPP_TYPES.map(function (kpp) {
      var count = CARS.filter(function (car) {
        return car.kpp === kpp;
      }).length;
      return checkboxItem("kpp", kpp, state.kpps.indexOf(kpp) !== -1, count);
    }).join("");

    driveList.innerHTML = DRIVE_TYPES.map(function (drive) {
      var count = CARS.filter(function (car) {
        return car.drive === drive;
      }).length;
      return checkboxItem("drive", drive, state.drives.indexOf(drive) !== -1, count);
    }).join("");
  }

  function updatePriceUI() {
    if (!priceRange) {
      return;
    }
    priceRange.value = state.max;
    var percent = ((state.max - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
    priceRange.style.background =
      "linear-gradient(90deg, var(--accent) 0%, var(--accent) " +
      percent +
      "%, #e4e7ec " +
      percent +
      "%, #e4e7ec 100%)";
    if (priceLabel) {
      priceLabel.textContent = formatPrice(state.max);
    }
  }

  function matches(car) {
    if (state.brands.length && state.brands.indexOf(car.brand) === -1) {
      return false;
    }
    if (state.bodies.length && state.bodies.indexOf(car.body) === -1) {
      return false;
    }
    if (state.kpps.length && state.kpps.indexOf(car.kpp) === -1) {
      return false;
    }
    if (state.drives.length && state.drives.indexOf(car.drive) === -1) {
      return false;
    }
    return car.price <= state.max;
  }

  function sortCars(list) {
    var sorted = list.slice();

    if (state.sort === "price-asc") {
      sorted.sort(function (a, b) {
        return a.price - b.price;
      });
    } else if (state.sort === "price-desc") {
      sorted.sort(function (a, b) {
        return b.price - a.price;
      });
    } else if (state.sort === "power-desc") {
      sorted.sort(function (a, b) {
        return b.power - a.power;
      });
    } else {
      sorted.sort(function (a, b) {
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      });
    }

    return sorted;
  }

  function render() {
    var filtered = CARS.filter(matches);
    var sorted = sortCars(filtered);

    if (foundLabel) {
      foundLabel.textContent = sorted.length;
    }

    if (!sorted.length) {
      grid.innerHTML =
        '<div class="catalog-empty">' +
        '<div class="catalog-empty__title">Ничего не найдено</div>' +
        "<p>Попробуйте изменить параметры подбора или сбросить фильтры.</p>" +
        "</div>";
      grid.style.gridTemplateColumns = "1fr";
      return;
    }

    grid.style.gridTemplateColumns = "";
    grid.innerHTML = sorted.map(createCarCard).join("");
  }

  function syncUrl() {
    var query = new URLSearchParams();
    if (state.brands.length) {
      query.set("brand", state.brands.join(","));
    }
    if (state.bodies.length) {
      query.set("body", state.bodies.join(","));
    }
    if (state.kpps.length) {
      query.set("kpp", state.kpps.join(","));
    }
    if (state.drives.length) {
      query.set("drive", state.drives.join(","));
    }
    if (state.max < PRICE_MAX) {
      query.set("max", state.max);
    }
    if (state.sort !== "popular") {
      query.set("sort", state.sort);
    }
    var url = window.location.pathname + (query.toString() ? "?" + query.toString() : "");
    window.history.replaceState(null, "", url);
  }

  function apply() {
    updatePriceUI();
    render();
    syncUrl();
  }

  /* --- События ----------------------------------------------------------- */

  function bindCheckboxGroup(container, key) {
    container.addEventListener("change", function (event) {
      if (event.target.type !== "checkbox") {
        return;
      }
      var value = event.target.value;
      var index = state[key].indexOf(value);

      if (event.target.checked && index === -1) {
        state[key].push(value);
      } else if (!event.target.checked && index !== -1) {
        state[key].splice(index, 1);
      }

      apply();
    });
  }

  if (brandsList) {
    bindCheckboxGroup(brandsList, "brands");
  }
  if (bodiesList) {
    bindCheckboxGroup(bodiesList, "bodies");
  }
  if (kppList) {
    bindCheckboxGroup(kppList, "kpps");
  }
  if (driveList) {
    bindCheckboxGroup(driveList, "drives");
  }

  if (priceRange) {
    priceRange.addEventListener("input", function (event) {
      state.max = parseInt(event.target.value, 10);
      updatePriceUI();
      render();
      syncUrl();
    });
  }

  if (sortSelect) {
    sortSelect.value = state.sort;
    sortSelect.addEventListener("change", function (event) {
      state.sort = event.target.value;
      render();
      syncUrl();
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", function () {
      state.brands = [];
      state.bodies = [];
      state.kpps = [];
      state.drives = [];
      state.max = PRICE_MAX;
      state.sort = "popular";
      if (sortSelect) {
        sortSelect.value = "popular";
      }
      renderFilters();
      apply();
    });
  }

  /* На мобильных фильтры свёрнуты по умолчанию */
  var filtersNode = document.getElementById("filters");
  if (filtersNode && window.innerWidth <= 900) {
    filtersNode.removeAttribute("open");
  }

  renderFilters();
  updatePriceUI();
  render();
})();
