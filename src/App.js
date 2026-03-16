import { useState } from "react";

const groceries = {
  "Produce & Herbs": [
    "Tomatoes (vine or cherry)", "Cucumbers", "Bell peppers (red/yellow)",
    "Spinach / arugula", "Zucchini", "Eggplant", "Red onion",
    "Garlic", "Lemons (6+)", "Fresh parsley & basil",
  ],
  "Grains & Legumes": [
    "Whole wheat pita bread", "Whole grain bread / sourdough",
    "Brown rice or farro", "Quinoa", "Canned chickpeas (3 cans)",
    "Canned white beans", "Green or brown lentils",
  ],
  "Proteins": [
    "Salmon fillets (fresh or frozen)", "Shrimp",
    "Canned tuna (in olive oil)", "Eggs (1 dozen)",
    "Feta cheese", "Greek yogurt (plain, full-fat)",
  ],
  "Pantry Staples": [
    "Extra-virgin olive oil (good quality)", "Kalamata olives",
    "Canned diced tomatoes", "Sun-dried tomatoes",
    "Honey", "Dijon mustard", "Red wine vinegar",
    "Dried oregano, cumin, paprika, cinnamon",
  ],
  "Nuts & Seeds": [
    "Almonds (raw)", "Walnuts", "Pumpkin seeds",
  ],
};

const mealPlan = [
  { day: "Mon", breakfast: "Greek yogurt + honey + walnuts", lunch: "Chickpea & cucumber salad", dinner: "Lemon garlic baked salmon + quinoa" },
  { day: "Tue", breakfast: "Whole grain toast + avocado + egg", lunch: "Tuna pita wrap + arugula", dinner: "Lentil soup + crusty bread" },
  { day: "Wed", breakfast: "Greek yogurt + almonds + berries", lunch: "Feta & tomato salad + pita", dinner: "Shrimp stir-fry with zucchini & tomatoes" },
  { day: "Thu", breakfast: "Overnight oats + honey", lunch: "White bean & spinach soup", dinner: "Baked eggplant with tomato sauce + farro" },
  { day: "Fri", breakfast: "Eggs scrambled with spinach & feta", lunch: "Leftover quinoa salad bowl", dinner: "Salmon patties + Greek salad" },
  { day: "Sat", breakfast: "Greek yogurt parfait", lunch: "Chickpea pita wrap", dinner: "Shrimp pasta with garlic & olive oil" },
  { day: "Sun", breakfast: "Veggie omelette", lunch: "Big Mediterranean platter", dinner: "Slow-cooked lentils + roasted veggies" },
];

const recipes = [
  {
    name: "Lemon Garlic Baked Salmon",
    time: "25 min",
    difficulty: "Easy",
    emoji: "🐟",
    ingredients: ["2 salmon fillets", "3 tbsp olive oil", "4 garlic cloves, minced", "Juice of 1 lemon", "1 tsp oregano", "Salt & pepper"],
    steps: [
      "Preheat oven to 400°F (200°C).",
      "Mix olive oil, garlic, lemon juice, oregano, salt & pepper.",
      "Place salmon on a lined baking sheet, pour mixture on top.",
      "Bake 15–18 min until flaky. Serve with quinoa or salad.",
    ]
  },
  {
    name: "Classic Greek Salad",
    time: "10 min",
    difficulty: "Easy",
    emoji: "🥗",
    ingredients: ["2 tomatoes, chunked", "1 cucumber, chunked", "½ red onion, sliced", "¼ cup Kalamata olives", "100g feta", "3 tbsp olive oil", "1 tsp oregano", "Salt"],
    steps: [
      "Combine tomatoes, cucumber, onion, and olives in a bowl.",
      "Top with crumbled feta and a pinch of oregano.",
      "Drizzle generously with olive oil, season with salt.",
      "Toss gently and serve immediately.",
    ]
  },
  {
    name: "Simple Lentil Soup",
    time: "35 min",
    difficulty: "Easy",
    emoji: "🍲",
    ingredients: ["1 cup green lentils", "1 can diced tomatoes", "1 onion, diced", "3 garlic cloves", "1 tsp cumin", "1 tsp paprika", "4 cups vegetable broth", "Olive oil"],
    steps: [
      "Sauté onion and garlic in olive oil for 3–4 min.",
      "Add lentils, tomatoes, broth, and spices.",
      "Bring to boil, then simmer 25 min until lentils are tender.",
      "Squeeze in half a lemon before serving.",
    ]
  },
  {
    name: "Shrimp with Garlic & Tomatoes",
    time: "20 min",
    difficulty: "Easy",
    emoji: "🍤",
    ingredients: ["300g shrimp, peeled", "3 garlic cloves, minced", "1 cup cherry tomatoes", "3 tbsp olive oil", "¼ cup fresh parsley", "Chili flakes", "Lemon juice"],
    steps: [
      "Heat olive oil in a pan over medium-high heat.",
      "Add garlic and chili flakes, cook 1 min.",
      "Add shrimp and tomatoes. Cook 3–4 min until shrimp is pink.",
      "Finish with lemon juice and fresh parsley.",
    ]
  },
  {
    name: "Chickpea Salad Wrap",
    time: "10 min",
    difficulty: "Easy",
    emoji: "🌯",
    ingredients: ["1 can chickpeas, drained", "½ cucumber, diced", "Cherry tomatoes, halved", "2 tbsp olive oil", "1 tbsp red wine vinegar", "Feta crumbles", "Whole wheat pita"],
    steps: [
      "Toss chickpeas, cucumber, and tomatoes in olive oil and vinegar.",
      "Season with salt, pepper, and oregano.",
      "Add feta and pile into a warm pita.",
      "Serve fresh or wrap for lunch on the go.",
    ]
  },
];

const tips = [
  { icon: "🫒", tip: "Swap butter for olive oil in everything — cooking, dipping, dressing." },
  { icon: "🐟", tip: "Aim for fish 2–3× per week. Frozen salmon is just as nutritious and cheaper." },
  { icon: "🥜", tip: "Replace chips with a small handful of almonds or walnuts as your go-to snack." },
  { icon: "🍷", tip: "If you drink alcohol, a small glass of red wine with dinner is very Mediterranean." },
  { icon: "🌿", tip: "Fresh herbs are the secret weapon. Parsley, basil, and mint make everything taste better." },
  { icon: "🥣", tip: "Greek yogurt with honey is the easiest, most satisfying breakfast you can make." },
];

export default function MediterraneanGuide() {
  const [activeTab, setActiveTab] = useState("grocery");
  const [openRecipe, setOpenRecipe] = useState(null);

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#fdf6ee",
      minHeight: "100vh",
      color: "#2d2215",
    }}>
      <div style={{
        background: "linear-gradient(135deg, #c1440e 0%, #e07b39 40%, #d4a054 100%)",
        padding: "48px 24px 36px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🌊</div>
        <h1 style={{
          margin: "0 0 8px",
          fontSize: "clamp(24px, 5vw, 40px)",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.5px",
          textShadow: "0 2px 12px rgba(0,0,0,0.2)",
        }}>Mediterranean Diet</h1>
        <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 16, margin: 0, fontStyle: "italic" }}>
          Your beginner's starter guide — simple, delicious, sustainable
        </p>
      </div>

      <div style={{
        display: "flex",
        overflowX: "auto",
        gap: 0,
        background: "#2d2215",
        padding: "0 16px",
        scrollbarWidth: "none",
      }}>
        {[
          { id: "grocery", label: "🛒 Grocery List" },
          { id: "plan", label: "📅 Week 1 Plan" },
          { id: "recipes", label: "👨‍🍳 Easy Recipes" },
          { id: "tips", label: "💡 Quick Tips" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            background: activeTab === tab.id ? "#c1440e" : "transparent",
            color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.55)",
            border: "none",
            padding: "14px 18px",
            cursor: "pointer",
            fontSize: 13,
            fontFamily: "inherit",
            fontWeight: activeTab === tab.id ? 700 : 400,
            whiteSpace: "nowrap",
            transition: "all 0.2s",
            borderBottom: activeTab === tab.id ? "3px solid #e07b39" : "3px solid transparent",
          }}>{tab.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px 60px" }}>

        {activeTab === "grocery" && (
          <div>
            <p style={{ color: "#7a5c3a", fontStyle: "italic", marginBottom: 24, fontSize: 15 }}>
              This first shop sets you up for a full week. Most items have great shelf life — you won't waste much.
            </p>
            {Object.entries(groceries).map(([cat, items]) => (
              <div key={cat} style={{ marginBottom: 24 }}>
                <h3 style={{
                  fontSize: 13, fontWeight: 700, letterSpacing: 2,
                  textTransform: "uppercase", color: "#c1440e",
                  margin: "0 0 12px", fontFamily: "sans-serif",
                }}>{cat}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {items.map(item => (
                    <span key={item} style={{
                      background: "#fff",
                      border: "1px solid #e8d5c0",
                      borderRadius: 20,
                      padding: "6px 14px",
                      fontSize: 14,
                      color: "#3d2b1a",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
            <div style={{
              background: "linear-gradient(135deg, #fff8f0, #fff)",
              border: "1px solid #e8d5c0",
              borderLeft: "4px solid #c1440e",
              borderRadius: 8,
              padding: "16px 20px",
              marginTop: 16,
            }}>
              <strong style={{ color: "#c1440e", fontFamily: "sans-serif", fontSize: 13 }}>💰 Budget tip:</strong>
              <p style={{ margin: "6px 0 0", fontSize: 14, color: "#5a3e28", lineHeight: 1.6 }}>
                Canned chickpeas, lentils, and tuna are your best friends — cheap, nutritious, and quick. Frozen fish and shrimp are just as good as fresh and significantly cheaper.
              </p>
            </div>
          </div>
        )}

        {activeTab === "plan" && (
          <div>
            <p style={{ color: "#7a5c3a", fontStyle: "italic", marginBottom: 24, fontSize: 15 }}>
              A simple, repeatable structure — not rigid. Swap meals around freely based on what you have.
            </p>
            <div style={{ display: "grid", gap: 12 }}>
              {mealPlan.map(({ day, breakfast, lunch, dinner }) => (
                <div key={day} style={{
                  background: "#fff",
                  border: "1px solid #e8d5c0",
                  borderRadius: 10,
                  overflow: "hidden",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}>
                  <div style={{
                    background: "#c1440e",
                    color: "#fff",
                    padding: "8px 16px",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 1,
                    fontFamily: "sans-serif",
                  }}>{day}</div>
                  <div style={{ padding: "12px 16px", display: "grid", gap: 8 }}>
                    {[["🌅 Breakfast", breakfast], ["☀️ Lunch", lunch], ["🌙 Dinner", dinner]].map(([label, meal]) => (
                      <div key={label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ fontSize: 11, color: "#c1440e", fontWeight: 700, fontFamily: "sans-serif", minWidth: 80, paddingTop: 2 }}>{label}</span>
                        <span style={{ fontSize: 14, color: "#3d2b1a" }}>{meal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "recipes" && (
          <div>
            <p style={{ color: "#7a5c3a", fontStyle: "italic", marginBottom: 24, fontSize: 15 }}>
              Five recipes to master first. All under 35 minutes, all genuinely delicious.
            </p>
            <div style={{ display: "grid", gap: 14 }}>
              {recipes.map((r, i) => (
                <div key={r.name} style={{
                  background: "#fff",
                  border: "1px solid #e8d5c0",
                  borderRadius: 10,
                  overflow: "hidden",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                }}>
                  <button onClick={() => setOpenRecipe(openRecipe === i ? null : i)} style={{
                    width: "100%", display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    background: "none", border: "none", cursor: "pointer",
                    padding: "16px 18px", textAlign: "left",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 28 }}>{r.emoji}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 16, color: "#2d2215", fontFamily: "'Georgia', serif" }}>{r.name}</div>
                        <div style={{ fontSize: 12, color: "#9a7a5a", marginTop: 2, fontFamily: "sans-serif" }}>
                          ⏱ {r.time} &nbsp;·&nbsp; {r.difficulty}
                        </div>
                      </div>
                    </div>
                    <span style={{ color: "#c1440e", fontSize: 20, display: "inline-block", transform: openRecipe === i ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>›</span>
                  </button>
                  {openRecipe === i && (
                    <div style={{ padding: "0 18px 18px", borderTop: "1px solid #f0e0d0" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 16 }}>
                        <div>
                          <h4 style={{ margin: "0 0 10px", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "#c1440e", fontFamily: "sans-serif" }}>Ingredients</h4>
                          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.9, fontSize: 14, color: "#3d2b1a" }}>
                            {r.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                          </ul>
                        </div>
                        <div>
                          <h4 style={{ margin: "0 0 10px", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "#c1440e", fontFamily: "sans-serif" }}>Steps</h4>
                          <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.9, fontSize: 14, color: "#3d2b1a" }}>
                            {r.steps.map(step => <li key={step}>{step}</li>)}
                          </ol>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "tips" && (
          <div>
            <p style={{ color: "#7a5c3a", fontStyle: "italic", marginBottom: 24, fontSize: 15 }}>
              Small shifts that make a big difference — the Mediterranean way is about everyday habits, not perfection.
            </p>
            <div style={{ display: "grid", gap: 14 }}>
              {tips.map(({ icon, tip }) => (
                <div key={tip} style={{
                  background: "#fff",
                  border: "1px solid #e8d5c0",
                  borderRadius: 10,
                  padding: "16px 20px",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
                }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{icon}</span>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#3d2b1a" }}>{tip}</p>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 28,
              background: "linear-gradient(135deg, #c1440e, #e07b39)",
              borderRadius: 12,
              padding: "20px 24px",
              color: "#fff",
            }}>
              <h3 style={{ margin: "0 0 8px", fontFamily: "sans-serif", fontSize: 15 }}>🎯 The Core Principle</h3>
              <p style={{ margin: 0, lineHeight: 1.7, fontSize: 14, opacity: 0.92 }}>
                You don't have to overhaul everything at once. Start by replacing one thing per week — swap vegetable oil for olive oil, add a handful of nuts as your afternoon snack, or try one of these recipes on the weekend. The Mediterranean diet is a lifestyle, not a strict rulebook.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}