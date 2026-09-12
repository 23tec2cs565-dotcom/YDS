/**
 * Studio-wide constants and dynamic calculations
 */
export const FOUNDING_YEAR = 2018;

export const getYearsOfExperience = (): number => {
  return Math.max(1, new Date().getFullYear() - FOUNDING_YEAR);
};

export const YEARS_OF_EXPERIENCE = getYearsOfExperience();
