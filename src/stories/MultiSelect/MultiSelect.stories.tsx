import type { Meta } from '@storybook/react';
import { MultiSelect } from './MultiSelect';

const Story: Meta<typeof MultiSelect> = {
  component: MultiSelect,
  title: 'MultiSelect',
  tags: ['autodocs'],
  render: (args) => <MultiSelect {...args}></MultiSelect>,
};
export default Story;

export const Example = {
  args: {
    icon: 'Sun',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
      { value: 'date', label: 'Date' },
      { value: 'elderberry', label: 'Elderberry' },
      { value: 'fig', label: 'Fig' },
      { value: 'grape', label: 'Grape' },
      { value: 'honeydew', label: 'Honeydew' },
    ],
    placeholder: 'Select favorite fruits...',
  },
};
