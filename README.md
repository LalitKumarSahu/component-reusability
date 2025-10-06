# Component Reusability - Hackathon Project

# 🔄 Component Reusability

<div align="center">

![Component Reusability Banner](https://img.shields.io/badge/Hackathon-Project-00d2ff?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![Vite](https://img.shields.io/badge/Vite-Dev-646cff?style=for-the-badge&logo=vite)

**Revolutionizing electronics sustainability through intelligent component reusability tracking**

[Demo](#-demo) • [Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack)

</div>

---

## 🌟 Overview

Component Reusability is an innovative platform that helps users identify reusable and recyclable components in electronic devices. Built during a hackathon, this project promotes environmental sustainability by making it easy to find nearby recycling centers and understand which parts of your devices can be reused.

## ✨ Features

- 🔍 **Smart Device Selection** - Browse through various electronic devices
- ♻️ **Component Analysis** - Identify reusable and recyclable parts
- 📍 **Recycling Center Locator** - Find nearby centers to dispose components responsibly
- 🎨 **Modern UI/UX** - Sleek dark theme with smooth animations
- 📱 **Fully Responsive** - Works seamlessly on desktop and mobile devices
- 💬 **Feedback System** - Share your thoughts and help improve the platform

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/component-reusability.git
cd component-reusability
```

**2. Backend Setup**
```bash
cd backend
npm install
npm run dev
```
> 🟢 Backend runs on `http://localhost:5000`

**3. Frontend Setup** *(open a new terminal)*
```bash
cd frontend
npm install
npm run dev
```
> 🟢 Frontend runs on `http://localhost:5173`

**4. Open your browser**

Navigate to `http://localhost:5173` and start exploring!

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Lightning-fast build tool
- **Material-UI** - Component library
- **CSS3** - Custom animations and styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **JSON** - Lightweight data storage

## 📁 Project Structure

```
component-reusability/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   └── header.css
│   │   ├── App.jsx
│   │   └── styles.css
│   └── package.json
├── backend/
│   ├── data/
│   │   └── components.json
│   ├── server.js
│   └── package.json
└── README.md
```

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/components/:device` | Get reusable components for a device |
| `GET` | `/api/centers` | Get nearby recycling centers |
| `POST` | `/api/feedback` | Submit user feedback |

## 🔮 Future Enhancements

- [ ] Integration with Google Maps/Places API for real-time center locations
- [ ] User authentication and personalized component tracking
- [ ] AI-powered component identification via image upload
- [ ] Carbon footprint calculator for recycled components
- [ ] Community forum for repair and reuse tips
- [ ] Mobile app (React Native)

## 📝 Notes

- Currently uses a JSON file (`data/components.json`) as the database
- Recycling centers endpoint returns dummy data - ready for API integration
- Designed with scalability in mind for easy feature additions

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project was created for a hackathon and is open for educational purposes.

## 👥 Team

Built with 💚 during [Hackathon Name]

---

<div align="center">

**Made with ♻️ for a sustainable future**

[⬆ Back to Top](#-component-reusability)

</div>
