# Apna Karigar

A modern platform connecting users with skilled local artisans (karigars) in India, featuring AI-powered price estimation and intelligent worker matching.

## 🚀 Features

- **AI-Powered Price Estimation**: Get realistic price ranges for services using Google Gemini AI
- **Smart Worker Matching**: Intelligent recommendation system based on budget, category, and location
- **Secure Authentication**: JWT-based user authentication with password hashing
- **Responsive Design**: Modern UI built with Next.js and Tailwind CSS
- **Real-time Search**: Instant AI-powered service cost estimation
- **Trust Scores**: Verified artisan profiles with trust ratings

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### AI Engine
- **Python FastAPI** - Modern Python web framework
- **Google Gemini AI** - AI model for price estimation
- **Pydantic** - Data validation

## 📋 Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB (local or cloud instance)
- Google Gemini API key

## 🏗️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd apna-karigar
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/apna-karigar
JWT_SECRET=your-super-secret-jwt-key
```

Start the backend server:
```bash
npm start
```

### 3. AI Engine Setup
```bash
cd ../ai-engine
pip install fastapi uvicorn python-dotenv google-genai
```

Create a `.env` file in the ai-engine directory:
```env
GEMINI_API_KEY=your-gemini-api-key
```

Start the AI engine:
```bash
uvicorn main:app --reload --port 8000
```

### 4. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

## 🚀 Usage

1. **Start all services** in separate terminals:
   - Backend: `npm start` (Port 5000)
   - AI Engine: `uvicorn main:app --reload --port 8000`
   - Frontend: `npm run dev` (Port 3000)

2. **Access the application** at `http://localhost:3000`

3. **Test AI features**:
   - Enter a service description in the search bar
   - Get instant price estimation powered by AI

## 📡 API Endpoints

### Backend API (Port 5000)
- `GET /` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### AI Engine API (Port 8000)
- `GET /` - Health check
- `POST /estimate-price` - Get AI price estimation
  ```json
  {
    "description": "Fix leaking faucet",
    "category": "Plumbing"
  }
  ```
- `POST /recommend` - Get worker recommendations
  ```json
  {
    "budget": 5000,
    "category": "Plumbing",
    "location": "Delhi"
  }
  ```

## 🧪 Testing

### Manual Testing
1. Register a new user account
2. Login with credentials
3. Test AI price estimation with various service descriptions
4. Verify worker recommendations

### API Testing
Use tools like Postman or curl to test endpoints:
```bash
# Test AI estimation
curl -X POST http://localhost:8000/estimate-price \
  -H "Content-Type: application/json" \
  -d '{"description": "Paint a room", "category": "Painting"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powering intelligent price estimation
- The open-source community for amazing tools and libraries
- Local artisans who keep our communities running

## 📞 Support

For support, email support@apnakarigar.com or join our Discord community.

---

**Made with ❤️ for India's skilled workforce**</content>
<parameter name="filePath">c:\share\README.md