import { ComponentMeta, ComponentStory } from '@storybook/react';

import makeStyles from '@mui/styles/makeStyles';

import { MenuSkeleton } from '..';

import MenuLoader from '.';

export default {
  component: MenuSkeleton,
  title: 'Menu Skeleton',
} as ComponentMeta<typeof MenuSkeleton>;

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.main,
  },
}));

interface Props {
  width?: number;
}

const MenuLoaderStory = ({ width }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <MenuLoader animate={false} width={width} />
    </div>
  );
};

const TemplateMenuSkeleton: ComponentStory<typeof MenuSkeleton> = (args) => (
  <MenuLoaderStory {...args} />
);
export const menuLoaderWithCustomWidth = TemplateMenuSkeleton.bind({});

export const menuLoader = TemplateMenuSkeleton.bind({});
