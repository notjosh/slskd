import { browse } from '../../../lib/shares';
import { CodeEditor, LoaderSegment, Switch } from '../../Shared';
import { type ShareWithHost } from '.';
import orderBy from 'lodash/orderBy';
import { useEffect, useState } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

type Props = {
  onClose: () => void;
  share: false | ShareWithHost;
  theme?: React.ComponentProps<typeof CodeEditor>['theme'];
};

const ContentsModal: React.FC<Props> = ({ onClose, share, theme }) => {
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState<string | undefined>();

  const { id, localPath, remotePath } = share || {};

  useEffect(() => {
    const fetch = async () => {
      if (id == null || localPath == null || remotePath == null) {
        return;
      }

      setLoading(true);

      const result = await browse({ id });

      const directories = result.map((directory) => {
        const lines = [directory.name?.replace(remotePath, localPath)];

        for (const file of orderBy(directory.files, 'filename')) {
          lines.push('\t' + file.filename?.replace(remotePath, ''));
        }

        lines.push('');

        return lines.join('\n');
      });

      setContents(directories.join('\n'));
      setLoading(false);
    };

    if (id) {
      void fetch();
    } else {
      setLoading(true);
      setContents(undefined);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      onClose={onClose}
      open={Boolean(share)}
      size="large"
    >
      <Modal.Header>
        <Icon name="folder" />
        {localPath}
      </Modal.Header>
      <Modal.Content
        className="share-ls-content"
        scrolling
      >
        <Switch loading={loading && <LoaderSegment className="modal-loader" />}>
          <CodeEditor
            basicSetup={false}
            editable={false}
            style={{ minHeight: 500 }}
            {...(contents ? { value: contents } : {})}
            {...(theme ? { theme } : {})}
          />
        </Switch>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ContentsModal;
