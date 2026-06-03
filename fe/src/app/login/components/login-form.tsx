"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/src/components/ui/select";
import {
  limitPhoneNumber,
  phoneCountryOptions,
  type PhoneCountryCode,
  validatePhoneNumber,
} from "./status-code-validation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [countryCode, setCountryCode] = React.useState<PhoneCountryCode>("bt");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const selectedCountry = phoneCountryOptions.find(
    (option) => option.value === countryCode,
  );

  function handleCountryChange(nextCountry: PhoneCountryCode) {
    setCountryCode(nextCountry);
    setPhoneNumber((currentValue) =>
      limitPhoneNumber(currentValue, nextCountry),
    );
    setError(null);
  }

  function handlePhoneNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = limitPhoneNumber(event.target.value, countryCode);

    setPhoneNumber(nextValue);
    setError(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validatePhoneNumber(countryCode, phoneNumber);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    router.push("/food");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-white/15 bg-white/10 text-white shadow-2xl shadow-black/35 backdrop-blur-2xl">
        <CardHeader className="items-center text-center pb-2">
          <CardTitle className="text-2xl font-black tracking-tight text-white drop-shadow-sm">
            Kuzu Zangpola!
          </CardTitle>
          <div className="mt-4 flex items-center justify-center">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border border-white/20 bg-white/10 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur-sm">
              <Image
                src="/logo.png"
                alt="Karma Dhuen logo"
                fill
                priority
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="phone" className="text-white/90">
                  Phone Number
                </FieldLabel>
                <div className="flex overflow-hidden rounded-md border border-input shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 dark:bg-input/30">
                  <Select
                    value={countryCode}
                    onValueChange={(value: PhoneCountryCode) =>
                      handleCountryChange(value as PhoneCountryCode)
                    }
                  >
                    <SelectTrigger className="h-9 w-24 shrink-0 border-0 bg-muted/40 px-2 py-0 text-xs font-semibold text-slate-200 shadow-none focus-visible:ring-0 dark:bg-muted/20">
                      <span className="flex items-center gap-2">
                        {selectedCountry?.flagSrc ? (
                          <Image
                            src={selectedCountry.flagSrc}
                            alt={`${selectedCountry.label} flag`}
                            width={22}
                            height={16}
                            className="h-4 w-auto object-cover"
                          />
                        ) : (
                          <span aria-hidden="true">
                            {selectedCountry?.flag}
                          </span>
                        )}
                        <span>{selectedCountry?.dialCode}</span>
                      </span>
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-zinc-950/95 text-white shadow-2xl shadow-black/40 backdrop-blur-xl">
                      {phoneCountryOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="text-white/90"
                        >
                          <span className="flex items-center gap-2 text-xs font-semibold leading-none">
                            {option.flagSrc ? (
                              <Image
                                src={option.flagSrc}
                                alt={`${option.label} flag`}
                                width={22}
                                height={16}
                                className="h-4 w-auto object-cover"
                              />
                            ) : (
                              <span aria-hidden="true">{option.flag}</span>
                            )}
                            <span>{option.dialCode}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder={`Enter ${selectedCountry?.phoneLength ?? ""} digits`}
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    aria-invalid={Boolean(error)}
                    className="h-9 flex-1 border-0 shadow-none focus-visible:ring-0"
                    required
                  />
                </div>
                <FieldDescription>
                  {selectedCountry
                    ? `${selectedCountry.label} numbers must have ${selectedCountry.phoneLength} digits.`
                    : "Select a country code to see the digit requirement."}
                </FieldDescription>
                {error ? (
                  <FieldDescription className="text-destructive">
                    {error}
                  </FieldDescription>
                ) : null}
              </Field>
              <Field>
                <Button type="submit">Start for free</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
