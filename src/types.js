/**
 * @typedef {Object} WeightEntry
 * @property {number} id - Unique identifier
 * @property {number} Weight - Weight in kilograms
 * @property {string} Date - ISO date string
 * @property {string} Details - Optional notes/details
 * @property {boolean} Exercise - Whether exercise was performed
 */

/**
 * @typedef {Object} DatabaseWeightEntry
 * @property {number} id - Unique identifier
 * @property {number} weight_kg - Weight in kilograms
 * @property {string} recorded_at - ISO timestamp
 * @property {string|null} details - Optional notes/details
 * @property {boolean} exercised - Whether exercise was performed
 */

/**
 * @typedef {Object} AddWeightEntryParams
 * @property {number} weight - Weight in kilograms
 * @property {string} date - ISO date string
 * @property {string} [note] - Optional notes
 * @property {boolean} [exercise] - Whether exercise was performed
 */

/**
 * @typedef {Object} UpdateWeightEntryParams
 * @property {number} id - Entry ID to update
 * @property {number} weight - Weight in kilograms
 * @property {string} date - ISO date string
 * @property {string} [note] - Optional notes
 */

export {};
