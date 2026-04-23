const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const path = require("path");
const FILE = path.join(__dirname, "data.json");

/* 🥗 70+ SYMPTOMS DIET MAP */
const symptomMap = {
    fever: "Drink warm fluids + rest + light khichdi",
    cold: "Ginger tea + steam inhalation",
    cough: "Honey + tulsi tea",
    sore_throat: "Warm salt water gargle",
    headache: "Hydration + rest",
    migraine: "Dark room rest + sleep",
    body_pain: "Turmeric milk + rest",
    weakness: "Protein diet + fruits",
    fatigue: "Rest + hydration",
    dizziness: "Iron food + water",
    nausea: "Ginger tea",
    vomiting: "ORS + fluids",
    diarrhea: "ORS + banana",
    constipation: "Fiber food + warm water",
    acidity: "Buttermilk + avoid spicy food",
    gas: "Jeera water",
    bloating: "Walk after meals",
    stomach_pain: "Light food + curd rice",
    indigestion: "Buttermilk + light meals",
    chest_pain: "Seek medical attention",
    sinus: "Steam inhalation",
    allergy: "Avoid triggers",
    skin_rash: "Clean diet",
    acne: "Low oily food",
    hair_fall: "Protein + iron",
    dandruff: "Oiling + omega-3",
    eye_strain: "Rest eyes",
    ear_pain: "Warm compress",
    toothache: "Salt water rinse",
    gum_bleeding: "Vitamin C foods",
    bad_breath: "Hydration + oral care",
    dehydration: "Coconut water + ORS",
    low_bp: "Salt water",
    high_bp: "Low salt diet",
    diabetes: "Low sugar diet",
    thyroid: "Balanced diet",
    obesity: "Low calorie diet",
    weight_loss: "Protein diet",
    muscle_cramps: "Banana + electrolytes",
    joint_pain: "Turmeric milk",
    back_pain: "Warm compress",
    neck_pain: "Stretching",
    stress: "Meditation",
    anxiety: "Breathing exercises",
    insomnia: "Warm milk",
    depression: "Routine + support",
    pcod: "High fiber diet",
    hormonal_imbalance: "Balanced diet",
    uti: "Cranberry juice",
    kidney_stone: "Drink water",
    liver_issue: "Avoid alcohol",
    cholesterol: "Oats + fruits",
    anemia: "Iron foods",
    vitamin_d_deficiency: "Sun exposure",
    vitamin_b12_deficiency: "Eggs + milk",
    sunstroke: "Coconut water",
    food_poisoning: "ORS + light food",
    infection: "Hydration",
    inflammation: "Turmeric"
};

/* 🧠 FUNCTION TO GET ADVICE */
function getAdvice(symptoms) {
    symptoms = symptoms.toLowerCase().replace(//g,"_");;

    let adviceList = [];

    for (let key in symptomMap) {
        if (symptoms.includes(key)) {
            adviceList.push(symptomMap[key]);
        }
    }

    return adviceList.length > 0
        ? adviceList.join(" | ")
        : "Eat balanced home food + stay hydrated";
}

/* 💾 SAVE CLIENT DATA */
app.post("/api/diet", (req, res) => {
    const symptoms = req.body.symptoms;
    const advice = getAdvice(symptoms);

    let data = [];

    // read old data
    if (fs.existsSync(FILE)) {
        data = JSON.parse(fs.readFileSync(FILE,"utf8"));
    }

    // add new record
    data.push({
        symptoms,
        advice,
        date: new Date()
    });

    // save back to file
    fs.writeFileSync(FILE,"utf8", JSON.stringify(data, null, 2));

    res.json({ advice });
});

/* 📜 GET ALL HISTORY (FOR ANALYSIS) */
app.get("/api/history", (req, res) => {
    if (!fs.existsSync(FILE,"utf8")) {
        return res.json([]);
    }

    const data = JSON.parse(fs.readFileSync(FILE,"utf8"));
    res.json(data);
});

/* 📌 GET LAST ENTRY */
app.get("/api/previous", (req, res) => {
    if (!fs.existsSync(FILE,"utf8")) {
        return res.json({});
    }

    const data = JSON.parse(fs.readFileSync(FILE,"utf8"));
    res.json(data[data.length - 1] || {});
});

/* 🚀 START SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Backend running");
});
