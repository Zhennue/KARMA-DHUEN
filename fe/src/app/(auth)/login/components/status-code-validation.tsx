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

/* -----------------------------
   GET COUNTRY CONFIG
------------------------------ */
export function getPhoneCountryOption(country: PhoneCountryCode) {
  return phoneCountryOptions.find((option) => option.value === country);
}

/* -----------------------------
   NORMALIZE (FOR DATABASE)
   "17 45 80 94" -> "17458094"
------------------------------ */
export function normalizePhoneNumber(value: string) {
  return value.replace(/\D/g, "");
}

/* -----------------------------
   FORMAT (FOR UI DISPLAY ONLY)
------------------------------ */
export function limitPhoneNumber(value: string, country: PhoneCountryCode) {
  const digits = normalizePhoneNumber(value);

  // Bhutan -> 17 45 80 94
  if (country === "bt") {
    return digits
      .slice(0, 8)
      .replace(/(\d{2})(?=\d)/g, "$1 ")
      .trim();
  }

  // India -> 98765 43210
  return digits
    .slice(0, 10)
    .replace(/(\d{5})(\d+)/, "$1 $2")
    .trim();
}

/* -----------------------------
   VALIDATION
------------------------------ */
export function validatePhoneNumber(
  country: PhoneCountryCode,
  phoneNumber: string,
) {
  const option = getPhoneCountryOption(country);

  if (!option) {
    return "Select a valid country code.";
  }

  const digitsOnly = normalizePhoneNumber(phoneNumber);

  // Length validation
  if (digitsOnly.length !== option.phoneLength) {
    return `${option.label} number should have ${option.phoneLength} digits.`;
  }

  // Bhutan rules
  if (country === "bt") {
    if (!digitsOnly.startsWith("17") && !digitsOnly.startsWith("77")) {
      return "Bhutan number should start with 17 or 77.";
    }
  }

  // India rules
  if (country === "in") {
    if (!/^[6-9]/.test(digitsOnly)) {
      return "Indian number should start with 6, 7, 8, or 9.";
    }
  }

  return null;
}

/* -----------------------------
   FINAL HELPERS (IMPORTANT)
------------------------------ */

/**
 * Use this when saving to DB (ADMIN / SUPABASE)
 */
export function getCleanPhoneForDB(phone: string) {
  return normalizePhoneNumber(phone);
}

/**
 * Use this when showing in UI
 */
export function getFormattedPhone(phone: string, country: PhoneCountryCode) {
  return limitPhoneNumber(phone, country);
}