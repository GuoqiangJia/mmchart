// Editor configuration and management
let editor;
let isDarkTheme = true;
let renderTimeout;

// Mermaid language mode for CodeMirror
CodeMirror.defineMode("mermaid", function() {
    return {
        token: function(stream, state) {
            // Skip whitespace
            if (stream.eatSpace()) return null;
            
            // Comments
            if (stream.match(/%%.*$/)) {
                return "comment";
            }
            
            // Diagram types
            if (stream.match(/^(graph|flowchart|sequenceDiagram|gantt|pie|gitGraph|erDiagram|journey|mindmap|timeline|quadrantChart|requirementDiagram|c4Context|c4Container|c4Component|c4Dynamic)/)) {
                return "keyword";
            }
            
            // Direction keywords
            if (stream.match(/^(TD|TB|BT|RL|LR|subgraph|end|participant|actor|note|loop|alt|else|opt|par|and|rect|activate|deactivate)/)) {
                return "keyword";
            }
            
            // Arrows and connections
            if (stream.match(/-->|->|<->|<--|==|==>|<==|==|\.->|\.-|\-\-|::|:::|---|___/)) {
                return "operator";
            }
            
            // Brackets and parentheses
            if (stream.match(/[\[\](){}]/)) {
                return "bracket";
            }
            
            // Strings in quotes
            if (stream.match(/"([^"\\]|\\.)*"/)) {
                return "string";
            }
            
            // Node IDs and labels
            if (stream.match(/[A-Za-z][A-Za-z0-9_]*/)) {
                return "variable";
            }
            
            // Numbers
            if (stream.match(/\d+/)) {
                return "number";
            }
            
            // Default
            stream.next();
            return null;
        }
    };
});

// Autocomplete hints for Mermaid
function getMermaidHints(cm, option) {
    const cursor = cm.getCursor();
    const line = cm.getLine(cursor.line);
    const start = cursor.ch;
    let end = cursor.ch;
    
    // Find word boundaries
    while (end < line.length && /\w/.test(line.charAt(end))) ++end;
    while (start && /\w/.test(line.charAt(start - 1))) --start;
    
    const word = line.slice(start, end);
    
    const keywords = [
        // Diagram types
        'graph', 'flowchart', 'sequenceDiagram', 'gantt', 'pie', 'gitGraph', 
        'erDiagram', 'journey', 'mindmap', 'timeline', 'quadrantChart',
        'requirementDiagram', 'c4Context', 'c4Container', 'c4Component',
        
        // Directions
        'TD', 'TB', 'BT', 'RL', 'LR',
        
        // Keywords
        'subgraph', 'end', 'participant', 'actor', 'note', 'loop', 'alt', 
        'else', 'opt', 'par', 'and', 'rect', 'activate', 'deactivate',
        'title', 'dateFormat', 'section', 'click', 'class', 'classDef',
        
        // Common arrows
        '-->', '->', '<->', '<--', '=>', '==>', '<==', '-.->',
        
        // Gantt keywords
        'done', 'active', 'crit', 'after',
        
        // Style keywords
        'fill', 'stroke', 'stroke-width', 'color', 'style'
    ];
    
    const hints = keywords.filter(k => k.toLowerCase().indexOf(word.toLowerCase()) === 0);
    
    return {
        list: hints,
        from: CodeMirror.Pos(cursor.line, start),
        to: CodeMirror.Pos(cursor.line, end)
    };
}

// Initialize CodeMirror
function initEditor() {
    editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
        mode: 'mermaid',
        theme: isDarkTheme ? 'material-ocean' : 'material-lighter',
        lineNumbers: true,
        lineWrapping: false,
        autoCloseBrackets: true,
        matchBrackets: true,
        styleActiveLine: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        extraKeys: {
            "Ctrl-Space": "autocomplete",
            "Ctrl-Enter": function() { if (typeof renderDiagram === 'function') renderDiagram(); },
            "Ctrl-F": "findPersistent",
            "Ctrl-H": "replace",
            "F11": function(cm) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            "Esc": function(cm) {
                if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
            }
        },
        hintOptions: {
            hint: getMermaidHints,
            completeSingle: false
        },
        placeholder: "💡 Start writing Mermaid code here...\n\nTry typing 'graph TD' for a flowchart\nOr click the example buttons above!",
        indentUnit: 4,
        smartIndent: true,
        electricChars: false
    });

    // Make editor globally accessible
    window.editor = editor;

    // Event listeners
    editor.on('change', function() {
        updateStatus();
        clearTimeout(renderTimeout);
        renderTimeout = setTimeout(function() {
            if (typeof renderDiagram === 'function') {
                renderDiagram();
            }
        }, 1000);
    });

    editor.on('cursorActivity', function() {
        updateCursorPosition();
    });

    // Focus editor
    editor.focus();
}

// Update status bar
function updateStatus() {
    const cursor = editor.getCursor();
    const content = editor.getValue();
    
    document.getElementById('lineNumber').textContent = cursor.line + 1;
    document.getElementById('colNumber').textContent = cursor.ch + 1;
    document.getElementById('totalLines').textContent = editor.lineCount();
    document.getElementById('charCount').textContent = content.length;
    
    // Syntax validation
    validateSyntax(content);
}

function updateCursorPosition() {
    const cursor = editor.getCursor();
    document.getElementById('lineNumber').textContent = cursor.line + 1;
    document.getElementById('colNumber').textContent = cursor.ch + 1;
}

// Validate Mermaid syntax (basic)
function validateSyntax(content) {
    const statusEl = document.getElementById('syntaxStatus');
    const textEl = document.getElementById('syntaxText');
    
    if (!content.trim()) {
        statusEl.className = 'status-indicator';
        textEl.textContent = 'Ready';
        return;
    }
    
    // Basic validation
    const diagramTypes = ['graph', 'flowchart', 'sequenceDiagram', 'gantt', 'pie', 'gitGraph', 'erDiagram', 'journey', 'mindmap', 'timeline'];
    const hasValidStart = diagramTypes.some(type => content.trim().startsWith(type));
    
    if (hasValidStart) {
        statusEl.className = 'status-indicator success';
        textEl.textContent = 'Valid';
    } else {
        statusEl.className = 'status-indicator warning';
        textEl.textContent = 'Check syntax';
    }
}