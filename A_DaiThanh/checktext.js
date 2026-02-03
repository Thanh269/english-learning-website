const input = document.getElementById("textInput");
const result = document.getElementById("result");
const checkBtn = document.getElementById("checkBtn");

checkBtn.addEventListener("click", checkSpelling);

/* ===== CHECK SPELL ===== */
async function checkSpelling() {
  const text = input.value.trim();
  try {
    const res = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        text: text,
        language: "en-US"
      })
    });

    const data = await res.json();
    highlightErrors(text, data.matches || []);
  } catch {
    result.innerHTML = "❌ Server connection error";
  }
}

/* ===== HIỂN THỊ LỖI ===== */
function highlightErrors(text, matches) {
  if (matches.length === 0) {
    result.innerHTML = `
      <div class="text-success fw-semibold">
        ✅ No errors detected
      </div>`;
    return;
  }

  let html = `<div class="suggest-box">`;

  matches.forEach((m, i) => {
    const wrongText = text.substr(m.offset, m.length);
    const suggestions = m.replacements
      .slice(0, 5)
      .map(r => r.value)
      .join(", ");

    const explanation = m.message || "No explanation";

    html += `
  <div class="mb-2 d-flex align-items-center gap-2">
    <span class="wrong text-danger fw-semibold fs-6">
      ❌ ${escapeHTML(wrongText)}
    </span>

    <span class="suggestion text-primary fs-5">
      → ${suggestions || "No suggestion"}
    </span>

    <!-- ICON CHÚ THÍCH -->
    <span class="info-icon">
  <i class="bi bi-info-circle"></i>
  <div class="explain-card">
    <div class="explain-title">
       Why is this wrong?
    </div>
    <div class="explain-content">
      ${escapeHTML(m.message || "No explanation available.")}
    </div>
  </div>
</span>

  </div>
`;

  });

  html += `</div>`;
  result.innerHTML = html;
}

/* ===== CHỐNG XSS ===== */
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[m]));
}
