type mappingOptions = {
  emptyStringToNull?: boolean;
  zeroStringToNull?: boolean;
};

export function mapNullStringToNull(
  value: string | undefined,
  options: mappingOptions = {},
): string | null {
  if (options.emptyStringToNull && value === '') {
    return null;
  }

  if (options.zeroStringToNull && value === '0') {
    return null;
  }

  if (value === undefined) {
    return null;
  }

  return value.toUpperCase() === 'NULL' ? null : value;
}
