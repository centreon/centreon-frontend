import { isNil } from 'ramda';

import { InputPropsWithoutCategory } from './models';

const Custom = ({
  custom,
  ...props
}: InputPropsWithoutCategory): JSX.Element | null => {
  if (isNil(custom)) {
    return null;
  }

  return <custom.Component {...props} />;
};

export default Custom;
