import React, { useState, useEffect } from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useDispatch, useSelector } from 'react-redux';
import { addNodeMiddleware, deleteNodeMiddleware } from '../redux/post/postAction';

export const CustomTreeView = ({ node, expanded, onNodeToggle }) => {
  const [inputValue, setInputValue] = useState('');
  const [treeData, setTreeData] = useState([node]);
  const dispatch = useDispatch();
  const s = useSelector(state => state.treeData);

  useEffect(() => {
    console.log('State', s);
  }, [s]);
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButton1Click = (parentId) => {
    if (inputValue.trim() !== '') {
      const newNode = {
        id: Date.now().toString(),
        label: inputValue,
        children: [],
      };
      setTreeData((prevTreeData) => {
        const updatedTreeData = [...prevTreeData];
        const parentNode = findNode(updatedTreeData, parentId);
        if (parentNode) {
          parentNode.children.push(newNode);
        }
        return updatedTreeData;
      });
      
      dispatch(addNodeMiddleware(parentId, newNode));
      setInputValue('');
    }
  };
  

  const handleButton2Click = (parentId) => {
    if (inputValue.trim() !== '') {
      
      setTreeData((prevTreeData) => {
        const updatedTreeData = [...prevTreeData];
        const parentNode = findNode(updatedTreeData, parentId);
        if (parentNode) {
          const filteredChildren = parentNode.children.filter(
            (child) => child.label !== inputValue
            );
            parentNode.children = filteredChildren;
          }
          return updatedTreeData;
        });
        
      dispatch(deleteNodeMiddleware(parentId, inputValue));
      setInputValue('');
    }
  };

  const findNode = (nodes, nodeId) => {
    for (const node of nodes) {
      if (node.id === nodeId) {
        return node;
      }
      if (node.children.length > 0) {
        const foundNode = findNode(node.children, nodeId);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return null;
  };

  const renderChildren = (nodes) => {
    return nodes.map((childNode) => (
      <TreeItem
        key={childNode.id}
        nodeId={childNode.id}
        label={renderLabel(childNode)}
        expanded={expanded[childNode.id]}
        onLabelClick={() => onNodeToggle(childNode.id)}
      >
        {renderChildren(childNode.children)}
      </TreeItem>
    ));
  };
  

  const renderLabel = (node) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {node.label}
      <TextField
        label="Input Field"
        variant="outlined"
        size="small"
        style={{ marginLeft: '10px' }}
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: '10px' }}
        onClick={() => handleButton1Click(node.id)}
      >
        Add
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginLeft: '10px' }}
        onClick={() => handleButton2Click(node.id)}
      >
        Delete
      </Button>
    </div>
  );

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {renderChildren(treeData)}
    </TreeView>
  );
};


