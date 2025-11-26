import { Image } from 'antd';
import { WidgetInstance } from '../../types/widget.types';

interface ImageWidgetProps {
  widget: WidgetInstance;
}

export default function ImageWidget({ widget }: ImageWidgetProps) {
  const imageUrl = widget.config.imageUrl || 'https://via.placeholder.com/400x300';

  return (
    <div className="p-4">
      <Image
        src={imageUrl}
        alt={widget.title}
        className="w-full rounded-lg"
        preview={true}
      />
    </div>
  );
}
