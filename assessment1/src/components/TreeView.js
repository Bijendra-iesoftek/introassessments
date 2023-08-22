import React, { useState } from 'react';
import { CustomTreeView } from "./CoustomTreeView";

export const TreeView = () => {
    const rootNode = {
      id: '1',
      label: 'Main',
      children: [],
    };
  
    const [expanded, setExpanded] = useState({});
  
    const handleNodeToggle = (nodeId) => {
      setExpanded((prevExpanded) => ({
        ...prevExpanded,
        [nodeId]: !prevExpanded[nodeId],
      }));
    };
  
    return (
      <div>
        <CustomTreeView node={rootNode} expanded={expanded} onNodeToggle={handleNodeToggle} />
      </div>
    );
  };