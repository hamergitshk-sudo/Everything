
const scenes = [...document.querySelectorAll(".scene")];
const chapterLabel = document.getElementById("chapter-label");
const progress = document.getElementById("progress");
const backBtn = document.getElementById("back");
const forwardBtn = document.getElementById("forward");

let current = 0;
let heartTimer = null;
let heartSpawn = null;
let heartSeconds = 10;
let heartPoints = 0;
let gameRunning = false;

function goTo(index) {
  current = Math.max(0, Math.min(index, scenes.length - 1));

  scenes.forEach((scene, i) => {
    scene.classList.toggle("active", i === current);
    scene.setAttribute("aria-hidden", String(i !== current));
  });

  chapterLabel.textContent =
    scenes[current].dataset.title || "A LITTLE SURPRISE";

  progress.style.width = `${((current + 1) / scenes.length) * 100}%`;
  backBtn.disabled = current === 0;
  forwardBtn.disabled = current === scenes.length - 1;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function nextScene() {
  goTo(current + 1);
}

backBtn.addEventListener("click", () => goTo(current - 1));
forwardBtn.addEventListener("click", nextScene);

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", nextScene);
});

// Small visual celebrations
function celebrate(amount = 55) {
  const container = document.getElementById("confetti");
  const symbols = ["💗", "✨", "🌸", "💖", "⭐", "🎉", "💕"];

  for (let i = 0; i < amount; i++) {
    const item = document.createElement("span");
    item.className = "confetti-piece";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.left = `${Math.random() * 100}%`;
    item.style.fontSize = `${14 + Math.random() * 18}px`;
    item.style.animationDuration = `${2.2 + Math.random() * 2.3}s`;
    item.style.animationDelay = `${Math.random() * 0.8}s`;

    container.appendChild(item);
    item.addEventListener("animationend", () => item.remove());
  }
}

// Floating rose petals in the background
function createPetal() {
  const container = document.getElementById("petals");
  const petal = document.createElement("span");

  petal.className = "petal";
  petal.textContent = ["🌸", "✿", "♥"][Math.floor(Math.random() * 3)];
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.fontSize = `${10 + Math.random() * 13}px`;
  petal.style.animationDuration = `${7 + Math.random() * 7}s`;

  container.appendChild(petal);
  petal.addEventListener("animationend", () => petal.remove());
}

for (let i = 0; i < 13; i++) createPetal();
setInterval(createPetal, 1800);

// 01 — Envelope opening
const envelope = document.getElementById("envelope");
const openLetter = document.getElementById("open-letter");
const letterReveal = document.getElementById("letter-reveal");

openLetter.addEventListener("click", () => {
  envelope.classList.add("open");
  openLetter.classList.add("hidden");
  letterReveal.classList.remove("hidden");
  celebrate(18);
});

// 02 — Identity check
document.querySelectorAll("[data-verify]").forEach(button => {
  button.addEventListener("click", () => {
    const result = document.getElementById("verify-result");

    if (button.dataset.verify === "yes") {
      result.textContent =
        "Identity confirmed! Itne nakhre sirf original Madam Ji ke ho sakte hain. 👑😂";
    } else {
      result.textContent =
        "Lawyer sahiba, birthday cake ke liye bhi aapko Madam Ji ki permission chahiye. 😂";
    }

    document.getElementById("verify-next").classList.remove("hidden");
  });
});

// 03 — Lights on countdown
const lightsBtn = document.getElementById("lights-btn");
let lightsStarted = false;

lightsBtn.addEventListener("click", () => {
  if (lightsStarted) return;
  lightsStarted = true;
  lightsBtn.disabled = true;

  const title = document.getElementById("lights-title");
  const copy = document.getElementById("lights-copy");
  const room = document.getElementById("dark-room");

  const sequence = ["3...", "2...", "1...", "SURPRISE! ✨"];

  sequence.forEach((word, index) => {
    setTimeout(() => {
      title.textContent = word;
    }, index * 750);
  });

  setTimeout(() => {
    room.classList.add("lit");
    copy.textContent =
      "Dekhiye Madam Ji, ye chhoti si duniya sirf aapke liye hai. 💗";

    lightsBtn.classList.add("hidden");
    document.getElementById("lights-next").classList.remove("hidden");
    celebrate(30);
  }, sequence.length * 750);
});

// 04 — Cake ceremony
const candles = [...document.querySelectorAll(".candle")];
const blowBtn = document.getElementById("blow-btn");
const cutBtn = document.getElementById("cut-btn");
const cakeStatus = document.getElementById("cake-status");
const cake = document.querySelector(".cake");
let candlesBlown = false;
let cakeCut = false;

function blowCandles() {
  if (candlesBlown) return;

  candlesBlown = true;

  candles.forEach((candle, index) => {
    setTimeout(() => {
      candle.classList.add("blown");
      candle.disabled = true;
    }, index * 130);
  });

  cakeStatus.textContent =
    "Wish maang li? ✨ Ab duniya ki saari khushiyan aapke naam.";

  blowBtn.classList.add("hidden");
  cutBtn.classList.remove("hidden");
  celebrate(22);
}

blowBtn.addEventListener("click", blowCandles);

// Individual candle taps also count as blowing them out
candles.forEach(candle => {
  candle.addEventListener("click", () => {
    if (candlesBlown || candle.classList.contains("blown")) return;

    candle.classList.add("blown");
    candle.disabled = true;

    const remaining = candles.filter(
      item => !item.classList.contains("blown")
    ).length;

    if (remaining === 0) {
      blowCandles();
      return;
    }

    cakeStatus.textContent =
      `${remaining} candles baaki hain. Wish poori karni hai, Madam Ji! 🕯️`;
  });
});

cutBtn.addEventListener("click", () => {
  if (cakeCut) return;

  cakeCut = true;
  cake.classList.add("cut");
  cutBtn.disabled = true;
  cutBtn.textContent = "Slice cut ho gayi! 🍰";

  cakeStatus.textContent =
    "Chef Madam Ji ne cake officially cut kar diya! 🎉";

  setTimeout(() => {
    document.getElementById("cake-celebration").classList.remove("hidden");
    celebrate(95);
  }, 950);
});

// 05 — Collect five cake pieces
let bitesCollected = 0;

document.querySelectorAll("[data-bite]").forEach(button => {
  button.addEventListener("click", () => {
    if (button.classList.contains("collected")) return;

    button.classList.add("collected");
    button.disabled = true;
    bitesCollected++;

    document.getElementById("bite-score").textContent =
      `Collected: ${bitesCollected} / 5`;

    if (bitesCollected === 5) {
      document.getElementById("bite-score").textContent =
        "All collected! Madam Ji ka cake quota complete. 😂🍰";

      document.getElementById("bite-next").classList.remove("hidden");
      celebrate(25);
    }
  });
});

// 06 — Nakhre detector
document.querySelectorAll("[data-nakhra]").forEach(button => {
  button.addEventListener("click", () => {
    const result = document.getElementById("nakhra-result");
    const options = document.getElementById("nakhra-options");

    if (button.dataset.nakhra === "right") {
      result.textContent =
        "Correct! Madam Ji ki aankhon ki language samajhna advanced course hai. 😂❤️";
    } else {
      result.textContent =
        "Wrong answer! Relationship department ne aapka form wapas kar diya. 🤣";
    }

    options.querySelectorAll("button").forEach(item => {
      item.disabled = true;
    });

    document.getElementById("nakhra-next").classList.remove("hidden");
  });
});

// 07 — Catch hearts in 10 seconds
const arena = document.getElementById("heart-arena");
const heartCount = document.getElementById("heart-count");
const heartTime = document.getElementById("heart-time");
const heartStart = document.getElementById("heart-start");
const heartResult = document.getElementById("heart-result");
const heartNext = document.getElementById("heart-next");

function stopHeartGame() {
  clearInterval(heartTimer);
  clearInterval(heartSpawn);

  heartTimer = null;
  heartSpawn = null;
  gameRunning = false;

  arena.querySelectorAll(".flying-heart").forEach(item => item.remove());
  heartStart.disabled = false;
  heartStart.textContent = "Play again ↻";

  heartResult.textContent = heartPoints >= 8
    ? `Waah! ${heartPoints} hearts! Madam Ji is the champion. 🏆💗`
    : `${heartPoints} hearts collected! Practice se queen bhi champion ban jaati hai. 💗`;

  heartNext.classList.remove("hidden");
  celebrate(heartPoints >= 8 ? 50 : 20);
}

function spawnHeart() {
  if (!gameRunning) return;

  const hint = arena.querySelector(".arena-hint");
  if (hint) hint.remove();

  const heart = document.createElement("button");
  heart.type = "button";
  heart.className = "flying-heart";
  heart.textContent = ["💗", "💖", "💕", "💘"][
    Math.floor(Math.random() * 4)
  ];
  heart.setAttribute("aria-label", "Catch this heart");

  const maxX = Math.max(0, arena.clientWidth - 55);
  const maxY = Math.max(0, arena.clientHeight - 55);

  heart.style.left = `${Math.random() * maxX}px`;
  heart.style.top = `${Math.random() * maxY}px`;

  heart.addEventListener("click", () => {
    if (!gameRunning || heart.dataset.caught) return;

    heart.dataset.caught = "true";
    heartPoints++;
    heartCount.textContent = `Hearts: ${heartPoints}`;
    heart.remove();
  });

  arena.appendChild(heart);

  setTimeout(() => heart.remove(), 1600);
}

heartStart.addEventListener("click", () => {
  if (gameRunning) return;

  gameRunning = true;
  heartPoints = 0;
  heartSeconds = 10;

  heartNext.classList.add("hidden");
  heartResult.textContent = "";
  heartCount.textContent = "Hearts: 0";
  heartTime.textContent = "Time: 10";

  arena.innerHTML = "";
  heartStart.disabled = true;
  heartStart.textContent = "Game running...";

  spawnHeart();
  heartSpawn = setInterval(spawnHeart, 650);

  heartTimer = setInterval(() => {
    heartSeconds--;
    heartTime.textContent = `Time: ${heartSeconds}`;

    if (heartSeconds <= 0) stopHeartGame();
  }, 1000);
});

// 09 — Choose a dream date
const dateMessages = {
  moon: "Moonlight, stars aur long conversations. Bas hum, sukoon aur ek dreamy raat. 🌙",
  cafe: "Coffee, strawberry cake aur itni teasing ki café wala bhi hans pade. ☕😂",
  adventure: "Rides, games aur masti! Madam Ji jeetein ya main, bill birthday girl ka nahi hoga. 🎡"
};

document.querySelectorAll("[data-date]").forEach(button => {
  button.addEventListener("click", () => {
    const result = document.getElementById("date-result");

    result.textContent = dateMessages[button.dataset.date];
    result.classList.remove("hidden");

    document.getElementById("date-next").classList.remove("hidden");
  });
});

// 10 — Playful happiness meter
const slider = document.getElementById("love-slider");
const meterDisplay = document.getElementById("meter-display");
const meterResult = document.getElementById("meter-result");

function updateMeter() {
  const value = Number(slider.value);

  meterDisplay.textContent = `${value}%`;

  if (value < 30) {
    meterResult.textContent =
      "Madam Ji ko cake aur extra attention ki zaroorat hai. 🍰";
  } else if (value < 70) {
    meterResult.textContent =
      "Nakhre moderate hain. Ek surprise aur kaam aa sakta hai. 😌";
  } else {
    meterResult.textContent =
      "Warning: excessive cuteness detected. Birthday queen active! 💗";
  }
}

slider.addEventListener("input", updateMeter);
updateMeter();

// 11 — Treasure password
const treasureInput = document.getElementById("treasure-input");
const treasureUnlock = document.getElementById("treasure-unlock");

function unlockTreasure() {
  const answer = treasureInput.value.trim().toLowerCase();

  if (["madam ji", "madamji", "queen", "birthday girl", "pasandida aurat"].includes(answer)) {
    document.getElementById("treasure").textContent = "💎";
    document.getElementById("treasure-result").classList.remove("hidden");
    document.getElementById("treasure-next").classList.remove("hidden");

    treasureInput.disabled = true;
    treasureUnlock.disabled = true;
    treasureUnlock.textContent = "Unlocked! 🔓";

    celebrate(40);
  } else {
    document.getElementById("treasure").textContent = "🔒";
    treasureInput.setCustomValidity("");
    treasureInput.placeholder = "Hint: Madam Ji ya queen try karo!";
    treasureInput.focus();
  }
}

treasureUnlock.addEventListener("click", unlockTreasure);

treasureInput.addEventListener("keydown", event => {
  if (event.key === "Enter") unlockTreasure();
});

// 12 — Compliment envelopes
document.querySelectorAll("[data-compliment]").forEach(button => {
  button.addEventListener("click", () => {
    const result = document.getElementById("compliment-result");

    result.textContent = button.dataset.compliment;
    result.classList.remove("hidden");

    button.textContent = "Opened 💗";
    button.disabled = true;
  });
});

// 13 — Optional music from a local audio file
const songFile = document.getElementById("song-file");
const songAudio = document.getElementById("song-audio");
const songToggle = document.getElementById("song-toggle");
const vinyl = document.getElementById("vinyl");
const musicBtn = document.getElementById("music-btn");

let songURL = null;

songFile.addEventListener("change", () => {
  const file = songFile.files && songFile.files[0];
  if (!file) return;

  if (songURL) URL.revokeObjectURL(songURL);

  songURL = URL.createObjectURL(file);
  songAudio.src = songURL;
  songAudio.load();

  songToggle.disabled = false;
  songToggle.textContent = "Play music ♫";
});

async function toggleSong() {
  if (!songAudio.src) return;

  if (songAudio.paused) {
    try {
      await songAudio.play();
    } catch {
      songToggle.textContent = "Tap to play again";
    }
  } else {
    songAudio.pause();
  }
}

songToggle.addEventListener("click", toggleSong);
musicBtn.addEventListener("click", toggleSong);

songAudio.addEventListener("play", () => {
  songToggle.textContent = "Pause music Ⅱ";
  vinyl.classList.add("playing");
});

songAudio.addEventListener("pause", () => {
  songToggle.textContent = "Play music ♫";
  vinyl.classList.remove("playing");
});

// 14 — Gift box reveal
const giftBox = document.getElementById("gift-open");

giftBox.addEventListener("click", () => {
  if (giftBox.classList.contains("open")) return;

  giftBox.classList.add("open");
  document.getElementById("gift-hint").textContent =
    "Surprise opened! ❤️";

  setTimeout(() => {
    document.getElementById("gift-message").classList.remove("hidden");
    document.getElementById("gift-next").classList.remove("hidden");
    celebrate(50);
  }, 700);
});

// 16 — Grand finale
document.getElementById("final-button").addEventListener("click", event => {
  document.getElementById("final-message").textContent =
    "Madam Ji, aaj saare hearts aapke naam! Happy Birthday, meri pasandida aurat. ❤️🎂✨";

  event.currentTarget.disabled = true;
  event.currentTarget.textContent = "All hearts are yours 💗";

  celebrate(120);
});

document.getElementById("replay").addEventListener("click", () => {
  goTo(0);
});

// Keyboard navigation
document.addEventListener("keydown", event => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.target.closest("input,button,a")) return;

  if (event.key === "ArrowRight" && current < scenes.length - 1) {
    nextScene();
  }

  if (event.key === "ArrowLeft" && current > 0) {
    goTo(current - 1);
  }
});

// Initial state
goTo(0);
