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
        syntaxHighlighting(
          // types don't match _strictly_ between `HighlightStyle` and `Highlighter`, so we'll force it here
          defaultHighlightStyle as Parameters<typeof syntaxHighlighting>[0],
          { fallback: true },
        ),
      ]}
      onChange={(newValue) => onChange(newValue)}
      {...(value ? { value } : {})}
      {...(theme ? { theme } : {})}
      {...rest}
    />
  );
};

export default CodeEditor;
