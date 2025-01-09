const http = require('http');

const styles = {
    spinner: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    dots: ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'],
    line: ['[    ]', '[=   ]', '[==  ]', '[=== ]', '[====]', '[ ===]', '[  ==]', '[   =]'],
    pulse: ['□', '■'],
    wave: ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█', '▇', '▆', '▅', '▄', '▃', '▂'],
    circle: ['◜', '◠', '◝', '◞', '◡', '◟']
};

// Function to clear the terminal screen
const clearScreen = () => {
    return '\x1b[2J\x1b[H';
};

// Create loading message with current style
const createLoadingFrame = (frame, style, progress) => {
    const styles = {
        spinner: `${frame} Loading...`,
        dots: `${frame} Loading...`,
        line: `${frame} ${progress}%`,
        pulse: `[${'■'.repeat(Math.floor(progress/10))}${'□'.repeat(10-Math.floor(progress/10))}] ${progress}%`,
        wave: frame.repeat(8) + ` ${progress}%`,
        circle: `${frame} Loading...`
    };
    return styles[style] || styles.spinner;
};

// Create HTTP server
const server = http.createServer((req, res) => {
    // Parse loading style from URL
    const style = new URL(req.url, `http://${req.headers.host}`).searchParams.get('style') || 'spinner';
    
    if (!styles[style]) {
        res.writeHead(400);
        res.end(`Invalid style. Available styles: ${Object.keys(styles).join(', ')}`);
        return;
    }

    // Set headers for proper streaming
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Connection': 'keep-alive'
    });

    let currentFrame = 0;
    let progress = 0;
    
    // Send initial clear screen command
    res.write(clearScreen());
    
    // Create animation interval
    const intervalId = setInterval(() => {
        // Clear screen and write next frame
        const frame = styles[style][currentFrame];
        res.write(clearScreen() + createLoadingFrame(frame, style, progress));
        
        // Move to next frame
        currentFrame = (currentFrame + 1) % styles[style].length;
        
        // Update progress
        if (progress < 100) {
            progress += 1;
        } else {
            // Reset progress after reaching 100%
            progress = 0;
        }
    }, 100); // Update every 100ms
    
    // Handle client disconnect
    req.on('close', () => {
        clearInterval(intervalId);
    });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Try different styles with:');
    Object.keys(styles).forEach(style => {
        console.log(`curl -N "localhost:${PORT}?style=${style}"`);
    });
});
