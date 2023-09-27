import Tool, { ToolOption } from "@/enums/Tool";
import React from "react";
import ActionsToolbar from "./components/ActionToolbar/ActionsToolbar";
import PainterToolbar from "./components/PainterToolbar/PainterToolbar";

export interface ToolbarProps {
  currentTool: Tool;
  setCurrentTool: (tool: Tool) => void;
  currentToolOption: ToolOption;
  setCurrentToolOption: (option: ToolOption) => void;
  selectImage: (image: string) => void;
  clear: () => void;
  save: () => void;
  scale: number;
  toolbarPlacement: string;
  undo: () => void;
  redo: () => void;
};

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const {
    currentTool,
    setCurrentTool,
    currentToolOption,
    setCurrentToolOption,
    selectImage,
    clear,
    save,
    scale,
    toolbarPlacement,
    undo,
    redo,
  } = props;

  return <>
    <ActionsToolbar
      undo={undo}
      redo={redo}
    />
    <PainterToolbar
      toolbarPlacement={toolbarPlacement}
      currentTool={currentTool}
      setCurrentTool={setCurrentTool}
      currentToolOption={currentToolOption}
      setCurrentToolOption={setCurrentToolOption}
      scale={scale}
      selectImage={selectImage}
      clear={clear}
      save={save}
    />
  </>
};

export default Toolbar;