import { Typography } from 'antd';
import { WidgetInstance } from '../../../types';
import { getThemeStyles } from '../../../utils';
import { DEFAULT_TEXT_CONTENT } from '../../../config';

const { Paragraph } = Typography;

interface TextWidgetProps {
  widget: WidgetInstance;
}

function TextWidget({ widget }: TextWidgetProps) {
  const content = widget.config.content || DEFAULT_TEXT_CONTENT;
  const themeStyles = getThemeStyles(widget.config.theme);

  return (
    <div className="p-4">
      <Paragraph className="mb-0" style={{ color: themeStyles.textColor }}>
        {content}
      </Paragraph>
    </div>
  );
}

export { TextWidget }