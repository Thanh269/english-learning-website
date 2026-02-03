const videos = [
  {
    youtubeId: "rooyX8r8xmw",
    question: "What does the speaker want to do?",
    answers: {
      A: "Go to school",
      B: "Learn English",
      C: "Play football",
      D: "Watch TV"
    },
    correct: "B"
  },
  {
    youtubeId: "5MgBikgcWnY",
    question: "Where is the conversation taking place?",
    answers: {
      A: "At home",
      B: "At school",
      C: "At a restaurant",
      D: "At the airport"
    },
    correct: "C"
  },
  {
    youtubeId: "HcOc7P5BMi4",
    question: "Who is the speaker talking to?",
    answers: {
      A: "A teacher",
      B: "A friend",
      C: "A customer",
      D: "A doctor"
    },
    correct: "B"
  }
];

function loadVideo() {
  const index = document.getElementById("videoSelect").value;
  const video = videos[index];

  // load video
  document.getElementById("videoFrame").src =
    `https://www.youtube.com/embed/${video.youtubeId}`;

  // question
  document.getElementById("question").innerText =
    "Question: " + video.question;

  // answers
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  for (const key in video.answers) {
    answersDiv.innerHTML += `
      <button class="btn btn-outline-primary w-100 mb-2"
        onclick="checkAnswer('${key}', ${index})">
        ${key}. ${video.answers[key]}
      </button>
    `;
  }

  document.getElementById("result").innerText = "";
}

// kiểm tra đáp án
function checkAnswer(selected, index) {
  const result = document.getElementById("result");
  const correct = videos[index].correct;

  if (selected === correct) {
    result.innerHTML = "✅ Correct!";
    result.className = "text-success fs-5";
  } else {
    result.innerHTML = `❌ Wrong! Correct answer is ${correct}`;
    result.className = "text-danger fs-5";
  }
}

// load video đầu tiên khi mở trang
loadVideo();
