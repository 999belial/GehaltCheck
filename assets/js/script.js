document.addEventListener("DOMContentLoaded", () => {
  
  const translations = {
    en: {
      hero_title: "Salary Calculator 2026",
      hero_subtitle: "Calculate your net salary",
      label_brutto: "Monthly Gross Salary",
      netto_title: "Your Net Income",
      pro_monat: "per month",
      tax_lohn: "Income Tax",
      card_eingaben: "Inputs",
      label_brutto: "Monthly Gross Salary",
      label_bundesland: "Federal State",
      label_steuerklasse: "Tax Class",
      church_title: "Church Tax",
      church_sub: "Member of a religious community",
      kinder_title: "Children",
      kinder_sub: "Consider child tax allowance",
      btn_berechnen: "Calculate",
      card_ergebnis: "Result",
      placeholder_text:
        'Good day! Please enter your data and click "Calculate"',
      res_brutto_lbl: "Gross Salary",
      res_lohnsteuer_lbl: "Income Tax",
      res_church_lbl: "Church Tax",
      res_rente_lbl: "Pension Insurance",
      res_kranken_lbl: "Health Insurance",
      res_arbeit_lbl: "Unemployment Insurance",
      res_pflege_lbl: "Care Insurance",
      res_netto_lbl: "Your Net Salary",
      res_pro_monat: "per month",
      sk_1: "Class 1 - Single, divorced, widowed",
      sk_2: "Class 2 - Single parent",
      sk_3: "Class 3 - Married (Higher income)",
      sk_4: "Class 4 - Married (Equal income)",
      sk_5: "Class 5 - Married (Lower income)",
      sk_6: "Class 6 - Secondary job / Multiple jobs",
    },
    uk: {
      hero_title: "Калькулятор зарплати 2026",
      hero_subtitle: "Розрахунок чистої зарплати (нетто)",
      label_brutto: "Місячна зарплата брутто",
      netto_title: "Ваша чиста зарплата (нетто)",
      pro_monat: "на місяць",
      tax_lohn: "Подохідний податок",
      card_eingaben: "Вхідні дані",
      label_bundesland: "Федеральна земля",
      label_steuerklasse: "Податковий клас",
      church_title: "Церковний податок",
      church_sub: "Член релігійної громади",
      kinder_title: "Діти",
      kinder_sub: "Враховувати податкову пільгу на дітей",
      btn_berechnen: "Розрахувати",
      card_ergebnis: "Результат",
      placeholder_text:
        'Доброго дня! Введіть свої дані та натисніть "Розрахувати"',
      res_brutto_lbl: "Зарплата брутто",
      res_lohnsteuer_lbl: "Подохідний податок",
      res_church_lbl: "Церковний податок",
      res_rente_lbl: "Пенсійне страхування",
      res_kranken_lbl: "Медичне страхування",
      res_arbeit_lbl: "Страхування на випадок безробіття",
      res_pflege_lbl: "Страхування на випадок догляду",
      res_netto_lbl: "Ваша чиста зарплата (нетто)",
      res_pro_monat: "на місяць",
      sk_1: "Клас 1 - Неодружений/а, розлучений/а, вдівець/вдова",
      sk_2: "Клас 2 - Одинокий батько / мати",
      sk_3: "Клас 3 - Одружений/а (вищий дохід)",
      sk_4: "Клас 4 - Одружений/а (рівний дохід)",
      sk_5: "Клас 5 - Одружений/а (нижчий дохід)",
      sk_6: "Клас 6 - Друга робота / підробіток",
    },
  };

  let currentLang = "de"; 

  
  function changeLanguage(lang) {
    currentLang = lang;

    
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    
    document.querySelectorAll(".btn-lang").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
  }

  
  document.querySelectorAll(".btn-lang").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedLang = e.target.getAttribute("data-lang");
      changeLanguage(selectedLang);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const taxForm = document.getElementById("tax-form");

  
  const placeholderBox = document.getElementById("placeholder-box");
  const resultsBox = document.getElementById("results-box");

  
  const resBrutto = document.getElementById("res-brutto");
  const resLohnsteuer = document.getElementById("res-lohnsteuer");
  const resChurch = document.getElementById("res-church");
  const rowChurch = document.getElementById("row-church");

  const resRente = document.getElementById("res-rente");
  const resKranken = document.getElementById("res-kranken");
  const resArbeit = document.getElementById("res-arbeit");
  const resPflege = document.getElementById("res-pflege");
  const resNetto = document.getElementById("res-netto");

  
  if (!taxForm) return;

  taxForm.addEventListener("submit", (e) => {
    e.preventDefault();

    
    const brutto = parseFloat(document.getElementById("brutto").value) || 0;
    const bundesland = document.getElementById("bundesland").value;
    const steuerklasse = document.getElementById("steuerklasse").value;
    const kirchensteuerAktiv = document.getElementById("kirchensteuer").checked;
    const hatKinder = document.getElementById("kinder").checked;

    if (brutto <= 0) return;

    
    const jahresBrutto = brutto * 12;
    let jahresLohnsteuer = 0;
    let zuVersteuerndesEinkommen = jahresBrutto;

    if (steuerklasse === "3") {
      zuVersteuerndesEinkommen = jahresBrutto * 0.55;
    } else if (steuerklasse === "2") {
      zuVersteuerndesEinkommen = Math.max(0, jahresBrutto - 4260);
    } else if (steuerklasse === "5" || steuerklasse === "6") {
      zuVersteuerndesEinkommen = jahresBrutto * 1.4;
    }

    if (zuVersteuerndesEinkommen <= 11784) {
      jahresLohnsteuer = 0;
    } else if (zuVersteuerndesEinkommen <= 17000) {
      const y = (zuVersteuerndesEinkommen - 11784) / 10000;
      jahresLohnsteuer = (995.21 * y + 1400) * y;
    } else if (zuVersteuerndesEinkommen <= 67000) {
      const z = (zuVersteuerndesEinkommen - 17000) / 10000;
      jahresLohnsteuer = (208.85 * z + 2397) * z + 950;
    } else if (zuVersteuerndesEinkommen <= 277825) {
      jahresLohnsteuer = 0.42 * zuVersteuerndesEinkommen - 10600;
    } else {
      jahresLohnsteuer = 0.45 * zuVersteuerndesEinkommen - 18900;
    }

    const lohnsteuer = Math.max(0, jahresLohnsteuer / 12);

    
    let kirchensteuer = 0;
    if (kirchensteuerAktiv) {
      const kirchensteuerSatz =
        bundesland === "BY" || bundesland === "HB" ? 0.08 : 0.09;
      kirchensteuer = lohnsteuer * kirchensteuerSatz;
      if (rowChurch) rowChurch.style.display = "flex";
    } else {
      if (rowChurch) rowChurch.style.display = "none";
    }

    
    const rentenversicherung = brutto * 0.093;
    const krankenversicherung = brutto * 0.081;
    const arbeitslosenversicherung = brutto * 0.013;

    let pflegeSatz = hatKinder ? 0.023 : 0.029;
    if (bundesland === "SN") {
      pflegeSatz += 0.005;
    }
    const pflegeversicherung = brutto * pflegeSatz;

    const totalAbzuege =
      lohnsteuer +
      kirchensteuer +
      rentenversicherung +
      krankenversicherung +
      arbeitslosenversicherung +
      pflegeversicherung;
    const netto = Math.max(0, brutto - totalAbzuege);

    
    if (resBrutto) resBrutto.textContent = formatCurrency(brutto);
    if (resLohnsteuer)
      resLohnsteuer.textContent = `-${formatCurrency(lohnsteuer)}`;
    if (resChurch) resChurch.textContent = `-${formatCurrency(kirchensteuer)}`;
    if (resRente)
      resRente.textContent = `-${formatCurrency(rentenversicherung)}`;
    if (resKranken)
      resKranken.textContent = `-${formatCurrency(krankenversicherung)}`;
    if (resArbeit)
      resArbeit.textContent = `-${formatCurrency(arbeitslosenversicherung)}`;
    if (resPflege)
      resPflege.textContent = `-${formatCurrency(pflegeversicherung)}`;
    if (resNetto) resNetto.textContent = formatCurrency(netto);

    
    if (placeholderBox) placeholderBox.classList.add("hidden");
    if (resultsBox) resultsBox.classList.remove("hidden");
  });

  function formatCurrency(value) {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  }
});
