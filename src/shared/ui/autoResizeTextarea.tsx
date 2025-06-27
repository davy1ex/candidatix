import { useEffect, useRef } from 'react';

interface AutoResizeTextareaProps {
  value: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  readOnly?: boolean | false
}

export const AutoResizeTextarea = ({ value, onChange, readOnly }: AutoResizeTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="h-[100%]">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="w-full resize-none p-2 border rounded font-mono text-sm  h-[100%]"
      />
    </div>
  );
};