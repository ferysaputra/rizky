**Product Requirement Document (PRD): Smart Haid Web Application**

---

## 1. Document Overview

* **Project Name:** Smart Haid
* **Version:** 2.0.0
* **Stack:** Next.js (App Router), Firebase (Auth, Firestore, Storage), Tailwind CSS
* **Primary Objective:** A high-performance web application designed with a **Mobile-First** approach for users and a **Desktop Dashboard** for administrators. Next.js is selected for superior SEO (blog content) and optimized routing.

---

## 2. System Architecture

The application leverages Next.js for both frontend and API routes (if needed), while Firebase provides the Backend-as-a-Service (BaaS) layer.

* **Frontend:** Next.js (React 19/18) with Tailwind CSS.
* **Authentication:** Firebase Authentication.
* **Database:** Cloud Firestore (NoSQL Document Database).
* **Storage:** Firebase Storage (for PDF assets and blog images).
* **Real-time:** Firestore `onSnapshot` for instant messaging.

---

## 3. User Roles & Access Control

Access is managed via **Custom Claims** in Firebase Auth or a `role` field within the `users` collection in Firestore.

| Role | Interface | Access Logic |
| --- | --- | --- |
| **User** | Mobile View (`/app`) | Access to personal tracking, notes, and support chat. |
| **Admin** | Dashboard View (`/admin`) | Access to global content management and user support. |

---

## 4. Functional Requirements - User View (`/app`)

### 4.1. Mobile Simulation UI

* The UI must be wrapped in a container that simulates a mobile device on desktop screens (`max-w-md mx-auto`).
* **Navigation:** Fixed bottom navigation bar with icons for Home, Calendar, Notes, and PDF.

### 4.2. Landing Page (Home)

* **Blog Content:** Fetch list of articles from Firestore `articles` collection.
* **Video Integration:** Display YouTube videos using the `react-player` or standard iframe, driven by IDs stored in Firestore.

### 4.3. Menstrual Calendar Logic

* **Input Requirements:** Users provide "Last Period Date" and "Cycle Length".
* **Visual Indicators (Logic):**
* **Period (Red):**  to  days.
* **Ovulation (Purple):**  days.
* **Fertile Window (Green):**  days to  day.



### 4.4. Personal Notes

* **CRUD:** Users can create, edit, and delete private notes.
* **Data Isolation:** Queries are strictly filtered by `uid`.

### 4.5. PDF Viewer

* **Source:** Single PDF hosted on Firebase Storage.
* **Experience:** Inline scrollable viewer (using `react-pdf-viewer` or native browser embed).

### 4.6. Real-time Support Chat

* **Interface:** Chat bubble or dedicated page.
* **Behavior:** Real-time message updates using Firestore listeners.

---

## 5. Functional Requirements - Admin View (`/admin`)

### 5.1. Content Management (CMS)

* Update landing page text, blog posts, and YouTube video links.
* Upload new PDF resources to Firebase Storage.

### 5.2. User Activity Monitoring

* **Note Oversight:** View-only access to all user-generated notes for safety/moderation.
* **User List:** Table view of all registered users and their last login status.

### 5.3. Admin Chat Dashboard

* **Inbox:** View all active threads.
* **Support:** Reply to users in real-time.

---

## 6. Database Schema (Firestore NoSQL)

### `users` (Collection)

* `uid`: String (Document ID)
* `email`: String
* `role`: String ("user" | "admin")
* `cycleSettings`: Map { `lastDate`: Timestamp, `length`: Number }

### `articles` (Collection)

* `id`: String
* `title`: String
* `content`: String (HTML or Markdown)
* `youtubeId`: String
* `createdAt`: Timestamp

### `notes` (Collection)

* `id`: String
* `userId`: String (Index for filtering)
* `title`: String
* `body`: String
* `createdAt`: Timestamp

### `chats` (Collection)  `messages` (Sub-collection)

* `participants`: Array [ `uid1`, `uid2` ]
* `lastMessage`: String
* `updatedAt`: Timestamp

---

## 7. Security Rules (Firebase Security Rules)

To ensure "Zero-Bias" and data safety, the following Firestore rules must be applied:

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    // User Profiles
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Notes
    match /notes/{noteId} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow read: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Articles
    match /articles/{articleId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}

```

---

## 8. Implementation Steps for AI Developer

1. **Initialize Next.js:** Setup App Router with Tailwind CSS and Lucide React.
2. **Firebase Config:** Initialize Firebase Client SDK in a `@/lib/firebase` utility file.
3. **Auth Context:** Create a React Context (or use a library like `firebase-hooks`) to manage `user` and `admin` state.
4. **Layout Construction:**
* `layout.js` for the main wrapper.
* Conditional layout wrappers for `(user)` and `(admin)` route groups.


5. **Feature Build-out:**
* **Auth:** Login/Register pages with Firebase Auth.
* **Landing:** Fetch articles using Next.js Server Components for SEO.
* **Calendar:** Client-side calculation using `date-fns`.
* **Chat:** Implement `onSnapshot` for real-time message bubbles.


6. **Deployment:** Configure `next.config.js` for production build and deploy to Vercel or Firebase Hosting.

