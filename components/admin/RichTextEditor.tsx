"use client";

import { useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

/**
 * Lightweight, dependency-free rich-text editor (toolbar + contentEditable).
 * Outputs HTML — rendered on the public site with the `.cms-content` styles.
 */
export function RichTextEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Set initial HTML once when the value first arrives (e.g. editing a page),
  // then leave the DOM alone so the cursor doesn't jump while typing.
  useEffect(() => {
    if (ref.current && !initialized.current && value) {
      ref.current.innerHTML = value;
      initialized.current = true;
    }
  }, [value]);

  const emit = () => onChange(ref.current?.innerHTML || "");

  const exec = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    ref.current?.focus();
    emit();
  };

  const Btn = ({
    onClick,
    title,
    children,
  }: {
    onClick: () => void;
    title: string;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-md border bg-background px-2 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
    >
      {children}
    </button>
  );

  return (
    <div className="rounded-lg border">
      <div className="flex flex-wrap items-center gap-1 border-b bg-muted/30 p-2">
        <Btn title="Bold" onClick={() => exec("bold")}><Bold className="h-4 w-4" /></Btn>
        <Btn title="Italic" onClick={() => exec("italic")}><Italic className="h-4 w-4" /></Btn>
        <Btn title="Underline" onClick={() => exec("underline")}><Underline className="h-4 w-4" /></Btn>
        <span className="mx-1 h-5 w-px bg-border" />
        <Btn title="Heading 1" onClick={() => exec("formatBlock", "h1")}><Heading1 className="h-4 w-4" /></Btn>
        <Btn title="Heading 2" onClick={() => exec("formatBlock", "h2")}><Heading2 className="h-4 w-4" /></Btn>
        <Btn title="Heading 3" onClick={() => exec("formatBlock", "h3")}><Heading3 className="h-4 w-4" /></Btn>
        <Btn title="Paragraph" onClick={() => exec("formatBlock", "p")}><Pilcrow className="h-4 w-4" /></Btn>
        <span className="mx-1 h-5 w-px bg-border" />
        <Btn title="Bullet list" onClick={() => exec("insertUnorderedList")}><List className="h-4 w-4" /></Btn>
        <Btn title="Numbered list" onClick={() => exec("insertOrderedList")}><ListOrdered className="h-4 w-4" /></Btn>
        <span className="mx-1 h-5 w-px bg-border" />
        <Btn
          title="Insert link"
          onClick={() => {
            const url = window.prompt("Link URL:");
            if (url) exec("createLink", url);
          }}
        >
          <LinkIcon className="h-4 w-4" />
        </Btn>
        <Btn
          title="Insert image by URL"
          onClick={() => {
            const url = window.prompt("Image URL:");
            if (url) exec("insertImage", url);
          }}
        >
          <ImageIcon className="h-4 w-4" />
        </Btn>
        <Btn title="Divider" onClick={() => exec("insertHorizontalRule")}><Minus className="h-4 w-4" /></Btn>
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        data-placeholder="Write your content here…"
        className="cms-content min-h-[320px] max-w-none p-4 focus:outline-none empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]"
      />
    </div>
  );
}
