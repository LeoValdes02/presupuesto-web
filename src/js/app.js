import "../styles/main.css";

import pricing from "../data/pricing.json";

import { calculateEstimate } from "./calculator.js";
import { readCountriesFromUrl, writeCountriesToUrl } from "./url-state.js";

const countryBreakdown = document.querySelector("#country-breakdown");

const form = document.querySelector("#budget-form");

const countriesContainer = document.querySelector("#countries-container");

const addCountryButton = document.querySelector("#add-country");

const resultSection = document.querySelector("#result-section");

const resultInvestment = document.querySelector("#result-investment");

const resultManagement = document.querySelector("#result-management");

const resultSetup = document.querySelector("#result-setup");

const resultMonthly = document.querySelector("#result-monthly");

const resultFirstMonth = document.querySelector("#result-first-month");

const minimumMessage = document.querySelector("#minimum-message");

let countryCounter = 0;

function formatCurrency(amount) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: pricing.currency,
  }).format(amount);
}

function createCountryRow(country = "", investment = "") {
  countryCounter++;

  const row = document.createElement("fieldset");

  row.dataset.countryRow = "";

  const legend = document.createElement("legend");

  legend.textContent = `País ${countryCounter}`;

  const countryLabel = document.createElement("label");

  const countryInput = document.createElement("input");

  const countryId = `country-${countryCounter}`;

  countryLabel.htmlFor = countryId;
  countryLabel.textContent = "País";

  countryInput.id = countryId;
  countryInput.type = "text";
  countryInput.value = country;
  countryInput.required = true;
  countryInput.dataset.country = "";

  const investmentLabel = document.createElement("label");

  const investmentInput = document.createElement("input");

  const investmentId = `investment-${countryCounter}`;

  investmentLabel.htmlFor = investmentId;
  investmentLabel.textContent = "Inversión mensual";

  investmentInput.id = investmentId;
  investmentInput.type = "number";
  investmentInput.min = "1";
  investmentInput.step = "0.01";
  investmentInput.placeholder = "5000";
  investmentInput.value = investment;
  investmentInput.required = true;
  investmentInput.dataset.investment = "";

  const currencyText = document.createElement("span");

  currencyText.textContent = " € / mes";

  const removeButton = document.createElement("button");

  removeButton.type = "button";
  removeButton.textContent = "Eliminar país";

  removeButton.dataset.removeCountry = "";

  row.append(
    legend,
    countryLabel,
    countryInput,
    investmentLabel,
    investmentInput,
    currencyText,
    removeButton,
  );

  countriesContainer.append(row);

  updateRemoveButtons();
}

function updateRemoveButtons() {
  const rows = countriesContainer.querySelectorAll("[data-country-row]");

  rows.forEach((row) => {
    const removeButton = row.querySelector("[data-remove-country]");

    removeButton.disabled = rows.length === 1;
  });
}

function getCountriesFromForm() {
  const rows = countriesContainer.querySelectorAll("[data-country-row]");

  return Array.from(rows).map((row) => {
    const country = row.querySelector("[data-country]").value.trim();

    const investment = Number(row.querySelector("[data-investment]").value);

    return {
      country,
      investment,
    };
  });
}

function areCountriesValid(countries) {
  return countries.every(
    ({ country, investment }) =>
      country !== "" && Number.isFinite(investment) && investment > 0,
  );
}

function renderCountryBreakdown(countries) {
  countryBreakdown.replaceChildren();

  countries.forEach((country) => {
    const article = document.createElement("article");

    const title = document.createElement("h4");
    title.textContent = country.country;

    const details = document.createElement("dl");

    // Función auxiliar para crear filas de información.
    function addDetail(label, value) {
      const row = document.createElement("div");

      const dt = document.createElement("dt");
      dt.textContent = label;

      const dd = document.createElement("dd");
      dd.textContent = value;

      row.append(dt, dd);
      details.append(row);
    }

    addDetail("Inversión mensual", formatCurrency(country.investment));

    if (country.minimumApplied) {
      addDetail("Gestión por tramos", formatCurrency(country.tieredFee));
    }

    addDetail("Gestión final", formatCurrency(country.managementFee));

    article.append(title, details);

    if (country.minimumApplied) {
      const minimumNotice = document.createElement("p");

      minimumNotice.className = "minimum-notice";

      minimumNotice.textContent = `Mínimo aplicado: ${formatCurrency(country.minimumFee)}`;

      article.append(minimumNotice);
    }

    countryBreakdown.append(article);
  });
}

function renderEstimate(countries) {
  const estimate = calculateEstimate(countries, pricing);

  renderCountryBreakdown(estimate.countries);

  resultInvestment.textContent = formatCurrency(estimate.totalInvestment);

  resultManagement.textContent = formatCurrency(estimate.totalManagementFee);

  resultSetup.textContent = formatCurrency(estimate.setupFee);

  resultMonthly.textContent = formatCurrency(estimate.monthlyTotal);

  resultFirstMonth.textContent = formatCurrency(estimate.firstMonthTotal);

  const countriesWithMinimum = estimate.countries.filter(
    (country) => country.minimumApplied,
  );

  if (countriesWithMinimum.length > 0) {
    const countryNames = countriesWithMinimum
      .map((country) => country.country)
      .join(", ");

    minimumMessage.textContent = `Se aplica el honorario mínimo de ${formatCurrency(
      pricing.minimumFee,
    )} en: ${countryNames}.`;
  } else {
    minimumMessage.textContent =
      "Los honorarios se calculan directamente mediante los tramos.";
  }

  resultSection.hidden = false;
}

function updateEstimate() {
  const countries = getCountriesFromForm();

  if (!areCountriesValid(countries)) {
    resultSection.hidden = true;
    return;
  }

  writeCountriesToUrl(countries);

  renderEstimate(countries);
}

addCountryButton.addEventListener("click", () => {
  createCountryRow();

  resultSection.hidden = true;
});

countriesContainer.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-country]");

  if (!removeButton) {
    return;
  }

  const row = removeButton.closest("[data-country-row]");

  row.remove();

  updateRemoveButtons();

  updateEstimate();
});

countriesContainer.addEventListener("input", () => {
  updateEstimate();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  updateEstimate();
});

const countriesFromUrl = readCountriesFromUrl();

if (countriesFromUrl.length > 0) {
  countriesFromUrl.forEach(({ country, investment }) => {
    createCountryRow(country, investment);
  });

  updateEstimate();
} else {
  createCountryRow("España", "");
}
