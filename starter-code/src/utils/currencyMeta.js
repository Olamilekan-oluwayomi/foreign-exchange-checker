export const currencyToCountry = {
  USD: "us",
  EUR: "eu",
  GBP: "gb",
  JPY: "jp",
  CHF: "ch",
  CAD: "ca",
  AUD: "au",
  INR: "in",
  CNY: "cn",
  BDT: "bd",
  NGN: "ng",
  ZAR: "za",
  BRL: "br",
  MXN: "mx",
  SGD: "sg",
  HKD: "hk",
  NOK: "no",
  SEK: "se",
  DKK: "dk",
  NZD: "nz",
  KRW: "kr",
  TRY: "tr",
  AED: "ae",
  SAR: "sa",
  THB: "th",
  IDR: "id",
  MYR: "my",
  PHP: "ph",
  PLN: "pl",
  CZK: "cz",
};

export function getFlagUrl(currencyCode) {
  const country = currencyToCountry[currencyCode];
  if (!country) return "";
  return new URL(`../assets/images/flags/${country}.webp`, import.meta.url)
    .href;
}
