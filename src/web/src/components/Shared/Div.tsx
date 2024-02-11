import { type PropsWithChildren } from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  readonly hidden?: boolean;
};

const Div: React.FC<PropsWithChildren<Props>> = ({
  children,
  hidden,
  ...rest
}) => {
  if (hidden) {
    return null;
  }

  return <div {...rest}>{children}</div>;
};

export default Div;
