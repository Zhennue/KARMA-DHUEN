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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card } from "@/components/ui/card";

import {
  IconPhone,
  IconShield,
  IconLock,
  IconUserPlus,
} from "@tabler/icons-react";

import {
  limitPhoneNumber,
  phoneCountryOptions,
  type PhoneCountryCode,
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

  const selectedCountry = phoneCountryOptions.find(
    (option) => option.value === countryCode,
  );

  const handleSubmit = () => {
    onSubmit({
      nationality: countryCode,
      phone_number: phone.replace(/\D/g, ""),
      role,
      password,
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
        className="w-full border-l border-white/10 bg-zinc-950 text-white sm:max-w-md"
      >
        <SheetHeader className="space-y-3 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-2">
              <IconUserPlus className="size-5 text-white" />
            </div>

            <div>
              <SheetTitle className="text-2xl font-semibold text-white">
                Add User
              </SheetTitle>

              <SheetDescription className="text-white/50">
                Create user access and assign roles.
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
                  onValueChange={(value: PhoneCountryCode) =>
                    setCountryCode(value)
                  }
                >
                  <SelectTrigger className="border-white/10 bg-white/5 text-white">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent className="border-white/10 bg-zinc-950 text-white">
                    {phoneCountryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          {option.flagSrc ? (
                            <Image
                              src={option.flagSrc}
                              alt={option.label}
                              width={20}
                              height={14}
                              className="h-4 w-auto object-cover"
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
                  <IconPhone className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40" />

                  <Input
                    placeholder={`Enter ${selectedCountry?.phoneLength} digits`}
                    className="border-white/10 bg-white/5 pl-9 text-white placeholder:text-white/35"
                    value={phone}
                    onChange={(e) =>
                      setPhone(limitPhoneNumber(e.target.value, countryCode))
                    }
                  />
                </div>
              </div>

              {/* ROLE */}
              <div className="space-y-2">
                <Label className="text-white/80">User Role</Label>

                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="border-white/10 bg-white/5 text-white">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent className="border-white/10 bg-zinc-950 text-white">
                    <SelectItem value="user">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="border-0 bg-white/10 text-white"
                        >
                          User
                        </Badge>
                      </div>
                    </SelectItem>

                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-white text-black">Admin</Badge>
                      </div>
                    </SelectItem>

                    <SelectItem value="kitchen">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="border-white/20 text-white"
                        >
                          Kitchen
                        </Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <Label className="text-white/80">Password</Label>

                <div className="relative">
                  <IconLock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40" />

                  <Input
                    type="password"
                    placeholder="Enter password"
                    className="border-white/10 bg-white/5 pl-9 text-white placeholder:text-white/35"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="border border-dashed border-white/10 bg-white/[0.03] p-4 shadow-none">
            <div className="flex items-start gap-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                <IconShield className="size-4 text-white" />
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-medium text-white">
                  Access Control
                </h4>

                <p className="text-xs leading-relaxed text-white/45">
                  Roles determine dashboard permissions and system access for
                  each user.
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
