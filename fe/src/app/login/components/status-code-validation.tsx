export type PhoneCountryCode = "bt" | "in";

export type PhoneCountryOption = {
  value: PhoneCountryCode;
  label: string;
  dialCode: string;
  flag: string;
  flagSrc?: string;
  phoneLength: number;
};

export const phoneCountryOptions: PhoneCountryOption[] = [
  {
    value: "bt",
    label: "Bhutan",
    dialCode: "+975",
    flag: "🇧🇹",
    flagSrc: "/bhutan-flag.png",
    phoneLength: 8,
  },
  {
    value: "in",
    label: "India",
    dialCode: "+91",
    flag: "🇮🇳",
    flagSrc: "/indian-flag.png",
    phoneLength: 10,
  },
];

export function getPhoneCountryOption(country: PhoneCountryCode) {
  return phoneCountryOptions.find((option) => option.value === country);
}

export function normalizePhoneNumber(value: string) {
  return value.replace(/\D/g, "");
}

export function limitPhoneNumber(value: string, country: PhoneCountryCode) {
  return normalizePhoneNumber(value).slice(
    0,
    getPhoneCountryOption(country)?.phoneLength,
  );
}

export function validatePhoneNumber(
  country: PhoneCountryCode,
  phoneNumber: string,
) {
  const option = getPhoneCountryOption(country);

  if (!option) {
    return "Select a valid country code.";
  }

  const digitsOnly = normalizePhoneNumber(phoneNumber);

  if (digitsOnly.length !== option.phoneLength) {
    return `${option.label} number should have ${option.phoneLength} digits.`;
  }

  return null;
}
