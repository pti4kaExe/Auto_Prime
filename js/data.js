/* ==========================================================================
   «АвтоПрайм» — данные автопарка, отзывы и общие функции
   ========================================================================== */

const CARS = [
  {
    id: "lada-vesta",
    brand: "LADA",
    model: "Vesta",
    body: "седан",
    year: 2026,
    price: 1549000,
    engine: "1.8 л / 122 л.с.",
    engineValue: "1.8",
    power: 122,
    kpp: "вариатор",
    drive: "передний",
    fuel: "бензин",
    consumption: 7.2,
    acceleration: 11.3,
    trunk: 480,
    color: "Коричневый металлик",
    warranty: "3 года / 100 000 км",
    badge: "Хит",
    popular: true,
    image: "img/cars/lada-vesta.webp",
    description:
      "Практичный седан для города и трассы: экономичный двигатель 1.8, вместительный багажник и современные системы безопасности. Одна из самых востребованных моделей салона — доступное обслуживание и широкий выбор комплектаций.",
    features: [
      "Вариатор и богатая комплектация Enjoy",
      "Мультимедиа с камерой заднего вида",
      "Расход топлива от 7,2 л на 100 км",
      "Гарантия 3 года или 100 000 км",
    ],
  },
  {
    id: "niva-legend",
    brand: "LADA",
    model: "Niva Legend",
    body: "внедорожник",
    year: 2026,
    price: 1059000,
    engine: "1.7 л / 83 л.с.",
    engineValue: "1.7",
    power: 83,
    kpp: "механика",
    drive: "полный",
    fuel: "бензин",
    consumption: 9.8,
    acceleration: 17.0,
    trunk: 320,
    color: "Серый металлик",
    warranty: "3 года / 100 000 км",
    badge: "",
    popular: false,
    image: "img/cars/niva-legend.webp",
    description:
      "Легендарный внедорожник с постоянным полным приводом и блокировкой дифференциала. Честная механика, высокий клиренс и ремонтопригодность делают его незаменимым за городом.",
    features: [
      "Постоянный полный привод",
      "Клиренс 205 мм и стальная защита",
      "Кондиционер и подогрев сидений",
      "Самый доступный внедорожник салона",
    ],
  },
  {
    id: "haval-jolion",
    brand: "Haval",
    model: "Jolion",
    body: "кроссовер",
    year: 2026,
    price: 2299000,
    engine: "1.5T / 143 л.с.",
    engineValue: "1.5",
    power: 143,
    kpp: "робот",
    drive: "передний",
    fuel: "бензин",
    consumption: 8.1,
    acceleration: 10.6,
    trunk: 337,
    color: "Белый",
    warranty: "5 лет / 150 000 км",
    badge: "Хит",
    popular: true,
    image: "img/cars/haval-jolion.webp",
    description:
      "Компактный кроссовер с турбомотором 1.5T и 7-ступенчатым роботом. Большой экран мультимедиа, панорамная крыша и комплект ассистентов водителя — в базовой комплектации.",
    features: [
      "Турбомотор 1.5T и 7DCT",
      "Панорамная крыша и цифровая приборная панель",
      "Комплекс ADAS: контроль полосы и слепых зон",
      "Гарантия 5 лет или 150 000 км",
    ],
  },
  {
    id: "chery-tiggo-7",
    brand: "Chery",
    model: "Tiggo 7 Pro",
    body: "кроссовер",
    year: 2026,
    price: 2749000,
    engine: "1.5T / 147 л.с.",
    engineValue: "1.5",
    power: 147,
    kpp: "вариатор",
    drive: "передний",
    fuel: "бензин",
    consumption: 8.4,
    acceleration: 10.9,
    trunk: 475,
    color: "Белый перламутр",
    warranty: "5 лет / 150 000 км",
    badge: "Скидка",
    popular: true,
    image: "img/cars/chery-tiggo-7.webp",
    description:
      "Семейный кроссовер с просторным салоном и багажником 475 л. Два 12,3-дюймовых экрана, беспроводная зарядка и полный набор электронных помощников.",
    features: [
      "Багажник 475 л и просторный второй ряд",
      "Два экрана 12,3 дюйма",
      "Выгода до 150 000 ₽ по трейд-ин",
      "Гарантия 5 лет или 150 000 км",
    ],
  },
  {
    id: "geely-coolray",
    brand: "Geely",
    model: "Coolray",
    body: "кроссовер",
    year: 2026,
    price: 2399000,
    engine: "1.5T / 177 л.с.",
    engineValue: "1.5",
    power: 177,
    kpp: "робот",
    drive: "передний",
    fuel: "бензин",
    consumption: 7.6,
    acceleration: 7.9,
    trunk: 400,
    color: "Красный",
    warranty: "5 лет / 150 000 км",
    badge: "Новинка",
    popular: true,
    image: "img/cars/geely-coolray.webp",
    description:
      "Динамичный кроссовер с турбомотором 1.5T на 177 л.с. и 7-ступенчатым роботом. Разгон до 100 км/ч за 7,9 секунды, спортивные настройки шасси и яркий дизайн.",
    features: [
      "Разгон 0–100 км/ч за 7,9 с",
      "Спортивные настройки шасси",
      "Медиасистема с 12,3-дюймовым экраном",
      "Гарантия 5 лет или 150 000 км",
    ],
  },
  {
    id: "hyundai-solaris",
    brand: "Hyundai",
    model: "Solaris",
    body: "седан",
    year: 2026,
    price: 1899000,
    engine: "1.6 л / 123 л.с.",
    engineValue: "1.6",
    power: 123,
    kpp: "автомат",
    drive: "передний",
    fuel: "бензин",
    consumption: 7.0,
    acceleration: 10.3,
    trunk: 480,
    color: "Серый металлик",
    warranty: "3 года / 100 000 км",
    badge: "",
    popular: false,
    image: "img/cars/hyundai-solaris.webp",
    description:
      "Проверенный городской седан с классическим автоматом и экономичным двигателем 1.6. Удобен для ежедневных поездок, неприхотлив в обслуживании и хорошо держит стоимость.",
    features: [
      "Классический 6-ступенчатый автомат",
      "Расход топлива от 7,0 л на 100 км",
      "Камера заднего вида и подогрев сидений",
      "Низкая стоимость владения",
    ],
  },
  {
    id: "kia-sportage",
    brand: "Kia",
    model: "Sportage",
    body: "кроссовер",
    year: 2026,
    price: 3299000,
    engine: "2.0 л / 150 л.с.",
    engineValue: "2.0",
    power: 150,
    kpp: "автомат",
    drive: "полный",
    fuel: "бензин",
    consumption: 8.2,
    acceleration: 10.4,
    trunk: 587,
    color: "Тёмно-серый металлик",
    warranty: "5 лет / 150 000 км",
    badge: "Хит",
    popular: true,
    image: "img/cars/kia-sportage.webp",
    gallery: [
      "img/cars/kia-sportage.webp",
      "img/gallery/sportage-front.webp",
      "img/gallery/sportage-side.webp",
      "img/gallery/sportage-detail.webp",
    ],
    description:
      "Кроссовер пятого поколения с полным приводом и классическим автоматом. Просторный салон, большой багажник 587 л и богатый набор электронных ассистентов делают его универсальным выбором для семьи.",
    features: [
      "Полный привод и 6-ступенчатый автомат",
      "Багажник 587 л и электропривод двери",
      "Цифровая панель приборов и подогрев всех сидений",
      "Гарантия 5 лет или 150 000 км",
    ],
  },
  {
    id: "toyota-camry",
    brand: "Toyota",
    model: "Camry",
    body: "седан",
    year: 2026,
    price: 3799000,
    engine: "2.5 л / 200 л.с.",
    engineValue: "2.5",
    power: 200,
    kpp: "автомат",
    drive: "передний",
    fuel: "бензин",
    consumption: 7.8,
    acceleration: 9.2,
    trunk: 493,
    color: "Серебристый металлик",
    warranty: "3 года / 100 000 км",
    badge: "Премиум",
    popular: false,
    image: "img/cars/toyota-camry.webp",
    description:
      "Бизнес-седан с атмосферным двигателем 2.5 и классическим автоматом. Акустический комфорт, электрорегулировки кресел с памятью и высокий уровень пассивной безопасности.",
    features: [
      "Атмосферный двигатель 2.5 л / 200 л.с.",
      "Электрорегулировки сидений с памятью",
      "Шумоизоляция и адаптивный круиз-контроль",
      "Высокая остаточная стоимость",
    ],
  },
];

const REVIEWS = [
  {
    name: "Алексей Морозов",
    city: "Симферополь",
    rating: 5,
    text: "Выбирал семейный кроссовер, консультант помог сравнить три модели и честно рассказал про комплектации. Оформили кредит за один визит, машину забрал через два дня. Отдельное спасибо за прозрачный расчёт платежа — никаких скрытых доплат.",
  },
  {
    name: "Марина Гладкова",
    city: "Феодосия",
    rating: 5,
    text: "Сдала старую машину по трейд-ин: оценили за полчаса и дали больше, чем в двух других салонах. Новый автомобиль подготовили к выдаче, всё показали и настроили. Очень удобно, что каталог с фильтрами есть на сайте.",
  },
  {
    name: "Денис Кравченко",
    city: "Севастополь",
    rating: 4,
    text: "Записался на тест-драйв через сайт, перезвонили в течение десяти минут. Понравился подход: не давили с допуслугами, дали спокойно сравнить две модели. Единственный минус — в выходные много посетителей, пришлось немного подождать.",
  },
];

const BODY_TYPES = ["седан", "кроссовер", "внедорожник"];
const KPP_TYPES = ["автомат", "вариатор", "робот", "механика"];
const DRIVE_TYPES = ["передний", "полный"];

/* --- Форматирование ------------------------------------------------------- */

function formatNumber(value) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(value));
}

function formatPrice(value) {
  return formatNumber(value) + " ₽";
}

/* Ежемесячный платёж: 20 % взнос, 4,9 % годовых, 72 месяца. */
const CREDIT_RATE = 0.049;
const CREDIT_TERM = 72;
const CREDIT_DOWN = 0.2;

function creditMonthly(price) {
  const principal = price * (1 - CREDIT_DOWN);
  const rate = CREDIT_RATE / 12;
  const monthly =
    (principal * rate) / (1 - Math.pow(1 + rate, -CREDIT_TERM));
  return Math.round(monthly / 100) * 100;
}

function monthlyLabel(price) {
  return "от " + formatPrice(creditMonthly(price)) + "/мес";
}

/* --- Общие функции отрисовки --------------------------------------------- */

const ARROW_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
  'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  '<path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const BADGE_CLASSES = {
  Хит: "badge--hit",
  Новинка: "badge--new",
  Скидка: "badge--sale",
  Премиум: "badge--premium",
};

function badgeMarkup(car) {
  if (!car.badge) {
    return "";
  }
  const modifier = BADGE_CLASSES[car.badge] || "";
  return '<span class="badge ' + modifier + '">' + car.badge + "</span>";
}

function createCarCard(car) {
  const badge = badgeMarkup(car);
  return (
    '<article class="car-card">' +
    '<a class="car-card__media" href="car.html?id=' +
    car.id +
    '">' +
    badge +
    '<img src="' +
    car.image +
    '" alt="' +
    car.brand +
    " " +
    car.model +
    '" loading="lazy" width="900" height="563">' +
    "</a>" +
    '<div class="car-card__body">' +
    '<h3 class="car-card__title">' +
    car.brand +
    " " +
    car.model +
    "</h3>" +
    '<div class="car-card__meta">' +
    "<span>" +
    car.year +
    "</span><span>" +
    car.engineValue +
    " л</span><span>" +
    car.power +
    " л.с.</span><span>" +
    car.kpp +
    "</span>" +
    "</div>" +
    '<div class="car-card__foot">' +
    "<div>" +
    '<div class="car-card__price">' +
    formatPrice(car.price) +
    "</div>" +
    '<span class="car-card__month">' +
    monthlyLabel(car.price) +
    "</span>" +
    "</div>" +
    '<a class="car-card__link" href="car.html?id=' +
    car.id +
    '" aria-label="Подробнее о ' +
    car.brand +
    " " +
    car.model +
    '">' +
    ARROW_ICON +
    "</a>" +
    "</div>" +
    "</div>" +
    "</article>"
  );
}

function findCarById(id) {
  return CARS.find(function (car) {
    return car.id === id;
  });
}
