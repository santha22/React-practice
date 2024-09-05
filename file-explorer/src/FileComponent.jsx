import React, { useState } from 'react'

const FileComponent = ({ handleInsertNode, explorer }) => {

  const [expand, setExapand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExapand(true);
    setShowInput({
      visible: true,
      isFolder: isFolder
    })
  }

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);

      setShowInput({ ...showInput, visible: false });
    }
  }

  if (explorer.isFolder) {
    return (
        <div className='mt-[5px]'>
          <div className='folder mt-[6px] bg-gray-200 flex justify-between p-[3px] w-[300px] cursor-pointer' onClick={() => setExapand(!expand)}>
            <span className='mt-0 mr-[5px] mb-[2px] ml-0'>📁 {explorer.name}</span> 

            <div>
              <button className='text-[15px] bg-white border-black border-2' onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
              <button className='text-[15px] bg-white border-black border-2' onClick={(e) => handleNewFolder(e, false)}>File +</button>

            </div>
          </div>

          <div className={`${expand ? 'block' : 'hidden'} p-3`}>
            {
              showInput.visible && (
                <div className='inputContainer'>
                  <span className='mt-[5px]'>{showInput.isFolder ? "📁" : "📄"}</span>
                  <input
                    type="text"
                    onKeyDown={onAddFolder}
                    onBlur={() => setShowInput({ ...showInput, visible: false})}
                    className='inputContainer__input border-2' 
                    autoFocus
                  />
                </div>
              )
            }

            {explorer.items.map((exp) => {
              return <FileComponent 
                        handleInsertNode={handleInsertNode} 
                        explorer={exp}
                     />
            })}
          </div>
          
    
      </div>
    ) 
} else {
    return <span className='file mt-[5px] pl-[5px] flex flex-col'>📄 {explorer.name}</span>
  }
}

export default FileComponent;
