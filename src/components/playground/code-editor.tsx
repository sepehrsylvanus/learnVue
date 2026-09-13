"use client";

import { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vue } from "@codemirror/lang-vue";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";

type Props = {
  value: string;
  onChange: (value: string) => void;
  dark: boolean;
  height?: string;
  readOnly?: boolean;
};

export default function CodeEditor({ value, onChange, dark, height = "100%", readOnly }: Props) {
  const extensions = useMemo(() => [vue(), EditorView.lineWrapping], []);

  return (
    <CodeMirror
      value={value}
      height={height}
      theme={dark ? oneDark : "light"}
      extensions={extensions}
      readOnly={readOnly}
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        highlightActiveLine: !readOnly,
        autocompletion: true,
        bracketMatching: true,
        closeBrackets: true,
        tabSize: 2,
      }}
      onChange={onChange}
    />
  );
}
