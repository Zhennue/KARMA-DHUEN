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

import { IconPhone, IconLock, IconEdit } from "@tabler/icons-react";

import {
  limitPhoneNumber,
  phoneCountryOptions,
  type PhoneCountryCode,
} from "../../../../app/(auth)/login/components/status-code-validation";

interface UpdateProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  user: {
    id: string;
    nationality: PhoneCountryCode;
    phone_number: string;
    role: string;
  } | null;

  onSubmit: (
    id: string,
    values: {
      nationality: PhoneCountryCode;
      phone_number: string;
      role: string;
      password: string | null;
    },
  ) => void;
}

export function Update({ open, onOpenChange, user, onSubmit }: UpdateProps) {
  const [countryCode, setCountryCode] = React.useState<PhoneCountryCode>("bt");

  const [phone, setPhone] = React.useState("");

  const [role, setRole] = React.useState("user");

  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (user) {
      setPhone(user.phone_number);
      setRole(user.role);
      setCountryCode(user.nationality);
    }
  }, [user]);

  if (!user) return null;

  const selectedCountry = phoneCountryOptions.find(
    (option) => option.value === countryCode,
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full border-l border-white/10 bg-zinc-950 text-white sm:max-w-md"
      >
        <SheetHeader className="space-y-3 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-2">
              <IconEdit className="size-5 text-white" />
            </div>

            <div>
              <SheetTitle className="text-2xl font-semibold text-white">
                Update User
              </SheetTitle>

              <SheetDescription className="text-white/50">
                Modify user information and permissions.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-5">
          <Card className="border border-white/10 bg-white/[0.03] p-5 shadow-none">
            <div className="space-y-5">
              {/* NATIONALITY */}
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
                    className="border-white/10 bg-white/5 pl-9 text-white"
                    value={limitPhoneNumber(phone, countryCode)}
                    onChange={(e) =>
                      setPhone(limitPhoneNumber(e.target.value, countryCode))
                    }
                  />
                </div>

                <p className="text-xs text-white/40">
                  {selectedCountry?.label} numbers require{" "}
                  {selectedCountry?.phoneLength} digits.
                </p>
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
              <div className="space-y-2">
                <Label className="text-white/80">Password</Label>

                <div className="relative">
                  <IconLock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40" />

                  <Input
                    type="password"
                    className="border-white/10 bg-white/5 pl-9 text-white placeholder:text-white/35"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Button
            className="h-11 w-full border border-white/10 bg-white text-black hover:bg-white/90"
            onClick={() => {
              onSubmit(user.id, {
                nationality: countryCode,
                phone_number: phone.replace(/\D/g, ""),
                role,
                password,
              });

              onOpenChange(false);
            }}
          >
            Save Changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
