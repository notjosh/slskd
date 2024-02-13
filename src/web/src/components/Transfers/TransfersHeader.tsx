import {
  type ApiSlskdServerState,
  type ApiSlskdTransfersAPIUserResponse,
  type ApiSlskdTransfersTransfer,
  ApiSoulseekTransferDirection,
  ApiSoulseekTransferStates,
} from '../../lib/generated/types';
import { isStateCancellable, isStateRetryable } from '../../lib/transfers';
import { Div, Nbsp } from '../Shared';
import ShrinkableDropdownButton from '../Shared/ShrinkableDropdownButton';
import { useMemo, useState } from 'react';
import { Icon, Segment } from 'semantic-ui-react';

const getRetryableFiles = ({
  files,
  retryOption,
}: {
  files: ApiSlskdTransfersTransfer[];
  retryOption: ApiSoulseekTransferStates;
}) => {
  switch (retryOption) {
    case 'Errored':
      return files.filter((file) =>
        [
          'Completed, TimedOut',
          'Completed, Errored',
          'Completed, Rejected',
        ].includes(file.state),
      );
    case 'Cancelled':
      return files.filter((file) => file.state === 'Completed, Cancelled');
    case 'All':
      return files.filter((file) => isStateRetryable(file.state));
    default:
      return [];
  }
};

const getCancellableFiles = ({
  cancelOption,
  files,
}: {
  cancelOption: ApiSoulseekTransferStates;
  files: ApiSlskdTransfersTransfer[];
}) => {
  switch (cancelOption) {
    case 'All':
      return files.filter((file) => isStateCancellable(file.state));
    case 'Queued':
      return files.filter((file) =>
        ['Queued, Locally', 'Queued, Remotely'].includes(file.state),
      );
    case 'In Progress':
      return files.filter((file) => file.state === 'InProgress');
    default:
      return [];
  }
};

const getRemovableFiles = ({
  files,
  removeOption,
}: {
  files: ApiSlskdTransfersTransfer[];
  removeOption: ApiSoulseekTransferStates;
}) => {
  switch (removeOption) {
    case 'Succeeded':
      return files.filter((file) => file.state === 'Completed, Succeeded');
    case 'Errored':
      return files.filter((file) =>
        [
          'Completed, TimedOut',
          'Completed, Errored',
          'Completed, Rejected',
        ].includes(file.state),
      );
    case 'Cancelled':
      return files.filter((file) => file.state === 'Completed, Cancelled');
    case 'Completed':
      return files.filter((file) => file.state.includes('Completed'));
    default:
      return [];
  }
};

type Props = {
  cancelling?: boolean;
  direction: ApiSoulseekTransferDirection;
  onCancelAll: (files: ApiSlskdTransfersTransfer[]) => void;
  onRemoveAll: (files: ApiSlskdTransfersTransfer[]) => void;
  onRetryAll: (files: ApiSlskdTransfersTransfer[]) => void;
  removing?: boolean;
  retrying?: boolean;
  server: ApiSlskdServerState;
  transfers: ApiSlskdTransfersAPIUserResponse[];
};

const TransfersHeader: React.FC<Props> = ({
  cancelling = false,
  direction,
  onCancelAll,
  onRemoveAll,
  onRetryAll,
  removing = false,
  retrying = false,
  server,
  transfers,
}) => {
  const [removeOption, setRemoveOption] = useState<ApiSoulseekTransferStates>(
    ApiSoulseekTransferStates.Succeeded,
  );
  const [cancelOption, setCancelOption] =
    useState<ApiSoulseekTransferStates>('All');
  const [retryOption, setRetryOption] = useState<ApiSoulseekTransferStates>(
    ApiSoulseekTransferStates.Errored,
  );

  const files = useMemo(() => {
    return transfers
      .reduce<ApiSlskdTransfersTransfer[]>((accumulator, username) => {
        const allUserFiles = username.directories.reduce<
          ApiSlskdTransfersTransfer[]
        >((directoryAccumulator, directory) => {
          return directoryAccumulator.concat(directory.files);
        }, []);

        return accumulator.concat(allUserFiles);
      }, [])
      .filter((file) => file.direction.toLowerCase() === direction);
  }, [direction, transfers]);

  const empty = files.length === 0;
  const working = retrying || cancelling || removing;

  return (
    <Segment
      className="transfers-header-segment"
      raised
    >
      <div className="transfers-segment-icon">
        <Icon
          name={
            direction === ApiSoulseekTransferDirection.Download
              ? 'download'
              : 'upload'
          }
          size="big"
        />
      </div>
      <Div
        className="transfers-header-buttons"
        hidden={empty}
      >
        <ShrinkableDropdownButton
          color="green"
          disabled={working || empty || !server.isConnected}
          hidden={direction === ApiSoulseekTransferDirection.Upload}
          icon="redo"
          loading={retrying}
          mediaQuery="(max-width: 715px)"
          onChange={(_, data) => setRetryOption(data.value)}
          onClick={() => onRetryAll(getRetryableFiles({ files, retryOption }))}
          options={[
            {
              key: 'errored',
              text: 'Errored',
              value: ApiSoulseekTransferStates.Errored,
            },
            {
              key: 'cancelled',
              text: 'Cancelled',
              value: ApiSoulseekTransferStates.Cancelled,
            },
            { key: 'all', text: 'All', value: 'All' },
          ]}
        >
          {`Retry ${retryOption === 'All' ? retryOption : `All ${retryOption}`}`}
        </ShrinkableDropdownButton>
        <Nbsp />
        <ShrinkableDropdownButton
          color="red"
          disabled={working || empty}
          icon="x"
          loading={cancelling}
          mediaQuery="(max-width: 715px)"
          onChange={(_, data) => setCancelOption(data.value)}
          onClick={() =>
            onCancelAll(getCancellableFiles({ cancelOption, files }))
          }
          options={[
            { key: 'all', text: 'All', value: 'All' },
            {
              key: 'queued',
              text: 'Queued',
              value: ApiSoulseekTransferStates.Queued,
            },
            {
              key: 'inProgress',
              text: 'In Progress',
              value: ApiSoulseekTransferStates.InProgress,
            },
          ]}
        >
          {`Cancel ${cancelOption === 'All' ? cancelOption : `All ${cancelOption}`}`}
        </ShrinkableDropdownButton>
        <Nbsp />
        <ShrinkableDropdownButton
          disabled={working || empty}
          icon="trash alternate"
          loading={removing}
          mediaQuery="(max-width: 715px)"
          onChange={(_, data) => setRemoveOption(data.value)}
          onClick={() =>
            onRemoveAll(getRemovableFiles({ files, removeOption }))
          }
          options={[
            {
              key: 'succeeded',
              text: 'Succeeded',
              value: ApiSoulseekTransferStates.Succeeded,
            },
            {
              key: 'errored',
              text: 'Errored',
              value: ApiSoulseekTransferStates.Errored,
            },
            {
              key: 'cancelled',
              text: 'Cancelled',
              value: ApiSoulseekTransferStates.Cancelled,
            },
            {
              key: 'completed',
              text: 'Completed',
              value: ApiSoulseekTransferStates.Completed,
            },
          ]}
        >
          {`Remove All ${removeOption}`}
        </ShrinkableDropdownButton>
      </Div>
    </Segment>
  );
};

export default TransfersHeader;
