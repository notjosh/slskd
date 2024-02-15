import { type ApiSlskdOptions } from '../../../lib/generated/types';
import {
  CodeEditor,
  LoaderSegment,
  ShrinkableButton,
  Switch,
} from '../../Shared';
import DebugModal from './DebugModal';
import EditModal from './EditModal';
import { useEffect, useState } from 'react';
import { Divider } from 'semantic-ui-react';
import YAML from 'yaml';

type DebugButtonProps = Pick<
  ApiSlskdOptions,
  'debug' | 'remoteConfiguration'
> & {
  setDebugModal: (value: boolean) => void;
} & Omit<React.ComponentProps<typeof ShrinkableButton>, 'icon'>;

const DebugButton: React.FC<DebugButtonProps> = ({
  debug,
  remoteConfiguration,
  setDebugModal,
  ...props
}) => {
  if (!remoteConfiguration || !debug) return null;

  return (
    <ShrinkableButton
      icon="bug"
      mediaQuery="(max-width: 516px)"
      onClick={() => setDebugModal(true)}
      {...props}
    >
      Debug View
    </ShrinkableButton>
  );
};

type EditButtonProps = Pick<ApiSlskdOptions, 'remoteConfiguration'> & {
  setEditModal: (value: boolean) => void;
} & Omit<React.ComponentProps<typeof ShrinkableButton>, 'icon'>;

const EditButton: React.FC<EditButtonProps> = ({
  remoteConfiguration,
  setEditModal,
  ...props
}) => {
  if (!remoteConfiguration) {
    return (
      <ShrinkableButton
        disabled
        icon="lock"
        mediaQuery="(max-width: 516px)"
      >
        Remote Configuration Disabled
      </ShrinkableButton>
    );
  }

  return (
    <ShrinkableButton
      icon="edit"
      mediaQuery="(max-width: 516px)"
      onClick={() => setEditModal(true)}
      primary
      {...props}
    >
      Edit
    </ShrinkableButton>
  );
};

type Props = {
  options: ApiSlskdOptions;
  theme: React.ComponentProps<typeof CodeEditor>['theme'];
};

const Options: React.FC<Props> = ({ options, theme }) => {
  const [debugModal, setDebugModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [contents, setContents] =
    useState<React.ComponentProps<typeof CodeEditor>['value']>();

  useEffect(() => {
    setTimeout(() => {
      setContents(
        YAML.stringify(options, { simpleKeys: true, sortMapEntries: false }),
      );
    }, 250);
  }, [options]);

  const { debug, remoteConfiguration } = options;

  return (
    <>
      <div className="header-buttons">
        <DebugButton
          debug={debug}
          disabled={!contents}
          remoteConfiguration={remoteConfiguration}
          setDebugModal={setDebugModal}
        />
        <EditButton
          disabled={!contents}
          remoteConfiguration={remoteConfiguration}
          setEditModal={setEditModal}
        />
      </div>
      <Divider />
      <Switch loading={!contents && <LoaderSegment />}>
        {contents && (
          <CodeEditor
            basicSetup={false}
            editable={false}
            value={contents}
            {...(theme ? { theme } : {})}
          />
        )}
      </Switch>
      <DebugModal
        onClose={() => setDebugModal(false)}
        open={debugModal}
        theme={theme}
      />
      <EditModal
        onClose={() => setEditModal(false)}
        open={editModal}
        theme={theme}
      />
    </>
  );
};

export default Options;
