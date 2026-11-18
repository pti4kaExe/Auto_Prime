/* ==========================================================================
   «АвтоПрайм» — страница «Контакты»: проверка формы обратной связи
   ========================================================================== */

(function () {
  "use strict";

  var form = document.getElementById("contactForm");
  var status = document.getElementById("contactStatus");

  if (!form) {
    return;
  }

  function setStatus(message, type) {
    if (!status) {
      return;
    }
    status.textContent = message;
    status.className = "form-status " + type;
  }

  function isPhoneValid(value) {
    return value.replace(/\D/g, "").length >= 10;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = form.elements.name.value.trim();
    var phone = form.elements.phone.value.trim();
    var message = form.elements.message.value.trim();
    var agree = form.elements.agree.checked;

    if (name.length < 2) {
      setStatus("Укажите имя — минимум 2 символа.", "is-error");
      form.elements.name.focus();
      return;
    }
    if (!isPhoneValid(phone)) {
      setStatus("Введите телефон в формате +7 (978) 000-00-00.", "is-error");
      form.elements.phone.focus();
      return;
    }
    if (message.length < 10) {
      setStatus("Опишите вопрос подробнее — не менее 10 символов.", "is-error");
      form.elements.message.focus();
      return;
    }
    if (!agree) {
      setStatus("Необходимо согласие на обработку персональных данных.", "is-error");
      return;
    }

    setStatus(
      "Спасибо, " + name + "! Сообщение отправлено — мы ответим в течение рабочего дня.",
      "is-success"
    );
    form.reset();
  });

  /* Маска телефона: +7 (978) 123-45-67 */
  var phoneInput = form.elements.phone;

  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      var digits = phoneInput.value.replace(/\D/g, "");

      if (digits.startsWith("8")) {
        digits = "7" + digits.slice(1);
      }
      if (!digits.startsWith("7")) {
        digits = "7" + digits;
      }

      digits = digits.slice(0, 11);

      var result = "+7";
      if (digits.length > 1) {
        result += " (" + digits.slice(1, 4);
      }
      if (digits.length >= 5) {
        result += ") " + digits.slice(4, 7);
      }
      if (digits.length >= 8) {
        result += "-" + digits.slice(7, 9);
      }
      if (digits.length >= 10) {
        result += "-" + digits.slice(9, 11);
      }

      phoneInput.value = result;
    });
  }
})();
