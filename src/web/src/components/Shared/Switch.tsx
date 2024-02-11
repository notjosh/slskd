import { type ReactElement, type ReactNode } from 'react';

type Props = { [key: string]: false | ReactElement } | { children?: ReactNode };

const Switch: React.FC<Props> = ({ children, ...rest }) => {
  const values = Object.values(rest);

  for (const value of values) {
    if (value) {
      return value;
    }
  }

  return <>{children}</>;
};

export default Switch;
