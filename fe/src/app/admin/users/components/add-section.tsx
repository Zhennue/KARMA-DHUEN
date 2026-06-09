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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  IconPhone,
  IconLock,
  IconUser,
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
    name: string | null;
    nationality: PhoneCountryCode;
    phone_number: string;
    role: string;
    password: string | null;
  }) => void;
}

export function AddSection({ open, onOpenChange, onSubmit }: AddSectionProps) {
  const [countryCode, setCountryCode] = React.useState<PhoneCountryCode>("bt");

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [role, setRole] = React.useState("user");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const selectedCountry = phoneCountryOptions.find(
    (option) => option.value === countryCode,
  );

  const showPassword = role === "admin" || role === "kitchen";
  const requireName = role === "admin" || role === "kitchen";

  const handleSubmit = () => {
    setError(null);

    const validationError = validatePhoneNumber(countryCode, phone);
    if (validationError) return setError(validationError);

    if (requireName && !name.trim()) {
      return setError("Name required for admin or kitchen.");
    }

    if (showPassword && !password.trim()) {
      return setError("Password required for admin or kitchen.");
    }

    onSubmit({
      name: name.trim() || null,
      nationality: countryCode,
      phone_number: getCleanPhoneForDB(phone),
      role,
      password: showPassword ? password : null,
    });

    setName("");
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
        className="w-full sm:max-w-sm border-l border-white/10 bg-black text-white p-5"
      >
        <SheetHeader className="border-b border-white/10 pb-4 px-1">
          <SheetTitle className="text-left text-lg font-semibold text-white">
            Add User
          </SheetTitle>

          <SheetDescription className="text-left text-white/45">
            Create user account.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-5 space-y-7 px-1">
          {/* NAME */}
          <div className="space-y-2">
            <Label className="text-white/80">Name</Label>

            <div className="relative">
              <IconUser className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/35" />

              <Input
                placeholder="Enter name"
                className="h-10 rounded-md border-white/10 bg-black pl-10 text-white placeholder:text-white/30"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError(null);
                }}
              />
            </div>
          </div>

          {/* NATIONALITY */}
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
              <SelectTrigger className="h-10 rounded-md border-white/10 bg-black text-white">
                <SelectValue />
              </SelectTrigger>

              <SelectContent className="border-white/10 bg-black text-white">
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
                className="h-10 rounded-md border-white/10 bg-black pl-10 text-white placeholder:text-white/30"
                value={phone}
                onChange={(e) => {
                  setPhone(limitPhoneNumber(e.target.value, countryCode));
                  setError(null);
                }}
              />
            </div>
          </div>

          {/* ROLE */}
          <div className="space-y-2">
            <Label className="text-white/80">Role</Label>

            <Select
              value={role}
              onValueChange={(value) => {
                setRole(value);
                if (value === "user") setPassword("");
              }}
            >
              <SelectTrigger className="h-10 rounded-md border-white/10 bg-black text-white">
                <SelectValue />
              </SelectTrigger>

              <SelectContent className="border-white/10 bg-black text-white">
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="kitchen">Kitchen</SelectItem>
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
                  className="h-10 rounded-md border-white/10 bg-black pl-10 text-white placeholder:text-white/30"
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
            <div className="flex items-start gap-2 border border-red-500/20 bg-red-500/10 p-2.5">
              <IconAlertCircle className="mt-0.5 size-4 text-red-400" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <Button
            className="h-10 w-full border border-white/10 bg-white text-black hover:bg-white/90"
            onClick={handleSubmit}
          >
            Create User
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
