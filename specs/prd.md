# Product Requirements Document: Job Search Assistance App

## 1. Introduction
This app is designed for job seekers and helps to simplify the process of applying for vacancies. With its help, users can automatically generate cover letters based on their resume and job posting text, as well as track the dynamics of responses in a visual format (in the spirit of GitHub contribution grid). In the future, we plan to expand to simulate interviews, analyze responses and personalized recommendations for improving resumes and interview behavior.

## 2. Goals
- Simplify the process of writing cover letters with AI
- Systematize job postings and their effectiveness
- Provide the user with visual statistics on activity
- Prepare technical architecture for future functionality expansion

## 3. User Stories
- As a user, I want to receive relevant cover letter text, taking into account my resume and job posting text, in order to apply faster.
- As a user, I want to see the dynamics of my responses statistics in the form of an activity grid to understand how active I am in my job search.
- As a user, I want to receive recommendations from AI based on my responses and resume to increase my chances of getting an interview.
- As a user, I want to upload an audio file of the interview and get its transcript, so that I can then receive analysis and advice on improvement.

## 4. Functional requirements (for MVP)
1. The user should be able to upload their resume (as text).
2. The user can insert a description of the vacancy (manually or by pasting text).
3. The application should generate a cover letter based on this data using LLM.
4. The user can save the response (resume, vacancy, cover letter, date).
5. The application should display the history of responses in the form of a calendar "grid", similar to GitHub contributions.
6. The interface should be minimalistic and support both Russian and English.
7. Support for multiple AI providers: local (Ollama), external (Gemini, in the future — OpenAI, etc.).
8. Support for FSD architecture on the frontend (for scalability).

## 5. Non-goals (outside the scope of MVP)
- No automatic integration with hh.ru or other platforms (vacancies are inserted manually).
- No support for video/video interview processing.
- No multi-user mode (each user works independently).
- No recommendations on salaries, labor market analysis, etc.
- No full-fledged job board functionality.

## 6. Design considerations
- Minimalistic UI based on ShadCN
- Color palette: light and dark theme (default — system)
- Components:
- Field for uploading/inserting resume
- Field for inserting job description
- "Generate cover letter" button
- List or cards of responses
- Activity calendar (GitHub-style grid)

## 7. Technical considerations
- Front-end architecture: Feature-Sliced ​​Design (FSD)
- LLMs used:
- Ollama (local, for basic tasks)
- Gemini (cloud, for more complex generations)
- i18n support: English and Russian
- Data storage: locally or in the database (TBD), localStorage/IndexedDB is enough for MVP
- Ability to expand to the backend infrastructure (Node.js, Supabase, Firebase and etc.)

## 8. Success Metrics
- 80% of users save at least one response during the first day of use
- 50% of users return to the app at least 3 times a week
- 30% of users use cover letter generation 5+ times
- Positive feedback on Reddit/communities (upvotes, comments)

## 9. Open Questions
- What is the best way to store and analyze the response result (invited / rejected / silent)?
- Does the MVP need support for multiple resumes for one user?
- Which AI providers will be the most reliable for analyzing resumes/vacancies in Russian?
- Where to start the interview simulator: text questions first or voice right away?