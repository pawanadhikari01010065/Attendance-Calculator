function updateSliderValue() {
    const value = document.getElementById("required").value;
    document.getElementById("sliderValue").textContent = value + "%";
}
function resetCalculator(){

    document.getElementById("total").value = "";
    document.getElementById("attended").value = "";

    document.getElementById("required").value = 75;

    updateSliderValue();

    document.getElementById("result").innerHTML = "";

    document.getElementById("progressBar").style.width = "0%";
}
document.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        calculateAttendance();
    }
});

function calculateAttendance() {

    let total = parseFloat(document.getElementById("total").value);
    let attended = parseFloat(document.getElementById("attended").value);
    let required = parseFloat(document.getElementById("required").value);

    if (total <= 0 || attended < 0 || attended > total) {

        document.getElementById("result").innerHTML =
            "Please enter valid values.";

        document.getElementById("progressBar").style.width = "0%";

        return;
    }

    let current = (attended / total) * 100;

    const bar = document.getElementById("progressBar");

    const progress = Math.min((current / required) * 100, 100);

    bar.style.width = progress + "%";

    if (current < required) {
        bar.style.background = "#ef4444";
    } else {
        bar.style.background = "#22c55e";
    }

    let result = `
        <p><strong>Current Attendance:</strong> ${current.toFixed(2)}%</p>
       
    `;

    if (current >= required) {

        let bunk = Math.floor(
            (attended * 100 / required) - total
        );

        result += `
            <p>✅ You can miss <strong>${bunk}</strong> more classes.</p>
        `;

    } else {

        let need = Math.ceil(
            (required * total - 100 * attended) /
            (100 - required)
        );

        result += `
            <p>📚 You must attend <strong>${need}</strong> more classes continuously.</p>
        `;
    }

    document.getElementById("result").innerHTML = result;
}

const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        toggleBtn.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        toggleBtn.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️ Light Mode";
}

updateSliderValue();
