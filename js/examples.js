// Example codes for different diagram types
const examples = {
    flowchart: `graph TD
    A[Start] --> B{Condition Met?}
    B -->|Yes| C[Execute Plan A]
    B -->|No| D[Execute Plan B]
    C --> E[Log Result]
    D --> E
    E --> F[End]
    
    style A fill:#64ffda
    style F fill:#ff6b6b`,

    sequence: `sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Send Request
    Frontend->>Backend: Forward Request
    Backend->>Database: Query Data
    Database-->>Backend: Return Data
    Backend-->>Frontend: Return Result
    Frontend-->>User: Display Result`,

    gantt: `gantt
    title Project Development Timeline
    dateFormat  YYYY-MM-DD
    section Requirements
    Research           :done,    des1, 2024-01-01,2024-01-15
    Analysis           :done,    des2, 2024-01-16, 10d
    section Design
    UI Design          :active,  des3, 2024-01-20, 20d
    Architecture       :         des4, after des2, 15d
    section Development
    Frontend Dev       :         des5, 2024-02-01, 30d
    Backend Dev        :         des6, 2024-02-01, 25d`,

    pie: `pie title Website Traffic Sources
    "Search Engines" : 45
    "Direct Access" : 25
    "Social Media" : 15
    "Email Marketing" : 10
    "Others" : 5`,

    mindmap: `mindmap
  root((Project))
    Planning
      Research
      Requirements
      Timeline
    Design
      UI/UX
      Architecture
      Prototyping
    Development
      Frontend
        React
        Components
      Backend
        API
        Database
    Testing
      Unit Tests
      Integration
      User Testing`
};

// Load example function
function loadExample(type) {
    if (examples[type] && typeof window.editor !== 'undefined') {
        window.editor.setValue(examples[type]);
        if (typeof renderDiagram === 'function') {
            renderDiagram();
        }
    }
}