const translations = {
    en: {
        "Welcome": "Welcome",
        "This is a sample text.": "This is a sample text.",
        "Click Me": "Click Me",
        "Our Services": "Our Services",
        "We offer the best solutions for you.": "We offer the best solutions for you."
    },
    hi: {
        "Welcome": "स्वागत है",
        "This is a sample text.": "यह एक नमूना पाठ है।",
        "Click Me": "मुझे क्लिक करें",
        "Our Services": "हमारी सेवाएं",
        "We offer the best solutions for you.": "हम आपको सर्वश्रेष्ठ समाधान प्रदान करते हैं।"
    },
    mr: {
        "Welcome": "स्वागत आहे",
        "This is a sample text.": "हा एक नमुना मजकूर आहे.",
        "Click Me": "मला क्लिक करा",
        "Our Services": "आमच्या सेवा",
        "We offer the best solutions for you.": "आम्ही आपल्यासाठी सर्वोत्तम उपाय देतो."
    }
};

// Function to translate all text content
function changeLanguage(lang) {
    document.querySelectorAll("*").forEach(element => {
        if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
            let text = element.innerText.trim();
            if (translations[lang][text]) {
                element.innerText = translations[lang][text];
            }
        }
    });

    // Store language preference
    localStorage.setItem("selectedLanguage", lang);
}

// Event listener for language selection
document.getElementById("language-select").addEventListener("change", function() {
    changeLanguage(this.value);
});

// Load saved language on page load
const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
document.getElementById("language-select").value = savedLanguage;
changeLanguage(savedLanguage);