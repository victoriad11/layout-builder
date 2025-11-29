import { Typography } from 'antd';
import { WidgetInstance } from '../../../types/widget.types';
import { getThemeStyles } from '../../../utils/themeStyles';

const { Paragraph } = Typography;

interface TextWidgetProps {
  widget: WidgetInstance;
}

export default function TextWidget({ widget }: TextWidgetProps) {
  const content = widget.config.content || 'Add your text content here...';
  const themeStyles = getThemeStyles(widget.config.theme);

  return (
    <div className="p-4">
      <Paragraph className="mb-0" style={{ color: themeStyles.textColor }}>
        {content}
      </Paragraph>
    </div>
  );
}
