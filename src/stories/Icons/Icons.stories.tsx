import * as Icons from './Icons';

const Story = {
  title: 'Theme/Icons',
  tags: ['autodocs'],
  argTypes: {},
};
export default Story;

export const Base = {
  render: () => (
    <div className="text-label-title grid h-screen grid-cols-5 items-center justify-base justify-items-center gap-4 overflow-auto pb-8">
      {Object.keys(Icons).map((k) => {
        // @ts-ignore
        const Icon = Icons[k];
        return (
          <span className="flex flex-col items-center gap-1" key={k}>
            <Icon />
            {k}
          </span>
        );
      })}
    </div>
  ),
  args: {},
};
