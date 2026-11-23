/*
 * DRAFT, not yet wired in: maps Math AA guide subtopic codes (2021 guide,
 * 1.1–5.19) to the app's grouped topic codes in content/math-aa/subject.json.
 * Waiting for review before dev/localResources.ts passes it to buildNotesIndex.
 */
export const MATH_AA_IB_TO_APP: Record<string, string> = {
  // 1 Number and algebra
  '1.1': '1.2', // scientific notation → exponents-logarithms (closest fit; no standard-form topic)
  '1.2': '1.1', '1.3': '1.1', '1.4': '1.1', '1.8': '1.1', // sequences-series
  '1.5': '1.2', '1.7': '1.2', // exponents-logarithms
  '1.6': '1.3', '1.9': '1.3', // binomial-proof
  '1.10': '1.4', '1.11': '1.4', // counting-partial-fractions (HL)
  '1.12': '1.5', '1.13': '1.5', '1.14': '1.5', // complex-numbers (HL)
  '1.15': '1.6', '1.16': '1.6', // proof-systems (HL)
  // 2 Functions
  '2.1': '2.1', '2.2': '2.1', '2.3': '2.1', '2.4': '2.1', '2.5': '2.1', // function-basics
  '2.6': '2.2', '2.7': '2.2', // quadratics
  '2.8': '2.3', '2.9': '2.3', '2.10': '2.3', // rational-exponential (2.10 is general equation solving)
  '2.11': '2.4', // transformations
  '2.12': '2.5', '2.13': '2.5', '2.14': '2.5', '2.15': '2.5', '2.16': '2.5', // further-functions (HL)
  // 3 Geometry and trigonometry
  '3.1': '3.1', // 3d-geometry
  '3.2': '3.2', '3.3': '3.2', // triangle-trig
  '3.4': '3.3', '3.5': '3.3', '3.6': '3.3', '3.7': '3.3', '3.8': '3.3', // circular-functions
  '3.9': '3.3', '3.10': '3.3', '3.11': '3.3', // HL trig into an SL topic: see review notes
  '3.12': '3.4', '3.13': '3.4', '3.14': '3.4', '3.15': '3.4', '3.16': '3.4', '3.17': '3.4', '3.18': '3.4', // vectors (HL)
  // 4 Statistics and probability
  '4.1': '4.1', '4.2': '4.1', '4.3': '4.1', // descriptive-statistics
  '4.4': '4.2', '4.10': '4.2', // regression
  '4.5': '4.3', '4.6': '4.3', '4.11': '4.3', // probability
  '4.7': '4.4', '4.8': '4.4', '4.9': '4.4', '4.12': '4.4', // distributions
  '4.13': '4.5', '4.14': '4.5', // further-probability (HL)
  // 5 Calculus
  '5.1': '5.1', '5.2': '5.1', '5.3': '5.1', '5.4': '5.1', // differentiation-intro
  '5.6': '5.2', '5.7': '5.2', '5.8': '5.2', // differentiation-rules
  '5.5': '5.3', '5.9': '5.3', '5.10': '5.3', '5.11': '5.3', // integration
  '5.12': '5.4', '5.13': '5.4', '5.14': '5.4', '5.15': '5.4', '5.16': '5.4', '5.17': '5.4', // further-calculus (HL)
  '5.18': '5.5', '5.19': '5.5', // differential-equations (HL)
};
