import type { Meta } from '@storybook/react';
import { Combobox, ComboboxOption } from './Combobox';

const Story: Meta<typeof Combobox> = {
  component: Combobox,
  title: 'Combobox',
  tags: ['autodocs'],
  args: {
    placeholder: 'Select framework...',
    noOptionsMessage: 'No framework found',
  },
};
export default Story;

export const Example = {
  render: (args: any) => (
    <Combobox {...args}>
      <ComboboxOption value="nextJS">Next.js</ComboboxOption>
      <ComboboxOption value="sveleKit">SveleKit</ComboboxOption>
      <ComboboxOption value="nuxtJS">NuxtJS</ComboboxOption>
      <ComboboxOption value="remix">Remix</ComboboxOption>
      <ComboboxOption value="astro">Astro</ComboboxOption>
    </Combobox>
  ),
};
