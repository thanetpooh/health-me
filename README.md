# Health-Me 🍳

A simple app that helps you figure out what to cook based on what's already in your fridge — so you waste less food and spend less time thinking.

<img width="1341" height="849" alt="Image" src="https://github.com/user-attachments/assets/c7f3c8e7-16be-433c-afe4-12db77e9e04e" />

## Tech Stack

- **Frontend:** React + TypeScript, Tailwind CSS, daisyUI
- **Backend:** Spring Boot (Java)
- **Database:** PostgreSQL
- **Infra:** Docker Compose

## How to Run

**1. Copy the env file**
```bash
cp .env.example .env
```
Edit if needed. Cloudinary is optional — just leave it blank if you don't need image upload.

**2. Start everything**
```bash
docker-compose up --build
```

**3. Open the app**
- Frontend → http://localhost:5173
- Backend → http://localhost:8080
- DB → localhost:5432

Tables and sample data are created automatically on first run.

## Notes

- Backend: Spring Boot via Maven
- Frontend: Vite dev server
- Everything runs through Docker so you don't need to set up anything manually
