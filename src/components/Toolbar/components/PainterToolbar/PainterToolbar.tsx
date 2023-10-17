import React, { useRef, ChangeEventHandler, useContext } from 'react';
import { animated } from 'react-spring';
import Tool, { ToolOption } from '../../../../enums/Tool';
import SelectIcon from '../../../../svgs/SelectIcon';
import StrokeIcon from '../../../../svgs/StrokeIcon';
import ShapeIcon from '../../../../svgs/ShapeIcon';
import TextIcon from '../../../../svgs/TextIcon';
import ImageIcon from '../../../../svgs/ImageIcon';
import ClearIcon from '../../../../svgs/ClearIcon';
import ZoomIcon from '../../../../svgs/ZoomIcon';
import SaveIcon from '../../../../svgs/SaveIcon';
import FillIcon from '../../../../svgs/FillIcon';

import EraserIcon from '../../../../svgs/EraserIcon';
import { useStrokeDropdown } from '../../../../StrokeTool';
import { useShapeDropdown } from '../../../../ShapeTool';
import { Dropdown } from 'antd';
import classNames from 'classnames';
import './PainterToolbar.less';
import { isMobileDevice } from '../../../../utils';
import ConfigContext from '../../../../ConfigContext';
import EnableSketchPadContext from '../../../../contexts/EnableSketchPadContext';

const tools = [
  {
    label: 'umi.block.sketch.select',
    icon: SelectIcon,
    type: Tool.Select,
  },
  {
    label: 'umi.block.sketch.pencil',
    icon: StrokeIcon,
    type: Tool.Stroke,
    useDropdown: useStrokeDropdown,
  },
  {
    label: 'umi.block.sketch.shape',
    icon: ShapeIcon,
    type: Tool.Shape,
    useDropdown: useShapeDropdown,
  },
  {
    label: 'umi.block.sketch.text',
    icon: TextIcon,
    type: Tool.Text,
  },
  {
    label: 'umi.block.sketch.image',
    icon: ImageIcon,
    type: Tool.Image,
  },
  {
    label: 'umi.block.sketch.eraser',
    icon: EraserIcon,
    type: Tool.Eraser,
  },
  {
    label: 'umi.block.sketch.clear',
    icon: ClearIcon,
    type: Tool.Clear,
  },
  {
    label: 'umi.block.sketch.fill',
    icon: FillIcon,
    type: Tool.Fill,
  },
  ...(!isMobileDevice
    ? [
      {
        label: '100%',
        labelThunk: (props: PainterToolbarProps) => `${~~(props.scale * 100)}%`,
        icon: ZoomIcon,
        type: Tool.Zoom,
      },
    ]
    : []),
  ...(!isMobileDevice
    ? [
      {
        label: 'umi.block.sketch.save',
        icon: SaveIcon,
        type: Tool.Save,
      },
    ]
    : []),
];

export interface PainterToolbarProps {
  currentTool: Tool;
  setCurrentTool: (tool: Tool) => void;
  currentToolOption: ToolOption;
  setCurrentToolOption: (option: ToolOption) => void;
  selectImage: (image: string) => void;
  clear: () => void;
  save: () => void;
  scale: number;
  toolbarPlacement: string;
  
}

const PainterToolbar: React.FC<PainterToolbarProps> = (props) => {
  const {
    currentTool,
    setCurrentTool,
    currentToolOption,
    setCurrentToolOption,
    selectImage,
    clear,
    save,
    toolbarPlacement,
    
  } = props;
  const refFileInput = useRef<HTMLInputElement>(null);
  const { prefixCls } = useContext(ConfigContext);
  const enableSketchPadContext = useContext(EnableSketchPadContext);

  const toolbarPrefixCls = prefixCls + '-toolbar';

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result;
        selectImage(base64data as string);
      };
    }
  };

  return (
    <div
      className={classNames({
        [`${toolbarPrefixCls}-container`]: true,
        [`${toolbarPrefixCls}-mobile-container`]: isMobileDevice,
      })}
    >
      {tools.map((tool) => {
        const menu = (
          <animated.div
            className={classNames({
              [`${toolbarPrefixCls}-icon`]: true,
              [`${toolbarPrefixCls}-activeIcon`]: currentTool === tool.type && !isMobileDevice,
              [`${toolbarPrefixCls}-mobile-icon`]: isMobileDevice,
            })}
            onClick={() => {
              if (tool.type === Tool.Image && refFileInput.current) {
                refFileInput.current.click();
              } else if (tool.type === Tool.Clear) {
                clear();
              } else if (tool.type === Tool.Zoom) {
              } else if (tool.type === Tool.Save) {
                save();
              } else {
                setCurrentTool(tool.type);
              }
            }}
            key={tool.label}
          >
            <tool.icon />
          </animated.div>
        );

        if (tool.useDropdown) {
          const overlay = tool.useDropdown(
            currentToolOption,
            setCurrentToolOption,
            setCurrentTool,
            prefixCls,
          );

          return (
            <Dropdown
              key={tool.label}
              overlay={overlay}
              placement={
                toolbarPlacement === 'top' || toolbarPlacement === 'left'
                  ? 'bottomLeft'
                  : 'bottomRight'
              }
              trigger={[isMobileDevice ? 'click' : 'hover']}
              onVisibleChange={(visible) => {
                enableSketchPadContext.setEnable(!visible);
              }}
            >
              {menu}
            </Dropdown>
          );
        } else {
          return menu;
        }
      })}

      <input
        type="file"
        style={{ display: 'none' }}
        accept="image/jpeg, image/png"
        ref={refFileInput}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default PainterToolbar;
