const interestsInput = document.getElementById("interests");
const skillsInput = document.getElementById("skills");
const resultDiv = document.getElementById("result");

const interestSuggestions = [
  "technology", "art", "writing", "medicine", "sports", "finance", "education"
];
const skillSuggestions = [
  "coding", "design", "communication", "analysis", "teamwork", "teaching", "problem solving"
];

document.getElementById("careerForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const interests = interestsInput.value.toLowerCase();
  const skills = skillsInput.value.toLowerCase();
  const education = document.getElementById("education").value;

  if (!interests || !skills || !education) {
    alert("Please fill out all fields.");
    return;
  }

  const suggestion = getCareerSuggestion(interests, skills, education);
  typeWriterEffect(suggestion, resultDiv);
});

function getCareerSuggestion(interests, skills, education) {
  if (interests.includes("technology") && skills.includes("coding")) {
    return "💻 You could be a Software Developer or Data Scientist!";
  } else if (interests.includes("art") && skills.includes("design")) {
    return "🎨 You might enjoy being a Graphic Designer or UI/UX Designer!";
  } else if (interests.includes("writing") && skills.includes("communication")) {
    return "📝 Consider a path in Content Writing or Copywriting!";
  } else if (education === "phd") {
    return "🎓 A career in Academic Research or as a University Professor could suit you.";
  } else {
    return "🔍 Based on your inputs, consider roles like Consultant, Analyst, or Project Manager.";
  }
}

function typeWriterEffect(text, element) {
  let index = 0;
  element.textContent = '';
  element.classList.remove("hidden");

  const interval = setInterval(() => {
    element.textContent += text.charAt(index);
    index++;
    if (index === text.length) clearInterval(interval);
  }, 30);
}

function setupAutoSuggest(input, suggestions) {
  input.addEventListener("input", function () {
    const val = this.value.toLowerCase();
    const list = suggestions.filter(item => item.startsWith(val)).slice(0, 5);
    closeSuggestions();

    if (!val) return;

    const listBox = document.createElement("ul");
    listBox.classList.add("suggest-list");

    list.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      li.addEventListener("click", () => {
        input.value = item;
        closeSuggestions();
      });
      listBox.appendChild(li);
    });

    this.parentNode.appendChild(listBox);
  });

  input.addEventListener("blur", () => setTimeout(closeSuggestions, 100));
}

function closeSuggestions() {
  const lists = document.querySelectorAll(".suggest-list");
  lists.forEach(list => list.remove());
}

setupAutoSuggest(interestsInput, interestSuggestions);
setupAutoSuggest(skillsInput, skillSuggestions);
