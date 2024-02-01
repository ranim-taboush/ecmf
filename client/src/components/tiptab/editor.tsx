"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
// import TextDirection from 'tiptap-text-direction-extension';
import * as Y from "yjs";
import { Color } from '@tiptap/extension-color'
import { Highlight } from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import LiveblocksProvider from "@liveblocks/yjs";
// import { useRoom, useSelf } from "../../../liveblocks.config";
import { useEffect, useState, FC } from "react";
import { Toolbar } from "./toolbar";

export function Editor({ setDocu }: { setDocu: any }){
  const editor = useEditor({
    editorProps: {
      attributes: {
        // Add styles to editor element
        // class: styles.editor,
      },
    },
    
    onUpdate({ editor }) {
      setDocu(editor.getHTML());
      console.log(editor.getHTML())
    },

    extensions: [
      StarterKit.configure({
        history: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Document, Paragraph, Text, TextStyle, Color, Highlight, 
      // TextDirection
    ],
  });

  return (<div className="w-full mx-auto py-4">      
      <div className="">
        <Toolbar editor={editor} />
      </div>
      <div className="mt-10 border border-white rounded-sm p-2">
        <EditorContent editor={editor} />
      </div>
    </div>)
}
