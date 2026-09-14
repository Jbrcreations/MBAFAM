// MBA FAREWELL — 69 FRIENDS • ONE JOURNEY
// Keeps the original GSAP animation structure
// and changes the story into an emotional MBA farewell.

// Load customization data
const fetchData = () => {
fetch("customize.json")
.then(response => response.json())
.then(data => {
const dataArr = Object.keys(data);

  dataArr.forEach(customData => {
    const element = document.querySelector(
      `[data-node-name*="${customData}"]`
    );

    if (!element || data[customData] === "") return;

    if (customData === "imagePath") {
      element.setAttribute("src", data[customData]);
    } else {
      element.innerText = data[customData];
    }
  });

  animationTimeline();
})
.catch(error => {
  console.error("Unable to load customize.json:", error);
});

};

// MBA FAREWELL ANIMATION
const animationTimeline = () => {

const textBoxChars =
document.getElementsByClassName("hbd-chatbox")[0];

const hbd =
document.getElementsByClassName("wish-hbd")[0];

// Animate farewell message character by character
if (textBoxChars) {
textBoxChars.innerHTML = "<span>${textBoxChars.innerHTML .split("") .join("</span><span>")}</span>";
}

if (hbd) {
hbd.innerHTML = "<span>${hbd.innerHTML .split("") .join("</span><span>")}</span>";
}

const ideaTextTrans = {
opacity: 0,
y: -20,
rotationX: 5,
skewX: "15deg"
};

const ideaTextTransLeave = {
opacity: 0,
y: 20,
rotationY: 5,
skewX: "-15deg"
};

const tl = new TimelineMax();

tl
// INTRO
.to(".container", 0.1, {
visibility: "visible"
})

.from(".one", 0.8, {
  opacity: 0,
  y: 20
})

.from(".two", 0.6, {
  opacity: 0,
  y: 20
})

.to(
  ".one",
  0.8,
  {
    opacity: 0,
    y: 20
  },
  "+=2.5"
)

.to(
  ".two",
  0.8,
  {
    opacity: 0,
    y: 20
  },
  "-=0.8"
)

// MBA LIFE ENDING
.from(".three", 0.8, {
  opacity: 0,
  y: 20
})

.to(
  ".three",
  0.8,
  {
    opacity: 0,
    y: 20
  },
  "+=2.5"
)

// MESSAGE BOX
.from(".four", 0.8, {
  scale: 0.2,
  opacity: 0
})

.from(".fake-btn", 0.4, {
  scale: 0.2,
  opacity: 0
})

.staggerTo(
  ".hbd-chatbox span",
  0.45,
  {
    visibility: "visible"
  },
  0.035
)

.to(".fake-btn", 0.2, {
  backgroundColor: "rgb(127, 206, 248)"
})

.to(
  ".four",
  0.6,
  {
    scale: 0.2,
    opacity: 0,
    y: -150
  },
  "+=1"
)

// OUR MBA JOURNEY
.from(".idea-1", 0.8, ideaTextTrans)

.to(
  ".idea-1",
  0.8,
  ideaTextTransLeave,
  "+=2"
)

// 69 FRIENDS
.from(".idea-2", 0.8, ideaTextTrans)

.to(
  ".idea-2",
  0.8,
  ideaTextTransLeave,
  "+=2"
)

// DIFFERENT TEAMS
.from(".idea-3", 0.8, ideaTextTrans)

.to(
  ".idea-3 strong",
  0.6,
  {
    scale: 1.25,
    x: 10,
    backgroundColor: "rgb(21, 161, 237)",
    color: "#fff"
  }
)

.to(
  ".idea-3",
  0.8,
  ideaTextTransLeave,
  "+=2"
)

// UNITY
.from(".idea-4", 0.8, ideaTextTrans)

.to(
  ".idea-4",
  0.8,
  ideaTextTransLeave,
  "+=2"
)

// THE SPECIAL THOUGHT
.from(
  ".idea-5",
  0.8,
  {
    rotationX: 15,
    rotationZ: -10,
    skewY: "-5deg",
    y: 50,
    z: 10,
    opacity: 0
  },
  "+=0.5"
)

.to(
  ".idea-5 .smiley",
  0.7,
  {
    rotation: 90,
    x: 8
  },
  "+=0.5"
)

.to(
  ".idea-5",
  0.8,
  {
    scale: 0.2,
    opacity: 0
  },
  "+=2"
)

// ONE GROUP — ONE HEART
.staggerFrom(
  ".idea-6 span",
  0.9,
  {
    scale: 3,
    opacity: 0,
    rotation: 15,
    ease: Expo.easeOut
  },
  0.2
)

.staggerTo(
  ".idea-6 span",
  0.8,
  {
    scale: 3,
    opacity: 0,
    rotation: -15,
    ease: Expo.easeOut
  },
  0.2,
  "+=1"
)

// MEMORY / CELEBRATION EFFECT
.staggerFromTo(
  ".baloons img",
  2.5,
  {
    opacity: 0.9,
    y: 1400
  },
  {
    opacity: 1,
    y: -1000
  },
  0.2
)

// PHOTO
.from(
  ".lydia-dp",
  0.6,
  {
    scale: 3.5,
    opacity: 0,
    x: 25,
    y: -25,
    rotationZ: -45
  },
  "-=2"
)

// HAT / GRADUATION FEEL
.from(".hat", 0.6, {
  x: -100,
  y: 350,
  rotation: -180,
  opacity: 0
})

// FINAL FAREWELL HEADING
.staggerFrom(
  ".wish-hbd span",
  0.7,
  {
    opacity: 0,
    y: -50,
    rotation: 150,
    skewX: "30deg",
    ease: Elastic.easeOut.config(1, 0.5)
  },
  0.1
)

.staggerFromTo(
  ".wish-hbd span",
  0.7,
  {
    scale: 1.4,
    rotationY: 150
  },
  {
    scale: 1,
    rotationY: 0,
    color: "#ff69b4",
    ease: Expo.easeOut
  },
  0.1,
  "farewell"
)

.from(
  ".wish h5",
  0.6,
  {
    opacity: 0,
    y: 10,
    skewX: "-15deg"
  },
  "farewell"
)

// HEART / LIGHT EFFECT
.staggerTo(
  ".eight svg",
  1.5,
  {
    visibility: "visible",
    opacity: 0,
    scale: 80,
    repeat: 3,
    repeatDelay: 1.4
  },
  0.3
)

// FADE MAIN MEMORY SECTION
.to(".six", 0.6, {
  opacity: 0,
  y: 30,
  zIndex: "-1"
})

// FINAL MESSAGE
.staggerFrom(
  ".nine p",
  1,
  ideaTextTrans,
  1.2
)

.to(
  ".last-smile",
  0.6,
  {
    rotation: 90
  },
  "+=1"
);

// REPLAY THE MBA JOURNEY
const replyBtn = document.getElementById("replay");

if (replyBtn) {
replyBtn.addEventListener("click", () => {
tl.restart();
});
}
};

// Start everything
fetchData();fetchData();
