# Terminal Loading Screen Animations

A Node.js server that provides various terminal-based loading screen animations. Connect using curl to see beautiful, animated loading indicators right in your terminal!

## Features

- Multiple animation styles
- Progress tracking (0-100%)
- Unicode-based smooth animations
- Easy to extend with new styles
- Configurable through URL parameters

## Available Styles

1. **Spinner** (`spinner`): A rotating spinner with smooth transitions
   ```
   ⠋ Loading...
   ```

2. **Dots** (`dots`): Rotating dots pattern
   ```
   ⣾ Loading...
   ```

3. **Line** (`line`): A progress bar with percentage
   ```
   [====] 100%
   ```

4. **Pulse** (`pulse`): A filling progress bar
   ```
   [■■■■■□□□□□] 50%
   ```

5. **Wave** (`wave`): An animated wave pattern
   ```
   ▁▂▃▄▅▆▇█▇▆▅▄▃▂ 75%
   ```

6. **Circle** (`circle`): A rotating circle animation
   ```
   ◜ Loading...
   ```

## Installation

Clone this repository:
```bash
git clone https://github.com/mostypc123/terminal-loading-screens
```

## Usage

1. Start the server:
   ```bash
   node index.js
   ```

2. Connect using curl with your preferred style:
   ```bash
   # Default spinner
   curl -N localhost:3000

   # Specific style
   curl -N "localhost:3000?style=wave"
   ```

   Note: The `-N` flag is required for smooth animations as it prevents curl from buffering the output.

## Available Styles

Connect using the `style` URL parameter:

- `curl -N "localhost:3000?style=spinner"` (default)
- `curl -N "localhost:3000?style=dots"`
- `curl -N "localhost:3000?style=line"`
- `curl -N "localhost:3000?style=pulse"`
- `curl -N "localhost:3000?style=wave"`
- `curl -N "localhost:3000?style=circle"`

## Adding New Styles

To add a new animation style:

1. Add your style frames to the `styles` object:
   ```javascript
   const styles = {
     // ... existing styles ...
     newStyle: ['frame1', 'frame2', 'frame3']
   };
   ```

2. Add a corresponding entry in the `createLoadingFrame` function:
   ```javascript
   const styles = {
     // ... existing styles ...
     newStyle: `${frame} Custom loading message...`
   };
   ```

Feel free to use this in your projects! No attribution required.
