import type { Meta, StoryFn } from '@storybook/react';
import { ResponsiveDialog, ResponsiveDialogClose, ResponsiveDialogContent, ResponsiveDialogFooter, ResponsiveDialogTrigger } from './ResponsiveDialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default {
  title: 'Molecules/Responsive Dialog',
  tags: ['autodocs'],
  args: {},
  parameters: {
    docs: {
      description: {
        component: `
Responsive Dialog automatically switches between modal [dialog](https://ui.shadcn.com/docs/components/dialog) and [drawer](https://ui.shadcn.com/docs/components/drawer) based on screen width, using media queries, to ensures an accessible experience in different screen sizes.
          `,
      },
    },
  },
  component: ResponsiveDialog,
} as Meta<typeof ResponsiveDialog>;

const StoryTemplate: StoryFn<typeof ResponsiveDialog> = (args) => (
  <ResponsiveDialog {...args}>
    <ResponsiveDialogTrigger>
      <Button variant="outline">Edit Profile</Button>
    </ResponsiveDialogTrigger>
    <ResponsiveDialogContent title="Edit Profile" description="Make changes to your profile here. Click save when you're done.">
      <div className="grid gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input id="username" defaultValue="@peduarte" className="col-span-3" />
        </div>
      </div>
      <ResponsiveDialogFooter>
        <ResponsiveDialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </ResponsiveDialogClose>
        <Button type="submit">Save changes</Button>
      </ResponsiveDialogFooter>
    </ResponsiveDialogContent>
  </ResponsiveDialog>
);

export const Default = {
  render: StoryTemplate,
  args: {},
};
