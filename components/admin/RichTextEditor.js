"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export default function RichTextEditor({ label, value, onChange, placeholder }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: { openOnClick: false, autolink: true } }),
      Placeholder.configure({ placeholder: placeholder || "Start writing..." }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "rich-content min-h-[180px] px-3 py-2 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  return (
    <div>
      {label && <label className="block text-sm mb-1">{label}</label>}
      <div className="border border-border rounded overflow-hidden">
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function Toolbar({ editor }) {
  const buttons = [
    { label: "B", title: "Bold", active: "bold", run: () => editor.chain().focus().toggleBold().run(), className: "font-bold" },
    { label: "I", title: "Italic", active: "italic", run: () => editor.chain().focus().toggleItalic().run(), className: "italic" },
    { label: "S", title: "Strike", active: "strike", run: () => editor.chain().focus().toggleStrike().run(), className: "line-through" },
    { label: "H2", title: "Heading", active: "heading", activeAttrs: { level: 2 }, run: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: "H3", title: "Subheading", active: "heading", activeAttrs: { level: 3 }, run: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { label: "•", title: "Bullet List", active: "bulletList", run: () => editor.chain().focus().toggleBulletList().run() },
    { label: "1.", title: "Ordered List", active: "orderedList", run: () => editor.chain().focus().toggleOrderedList().run() },
    { label: "❝", title: "Quote", active: "blockquote", run: () => editor.chain().focus().toggleBlockquote().run() },
  ];

  function setLink() {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border bg-gold-light/40 px-2 py-1">
      {buttons.map((b) => (
        <button
          key={b.title}
          type="button"
          title={b.title}
          onClick={b.run}
          className={`w-7 h-7 text-xs rounded flex items-center justify-center text-[#132c47] transition-colors ${b.className || ""} ${
            editor.isActive(b.active, b.activeAttrs) ? "bg-[#770800] !text-white" : "hover:bg-white"
          }`}
        >
          {b.label}
        </button>
      ))}
      <button
        type="button"
        title="Link"
        onClick={setLink}
        className={`w-7 h-7 text-xs rounded flex items-center justify-center text-[#132c47] transition-colors ${
          editor.isActive("link") ? "bg-[#770800] !text-white" : "hover:bg-white"
        }`}
      >
        🔗
      </button>
      <button
        type="button"
        title="Undo"
        onClick={() => editor.chain().focus().undo().run()}
        className="w-7 h-7 text-xs rounded flex items-center justify-center text-[#132c47] transition-colors hover:bg-white"
      >
        ↺
      </button>
      <button
        type="button"
        title="Redo"
        onClick={() => editor.chain().focus().redo().run()}
        className="w-7 h-7 text-xs rounded flex items-center justify-center text-[#132c47] transition-colors hover:bg-white"
      >
        ↻
      </button>
    </div>
  );
}
