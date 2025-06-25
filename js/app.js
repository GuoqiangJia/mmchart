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
// Language switching (simplified for demo)
// Language switching
function switchLanguage(lang) {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => btn.classList.remove('active'));
    
    const targetBtn = document.querySelector(`[onclick="switchLanguage('${lang}')"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    
    // 实际的语言切换逻辑
    updateUITexts(lang);
    document.documentElement.lang = lang;
    localStorage.setItem('preferredLanguage', lang);
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


// About modal functionality
function showAbout() {
    const modal = document.getElementById('aboutModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeAbout() {
    const modal = document.getElementById('aboutModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('aboutModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}


// 全局变量存储当前语言的文本
let texts = {};

// 更新UI文本
function updateUITexts(lang) {
    // 加载对应语言的文本
    if (lang === 'zh') {
        texts = zh;
    } else {
        texts = en;
    }
    
    // 更新标题
    document.querySelector('.subtitle strong').textContent = texts.header.title;
    
    // 更新About链接
    document.querySelector('.nav-links a[href="#about"]').textContent = texts.header.about;
    
    // 更新About模态框内容
    document.querySelector('.modal-header h2').textContent = texts.about.title;
    
    // 更新编辑器占位符
    if (editor) {
        editor.setOption('placeholder', texts.editor.placeholder);
    }
    
    // 更新示例标题
    document.querySelector('.examples-title').textContent = texts.editor.examples;
    
    // 更新更多UI元素...
}