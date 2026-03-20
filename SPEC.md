# Restaurant Menu & Social Image Generator

## Project Overview
- **Project name**: MenuForge
- **Type**: Web application (Node.js + Vanilla JS frontend)
- **Core functionality**: Multi-step form to create restaurant profiles with menus, then generate social media images
- **Target users**: Restaurant owners wanting to create promotional images for social networks

## UI/UX Specification

### Layout Structure
- Single page with centered card (max-width: 600px)
- Progress indicator showing current step
- Steps: 1. Restaurant Info → 2. Menu → 3. Schedule → 4. Generate

### Visual Design

**Color Palette**
- Background: `#0a0a0a` (deep black)
- Card: `#141414` (dark gray)
- Primary accent: `#e85d04` (burnt orange)
- Secondary: `#faa307` (golden yellow)
- Text primary: `#f5f5f5`
- Text muted: `#8a8a8a`
- Border: `#2a2a2a`

**Typography**
- Headings: "Playfair Display", serif (elegant restaurant feel)
- Body: "DM Sans", sans-serif
- Step titles: 28px, font-weight 600
- Labels: 14px, font-weight 500, uppercase, letter-spacing 1px
- Inputs: 16px

**Spacing**
- Card padding: 48px
- Section gaps: 32px
- Input gaps: 20px
- Border radius (card): 16px
- Border radius (inputs/buttons): 8px

**Visual Effects**
- Card: subtle box-shadow with orange glow on hover
- Inputs: border transition on focus (gray → orange)
- Buttons: scale(1.02) on hover with background transition
- Progress bar: gradient from orange to golden with animated fill
- Step transitions: fade + slide animation

### Components

**Progress Indicator**
- Horizontal bar with 4 numbered steps
- Active step: orange circle with number
- Completed steps: filled orange with checkmark
- Upcoming steps: gray outline

**Form Inputs**
- Dark background (#1a1a1a)
- Orange border on focus
- Placeholder text in muted gray
- File upload with drag-and-drop zone

**Buttons**
- Primary: Orange gradient background, white text
- Secondary: Transparent with orange border
- Disabled: 50% opacity

**Menu Items**
- Add/remove dynamic fields
- Each item: name, description, price fields
- Drag handle for reordering (optional)

**Schedule**
- Day selector (Mon-Sun checkboxes)
- Time range picker (open/close hours)

**Image Preview**
- Canvas-based preview
- Download button for PNG
- Format options: Instagram (1080x1080), Facebook (1200x630), Story (1080x1920)

## Functionality Specification

### Backend (Express.js)
- REST API endpoints:
  - `POST /api/restaurants` - Create restaurant with logo upload
  - `GET /api/restaurants` - List all restaurants
  - `GET /api/restaurants/:id` - Get restaurant details
  - `DELETE /api/restaurants/:id` - Delete restaurant
- File upload handling (multer)
- Data storage: JSON file (simple, no database needed)
- Serve static files

### Frontend Features

**Step 1: Restaurant Info**
- Restaurant name input (required)
- Logo upload (image, optional) - drag & drop or click
- Cuisine type (optional)
- Description textarea

**Step 2: Menu**
- Dynamic menu items list
- Each item: dish name, description, price
- Add new item button
- Remove item button
- At least 1 item required

**Step 3: Schedule**
- Select days open (checkboxes)
- Lunch time range (start/end)
- Dinner time range (start/end)

**Step 4: Generate & Preview**
- Select image format
- Live preview canvas
- Download button
- Back to edit option

### Data Handling
- Restaurant data stored in `data/restaurants.json`
- Logos saved to `uploads/logos/`
- Generated images created client-side with Canvas API

### Edge Cases
- No menu items: show validation error
- Missing restaurant name: show validation error
- Invalid image format: show error message
- Empty schedule: allow (optional)

## Acceptance Criteria
1. ✅ Multi-step form navigates smoothly with progress indication
2. ✅ Restaurant can be created with name, logo, menu, and schedule
3. ✅ Data persists in backend (JSON file)
4. ✅ Can add multiple restaurants
5. ✅ Social media images generate correctly in 3 formats
6. ✅ Images can be downloaded
7. ✅ Form validates required fields
8. ✅ Responsive on mobile devices
