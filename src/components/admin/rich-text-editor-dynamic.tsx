'use client';

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

// Lazy load the heavy rich text editor with all Tiptap dependencies
const RichTextEditor = dynamic(
  () => import('./rich-text-editor').then((mod) => ({ default: mod.RichTextEditor })),
  {
    loading: () => (
      <div className="border rounded-md p-4 min-h-[200px] flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading editor...</div>
      </div>
    ),
    ssr: false, // Admin tools don't need SSR
  }
);

// Re-export with same interface
export function RichTextEditorDynamic(props: ComponentProps<typeof RichTextEditor>) {
  return <RichTextEditor {...props} />;
}

export default RichTextEditorDynamic;