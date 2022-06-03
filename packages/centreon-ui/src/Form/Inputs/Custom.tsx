import { isNil } from 'ramda';

import { InputProps } from './models';

const Custom = ({ custom, ...props }: InputProps): JSX.Element | null => {
  if (isNil(custom)) {
    return null;
  }

  return <custom.Component {...props} />;
};

export default Custom;
