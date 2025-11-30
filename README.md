# 📊 Dashboard Layout Builder

A modern, interactive dashboard builder with drag-and-drop functionality and comprehensive widget content editing capabilities.

## ✨ Features

### Core Functionality
- **Drag & Drop Interface**: Add widgets from sidebar to canvas with smooth animations
- **Widget Reordering**: Rearrange widgets on the dashboard by dragging the handle icon
- **Real-time Editing**: Click any widget to edit title, theme, and widget-specific content
- **Content Editing**: Full support for editing widget data (metrics, text, images, charts, todos)
- **Persistent State**: All changes automatically saved to localStorage
- **Theme Support**: Light, Dark, and Accent themes for each widget with Ant Design colors
- **Smooth Animations**: Framer Motion animations for add/remove/reorder actions

### Widget Types & Capabilities

#### 📊 Metric Card
- Display KPIs with dynamic trend indicators
- Edit metric values in real-time
- Smart arrows: green ↑ for positive, red ↓ for negative, none for zero
- Color-coded values based on positive/negative

#### 📝 Text Block
- Rich text content areas
- Editable text content via settings panel
- Theme-aware text rendering

#### 📈 Chart Widget (Recharts Integration)
- **4 Chart Types**: Line, Bar, Area, and Pie charts
- **Interactive Data Editing**: Add, edit, and remove data points
- **Chart Type Switcher**: Change chart type on the fly
- **Theme-Aware**: All charts adapt to widget theme (light/dark/accent)
- **Professional Styling**: Tooltips, grids, legends with consistent design

#### ✓ Todo List
- Interactive task checklists with checkboxes
- **Persistent State**: Checked/unchecked state survives page refresh
- Add, edit, and remove todo items
- Empty state encouragement when no tasks

#### 🖼️ Image Card
- Images with live preview
- Editable image URLs
- Responsive image rendering with proper sizing

### User Experience
- **Empty State**: Helpful onboarding when dashboard is empty
- **Widget Empty States**: Contextual messages for empty widgets
- **Visual Feedback**: Drag overlay shows what you're dragging
- **Confirmation Modals**: Safety confirmation for destructive actions
- **Responsive Design**: Clean, modern UI that works across screen sizes
- **Scroll-friendly**: Large padding at bottom ensures easy widget dropping

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

### Data Visualization
- **Recharts 2.x** - Composable charting library built on React components

### UI & Styling
- **Ant Design 5.x** - Component library
- **TailwindCSS 3.4.18** - Utility-first CSS
- **Framer Motion 12.23.24** - Animation library
- **@ant-design/colors** - Design system color palette

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
│   ├── widgets/             # Widget components (folder-based)
│   │   ├── MetricWidget/
│   │   │   ├── MetricWidget.tsx
│   │   │   ├── utils.tsx    # Arrow and color logic
│   │   │   └── index.ts
│   │   ├── TextWidget/
│   │   │   ├── TextWidget.tsx
│   │   │   └── index.ts
│   │   ├── ChartWidget/
│   │   │   ├── ChartWidget.tsx
│   │   │   ├── utils.tsx    # Chart rendering logic
│   │   │   └── index.ts
│   │   ├── TodoWidget/
│   │   │   ├── TodoWidget.tsx
│   │   │   └── index.ts
│   │   ├── ImageWidget/
│   │   │   ├── ImageWidget.tsx
│   │   │   └── index.ts
│   │   └── DashboardWidget.tsx  # Widget wrapper with forwardRef
│   ├── modals/
│   │   └── ResetConfirmationModal.tsx
│   └── panels/
│       └── WidgetSettingsPanel.tsx  # Settings panel UI
├── hooks/
│   ├── useDragAndDrop.ts    # Custom hook for DnD logic
│   └── useWidgetSettings.ts # Custom hook for settings panel logic
├── store/
│   └── dashboardStore.ts    # Zustand store
├── types/
│   ├── index.ts             # Type exports
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
- **Dark**: Dark gray background (gray[9]), light text (gray[2])
- **Accent**: Light blue background (blue[0]), blue text (blue[6])

All colors sourced from `@ant-design/colors` for consistency and maintainability.

### Chart Widget Features
The Chart widget uses **Recharts** for professional data visualization:
- **4 Chart Types**: Seamlessly switch between Line, Bar, Area, and Pie charts
- **Data Management**: Add, edit, and remove data points via settings panel
- **Theme Integration**: Charts automatically adapt colors to widget theme
- **Interactive Elements**: Tooltips, legends, and hover effects
- **Responsive**: Charts resize properly within widget containers

## 🔧 Configuration

## 📝 Development Notes

### Adding New Widget Types
1. Add type to `types/widget.types.ts`
2. Create widget folder in `components/widgets/YourWidget/`
   - `YourWidget.tsx` - Component file
   - `utils.tsx` - Optional utility functions
   - `index.ts` - Barrel export
3. Add template to `utils/widgetTemplates.ts`
4. Add case in `DashboardWidget.tsx` switch statement
5. Add content editing support in:
   - `hooks/useWidgetSettings.ts` - Add handlers
   - `components/panels/WidgetSettingsPanel.tsx` - Add UI

### Modifying Themes
Update `utils/themeStyles.ts` with new color combinations from `@ant-design/colors`

### Code Patterns Used
- **Folder-based Widget Organization**: Each widget in its own folder with utils
- **Custom Hooks**: Logic extracted from components (e.g., `useWidgetSettings`, `useDragAndDrop`)
- **Ant Design Colors**: All colors use `@ant-design/colors` tokens (no hardcoded hex)
- **Named Exports**: Using `export { Component }` pattern
- **forwardRef**: For components used with Framer Motion
- **Auto-save**: All changes persist immediately to localStorage via Zustand
