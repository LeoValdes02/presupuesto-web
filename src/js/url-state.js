/**
 * Lee los países y sus inversiones desde la URL.
 *
 * @returns {Array<{ country: string, investment: number }>}
 */
export function readCountriesFromUrl() {
  const params = new URLSearchParams(window.location.search);

  const countryNames = params.getAll("country");

  const investments = params.getAll("investment");

  if (countryNames.length === 0 || countryNames.length !== investments.length) {
    return [];
  }

  const countries = countryNames.map((country, index) => {
    return {
      country: country.trim(),
      investment: Number(investments[index]),
    };
  });

  const hasInvalidCountry = countries.some(
    ({ country, investment }) =>
      country === "" || !Number.isFinite(investment) || investment <= 0,
  );

  if (hasInvalidCountry) {
    return [];
  }

  return countries;
}

/**
 * Escribe una configuración válida de países
 * en la URL sin recargar la página.
 *
 * @param {Array<{ country: string, investment: number }>} countries
 */
export function writeCountriesToUrl(countries) {
  const params = new URLSearchParams();

  countries.forEach(({ country, investment }) => {
    params.append("country", country);

    params.append("investment", String(investment));
  });

  const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;

  window.history.replaceState(null, "", newUrl);
}
