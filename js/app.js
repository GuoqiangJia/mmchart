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
// 更新UI文本
function updateUITexts(lang) {
    // 加载对应语言的文本
    if (lang === 'zh') {
        texts = zh;
    } else {
        texts = en;
    }
    
    // 更新页面标题和元数据
    document.title = texts.meta.title;
    document.querySelector('meta[name="description"]').setAttribute('content', texts.meta.description);
    document.querySelector('meta[name="keywords"]').setAttribute('content', texts.meta.keywords);
    document.querySelector('meta[property="og:title"]').setAttribute('content', texts.meta.ogTitle);
    document.querySelector('meta[property="og:description"]').setAttribute('content', texts.meta.ogDescription);
    
    // 更新标题
    document.querySelector('.subtitle strong').textContent = texts.header.title;
    
    // 更新About链接
    document.querySelector('.nav-links a[href="#about"]').textContent = texts.header.about;
    
    // 更新快速开始部分
    document.querySelector('.quick-start-label').textContent = texts.editor.quickStart;
    document.querySelectorAll('.quick-start .btn').forEach((btn, index) => {
        if (index === 0) btn.textContent = `🔄 ${texts.editor.flowchart}`;
        if (index === 1) btn.textContent = `📋 ${texts.editor.sequence}`;
        if (index === 2) btn.textContent = `📅 ${texts.editor.gantt}`;
        if (index === 3) btn.textContent = `🥧 ${texts.editor.pieChart}`;
        if (index === 4) btn.textContent = `🧠 ${texts.editor.mindmap}`;
    });
    
    // 更新状态栏
    document.querySelector('#syntaxText').textContent = texts.status.ready;
    document.querySelector('.status-indicator:nth-child(2) span:first-child').textContent = texts.status.line + ' ';
    document.querySelector('.status-indicator:nth-child(3) span:first-child').textContent = texts.status.col + ' ';
    document.querySelector('.status-right .status-indicator:nth-child(1) span:first-child').textContent = texts.status.lines + ' ';
    document.querySelector('.status-right .status-indicator:nth-child(2) span:first-child').textContent = texts.status.chars + ' ';
    
    // 更新主题指示器
    const themeText = document.querySelector('#themeIndicator span').textContent;
    if (themeText.includes('Dark')) {
        document.querySelector('#themeIndicator span').textContent = `🌓 ${texts.status.dark}`;
    } else {
        document.querySelector('#themeIndicator span').textContent = `🌓 ${texts.status.light}`;
    }
    
    // 更新预览面板按钮
    const previewButtons = document.querySelectorAll('.preview-actions .btn');
    previewButtons[0].textContent = `🎨 ${texts.preview.render}`;
    previewButtons[1].textContent = `🔍︎ ${texts.preview.zoomOut}`;
    previewButtons[2].textContent = `↻ ${texts.preview.reset}`;
    previewButtons[3].textContent = `🔍︎ ${texts.preview.zoomIn}`;
    previewButtons[4].textContent = `💾 ${texts.preview.download}`;
    
    // 更新欢迎信息
    const loadingDiv = document.querySelector('.loading');
    if (loadingDiv) {
        const h3 = loadingDiv.querySelector('h3');
        const paragraphs = loadingDiv.querySelectorAll('p');
        if (h3) h3.textContent = `✨ ${texts.preview.welcome.title}`;
        if (paragraphs[0]) paragraphs[0].textContent = `👈 ${texts.preview.welcome.editor}`;
        if (paragraphs[1]) paragraphs[1].textContent = texts.preview.welcome.start;
    }
    
    // 更新About模态框内容
    document.querySelector('.modal-header h2').textContent = texts.about.title;
    const modalBodyP = document.querySelectorAll('.modal-body p');
    modalBodyP[0].textContent = texts.about.description;
    modalBodyP[1].textContent = texts.about.features;
    modalBodyP[2].textContent = texts.about.transform;
    
    // 更新特性列表
    const featureItems = document.querySelectorAll('.feature-list li');
    texts.about.featureList.forEach((feature, index) => {
        if (featureItems[index]) {
            const icon = featureItems[index].textContent.split(' ')[0];
            featureItems[index].textContent = `${icon} ${feature}`;
        }
    });
    
    // 更新联系信息
    document.querySelector('.contact-info h3').textContent = texts.about.contact;
    const contactItems = document.querySelectorAll('.contact-item span');
    contactItems[0].textContent = texts.about.email;
    contactItems[1].textContent = texts.about.twitter;
    
    // 更新编辑器占位符
    if (editor) {
        editor.setOption('placeholder', texts.editor.placeholder);
    }
}
    
    // 更新示例标题
    document.querySelector('.examples-title').textContent = texts.editor.examples;
    
    // 更新更多UI元素...