// Mermaid rendering and chart management
let currentZoom = 1;

// Initialize Mermaid
function initMermaid() {
    mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        themeVariables: {
            primaryColor: '#64ffda',
            primaryTextColor: '#000',
            primaryBorderColor: '#00bcd4',
            lineColor: '#666',
            sectionBkgColor: '#f5f5f5',
            altSectionBkgColor: '#e8f5e8',
            gridColor: '#ddd',
            cScale0: '#64ffda',
            cScale1: '#00bcd4',
            cScale2: '#0097a7'
        }
    });
}

// Render diagram
async function renderDiagram() {
    if (!window.editor) {
        console.warn('Editor not initialized yet');
        return;
    }

    const code = window.editor.getValue().trim();
    const preview = document.getElementById('preview');
    
    if (!code) {
        preview.innerHTML = `
            <div class="loading">
                <h3 style="color: #666; margin-bottom: 10px;">✨ Enhanced Mermaid Editor</h3>
                <p style="color: #888; margin: 0;">👈 Modern code editor with syntax highlighting</p>
                <p style="color: #888; margin: 5px 0 0 0;">Try the example buttons or start typing!</p>
            </div>
        `;
        return;
    }

    preview.innerHTML = `
        <div class="loading">
            <div style="color: #64ffda; font-size: 16px;">🎨 Rendering chart...</div>
        </div>
    `;

    try {
        const graphDiv = document.createElement('div');
        graphDiv.id = 'mermaid-' + Date.now();
        graphDiv.style.width = '100%';
        graphDiv.style.height = '100%';
        graphDiv.style.display = 'flex';
        graphDiv.style.alignItems = 'center';
        graphDiv.style.justifyContent = 'center';
        
        const { svg } = await mermaid.render(graphDiv.id, code);
        
        preview.innerHTML = '';
        graphDiv.innerHTML = svg;
        preview.appendChild(graphDiv);
        
        const svgElement = graphDiv.querySelector('svg');
        if (svgElement) {
            svgElement.style.maxWidth = '100%';
            svgElement.style.maxHeight = '100%';
            svgElement.style.width = 'auto';
            svgElement.style.height = 'auto';
        }
        
        applyZoom();
        
        // Update syntax status
        updateRenderStatus('success', 'Rendered ✓');
        
    } catch (error) {
        console.error('Mermaid rendering error:', error);
        
        preview.innerHTML = `
            <div class="error-message">
                <h4 style="margin: 0 0 10px 0; color: #ff6b6b;">⚠️ Rendering Failed</h4>
                <p style="margin: 0 0 10px 0;">${error.message}</p>
                <details style="margin-top: 10px;">
                    <summary style="cursor: pointer; color: #999;">View detailed error</summary>
                    <pre style="margin-top: 5px; font-size: 12px; color: #666;">${error.stack || error.message}</pre>
                </details>
            </div>
        `;
        
        // Update syntax status
        updateRenderStatus('error', 'Error');
    }
}

// Update render status in status bar
function updateRenderStatus(type, message) {
    const statusEl = document.getElementById('syntaxStatus');
    const textEl = document.getElementById('syntaxText');
    
    if (statusEl && textEl) {
        statusEl.className = `status-indicator ${type}`;
        textEl.textContent = message;
    }
}

// Zoom functions
function zoomIn() {
    currentZoom *= 1.2;
    applyZoom();
}

function zoomOut() {
    currentZoom /= 1.2;
    applyZoom();
}

function resetZoom() {
    currentZoom = 1;
    applyZoom();
}

function applyZoom() {
    const svgElement = document.querySelector('#preview svg');
    if (svgElement) {
        svgElement.style.transform = `scale(${currentZoom})`;
        svgElement.style.transformOrigin = 'center';
    }
}

// Download SVG
function downloadSVG() {
    const svgElement = document.querySelector('#preview svg');
    if (!svgElement) {
        alert('Please render the chart first');
        return;
    }

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mermaid-diagram.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}