import { getCurrentDebugView } from '../../../lib/options';
import { CodeEditor, PlaceholderSegment, Switch } from '../../Shared';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Icon, Modal } from 'semantic-ui-react';

type Props = {
  readonly onClose: () => void;
  readonly open: boolean;
  readonly theme: React.ComponentProps<typeof CodeEditor>['theme'];
};

const DebugModal: React.FC<Props> = ({ onClose, open, theme }) => {
  const [loading, setLoading] = useState(true);
  const [debugView, setDebugView] = useState<string>();

  const get = async () => {
    setLoading(true);

    try {
      setDebugView(await getCurrentDebugView());
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(error);
      toast.error(
        (isAxiosError(error) ? error.response?.data : undefined) ??
          error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      void get();
    }
  }, [open]);

  return (
    <Modal
      onClose={onClose}
      open={open}
      size="large"
    >
      <Modal.Header>
        <Icon name="bug" />
        Options (Debug View)
      </Modal.Header>
      <Modal.Content
        className="debug-view-content"
        scrolling
      >
        <Switch
          loading={
            loading && (
              <PlaceholderSegment
                caption="Loading..."
                icon="spinner"
                loading
              />
            )
          }
        >
          <CodeEditor
            basicSetup={false}
            editable={false}
            style={{ minHeight: 500 }}
            {...(theme ? { theme } : {})}
            {...(debugView ? { value: debugView } : {})}
          />
        </Switch>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DebugModal;
