// Main application logic and initialization

// Resizer functionality
function initResizer() {
    const resizer = document.getElementById('resizer');
    const editorPanel = document.getElementById('editorPanel');
    const previewPanel = document.getElementById('previewPanel');
    const container = document.querySelector('.container');
    
    let isResizing = false;
    
    resizer.addEventListener('mousedown', function(e) {
        isResizing = true;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isResizing) return;
        
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width - 6;
        const mouseX = e.clientX - containerRect.left;
        
        const newEditorWidth = (mouseX / containerWidth) * 100;
        const newPreviewWidth = 100 - newEditorWidth;
        
        if (newEditorWidth >= 20 && newEditorWidth <= 80) {
            editorPanel.style.width = newEditorWidth + '%';
            previewPanel.style.width = newPreviewWidth + '%';
        }
    });
    
    document.addEventListener('mouseup', function() {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    });
    
    // Double click to reset
    resizer.addEventListener('dblclick', function() {
        editorPanel.style.width = '50%';
        previewPanel.style.width = '50%';
    });
}

// Language switching (simplified for demo)
function switchLanguage(lang) {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => btn.classList.remove('active'));
    
    const targetBtn = document.querySelector(`[onclick="switchLanguage('${lang}')"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    
    // Here you could add actual language switching logic
    console.log(`Language switched to: ${lang}`);
}

// Keyboard shortcuts handler
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Prevent conflicts with CodeMirror shortcuts
        if (e.target.closest('.CodeMirror')) {
            return;
        }
        
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'Enter':
                    e.preventDefault();
                    if (typeof renderDiagram === 'function') {
                        renderDiagram();
                    }
                    break;
                case 's':
                    e.preventDefault();
                    if (typeof downloadSVG === 'function') {
                        downloadSVG();
                    }
                    break;
            }
        }
    });
}

// Initialize everything when page loads
function initApp() {
    // Initialize Mermaid
    if (typeof initMermaid === 'function') {
        initMermaid();
    }
    
    // Initialize editor
    if (typeof initEditor === 'function') {
        initEditor();
    }
    
    // Initialize resizer
    initResizer();
    
    // Initialize keyboard shortcuts
    initKeyboardShortcuts();
    
    // Load default example
    setTimeout(() => {
        if (typeof loadExample === 'function') {
            loadExample('flowchart');
        }
    }, 100);
    
    console.log('✅ Enhanced Mermaid Editor initialized!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}