# Candidatix Project TODO

## MVP v0.1 Implementation Status

### ✅ Completed
- [x] Project Setup
  - [x] Next.js 15.3.4 with TypeScript
  - [x] FSD architecture setup
  - [x] Tailwind CSS configuration
  - [x] Basic development tools and dependencies
  - [x] Initial project structure
  - [x] Resume entity skeleton

### 🔄 In Progress
- [ ] Core Data Structures
  - [ ] Define Resume type interface
  - [ ] Create resume state management
  - [ ] Set up localStorage for persistence

### 🔍 MVP Focus Areas

#### 1. Resume Management (Basic)
- [ ] Define Resume type interface
  - [ ] Title field (string)
  - [ ] Work experience (string)
- [ ] Create ResumeForm component
  - [ ] Simple title input
  - [ ] Work experience textarea
  - [ ] Basic validation
- [ ] State Management
  - [ ] Use Zustand
  - [ ] Single resume storage
  - [ ] Local storage persistence

#### 2. Cover Letter Generator
- [ ] Basic UI
  - [ ] Job description input
  - [ ] Generate button
  - [ ] Output textarea
  - [ ] Copy to clipboard
- [ ] Ollama Integration
  - [ ] Basic client setup
  - [ ] gemma3:4b model
  - [ ] Simple prompt template
  - [ ] Error handling

#### 3. Routing
- [ ] Basic routes
  - [ ] / (Home page)
  - [ ] /resume (Resume management)
  - [ ] /cover-letter (Cover letter generator)

#### 4. UI Components
- [ ] Basic layout
  - [ ] Header with navigation
  - [ ] Simple forms
  - [ ] Loading states
  - [ ] Error messages

#### 5. Configuration
- [ ] Basic setup
  - [ ] Ollama endpoint
  - [ ] Default model
  - [ ] Environment variables

## Post-MVP (Stretch Goals)
- [ ] User Authentication
- [ ] Multiple Resumes Support
- [ ] Application Tracking System
- [ ] Statistics Visualization
- [ ] Additional AI Features

## Technical Notes
- Use Zustand for state management
- Keep UI minimal and focused
- Focus on core functionality
- Use local storage for persistence
- Keep Ollama integration simple
