import ShrinkableButton, {
  type Props as ShrinkableButtonProps,
} from './ShrinkableButton';
import { Button, Dropdown, type StrictDropdownProps } from 'semantic-ui-react';

type Props = ShrinkableButtonProps &
  Required<Pick<StrictDropdownProps, 'onChange' | 'options'>>;

const ShrinkableDropdownButton: React.FC<Props> = ({
  children,
  color,
  disabled,
  hidden,
  icon,
  loading,
  mediaQuery,
  onChange,
  onClick,
  options,
}) => {
  if (hidden) {
    return null;
  }

  return (
    <Button.Group color={color}>
      <ShrinkableButton
        disabled={disabled}
        icon={icon}
        loading={loading}
        mediaQuery={mediaQuery}
        onClick={onClick}
      >
        {children}
      </ShrinkableButton>
      <Dropdown
        className="button icon"
        disabled={disabled}
        onChange={onChange}
        options={options}
        trigger={null}
      />
    </Button.Group>
  );
};

export default ShrinkableDropdownButton;
