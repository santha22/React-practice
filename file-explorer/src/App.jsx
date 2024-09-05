// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import explorer from './data/folderData'
import './App.css'
import FileComponent from './FileComponent'
import useTraverseTree from './hooks/use-traverse-tree';

function App() {

  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  }

  return (
    <div>
      <FileComponent handleInsertNode={handleInsertNode} explorer={explorerData}/>
    </div>
  )
}

export default App
