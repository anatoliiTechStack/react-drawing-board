import React, { useContext } from 'react';
import { animated } from 'react-spring';
import Tool from '../../../../enums/Tool';
import UndoIcon from '../../../../svgs/UndoIcon';
import RedoIcon from '../../../../svgs/RedoIcon';
import BackIcon from '../../../../svgs/BackIcon';
import classNames from 'classnames';
import './ActionsToolbar.less';
import { isMobileDevice } from '../../../../utils';
import ConfigContext from '../../../../ConfigContext';
import { useIntl } from 'react-intl';


const tools = [
  {
    label: 'umi.block.sketch.undo',
    icon: UndoIcon,
    type: Tool.Undo,
  },
  {
    label: 'umi.block.sketch.redo',
    icon: RedoIcon,
    type: Tool.Redo,
  },
];

export interface ActionsToolbarProps {
  undo: () => void;
  redo: () => void;
}

const ActionsToolbar: React.FC<ActionsToolbarProps> = (props) => {
  const {
    undo,
    redo,
  } = props;
  const { prefixCls } = useContext(ConfigContext);
  const { formatMessage } = useIntl();

  const toolbarPrefixCls = prefixCls + '-actions-toolbar';

  return (
    <div
      className={classNames({
        [`${toolbarPrefixCls}-container`]: true,
        [`${toolbarPrefixCls}-mobile-container`]: isMobileDevice,
      })}
    >
      <div className={`${toolbarPrefixCls}-back-button`}>
        <BackIcon />
        <span>
          {formatMessage({ id: 'umi.block.sketch.back' })}
        </span>
      </div>
      <div className={`${toolbarPrefixCls}-separator`} />
      {tools.map((tool) => {

        const menu = (
          <animated.div
            className={classNames({
              [`${toolbarPrefixCls}-icon`]: true,
              [`${toolbarPrefixCls}-mobile-icon`]: isMobileDevice,
            })}
            onClick={() => {
              if (tool.type === Tool.Undo) {
                undo();
              } else if (tool.type === Tool.Redo) {
                redo();
              };
            }}
            key={tool.label}
          >
            <tool.icon />
          </animated.div>
        );


        return menu;

      })}
    </div>
  );
};

export default ActionsToolbar;