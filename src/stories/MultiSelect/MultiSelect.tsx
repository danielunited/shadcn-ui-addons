'use client';

import { Badge } from '@/components/ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as React from 'react';
import * as Icons from '../Icons/Icons';

interface OptionType {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: OptionType[];
  value?: string[];
  placeholder: string;
  icon?: keyof typeof Icons;
  onChange?: (value: OptionType[]) => void;
}

export function MultiSelect(props: MultiSelectProps) {
  const { options, placeholder, icon, value = [], onChange } = props;

  const valueOption = options.filter((option) => value.includes(option.value));
  const Icon = icon && Icons[icon];
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<OptionType[]>(valueOption);

  const handleUnselect = (option: OptionType) => {
    setSelected((prev) => {
      const newSelected = prev.filter((s) => s.value !== option.value);
      onChange && onChange(newSelected);
      return newSelected;
    });
  };

  const handleSelect = (option: OptionType) => {
    setSelected((prev) => {
      const newSelected = [...prev, option];
      onChange && onChange(newSelected);
      return newSelected;
    });
    setOpen(false);
  };

  const availableOptions = options.filter((option) => !selected.some((selectedOption) => selectedOption.value === option.value));

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <div
          className={`group relative min-h-[2.5rem] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${
            Icon ? 'pl-10' : ''
          }`}
        >
          {Icon && <Icon className="absolute left-3 top-[0.625rem] h-4 w-4 text-muted-foreground" />}
          <div className="flex flex-wrap gap-2">
            {selected.map((option) => (
              <Badge key={option.value} variant="secondary" className="cursor-pointer font-medium" onClick={() => handleUnselect(option)}>
                {option.label}
                <Icons.Close className="ml-1.5 h-3 w-3 text-muted-foreground" />
              </Badge>
            ))}
            <span className="text-muted-foreground">{placeholder}</span>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <ScrollArea className="flex max-h-80 flex-col" type="always">
          <Command className="w-full">
            <CommandInput placeholder="Search..." className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground" />
            <CommandList>
              {availableOptions.length > 0 ? (
                <CommandGroup>
                  {availableOptions.map((option) => (
                    <CommandItem key={option.value} onSelect={() => handleSelect(option)} className={'cursor-pointer'}>
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                <CommandEmpty>No results found</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
