import type { NewBodyMetricsData } from './appDataStorage';

export type BodyMetricsErrors = Partial<Record<keyof NewBodyMetricsData, string>>;

type MetricField = {
  key: keyof NewBodyMetricsData;
  label: string;
  min: number;
  max: number;
  unit: string;
};

export const bodyMeasurementFields: MetricField[] = [
  { key: 'wrists', label: 'Wrists', min: 5, max: 40, unit: 'cm' },
  { key: 'waist', label: 'Waist', min: 40, max: 200, unit: 'cm' },
  { key: 'chest', label: 'Chest', min: 50, max: 220, unit: 'cm' },
  { key: 'rightQuad', label: 'Right quad', min: 20, max: 100, unit: 'cm' },
  { key: 'leftQuad', label: 'Left quad', min: 20, max: 100, unit: 'cm' },
  { key: 'rightCalf', label: 'Right calf', min: 15, max: 80, unit: 'cm' },
  { key: 'leftCalf', label: 'Left calf', min: 15, max: 80, unit: 'cm' },
  { key: 'rightArm', label: 'Right arm', min: 10, max: 80, unit: 'cm' },
  { key: 'leftArm', label: 'Left arm', min: 10, max: 80, unit: 'cm' },
  { key: 'rightForearm', label: 'Right forearm', min: 10, max: 60, unit: 'cm' },
  { key: 'leftForearm', label: 'Left forearm', min: 10, max: 60, unit: 'cm' },
];

const requiredBaseFields: MetricField[] = [
  { key: 'height', label: 'Height', min: 90, max: 250, unit: 'cm' },
  { key: 'weight', label: 'Weight', min: 30, max: 300, unit: 'kg' },
  ...bodyMeasurementFields,
];

const femaleOnlyFields: MetricField[] = [
  { key: 'bust', label: 'Bust', min: 40, max: 220, unit: 'cm' },
  { key: 'bosom', label: 'Bosom', min: 40, max: 220, unit: 'cm' },
];

const hasNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

function validateNumberField(
  errors: BodyMetricsErrors,
  metrics: NewBodyMetricsData,
  field: MetricField
) {
  const value = metrics[field.key];

  if (!hasNumber(value)) {
    errors[field.key] = `${field.label} is required.`;
    return;
  }

  if (value < 0) {
    errors[field.key] = `${field.label} cannot be negative.`;
    return;
  }

  if (value < field.min || value > field.max) {
    errors[field.key] = `${field.label} must be between ${field.min} and ${field.max} ${field.unit}.`;
  }
}

export function validateBodyMetrics(metrics: NewBodyMetricsData): BodyMetricsErrors {
  const errors: BodyMetricsErrors = {};

  if (!metrics.gender) {
    errors.gender = 'Gender is required.';
  }

  if (!metrics.bodyType) {
    errors.bodyType = 'Body type is required.';
  }

  requiredBaseFields.forEach((field) => validateNumberField(errors, metrics, field));

  if (metrics.gender === 'female') {
    femaleOnlyFields.forEach((field) => validateNumberField(errors, metrics, field));
  }

  return errors;
}

export function hasBodyMetricsErrors(errors: BodyMetricsErrors) {
  return Object.keys(errors).length > 0;
}
