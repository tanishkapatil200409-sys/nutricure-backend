function getAdvice(symptoms) {
    // convert to lowercase and replace spaces with _
    symptoms = symptoms.toLowerCase().replace(/ /g, "_");

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
