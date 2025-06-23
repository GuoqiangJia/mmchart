# MMChart - Online Mermaid Diagram Editor

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://www.mmchart.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/yourusername/mmchart?style=social)](https://github.com/yourusername/mmchart)

> A professional online Mermaid diagram editor with real-time preview. Write code on the left, see beautiful diagrams on the right.

## 🚀 Features

- **Split-Screen Interface**: Code editor on the left, live preview on the right
- **Real-Time Rendering**: Instant diagram updates as you type
- **Multiple Diagram Types**: Flowcharts, sequence diagrams, Gantt charts, pie charts, and more
- **Quick Templates**: Pre-built examples to get started quickly
- **Export Options**: Download diagrams as SVG or PNG
- **Zoom & Pan**: Navigate large diagrams with ease
- **Responsive Design**: Works perfectly on desktop and mobile
- **No Registration Required**: Start creating diagrams immediately
- **Completely Free**: No hidden costs or limitations

## 🎯 Demo

Visit [www.mmchart.com](https://www.mmchart.com) to try it live!

## 📊 Supported Diagram Types

- **Flowcharts**: Visualize processes and workflows
- **Sequence Diagrams**: Show interactions between entities
- **Gantt Charts**: Project timeline management
- **Pie Charts**: Data visualization
- **Class Diagrams**: Object-oriented design
- **State Diagrams**: System state transitions
- **Entity Relationship Diagrams**: Database design
- **User Journey Maps**: User experience flows

## 🛠 Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Diagram Engine**: [Mermaid.js](https://mermaid.js.org/) v10.6.1
- **Deployment**: Vercel with global CDN
- **Performance**: Optimized for fast loading and smooth rendering

## 🚀 Getting Started

### Online Usage
1. Visit [www.mmchart.com](https://www.mmchart.com)
2. Choose a template or start writing Mermaid code
3. See your diagram update in real-time
4. Export when ready

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/mmchart.git

# Navigate to project directory
cd mmchart

# Open in browser
open index.html
# or use a local server
python -m http.server 8000
```

## 📝 Quick Example

```mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
```

## 🎨 Mermaid Syntax Guide

### Flowchart
```mermaid
graph TD
    A[Rectangle] --> B(Round)
    B --> C{Diamond}
    C -->|Yes| D[Result 1]
    C -->|No| E[Result 2]
```

### Sequence Diagram
```mermaid
sequenceDiagram
    Alice->>Bob: Hello Bob!
    Bob-->>Alice: Hello Alice!
```

### Gantt Chart
```mermaid
gantt
    title Project Timeline
    dateFormat YYYY-MM-DD
    section Phase 1
    Task 1: 2024-01-01, 30d
    Task 2: 2024-01-15, 20d
```

## 🌟 Why Choose MMChart?

| Feature | MMChart | Other Tools |
|---------|---------|-------------|
| **Speed** | Instant loading | Often slow |
| **Price** | Completely free | Many require subscription |
| **Simplicity** | Clean, focused UI | Often cluttered |
| **AI Integration** | Coming soon | Limited |
| **Export Quality** | High-resolution | Variable quality |
| **Learning Curve** | Minimal | Often steep |

## 🔮 Roadmap

- [ ] **AI Integration**: Generate diagrams from natural language
- [ ] **Cloud Save**: Save and sync diagrams across devices
- [ ] **Collaboration**: Real-time collaborative editing
- [ ] **More Templates**: Industry-specific diagram templates
- [ ] **API Access**: Programmatic diagram generation
- [ ] **Plugin System**: Extend functionality with plugins
- [ ] **Advanced Export**: PDF, Word, PowerPoint export
- [ ] **Team Features**: Workspace and permission management

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style
- Test on multiple browsers
- Ensure responsive design
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Website**: [www.mmchart.com](https://www.mmchart.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/mmchart/issues)
- **Email**: support@mmchart.com
- **Documentation**: [Mermaid.js Docs](https://mermaid.js.org/)

## 🏆 Acknowledgments

- [Mermaid.js](https://mermaid.js.org/) - The amazing diagramming library
- [Vercel](https://vercel.com) - Deployment and hosting platform
- The open-source community for inspiration and feedback

## 📈 Stats

![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/mmchart)
![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/mmchart)
![Website](https://img.shields.io/website?url=https%3A//www.mmchart.com)

---

**Made with ❤️ for the developer community**

*Turn your ideas into beautiful diagrams - because every great project starts with a clear visual plan.*