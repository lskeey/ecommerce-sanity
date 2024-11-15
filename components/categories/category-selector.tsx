"use client"

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { Category } from "@/sanity.types"
import { useState } from "react";

interface CategorySelectorProps {
  categories: Category[];
}

export function CategorySelector({ categories }: CategorySelectorProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? categories.find((category) => category._id === value)?.title
            : "Filter by Category"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category" className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category._id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {category.title}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === category._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
