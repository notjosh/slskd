import { type SearchState } from '../../../lib/searches';
import { Icon } from 'semantic-ui-react';

type Props = {
  readonly loading: boolean;
  readonly onRemove: () => void;
  readonly onStop: () => void;
  readonly search: {
    readonly state: SearchState;
  };
} & React.ComponentProps<typeof Icon>;

const SearchActionIcon: React.FC<Props> = ({
  loading,
  onRemove,
  onStop,
  search,
  ...props
}) => {
  if (loading) {
    return (
      <Icon
        loading
        name="spinner"
        {...props}
      />
    );
  }

  if (search.state.includes('Completed')) {
    return (
      <Icon
        color="red"
        name="trash alternate"
        onClick={() => onRemove()}
        style={{ cursor: 'pointer' }}
      />
    );
  }

  return (
    <Icon
      color="red"
      name="stop circle"
      onClick={() => onStop()}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default SearchActionIcon;
