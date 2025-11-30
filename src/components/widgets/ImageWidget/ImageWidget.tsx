import { Image } from 'antd';
import { WidgetInstance } from '../../../types';

interface ImageWidgetProps {
  widget: WidgetInstance;
}

function ImageWidget({ widget }: ImageWidgetProps) {
  const imageUrl = widget.config.imageUrl || 'https://placehold.co/400x300/e0f2fe/0958d9?text=Dashboard+Image';

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="p-4">
      <div onClick={handleContainerClick} className='w-fit'>
        <Image
          src={imageUrl}
          alt={widget.title}
          className="w-full rounded-lg"
          preview={true}
        />
      </div>
    </div>
  );
}

export { ImageWidget }