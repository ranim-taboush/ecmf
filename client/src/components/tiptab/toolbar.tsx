import { useState } from "react";
import { Editor } from "@tiptap/react";
import { 
  Heading1, 
  Heading2, 
  Heading3, 
  Heading4, 
  Heading5, 
  Heading6, 
  ListOrdered,
  List,
  Italic,
  Bold,
  MinusSquare,
  Strikethrough,
  XSquare,
  Highlighter,
  Baseline,
  AlignCenter, 
  AlignLeft, 
  AlignRight, 
  AlignJustify
} from "lucide-react";

type Props = {
  editor: Editor | null;
};

export function Toolbar({ editor }: Props) {
  const [activeColor, 
    setActiveColor] = useState('#000')
  const styles = "flex-default cursor-pointer rounded-lg h-6 w-fit px-1 bg-white text-blue-800 border-none shadow-lg hover:text-blue-200 hover:bg-gray-800 focus-visible:outline-offset-2 active:shadow-blue-950 disabled:bg-gray-200 disabled:text-gray-700 relative"
  if (!editor) {
    return null;
  }

  return (
    <div className="flex p-1 gap-6 max-xl:gap-2 flex-wrap h-1/4">
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleBold().run()}}
        disabled={
          !editor.can().chain().focus().toggleBold().run()
        }
        className={`${editor.isActive('bold') ? 'is-active' : ''} ${styles} group/bold`}
      >
        <Bold size={10} />
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/bold:scale-100">
          Bold text
        </span>
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleItalic().run()}}
        disabled={
          !editor.can().chain().focus().toggleItalic().run()
        }
        className={`${editor.isActive('italic') ? 'is-active' : ''} ${styles} group/italic`}
      >
        <Italic size={10} />
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/italic:scale-100">
          Italic text
        </span>
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleStrike().run()}}
        disabled={
          !editor.can().chain().focus().toggleStrike().run()
        }
        className={`${editor.isActive('strike') ? 'is-active' : ''} ${styles} group/strike`}
      >
        <Strikethrough size={10} />
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/strike:scale-100">
          Line through text
        </span>
      </button>
      {/* <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleCode().run()}}
        disabled={
          !editor.can().chain().focus().toggleCode().run()
        }
        className={`${editor.isActive('code') ? 'is-active' : ''} ${styles}`}
      >
        code
      </button> */}
      <button onClick={(e) => {e.preventDefault(); editor.chain().focus().unsetAllMarks().clearNodes().run()}}
      className={`text-red-600 ${styles} group/clear`}>
        <XSquare size={10} />
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/clear:scale-100">
          Clear all styles
        </span>
      </button>
      {/* <button
        onClick={(e) => {e.preventDefault();  editor.chain().focus().setParagraph().run()}}
        className={`${editor.isActive('paragraph') ? 'is-active' : ''} ${styles}`}
      >
        paragraph
      </button> */}
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run()}}
        className={`${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''} ${styles} group/h1`}
      >
        <Heading1 size={10} />
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/h1:scale-100">
          h1 tag
        </span>
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run()}}
        className={`${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''} ${styles} group/h2`}
      >
        <Heading2 size={10} />
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/h2:scale-100">
          h2 tag
        </span>
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run()}}
        className={`${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''} ${styles} group/h3`}
      >
        <Heading3 size={10} />
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/h3:scale-100">
          h3 tag
        </span>
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleHeading({ level: 4 }).run()}}
        className={`${editor.isActive('heading', { level: 4 }) ? 'is-active' : ''} ${styles} group/h4`}
      >
        <Heading4 size={10} />
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/h4:scale-100">
          h4 tag
        </span>
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleHeading({ level: 5 }).run()}}
        className={`${editor.isActive('heading', { level: 5 }) ? 'is-active' : ''} ${styles} group/h5`}
      >
        <Heading5 size={10} />
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/h5:scale-100">
          h5 tag
        </span>
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleHeading({ level: 6 }).run()}}
        className={`${editor.isActive('heading', { level: 6 }) ? 'is-active' : ''} ${styles} group/h6`}
      >
        <Heading6 size={10} />
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/h6:scale-100">
          h6 tag
        </span>
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleBulletList().run()}}
        className={`${editor.isActive('bulletList') ? 'is-active' : ''} ${styles} group/ul`}
      >
        <List size={10} />
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/ul:scale-100">
          Bullet list
        </span>
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleOrderedList().run()}}
        className={`${editor.isActive('orderedList') ? 'is-active' : ''} ${styles} group/ol`}
      >
        <ListOrdered size={10} />
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/ol:scale-100">
          Bullet list
        </span>
      </button>
      {/* <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleCodeBlock().run()}}
        className={`${editor.isActive('codeBlock') ? 'is-active' : ''} ${styles}`}
      >
        code block
      </button> */}
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().setTextAlign('left').run()}}
        className={`${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''} ${styles} group/left`}
      >
        <AlignLeft size={10} />
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/left:scale-100">
          Align text to left
        </span>
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().setTextAlign('center').run()}}
        className={`${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''} ${styles} group/center`}
      >
        <AlignCenter size={10} />
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/center:scale-100">
          Align text to center
        </span>
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().setTextAlign('right').run()}}
        className={`${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''} ${styles} group/right`}
      >
        <AlignRight size={10} />
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/right:scale-100">
          Align text to right
        </span>
      </button>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().setTextAlign('justify').run()}}
        className={`${editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''} ${styles} group/justify`}
      >
        <AlignJustify size={10} />
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/justify:scale-100">
          Justify Text
        </span>
      </button>
      <button onClick={(e) => {e.preventDefault(); editor.chain().focus().setHorizontalRule().run()}}
      className={`${styles} group/hr`}>
        <MinusSquare size={10} />
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/hr:scale-100">
          Add horizontal line
        </span>
      </button>
      {/* <button onClick={(e) => {e.preventDefault(); editor.chain().focus().setHardBreak().run()}}
      className={styles}>
        hard break
      </button> */}
      {/* <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().undo().run()}}
        disabled={ !editor.can().chain().focus().undo().run() } 
        className={styles}>
        undo
      </button> */}
      {/* <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().redo().run()}}
        disabled={ !editor.can().chain().focus().redo().run() } 
        className={styles}>
        redo
      </button> */}
      <div
        className={`${editor.isActive('textStyle') ? 'is-active' : ''} flex justify-center items-center gap-2 group/color ${styles}`}
      >
        <Baseline size={10} style={{color: activeColor}}
        onClick={(e) => {e.preventDefault(); editor.chain().focus().setColor(activeColor).run()}}/>
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/color:scale-100">
          Choose color then press on the icon to change color
        </span>
        <input type="color" id="favcolor" name="favcolor" value={activeColor} onChange={(e)=>setActiveColor(e.target.value)} className="w-4 h-4" />
      </div>
      <button
        onClick={(e) => {e.preventDefault(); editor.chain().focus().toggleHighlight().run()}}
        className={`${editor.isActive('highlight') ? 'is-active' : ''} group/marker`}
      >
        <span className="absolute scale-0 bottom-full left-1/2 -translate-x-1/2 w-32 h-fit bg-gray-200 text-black text-xs group-hover/marker:scale-100">
          Highlight text
        </span>
        <Highlighter size={10} className={` text-black fill-yellow-200 ${styles}`}/>
      </button>

    </div>
  );
  
}