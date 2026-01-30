"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getBrands } from "@/services/brands.actions";
import { Brand } from "@/types/api";
import { BrandLogo } from "./BrandLogo";

interface BrandSelectProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function BrandSelect({ value, onChange, disabled }: BrandSelectProps) {
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
        setLoading(true);
        const data = await getBrands();
        setBrands(data);
        setLoading(false);
    }
    load();
  }, []);

  const selectedBrand = brands.find((brand) => brand.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled || loading}
          className="w-full justify-between bg-[#0b1215] border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
        >
          {selectedBrand ? (
             <div className="flex items-center gap-2">
                <BrandLogo brand={selectedBrand} fallbackText={selectedBrand.name} size="sm" />
                <span>{selectedBrand.name}</span>
             </div>
          ) : (
            "Selecionar marca..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 bg-[#0b1215] border-white/10">
        <Command>
          <CommandInput placeholder="Buscar marca..." className="h-9" />
          <CommandList>
             <CommandEmpty>Nenhuma marca encontrada.</CommandEmpty>
             <CommandGroup>
                {brands.map((brand) => (
                <CommandItem
                    key={brand.id}
                    value={brand.name}
                    onSelect={() => {
                        onChange(brand.id === value ? "" : brand.id);
                        setOpen(false);
                    }}
                    className="cursor-pointer hover:bg-white/5"
                >
                    <div className="flex items-center gap-2 w-full">
                        <BrandLogo brand={brand} fallbackText={brand.name} size="sm" />
                        <span>{brand.name}</span>
                        {value === brand.id && (
                             <Check className="ml-auto h-4 w-4 text-[#32d6a5]" />
                        )}
                    </div>
                </CommandItem>
                ))}
             </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
