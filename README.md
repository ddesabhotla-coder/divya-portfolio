# Portfolio Website

A modern, responsive two-column portfolio website with an automatic image slider.

## Features

- **Two-column responsive layout**: Left side for image slider, right side for content
- **Automatic image slider**: Images change every 4 seconds automatically
- **Tab navigation**: Home, About, Projects, and Resume tabs
- **Fully responsive**: Works on desktop, tablet, and mobile devices

## Setup Instructions

### 1. Add Your Images

1. Place your profile photo in the `images` folder and name it `photo.jpg` (or update the path in `index.html`)
2. Add additional images to the `images` folder for the slider
3. Update the HTML to include your images in the slider

### 2. Update Your Content

Edit `index.html` to customize:
- **Home tab**: Update the headline and description in the Home section
- **About tab**: Add your about content
- **Projects tab**: Add your projects
- **Resume tab**: Add your resume content

### 3. Adding More Images to the Slider

You can add more images to the slider in two ways:

**Option 1: Edit HTML directly**
Add new slide divs in `index.html` inside the `.slider-wrapper`:

```html
<div class="slide">
    <img src="images/your-image.jpg" alt="Description">
</div>
```

**Option 2: Use JavaScript**
After uploading images, you can use the `addSlideToSlider()` function in the browser console:

```javascript
addSlideToSlider('images/your-image.jpg', 'Image description');
```

## File Structure

```
portfolio/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # Slider and tab functionality
├── images/         # Your images folder
│   └── photo.jpg  # Your profile photo
└── README.md       # This file
```

## Customization

- **Slider speed**: Change `slideDuration` in `script.js` (currently 4000ms = 4 seconds)
- **Colors**: Modify the gradient in `styles.css` under `.left-column`
- **Fonts**: Update the `font-family` in `styles.css`

## Opening the Website

Simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then visit `http://localhost:8000` in your browser.
