import type { Country } from "./Country";

export type UserCountry = {
  id: number;
  userId: number;
  countryId: number;
  status: string;
  notes: string | null;
  country: Country;
};