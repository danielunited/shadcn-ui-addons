'use client';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import * as React from 'react';
import * as Icons from '../Icons/Icons';

export type optionalValueType = string | number | object | boolean | null | undefined;

interface ComboboxProps {
  placeholder?: string;
  noOptionsMessage?: string;
  onChange?: (value: optionalValueType) => void;
  value?: optionalValueType;
  className?: string;
  children: React.ReactNode;
  icon?: keyof typeof Icons;
  popoverWidth?: string;
}

export const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  ({ placeholder = 'Select option...', noOptionsMessage = 'No results found', onChange, value: initialValue, className, children, icon, popoverWidth }: ComboboxProps, ref) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(initialValue);
    const [label, setLabel] = React.useState(placeholder);

    const handleSelect = (selectedValue: optionalValueType, selectedLabel: string, triggerChange = true) => {
      setValue(selectedValue);
      setLabel(selectedLabel ?? placeholder);
      if (!triggerChange) return;

      setOpen(false);
      onChange?.(selectedValue);
    };

    // Extract valid ComboboxOption components from children
    const options = React.Children.toArray(children).filter((child) => React.isValidElement(child) && child.type === ComboboxOption) as React.ReactElement[];

    React.useEffect(() => {
      if (initialValue !== null && initialValue !== undefined) {
        const foundOption = options.find((option) => option && option.props && option.props.value === initialValue);
        if (foundOption && foundOption.props && foundOption.props.children) {
          handleSelect(initialValue, foundOption.props.children, false);
        }
      }
    }, [initialValue, options]);

    const IconComponent = icon ? Icons[icon] : null;

    return (
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className={cn('w-full justify-between truncate px-3 font-normal hover:bg-background min-h-10', className)}>
            <div className="flex items-center truncate">
              {IconComponent && <IconComponent className="mr-2 h-4 min-w-[1rem] text-muted-foreground" />}
              <span className="truncate">{label}</span>
            </div>
            <Icons.ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className={cn('p-0', popoverWidth ? `min-w-[var(--radix-popover-trigger-width)] w-[${popoverWidth}]` : 'w-[var(--radix-popover-trigger-width)]')}>
          <ScrollArea className="flex max-h-80 flex-col" type="always">
            <Command className="w-full">
              <CommandInput placeholder="Search..." />
              <CommandList>
                {options.map((option, index) => {
                  const { value: optionValue, children: optionChildren } = option.props;
                  return (
                    <CommandGroup key={index}>
                      <CommandItem onSelect={() => handleSelect(optionValue, optionChildren)}>
                        <Icons.Check className={cn('mr-2 h-4 w-4', value === optionValue ? 'opacity-100' : 'opacity-0')} />
                        {optionChildren}
                      </CommandItem>
                    </CommandGroup>
                  );
                })}
              </CommandList>
              <CommandEmpty>{noOptionsMessage}</CommandEmpty>
            </Command>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    );
  }
);
Combobox.displayName = 'Combobox';
type AllowedValueType = string | number | object | boolean | null;
type ComboboxOptionProps = {
  value: AllowedValueType;
  children: string;
};

export function ComboboxOption({ value, children }: ComboboxOptionProps) {
  // This component serves as a placeholder for typing and does not render anything.
  return null;
}
