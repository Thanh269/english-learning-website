const exercises = [
  {
    id: 1,
    title: "Daily Routine",
    text: `
Every day, I ___ (1) up at six o’clock.
Then, I go to school ___ (2) bike.
In the afternoon, I help my parents ___ (3) the housework.
In the evening, I usually ___ (4) TV.
    `,
    questions: [
      {
        id: 1,
        options: { A: "wake", B: "get", C: "stand", D: "put" },
        answer: "B"
      },
      {
        id: 2,
        options: { A: "in", B: "on", C: "by", D: "with" },
        answer: "C"
      },
      {
        id: 3,
        options: { A: "do", B: "does", C: "doing", D: "did" },
        answer: "A"
      },
      {
        id: 4,
        options: { A: "see", B: "watch", C: "look", D: "hear" },
        answer: "B"
      }
    ]
  },

  {
    id: 2,
    title: "Learning English",
    text: `
  Learning English is very important for students today. English helps us ___ (1)
  with people from different countries and understand foreign cultures. 
  To learn English well, we should practice ___ (2) 
  every day and not be afraid of making mistakes. The more we practice,
  the ___ (3) our English will become.
    `,
    questions: [
      {
        id: 1,
        options: { A: "communication", B: "communicate ", C: "communicating", D: "communicated" },
        answer: "B"
      },
      {
        id: 2,
        options: { A: "speak", B: "speaks", C: "speaking ", D: "spoke" },
        answer: "C"
      },
      {
        id: 3,
        options: { A: "good", B: "better ", C: "best", D: "well" },
        answer: "B"
      },
    ]
  },
  {
    id: 3,
    title: "A Healthy Lifestyle",
    text: `
To stay healthy, we should eat ___ (1) food and exercise regularly. 
We should also drink enough water and ___ (2) up early every day. 
Playing sports helps us become stronger and more active. 
If we have a healthy lifestyle, we will feel ___ (3) and study better at school.
    `,
    questions: [
      {
        id: 1,
        options: { A: "junk", B: "fast", C: "healthy ", D: "dirty" },
        answer: "C"
      },
      {
        id: 2,
        options: { A: "get ", B: "wake", C: "stand", D: "take" },
        answer: "A"
      },
      {
        id: 3,
        options: { A: "tired", B: "weak", C: "happy ", D: "bored" },
        answer: "C"
      },
    
    ]
  },
  {
    id: 4,
    title: "PAST SIMPLE",
    text: `
Yesterday, my class ___ (1) a picnic in the park.
We ___ (2) there by bus and ___ (3) many interesting games.
My best friend ___ (4) a lot of photos, and our teacher ___ (5) us very happy.
    `,
    questions: [
      {
        id: 1,
        options: { A: "has", B: "have", C: "had", D: "having" },
        answer: "C"
      },
      {
        id: 2,
        options: { A: "go", B: "went", C: "going", D: "gone" },
        answer: "B"
      },
      {
        id: 3,
        options: { A: "play", B: "plays", C: "playing", D: "played" },
        answer: "D"
      },
      {
        id: 4,
        options: { A: "take", B: "takes", C: "took ", D: "taking" },
        answer: "C"
      },
       {
        id: 5,
        options: { A: "makes", B: "made ", C: "make", D: "making" },
        answer: "B"
      }
    ]
  }
];
const exerciseSelect = document.getElementById("exerciseSelect");
// ===== TẠO DANH SÁCH BÀI TẬP =====
exercises.forEach((ex, i) => {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = ex.title;
  exerciseSelect.appendChild(option);
});
exerciseSelect.addEventListener("change", e => {
  currentIndex = Number(e.target.value);
  current = exercises[currentIndex];

  index = 0;
  userAnswers = {};
  isChecked = false;
  resultBox.innerHTML = "";

  textBox.innerHTML = current.text;
  renderQuestion();
});
// ===== LẤY PHẦN TỬ =====
const textBox = document.getElementById("exerciseText");
const questionBox = document.getElementById("questions");
const resultBox = document.getElementById("result");
const checkBtn = document.getElementById("checkBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
let current = exercises[currentIndex];
let index = 0;
let userAnswers = {};
let isChecked = false; // 🔥 QUAN TRỌNG

// ===== HIỂN THỊ ĐOẠN VĂN =====
textBox.innerHTML = current.text;

// ===== HIỂN THỊ 1 CÂU =====
function renderQuestion() {
  const q = current.questions[index];

  questionBox.innerHTML = `
  <strong>Question ${q.id}</strong>
    <div class="question-box">
      ${Object.entries(q.options)
        .map(
          ([key, val]) => `
        <label class="option">
          <input type="radio" name="q${q.id}" value="${key}"
            ${userAnswers[q.id] === key ? "checked" : ""}>
          <span>${key}. ${val}</span>
        </label>
      `
        )
        .join("")}
    </div>
  `;

  // ===== LƯU ĐÁP ÁN =====
  document.querySelectorAll(`input[name="q${q.id}"]`).forEach(input => {
    input.addEventListener("change", () => {
      userAnswers[q.id] = input.value;

      // nếu đã kiểm tra → tô màu lại ngay
      if (isChecked) applyColors(q);
    });
  });

  // ===== NẾU ĐÃ KIỂM TRA → TÔ MÀU =====
  if (isChecked) {
    applyColors(q);
  }

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === current.questions.length - 1;
}

// ===== TÔ MÀU ĐÚNG / SAI =====
function applyColors(q) {
  const selectedValue = userAnswers[q.id];
  const options = document.querySelectorAll(`input[name="q${q.id}"]`);

  options.forEach(opt => {
    const label = opt.parentElement;

    label.style.color = "";
    label.style.fontWeight = "";

    // 🔒 KHÓA SAU KHI CHẤM
    if (isChecked) {
      opt.disabled = true;
    }

    // đáp án đúng → xanh
    if (opt.value === q.answer) {
      label.style.color = "green";
      label.style.fontWeight = "600";
    }

    // chọn sai → đỏ
    if (
      selectedValue &&
      opt.value === selectedValue &&  
      selectedValue !== q.answer
    ) {
      label.style.color = "red";
      label.style.fontWeight = "600";
    }
  });
}

renderQuestion();

// ===== NÚT TRƯỚC =====
prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    renderQuestion();
  }
});

// ===== NÚT SAU =====
nextBtn.addEventListener("click", () => {
  if (index < current.questions.length - 1) {
    index++;
    renderQuestion();
  }
});

// ===== KIỂM TRA =====
checkBtn.addEventListener("click", () => {
  isChecked = true;

  let correct = 0;
  const total = current.questions.length;

  current.questions.forEach(q => {
    if (userAnswers[q.id] === q.answer) {
      correct++;
    }
  });

  const percent = Math.round((correct / total) * 100);

  renderQuestion();

  resultBox.innerHTML = `
    ✅ Correct ${correct} / ${total} <br>
    📊 Score: ${percent}%
  `;
});
  