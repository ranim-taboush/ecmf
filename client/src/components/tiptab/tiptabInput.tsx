// "use client";
// import { useState, useEffect } from "react";
// import { RoomProvider } from "../../../liveblocks.config";
import { Editor } from "@/components/tiptab/editor";

export default function TipTabInput(
  { docu, setDocu }: {docu: any, setDocu: any}
  ) {
    // const [docu, setDocu] = useState('')
    // useEffect(()=>{
    //   console.log('docu', docu)
    // }, [docu])
    const handleSubmit = () =>{
      console.log('submitting...')
    }

  return (<div>
    <Editor setDocu={setDocu} />
    {/* <button className="px-6 py-2 bg-blue-700 text-white text-xl rounded-lg mx-auto block"
    onClick={handleSubmit}>
        Submit
    </button>
    <div className="tiptab-document" dangerouslySetInnerHTML={{ __html: docu }}></div> */}
  </div>);
}