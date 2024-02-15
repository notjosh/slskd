import { type ApiSlskdSearchFile } from '../../lib/generated/types';
import {
  formatAttributes,
  formatBytes,
  formatSeconds,
  getFileName,
} from '../../lib/util';
import { useState } from 'react';
import { Checkbox, Header, Icon, List, Table } from 'semantic-ui-react';

type FileListFile = Pick<
  ApiSlskdSearchFile,
  | 'length'
  | 'size'
  | 'bitDepth'
  | 'bitRate'
  | 'isVariableBitRate'
  | 'sampleRate'
> & {
  // allow optional to workaround ugly issue in `ApiFileWithSelected` type allowing undefined name
  filename?: string | null | undefined;

  selected: boolean;
};

type Props = {
  directoryName: unknown;
  disabled: boolean;
  files: FileListFile[];
  footer?: React.ReactNode;
  locked: boolean;
  onClose?: () => void;
  onSelectionChange: (file: FileListFile, checked: boolean) => void;
};

const FileList: React.FC<Props> = ({
  directoryName,
  disabled,
  files,
  footer,
  locked,
  onClose,
  onSelectionChange,
}) => {
  const [folded, setFolded] = useState(false);

  return (
    <div style={{ opacity: locked ? 0.5 : 1 }}>
      <Header
        className="filelist-header"
        size="small"
      >
        <div>
          <Icon
            link={!locked}
            name={locked ? 'lock' : folded ? 'folder' : 'folder open'}
            onClick={() => !locked && setFolded(!folded)}
            size="large"
          />
          {directoryName}

          {onClose != null && (
            <Icon
              className="close-button"
              color="red"
              link
              name="close"
              onClick={() => onClose()}
            />
          )}
        </div>
      </Header>
      {!folded && files && files.length > 0 && (
        <List>
          <List.Item>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell className="filelist-selector">
                    <Checkbox
                      checked={files.filter((f) => !f.selected).length === 0}
                      disabled={disabled}
                      fitted
                      onChange={(_event, data) =>
                        files.map((f) =>
                          onSelectionChange(f, data.checked ?? false),
                        )
                      }
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell className="filelist-filename">
                    File
                  </Table.HeaderCell>
                  <Table.HeaderCell className="filelist-size">
                    Size
                  </Table.HeaderCell>
                  <Table.HeaderCell className="filelist-attributes">
                    Attributes
                  </Table.HeaderCell>
                  <Table.HeaderCell className="filelist-length">
                    Length
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {files
                  .sort((a, b) =>
                    (a.filename ?? '') > (b.filename ?? '') ? 1 : -1,
                  )
                  .map((f) => (
                    <Table.Row key={f.filename}>
                      <Table.Cell className="filelist-selector">
                        <Checkbox
                          checked={f.selected}
                          disabled={disabled}
                          fitted
                          onChange={(_event, data) =>
                            onSelectionChange(f, data.checked ?? false)
                          }
                        />
                      </Table.Cell>
                      <Table.Cell className="filelist-filename">
                        {locked ? <Icon name="lock" /> : ''}
                        {getFileName(f.filename ?? '')}
                      </Table.Cell>
                      <Table.Cell className="filelist-size">
                        {formatBytes(f.size)}
                      </Table.Cell>
                      <Table.Cell className="filelist-attributes">
                        {formatAttributes(f)}
                      </Table.Cell>
                      <Table.Cell className="filelist-length">
                        {formatSeconds(f.length ?? 0)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
              {footer && (
                <Table.Footer fullWidth>
                  <Table.Row>
                    <Table.HeaderCell colSpan="5">{footer}</Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              )}
            </Table>
          </List.Item>
        </List>
      )}
    </div>
  );
};

export default FileList;
