import { ComponentMeta, ComponentStory } from '@storybook/react';

import LoadingSkeleton from '.';

export default {
  component: LoadingSkeleton,
  title: 'Loading Skeleton',
} as ComponentMeta<typeof LoadingSkeleton>;

const TemplateLoadingSkeleton: ComponentStory<typeof LoadingSkeleton> = (
  args,
) => <LoadingSkeleton {...args} />;

export const normal = TemplateLoadingSkeleton.bind({});
