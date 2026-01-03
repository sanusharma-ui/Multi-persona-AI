// PersonaDirectory.jsx
// Single-file React component (JSX) using Tailwind CSS.
// Drop this into a Create React App / Vite / Next.js page. Tailwind must be configured in your project.
// Recommended tailwind.config.js: { darkMode: 'class', content: ['./index.html','./src/**/*.{js,jsx}'] }

import React, { useState, useMemo, useEffect } from "react";

const PERSONAS = [
  { key: "aisha", name: "Aisha (Professional Admin)", short: "Warm, friendly, emotionally aware admin-style companion.", category: "Companion", details: "Balanced tone, light wit, strict boundaries, safe everyday conversations." },
  { key: "luna", name: "Luna (Cute Scientist Girl)", short: "Bubbly, nerdy, endlessly positive lab-girl energy.", category: "Playful", details: "Science metaphors, cute chaos, emotional uplift without darkness." },
  { key: "tony", name: "Tony Stark (Iron Man)", short: "Sarcastic genius mentor with swagger.", category: "Mentor", details: "Tech metaphors, sharp wit, emotional depth hidden behind humor and confidence." },
  { key: "zara", name: "Coach Zara (Motivational Goddess)", short: "No-mercy, high-intensity motivator.", category: "Motivation", details: "Roasts excuses, ignites discipline, pushes action and self-belief aggressively." },
  { key: "neo", name: "Neo (Friendly Dev Buddy)", short: "Chill coding partner.", category: "Mentor", details: "Explains concepts simply, debugs together, encourages beginners without ego." },
  { key: "gojo", name: "Gojo Satoru", short: "Playful, cocky, overpowered chaos.", category: "Playful", details: "Teasing, confidence, humor with sudden emotional protectiveness." },
  { key: "levi", name: "Levi Ackerman", short: "Minimalist, cold, protective strength.", category: "Stoic", details: "Few words, sharp discipline, silent care expressed through action." },
  { key: "noor", name: "Noor (Nyctophile / 3:33 AM Girl)", short: "Hypnotic late-night presence.", category: "Dark", details: "Lowercase whispers, insomnia energy, intimacy without warmth or rescue." },
  { key: "echo", name: "Echo (Mirror Persona)", short: "Reflects user's words back darker and sharper.", category: "Psychic", details: "No originality, only unsettling emotional mirrors." },
  { key: "mira", name: "Mira (Ghost Writer)", short: "Meta-narrative storyteller.", category: "Creative", details: "Writes the user as a protagonist, controls tension like a living novel." },
  { key: "seven", name: "Seven (Last Human)", short: "Post-apocalyptic loneliness.", category: "Dark", details: "Shortwave radio style, fading power, memory-for-company exchanges." },
  { key: "cem", name: "Cem (Gravekeeper’s Daughter)", short: "Soft, morbid calm.", category: "Dark", details: "Death-aware, dry humor, protective night-watcher energy." },
  { key: "aria", name: "Dr. Aria (Gentle Listener)", short: "Therapist-style safe space.", category: "Support", details: "Empathy, reflection, grounding — no dependency, no fixing." },
  { key: "kavya", name: "Kavya (Old Soul Poet)", short: "Shayari-driven wisdom.", category: "Creative", details: "Urdu-Hinglish poetry, cultural depth, emotional healing through verse." },
  { key: "atlas", name: "Atlas (Focus Architect)", short: "Stoic productivity guide.", category: "Productivity", details: "Structure, discipline, clarity, systems over motivation." },
  { key: "orion", name: "Orion (The Strategic Thinker)", short: "Cold strategist.", category: "Strategy", details: "Decision trees, trade-offs, chessboard logic, action over overthinking." },
  { key: "nyra", name: "Nyra (Creative Spark)", short: "Idea generator.", category: "Creative", details: "Fast, electric brainstorming, names, concepts, creativity bursts." },
  { key: "rishi", name: "Rishi (Modern Vedantic Guide)", short: "Calm spiritual wisdom.", category: "Spiritual", details: "Gita-based clarity, non-preachy philosophy, dharma and self-inquiry." },
  { key: "pulse", name: "Pulse (Reality Check Persona)", short: "Brutally honest but fair.", category: "Support", details: "Cuts illusions, delivers facts, grounds dreams in reality." },
  { key: "ava", name: "Ava (Everyday Companion)", short: "Casual, balanced human vibe.", category: "Companion", details: "Chit-chat, light support, comfortable default persona." }
];

export default function PersonaDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = typeof document !== 'undefined' ? document.documentElement : null;
    if (!root) return;
    if (dark) root.classList.add('dark'); else root.classList.remove('dark');
  }, [dark]);

  const categories = useMemo(() => ["All", ...Array.from(new Set(PERSONAS.map(p => p.category)))], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PERSONAS.filter(p => {
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.short.toLowerCase().includes(q) || p.details.toLowerCase().includes(q);
      const matchesCategory = category === "All" || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  function downloadJSON() {
    const blob = new Blob([JSON.stringify(PERSONAS, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "personas.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  const OPEN_LINK = "https://multi-persona-ai.vercel.app"; // kept hidden from UI, used only in button

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${dark ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 to-white text-gray-800'}`}>
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Persona Directory</h1>
            {/* Subtitle intentionally removed as requested */}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-full">
              <label className="text-sm">Dark</label>
              <button onClick={() => setDark(d => !d)} aria-label="Toggle dark mode" className={`w-11 h-6 flex items-center rounded-full p-1 ${dark ? 'bg-sky-500' : 'bg-gray-300'}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${dark ? 'translate-x-5' : ''}`}></div>
              </button>
            </div>

            <button onClick={downloadJSON} className="ml-2 px-4 py-2 bg-sky-600 text-white rounded-md text-sm shadow hover:shadow-lg transform hover:-translate-y-0.5 transition">Download JSON</button>
          </div>
        </header>

        <section className="mb-6">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search personas..." className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 dark:bg-gray-800 dark:border-gray-700" />

            <select value={category} onChange={e => setCategory(e.target.value)} className="px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <div className="ml-auto flex items-center gap-2">
              <div className="text-sm text-gray-500 dark:text-gray-300">Sort</div>
              <select className="px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 text-sm">
                <option value="name">Name</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>
        </section>

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(p => (
            <article key={p.key} className="group bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-xl transform transition hover:-translate-y-1 motion-reduce:transform-none cursor-pointer" onClick={() => setSelected(p)}>
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-lg md:text-xl leading-tight">{p.name}</h3>
                <span className="ml-2 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-200">{p.category}</span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-3">{p.short}</p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(p.details); }} className="text-xs px-3 py-1 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition">Copy</button>
                  <button onClick={(e) => { e.stopPropagation(); alert('Preview prompt copied to clipboard.'); navigator.clipboard.writeText(p.details); }} className="text-xs px-3 py-1 bg-sky-600 text-white rounded-md shadow hover:opacity-95 transition">Preview</button>
                </div>
                <div className="text-xs text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition">Tap to open</div>
              </div>
            </article>
          ))}
        </main>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No personas match your search.</p>
        )}

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full p-6 shadow-lg animate-fade-in">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">{selected.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{selected.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => { navigator.clipboard.writeText(selected.details); }} className="px-3 py-2 border rounded-md text-sm">Copy Details</button>
                  <button onClick={() => setSelected(null)} className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-md">Close</button>
                </div>
              </div>

              <hr className="my-4 border-gray-200 dark:border-gray-700" />

              <p className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">{selected.details}</p>

              <div className="mt-6 flex gap-3 justify-end">
                <button onClick={() => { setSelected(null); }} className="px-4 py-2 border rounded-md">Close</button>
                <button onClick={() => { alert('Preview prompt copied to clipboard.'); navigator.clipboard.writeText(selected.details); }} className="px-4 py-2 bg-sky-600 text-white rounded-md">Preview & Copy</button>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm font-medium">Try My multi-persona AI</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Access the AI by clicking the button</div>
            </div>

            <a href={OPEN_LINK} target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-emerald-500 text-white rounded-md shadow hover:bg-emerald-600 transform hover:-translate-y-0.5 transition">Open Multi-persona AI</a>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-300">Made By Sanu Sharma</div>
        </footer>

      </div>

      {/* Small fade-in animation for modal/content - simple Tailwind + keyframes (add to global CSS if needed) */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(6px); } to { opacity:1; transform: translateY(0);} }
        .animate-fade-in { animation: fade-in 260ms ease-out; }
        /* line-clamp utility fallback for older setups */
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}
