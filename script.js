function predictCrowd() {
    const time = document.getElementById("time").value;
    const weather = document.getElementById("weather").value;
    const day = document.getElementById("day").value;

    let score = 0;

    if (time === "peak") score += 40;
    if (weather === "rain") score += 30;
    if (day === "holiday") score += 30;

    let crowdLevel = "LOW";
    let boxClass = "low";
    let suggestion = "No congestion expected.";

    if (score >= 70) {
        crowdLevel = "HIGH";
        boxClass = "high";
        suggestion = "High congestion expected. Deploy extra buses.";
    } else if (score >= 40) {
        crowdLevel = "MEDIUM";
        boxClass = "medium";
        suggestion = "Moderate crowd. Monitor closely.";
    }

    const crowdBox = document.getElementById("crowdBox");
    const crowdText = document.getElementById("crowdText");

    crowdBox.className = boxClass;
    crowdText.innerText = crowdLevel;
    document.getElementById("suggestion").innerText = suggestion;
}
