"use client";

import * as React from "react";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";

import { Card } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  IconPhone,
  IconShield,
  IconLock,
  IconUserPlus,
  IconAlertCircle,
} from "@tabler/icons-react";

import {
  limitPhoneNumber,
  phoneCountryOptions,
  type PhoneCountryCode,
  validatePhoneNumber,
  getCleanPhoneForDB,
} from "../../../../app/(auth)/login/components/status-code-validation";

interface AddSectionProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onSubmit: (values: {
    nationality: PhoneCountryCode;
    phone_number: string;
    role: string;
    password: string | null;
  }) => void;
}

export function AddSection({ open, onOpenChange, onSubmit }: AddSectionProps) {
  const [countryCode, setCountryCode] = React.useState<PhoneCountryCode>("bt");

  const [phone, setPhone] = React.useState("");

  const [role, setRole] = React.useState("user");

  const [password, setPassword] = React.useState("");

  const [error, setError] = React.useState<string | null>(null);

  const selectedCountry = phoneCountryOptions.find(
    (option) => option.value === countryCode,
  );

  const showPassword = role === "admin" || role === "kitchen";

  const handleSubmit = () => {
    setError(null);

    const validationError = validatePhoneNumber(countryCode, phone);

    if (validationError) {
      setError(validationError);
      return;
    }

    if (showPassword && !password.trim()) {
      setError("Password required for admin or kitchen.");
      return;
    }

    onSubmit({
      nationality: countryCode,
      phone_number: getCleanPhoneForDB(phone),
      role,
      password: showPassword ? password : null,
    });

    setPhone("");
    setRole("user");
    setPassword("");
    setCountryCode("bt");

    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full border-l border-white/10 bg-[#09090b] text-white sm:max-w-md"
      >
        <SheetHeader className="border-b border-white/10 pb-5">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <IconUserPlus className="size-6 text-white" />
            </div>

            <div>
              <SheetTitle className="text-left text-2xl font-semibold text-white">
                Add User
              </SheetTitle>

              <SheetDescription className="mt-1 text-left text-white/45">
                Create a new user account and assign permissions.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-5">
          <Card className="border border-white/10 bg-white/[0.03] p-5 shadow-none">
            <div className="space-y-5">
              {/* COUNTRY */}
              <div className="space-y-2">
                <Label className="text-white/80">Nationality</Label>

                <Select
                  value={countryCode}
                  onValueChange={(value: PhoneCountryCode) => {
                    setCountryCode(value);
                    setPhone("");
                    setError(null);
                  }}
                >
                  <SelectTrigger className="h-11 border-white/10 bg-white/[0.03] text-white">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent className="border-white/10 bg-zinc-950 text-white">
                    {phoneCountryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-3">
                          {option.flagSrc ? (
                            <Image
                              src={option.flagSrc}
                              alt={option.label}
                              width={20}
                              height={14}
                              className="h-4 w-auto rounded-sm object-cover"
                            />
                          ) : (
                            <span>{option.flag}</span>
                          )}

                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* PHONE */}
              <div className="space-y-2">
                <Label className="text-white/80">Phone Number</Label>

                <div className="relative">
                  <IconPhone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/35" />

                  <Input
                    placeholder={`Enter ${selectedCountry?.phoneLength} digits`}
                    className="h-11 border-white/10 bg-white/[0.03] pl-10 text-white placeholder:text-white/30"
                    value={phone}
                    onChange={(e) => {
                      setPhone(limitPhoneNumber(e.target.value, countryCode));

                      setError(null);
                    }}
                  />
                </div>

                <p className="text-xs text-white/35">
                  {selectedCountry?.label} numbers require{" "}
                  {selectedCountry?.phoneLength} digits.
                </p>
              </div>

              {/* ROLE */}
              <div className="space-y-2">
                <Label className="text-white/80">Role</Label>

                <Select
                  value={role}
                  onValueChange={(value) => {
                    setRole(value);

                    if (value === "user") {
                      setPassword("");
                    }
                  }}
                >
                  <SelectTrigger className="h-11 border-white/10 bg-white/[0.03] text-white">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent className="border-white/10 bg-zinc-950 text-white">
                    <SelectItem value="user">
                      <Badge
                        variant="outline"
                        className="border-white/20 text-white"
                      >
                        User
                      </Badge>
                    </SelectItem>

                    <SelectItem value="admin">
                      <Badge className="bg-white text-black">Admin</Badge>
                    </SelectItem>

                    <SelectItem value="kitchen">
                      <Badge
                        variant="outline"
                        className="border-white/20 text-white"
                      >
                        Kitchen
                      </Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* PASSWORD */}
              {showPassword && (
                <div className="space-y-2">
                  <Label className="text-white/80">Password</Label>

                  <div className="relative">
                    <IconLock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/35" />

                    <Input
                      type="password"
                      placeholder="Enter password"
                      className="h-11 border-white/10 bg-white/[0.03] pl-10 text-white placeholder:text-white/30"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError(null);
                      }}
                    />
                  </div>
                </div>
              )}

              {/* ERROR */}
              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3">
                  <IconAlertCircle className="mt-0.5 size-4 text-red-400" />

                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}
            </div>
          </Card>

          <Card className="border border-white/10 bg-white/[0.02] p-4 shadow-none">
            <div className="flex items-start gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <IconShield className="size-4 text-white" />
              </div>

              <div>
                <h4 className="text-sm font-medium text-white">
                  Access Control
                </h4>

                <p className="mt-1 text-xs leading-relaxed text-white/40">
                  Admin and Kitchen accounts require passwords for secure
                  access.
                </p>
              </div>
            </div>
          </Card>

          <Button
            className="h-11 w-full border border-white/10 bg-white text-black hover:bg-white/90"
            onClick={handleSubmit}
          >
            Create User
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
