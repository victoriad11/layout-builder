import { Image } from 'antd';
import { WidgetInstance } from '../../../types';
import { CHART_CONFIG } from '../../../constants';
import { DEFAULT_IMAGE_URL } from '../../../config';

interface ImageWidgetProps {
  widget: WidgetInstance;
}

function ImageWidget({ widget }: ImageWidgetProps) {
  const imageUrl = widget.config.imageUrl || DEFAULT_IMAGE_URL;

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="p-4">
      <div onClick={handleContainerClick}>
        <Image
          src={imageUrl}
          alt={widget.title}
          width="100%"
          className="rounded-lg"
          style={{ objectFit: 'cover', maxHeight: `${CHART_CONFIG.DEFAULT_HEIGHT}px`, display: 'block' }}
          preview={true}
        />
      </div>
    </div>
  );
}

export { ImageWidget }