# Admin Panel

A modern, fully functional admin panel built with HTML, CSS, and JavaScript with keyboard shortcuts and detailed button guides.

## Features

✅ **Dashboard** - Overview with statistics cards  
✅ **User Management** - Add, edit, and delete users  
✅ **Settings** - Configure admin panel settings  
✅ **Help/Keys Guide** - Comprehensive keyboard shortcuts and button documentation  
✅ **Keyboard Shortcuts** - Navigate and perform actions using keyboard  
✅ **Responsive Design** - Works on desktop and mobile  
✅ **Modern UI** - Clean and professional interface  

## 🎮 Keyboard Shortcuts

| Key | Action | Description |
|-----|--------|-------------|
| `Alt + D` | Go to Dashboard | Navigate to the main dashboard view |
| `Alt + U` | Go to Users | Navigate to user management page |
| `Alt + S` | Go to Settings | Navigate to settings page |
| `Alt + H` | Go to Help | Show help page with shortcuts |
| `Escape` | Close Modal | Close any open dialog or modal |
| `Ctrl + S` | Save Form | Save changes in forms (when modal open) |
| `Ctrl + N` | New User | Open Add New User modal (from Users page) |
| `Delete` | Delete Selected | Delete the last highlighted user |

## 🔘 Button Guide

- **Primary Button (Blue)** - Main actions like adding items or saving forms
- **Edit Button (Green)** - Modify user information or settings
- **Delete Button (Red)** - Destructive actions (requires confirmation)
- **Status Badges** - Show active/inactive status of users

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/dragonslayer216/admin-panel.git
   ```

2. Open `index.html` in your browser

3. Navigate using the sidebar menu or keyboard shortcuts

## File Structure

```
admin-panel/
├── index.html      # Main HTML file
├── styles.css      # Styling
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Sections

### Dashboard
- Display key metrics (Users, Revenue, Orders, Visitors)
- Show recent user activity in a table format
- Quick action buttons (Edit, Delete)

### Users Management
- View all users in a table
- Add new users with a modal form (use `Ctrl + N` shortcut)
- Edit existing users (use Edit button or `Alt + U`)
- Delete users with confirmation (use Delete button or hover + Delete key)

### Settings
- Configure site name
- Set admin email
- Choose timezone
- Save settings (use `Ctrl + S`)

### Help/Keys
- View all keyboard shortcuts
- See button descriptions and what each does
- Navigation guide
- Tips & tricks for using the panel

## Customization

You can easily customize:
- Colors in `styles.css`
- Dashboard metrics in `index.html`
- Navigation items in the sidebar
- Form fields in modals
- Keyboard shortcuts in `script.js`

## Future Enhancements

- Backend integration (Node.js, Python, etc.)
- Database integration
- User authentication/login
- Data persistence
- Charts and analytics
- Export functionality
- Search and filter capabilities

## License

MIT License - Feel free to use this for personal or commercial projects!

## Author

Created by dragonslayer216