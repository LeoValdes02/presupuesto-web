/**
 * Redondea una cantidad monetaria a 2 decimales.
 *
 * @param {number} amount
 * @returns {number}
 */
function roundMoney(amount) {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

/**
 * Calcula un honorario usando tramos marginales.
 *
 * @param {number} amount
 * @param {Array<{ upTo: number|null, rate: number }>} tiers
 * @returns {number}
 */
export function calculateTieredFee(amount, tiers) {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("La cantidad debe ser un número igual o superior a 0.");
  }

  if (!Array.isArray(tiers) || tiers.length === 0) {
    throw new Error("Debe existir al menos un tramo.");
  }

  let totalFee = 0;
  let previousLimit = 0;

  for (const tier of tiers) {
    const upperLimit = tier.upTo ?? amount;

    const amountInTier = Math.min(amount, upperLimit) - previousLimit;

    if (amountInTier > 0) {
      totalFee += amountInTier * tier.rate;
    }

    if (tier.upTo === null || amount <= upperLimit) {
      break;
    }

    previousLimit = upperLimit;
  }

  return roundMoney(totalFee);
}

/**
 * Calcula el honorario final de gestión para un país.
 *
 * Primero calcula los tramos marginales y después
 * aplica el honorario mínimo configurado.
 *
 * @param {number} investment
 * @param {{
 *   minimumFee: number,
 *   tiers: Array<{ upTo: number|null, rate: number }>
 * }} pricing
 *
 * @returns {{
 *   investment: number,
 *   tieredFee: number,
 *   minimumFee: number,
 *   minimumApplied: boolean,
 *   managementFee: number
 * }}
 */
export function calculateCountryFee(investment, pricing) {
  const tieredFee = calculateTieredFee(investment, pricing.tiers);

  const minimumApplied = tieredFee < pricing.minimumFee;

  const managementFee = Math.max(tieredFee, pricing.minimumFee);

  return {
    investment,
    tieredFee,
    minimumFee: pricing.minimumFee,
    minimumApplied,
    managementFee: roundMoney(managementFee),
  };
}

/**
 * Calcula los honorarios de gestión de varios países.
 *
 * Cada país se calcula independientemente,
 * incluyendo su propio honorario mínimo.
 *
 * @param {Array<{ country: string, investment: number }>} countries
 * @param {{
 *   minimumFee: number,
 *   tiers: Array<{ upTo: number|null, rate: number }>
 * }} pricing
 *
 * @returns {{
 *   countries: Array,
 *   totalInvestment: number,
 *   totalManagementFee: number
 * }}
 */

export function calculateCountriesFee(countries, pricing) {
  if (!Array.isArray(countries) || countries.length === 0) {
    throw new Error("Debe existir al menos un país.");
  }

  const countryResults = countries.map(({ country, investment }) => {
    const calculation = calculateCountryFee(investment, pricing);

    return {
      country,
      ...calculation,
    };
  });

  const totalInvestment = countryResults.reduce(
    (total, country) => total + country.investment,
    0,
  );

  const totalManagementFee = countryResults.reduce(
    (total, country) => total + country.managementFee,
    0,
  );

  return {
    countries: countryResults,
    totalInvestment: roundMoney(totalInvestment),
    totalManagementFee: roundMoney(totalManagementFee),
  };
}

/**
 * Calcula la estimación económica completa.
 *
 * La puesta en marcha se cobra una sola vez
 * sobre el conjunto del proyecto.
 *
 * @param {Array<{ country: string, investment: number }>} countries
 * @param {{
 *   minimumFee: number,
 *   setupFee: number,
 *   tiers: Array<{ upTo: number|null, rate: number }>
 * }} pricing
 *
 * @returns {{
 *   countries: Array,
 *   totalInvestment: number,
 *   totalManagementFee: number,
 *   setupFee: number,
 *   monthlyTotal: number,
 *   firstMonthTotal: number
 * }}
 */
export function calculateEstimate(countries, pricing) {
  const countriesCalculation = calculateCountriesFee(countries, pricing);

  const setupFee = pricing.setupFee;

  const monthlyTotal =
    countriesCalculation.totalInvestment +
    countriesCalculation.totalManagementFee;

  const firstMonthTotal = monthlyTotal + setupFee;

  return {
    countries: countriesCalculation.countries,

    totalInvestment: countriesCalculation.totalInvestment,

    totalManagementFee: countriesCalculation.totalManagementFee,

    setupFee,

    monthlyTotal: roundMoney(monthlyTotal),

    firstMonthTotal: roundMoney(firstMonthTotal),
  };
}
