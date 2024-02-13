import {
  defaultHighlightStyle,
  StreamLanguage,
  syntaxHighlighting,
} from '@codemirror/language';
import { yaml } from '@codemirror/legacy-modes/mode/yaml';
import CodeMirror, { type ReactCodeMirrorProps } from '@uiw/react-codemirror';

type Props = {
  onChange?: (value: string) => void;
} & Pick<ReactCodeMirrorProps, 'theme' | 'value'> &
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
      {...(value ? { value } : {})}
      {...(theme ? { theme } : {})}
      {...rest}
    />
  );
};

export default CodeEditor;
