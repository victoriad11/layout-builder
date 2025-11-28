# 📊 Dashboard Layout Builder

A modern, interactive dashboard builder with drag-and-drop functionality.

## ✨ Features

### Core Functionality
- **Drag & Drop Interface**: Add widgets from sidebar to canvas with smooth animations
- **Widget Reordering**: Rearrange widgets on the dashboard by dragging the handle icon
- **Real-time Editing**: Click any widget to edit title and theme in a slide-in panel
- **Persistent State**: All changes automatically saved to localStorage
- **Theme Support**: Light, Dark, and Accent themes for each widget
- **Smooth Animations**: Framer Motion animations for add/remove/reorder actions

### Widget Types
- 📊 **Metric Card**: Display KPIs with trend indicators
- 📝 **Text Block**: Rich text content areas
- 📈 **Chart**: Placeholder for future chart integrations
- ✓ **Todo List**: Interactive task checklists
- 🖼️ **Image Card**: Images with preview functionality

### User Experience
- **Empty State**: Helpful onboarding when dashboard is empty
- **Visual Feedback**: Drag overlay shows what you're dragging
- **Confirmation Modals**: Safety confirmation for destructive actions
- **Responsive Design**: Clean, modern UI that works across screen sizes

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Vite 6.4.1** - Build tool & dev server

### State Management
- **Zustand 5.0.8** - Lightweight state management
- **Zustand Persist** - localStorage integration

### Drag & Drop
- **@dnd-kit/core 6.3.1** - Drag and drop framework
- **@dnd-kit/sortable 10.0.0** - Sortable lists

### UI & Styling
- **Ant Design 5.x** - Component library
- **TailwindCSS 3.4.18** - Utility-first CSS
- **Framer Motion 12.23.24** - Animation library
- **@ant-design/colors** - Design system colors

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd layout-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/              # Layout components
│   │   ├── HeaderBar.tsx    # Top navigation bar
│   │   ├── SidebarLibrary.tsx   # Widget template library
│   │   ├── DashboardCanvas.tsx  # Main canvas area
│   │   └── DragOverlayWrapper.tsx  # Drag preview overlay
│   ├── widgets/             # Widget components
│   │   ├── DashboardWidget.tsx  # Widget wrapper
│   │   ├── MetricWidget.tsx
│   │   ├── TextWidget.tsx
│   │   ├── ChartWidget.tsx
│   │   ├── TodoWidget.tsx
│   │   └── ImageWidget.tsx
│   ├── modals/
│   │   └── ResetConfirmationModal.tsx
│   └── panels/
│       └── WidgetSettingsPanel.tsx
├── hooks/
│   └── useDragAndDrop.ts    # Custom hook for DnD logic
├── store/
│   └── dashboardStore.ts    # Zustand store
├── types/
│   └── widget.types.ts      # TypeScript definitions
├── utils/
│   ├── widgetTemplates.ts   # Widget template configs
│   └── themeStyles.ts       # Theme color utilities
└── App.tsx                  # Root component
```

## 🎯 Key Features Explained

### Drag & Drop System
Uses `@dnd-kit` for a modern, accessible drag-and-drop experience:
- **Pointer & Keyboard sensors** for multi-input support
- **8px activation distance** to prevent accidental drags
- **Sortable context** for smooth reordering
- **Custom drag overlay** showing what's being dragged

### State Management
Zustand store with middleware:
```typescript
- widgets: Array of widget instances
- selectedWidgetId: Currently selected widget
- addWidget, removeWidget, reorderWidgets, updateWidget
- localStorage persistence (key: 'dashboard-storage')
```

### Theme System
Three themes using Ant Design color palette:
- **Light**: White background, dark text
- **Dark**: Dark background (#141414), light text
- **Accent**: Light blue background, blue text

## 🔧 Configuration

## 📝 Development Notes

### Adding New Widget Types
1. Add type to `widget.types.ts`
2. Create widget component in `components/widgets/`
3. Add template to `widgetTemplates.ts`
4. Add case in `DashboardWidget.tsx` switch statement

### Modifying Themes
Update `themeStyles.ts` with new color combinations from `@ant-design/colors`
