import {
  defaultHighlightStyle,
  StreamLanguage,
  syntaxHighlighting,
} from '@codemirror/language';
import { yaml } from '@codemirror/legacy-modes/mode/yaml';
import CodeMirror, { type ReactCodeMirrorProps } from '@uiw/react-codemirror';

type Props = {
  onChange?: (value: string) => void;
} & Required<Pick<ReactCodeMirrorProps, 'theme' | 'value'>> &
  Omit<ReactCodeMirrorProps, 'onChange' | 'theme' | 'value'>;

const CodeEditor: React.FC<Props> = ({
  onChange = () => {},
  theme,
  value,
  ...rest
}) => {
  console.log(defaultHighlightStyle);

  return (
    <CodeMirror
      extensions={[
        StreamLanguage.define(yaml),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      ]}
      onChange={(newValue) => onChange(newValue)}
      theme={theme}
      value={value}
      {...rest}
    />
  );
};

export default CodeEditor;
