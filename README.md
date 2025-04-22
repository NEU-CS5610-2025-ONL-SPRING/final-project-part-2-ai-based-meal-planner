# 🥗 AI-Based Weekly Meal Planner

An intelligent meal planning web app that helps users create, organize, and manage meals throughout the week — powered by AI-generated meal ideas and full CRUD support.

## ✨ Features

- 🔐 User Authentication (Register/Login)
- 📋 Personal Meal List with Add/View/Edit/Delete functionality
- 🤖 AI Meal Idea Generator using OpenAI API
- 📅 Weekly Meal Planner to assign meals to days and times
- ✅ Persistent storage via deployed backend and database
- 🌐 Full-stack deployment with Vercel (frontend) and Render (backend)

---

🌐 **Live App**: https://client-pink-ten.vercel.app


---

## 🛠️ Tech Stack

| Layer         | Technology                     |
|--------------|----------------------------------|
| Frontend     | React (Vite) + React Router     |
| Backend      | Node.js + Express.js           |
| Database     | postgresql with Prisma ORM           |
| AI Service   | OpenAI GPT-3.5 API              |
| Deployment   | Vercel (Client) + Render (API)  |
| Styling      | Basic CSS                       |
| Testing      | React Testing Library (3+ tests)|

---

## 📂 Project Structure

```
final-project/
├── client/             # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── config.js   # API base URL via env
├── api/                # Node.js backend
│   ├── routes/
│   ├── prisma/schema.prisma
│   └── index.js
└── test
```

---

### Setup backend

```bash
cd api
npm install
npx prisma generate
npx prisma db push
npm start
```

### Setup frontend

```bash
cd client
npm install
npm run dev
```

## Testing

```bash
cd client
npm test
```

Tests include:
- ✅ Home Page link rendering
- ✅ Login form functionality
- ✅ Meals page renders with mock fetch

---

## 📈 Lighthouse Accessibility

Included: 3+ pages score ≥ 80 in Lighthouse accessibility audits.
Reports located in `/accessibility_reports/`.

---

## 🧠 AI Integration

- AI meal ideas are fetched via `/api/meal-ideas` using OpenAI's Chat API.
- Prompts include optional preferences (e.g., vegetarian, low-carb).

---

## 🙋‍♀️ Author

**Xiangying Sun**  
CS5610 Final Project @ Northeastern University  

