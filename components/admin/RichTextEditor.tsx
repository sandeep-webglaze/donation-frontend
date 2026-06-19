"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  List,
  ListOrdered,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Minus,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo2,
  Redo2,
  RemoveFormatting,
  Baseline,
  Highlighter,
  Code2,
  Loader2,
  Table as TableIcon,
  Youtube,
  FileCode2,
} from "lucide-react";
import { uploadFile } from "@/lib/api/upload";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

const FONTS: { label: string; css: string }[] = [
  { label: "Body (Jakarta)", css: "var(--font-sans)" },
  { label: "Heading (Quicksand)", css: "var(--font-heading)" },
  { label: "Arial", css: "Arial, sans-serif" },
  { label: "Georgia", css: "Georgia, serif" },
  { label: "Times", css: "'Times New Roman', serif" },
  { label: "Courier", css: "'Courier New', monospace" },
];

const SIZES = ["12", "14", "16", "18", "20", "24", "30", "36", "48"];

/**
 * Advanced dependency-free rich-text editor (toolbar + contentEditable).
 * Outputs HTML rendered on the public site with the `.cms-content` styles,
 * so fonts/sizes/colors all match the global Tailwind theme.
 */
export function RichTextEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const savedRange = useRef<Range | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const htmlRef = useRef<HTMLInputElement>(null);
  const initialized = useRef(false);
  const [showSource, setShowSource] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Use CSS styling for execCommand (so output is <span style> not <font>).
  useEffect(() => {
    try {
      document.execCommand("styleWithCSS", false, "true");
    } catch {
      /* ignore */
    }
  }, []);

  // Seed initial HTML once, then leave the DOM alone (so cursor doesn't jump).
  useEffect(() => {
    if (ref.current && !initialized.current && value) {
      ref.current.innerHTML = value;
      initialized.current = true;
    }
  }, [value]);

  // When leaving source view, re-seed the visual editor with latest HTML.
  useEffect(() => {
    if (!showSource && ref.current) {
      ref.current.innerHTML = value || "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSource]);

  const emit = () => onChange(ref.current?.innerHTML || "");

  const saveSel = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount && ref.current?.contains(sel.anchorNode)) {
      savedRange.current = sel.getRangeAt(0).cloneRange();
    }
  };
  const restoreSel = () => {
    const sel = window.getSelection();
    if (savedRange.current && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    }
  };

  const exec = (command: string, arg?: string) => {
    ref.current?.focus();
    restoreSel();
    document.execCommand(command, false, arg);
    emit();
  };

  /** Wrap the current selection in a styled <span> (font-family / size / color). */
  const styleSelection = (style: Partial<CSSStyleDeclaration>) => {
    ref.current?.focus();
    restoreSel();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    const span = document.createElement("span");
    Object.assign(span.style, style);
    try {
      span.appendChild(range.extractContents());
      range.insertNode(span);
      sel.removeAllRanges();
      const r = document.createRange();
      r.selectNodeContents(span);
      sel.addRange(r);
      saveSel();
    } catch {
      /* ignore complex selections */
    }
    emit();
  };

  const onPickImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const r = await uploadFile(file);
        exec("insertImage", r.url);
      } catch {
        /* surfaced by upload helper */
      }
      setUploading(false);
    }
    if (fileRef.current) fileRef.current.value = "";
  };

  /** Import a full .html file → load its body (keeping any <style>) into the editor. */
  const onImportHtml = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const text = await file.text();
      const doc = new DOMParser().parseFromString(text, "text/html");
      const headStyles = Array.from(doc.head?.querySelectorAll("style") ?? [])
        .map((s) => s.outerHTML)
        .join("\n");
      const body = doc.body ? doc.body.innerHTML : text;
      const html = headStyles ? `${headStyles}\n${body}` : body;
      if (ref.current) {
        ref.current.innerHTML = html;
        initialized.current = true;
      }
      setShowSource(false);
      emit();
    }
    if (htmlRef.current) htmlRef.current.value = "";
  };

  /** Insert a simple editable table. */
  const insertTable = () => {
    const rows = parseInt(window.prompt("Rows?", "2") || "0", 10);
    const cols = parseInt(window.prompt("Columns?", "2") || "0", 10);
    if (!rows || !cols) return;
    let html = "<table><tbody>";
    for (let r = 0; r < rows; r++) {
      html += "<tr>";
      for (let c = 0; c < cols; c++) html += "<td>&nbsp;</td>";
      html += "</tr>";
    }
    html += "</tbody></table><p><br/></p>";
    exec("insertHTML", html);
  };

  /** Insert a responsive video / embed (auto-converts YouTube links). */
  const insertEmbed = () => {
    const url = window.prompt("Video / embed URL (YouTube link or iframe src):");
    if (!url) return;
    let src = url.trim();
    const yt = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/);
    if (yt) src = `https://www.youtube.com/embed/${yt[1]}`;
    const html = `<div class="cms-embed"><iframe src="${src}" allowfullscreen loading="lazy"></iframe></div><p><br/></p>`;
    exec("insertHTML", html);
  };

  const Btn = ({
    onClick,
    title,
    active,
    children,
  }: {
    onClick: () => void;
    title: string;
    active?: boolean;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-md border px-2 text-sm transition-colors ${
        active
          ? "border-primary/40 bg-primary/10 text-foreground"
          : "border-transparent bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );

  const Sep = () => <span className="mx-0.5 h-6 w-px bg-border" />;
  const selectClass =
    "h-8 rounded-md border bg-background px-2 text-sm text-foreground hover:border-primary/40 focus:outline-none";

  return (
    <div className="rounded-lg border">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b bg-muted/30 p-2">
        <Btn title="Undo" onClick={() => exec("undo")}><Undo2 className="h-4 w-4" /></Btn>
        <Btn title="Redo" onClick={() => exec("redo")}><Redo2 className="h-4 w-4" /></Btn>
        <Sep />

        {/* Block format */}
        <select
          className={selectClass}
          title="Paragraph style"
          value=""
          onChange={(e) => { if (e.target.value) exec("formatBlock", e.target.value); e.currentTarget.value = ""; }}
        >
          <option value="">Style</option>
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="pre">Code block</option>
        </select>

        {/* Font family */}
        <select
          className={selectClass}
          title="Font"
          value=""
          onChange={(e) => { if (e.target.value) styleSelection({ fontFamily: e.target.value }); e.currentTarget.value = ""; }}
        >
          <option value="">Font</option>
          {FONTS.map((f) => (
            <option key={f.label} value={f.css}>{f.label}</option>
          ))}
        </select>

        {/* Font size */}
        <select
          className={selectClass}
          title="Font size"
          value=""
          onChange={(e) => { if (e.target.value) styleSelection({ fontSize: `${e.target.value}px` }); e.currentTarget.value = ""; }}
        >
          <option value="">Size</option>
          {SIZES.map((s) => (
            <option key={s} value={s}>{s}px</option>
          ))}
        </select>
        <Sep />

        <Btn title="Bold" onClick={() => exec("bold")}><Bold className="h-4 w-4" /></Btn>
        <Btn title="Italic" onClick={() => exec("italic")}><Italic className="h-4 w-4" /></Btn>
        <Btn title="Underline" onClick={() => exec("underline")}><Underline className="h-4 w-4" /></Btn>
        <Btn title="Strikethrough" onClick={() => exec("strikeThrough")}><Strikethrough className="h-4 w-4" /></Btn>

        {/* Text color */}
        <label title="Text color" className="relative inline-flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-md border border-transparent bg-background px-2 text-muted-foreground hover:border-primary/40 hover:text-foreground">
          <Baseline className="h-4 w-4" />
          <input
            type="color"
            className="absolute inset-0 cursor-pointer opacity-0"
            onMouseDown={() => { ref.current?.focus(); saveSel(); }}
            onChange={(e) => exec("foreColor", e.target.value)}
          />
        </label>
        {/* Highlight */}
        <label title="Highlight" className="relative inline-flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-md border border-transparent bg-background px-2 text-muted-foreground hover:border-primary/40 hover:text-foreground">
          <Highlighter className="h-4 w-4" />
          <input
            type="color"
            className="absolute inset-0 cursor-pointer opacity-0"
            onMouseDown={() => { ref.current?.focus(); saveSel(); }}
            onChange={(e) => exec("hiliteColor", e.target.value)}
          />
        </label>
        <Sep />

        <Btn title="Align left" onClick={() => exec("justifyLeft")}><AlignLeft className="h-4 w-4" /></Btn>
        <Btn title="Align center" onClick={() => exec("justifyCenter")}><AlignCenter className="h-4 w-4" /></Btn>
        <Btn title="Align right" onClick={() => exec("justifyRight")}><AlignRight className="h-4 w-4" /></Btn>
        <Btn title="Justify" onClick={() => exec("justifyFull")}><AlignJustify className="h-4 w-4" /></Btn>
        <Sep />

        <Btn title="Heading 1" onClick={() => exec("formatBlock", "h1")}><Heading1 className="h-4 w-4" /></Btn>
        <Btn title="Heading 2" onClick={() => exec("formatBlock", "h2")}><Heading2 className="h-4 w-4" /></Btn>
        <Btn title="Heading 3" onClick={() => exec("formatBlock", "h3")}><Heading3 className="h-4 w-4" /></Btn>
        <Btn title="Paragraph" onClick={() => exec("formatBlock", "p")}><Pilcrow className="h-4 w-4" /></Btn>
        <Btn title="Quote" onClick={() => exec("formatBlock", "blockquote")}><Quote className="h-4 w-4" /></Btn>
        <Btn title="Inline code" onClick={() => styleSelection({ fontFamily: "'Courier New', monospace" })}><Code className="h-4 w-4" /></Btn>
        <Sep />

        <Btn title="Bullet list" onClick={() => exec("insertUnorderedList")}><List className="h-4 w-4" /></Btn>
        <Btn title="Numbered list" onClick={() => exec("insertOrderedList")}><ListOrdered className="h-4 w-4" /></Btn>
        <Sep />

        <Btn title="Insert link" onClick={() => { const u = window.prompt("Link URL:"); if (u) exec("createLink", u); }}><LinkIcon className="h-4 w-4" /></Btn>
        <Btn title="Remove link" onClick={() => exec("unlink")}><Unlink className="h-4 w-4" /></Btn>
        <Btn title="Upload image" onClick={() => fileRef.current?.click()}>
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
        </Btn>
        <Btn title="Image by URL" onClick={() => { const u = window.prompt("Image URL:"); if (u) exec("insertImage", u); }}><ImageIcon className="h-4 w-4 opacity-60" /></Btn>
        <Btn title="Insert table" onClick={insertTable}><TableIcon className="h-4 w-4" /></Btn>
        <Btn title="Embed video (YouTube/iframe)" onClick={insertEmbed}><Youtube className="h-4 w-4" /></Btn>
        <Btn title="Divider" onClick={() => exec("insertHorizontalRule")}><Minus className="h-4 w-4" /></Btn>
        <Btn title="Clear formatting" onClick={() => exec("removeFormat")}><RemoveFormatting className="h-4 w-4" /></Btn>
        <Sep />

        <Btn title="Import HTML file" onClick={() => htmlRef.current?.click()}><FileCode2 className="h-4 w-4" /></Btn>
        <Btn title="HTML source / paste code" active={showSource} onClick={() => { if (!showSource) emit(); setShowSource((s) => !s); }}>
          <Code2 className="h-4 w-4" />
        </Btn>

        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPickImage} />
        <input ref={htmlRef} type="file" accept=".html,.htm,text/html" className="hidden" onChange={onImportHtml} />
      </div>

      {/* Editor / source */}
      {showSource ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="min-h-[320px] w-full resize-y bg-background p-4 font-mono text-xs text-foreground focus:outline-none"
        />
      ) : (
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          onInput={emit}
          onKeyUp={saveSel}
          onMouseUp={saveSel}
          data-placeholder="Write your content here…"
          className="cms-content min-h-[320px] max-w-none p-4 focus:outline-none empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]"
        />
      )}
    </div>
  );
}
