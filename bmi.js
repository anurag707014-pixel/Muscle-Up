const bmiForm = document.querySelector("#bmi-form");

if (bmiForm) {
  const heightUnit = document.querySelector("#height-unit");
  const weightUnit = document.querySelector("#weight-unit");
  const heightCmField = document.querySelector("#height-cm-field");
  const heightImperialField = document.querySelector("#height-imperial-field");
  const weightKgField = document.querySelector("#weight-kg-field");
  const weightLbField = document.querySelector("#weight-lb-field");
  const heightCmInput = document.querySelector("#height");
  const heightFeetInput = document.querySelector("#height-feet");
  const heightInchesInput = document.querySelector("#height-inches");
  const weightKgInput = document.querySelector("#weight");
  const weightLbInput = document.querySelector("#weight-pounds");
  const bmiValue = document.querySelector("#bmi-value");
  const bmiCategory = document.querySelector("#bmi-category");
  const bmiMessage = document.querySelector("#bmi-message");
  const bmiFormula = document.querySelector("#bmi-formula");

  const resetResult = () => {
    bmiValue.textContent = "—";
    bmiCategory.textContent = "Enter your details above";
    bmiMessage.textContent = "BMI is one general screening measure and does not diagnose health.";
  };

  const updateFormula = () => {
    if (heightUnit.value === "cm" && weightUnit.value === "kg") {
      bmiFormula.textContent = "Weight (kg) ÷ height (m)²";
    } else if (heightUnit.value === "ft-in" && weightUnit.value === "lb") {
      bmiFormula.textContent = "703 × weight (lb) ÷ height (in)²";
    } else {
      bmiFormula.textContent = "Height and weight are converted before calculation";
    }
  };

  heightUnit.addEventListener("change", () => {
    const useImperialHeight = heightUnit.value === "ft-in";
    heightCmField.hidden = useImperialHeight;
    heightImperialField.hidden = !useImperialHeight;
    heightCmInput.required = !useImperialHeight;
    heightFeetInput.required = useImperialHeight;
    heightInchesInput.required = useImperialHeight;
    heightCmInput.value = "";
    heightFeetInput.value = "";
    heightInchesInput.value = "";
    heightInchesInput.setCustomValidity("");
    resetResult();
    updateFormula();
  });

  weightUnit.addEventListener("change", () => {
    const usePounds = weightUnit.value === "lb";
    weightKgField.hidden = usePounds;
    weightLbField.hidden = !usePounds;
    weightKgInput.required = !usePounds;
    weightLbInput.required = usePounds;
    weightKgInput.value = "";
    weightLbInput.value = "";
    resetResult();
    updateFormula();
  });

  [heightFeetInput, heightInchesInput].forEach((input) => {
    input.addEventListener("input", () => heightInchesInput.setCustomValidity(""));
  });

  bmiForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!bmiForm.reportValidity()) {
      return;
    }

    let heightMeters;
    if (heightUnit.value === "cm") {
      heightMeters = Number(heightCmInput.value) / 100;
    } else {
      const heightCm = (Number(heightFeetInput.value) * 12 + Number(heightInchesInput.value)) * 2.54;
      if (heightCm < 50 || heightCm > 275) {
        heightInchesInput.setCustomValidity("Combined height must be between 50 and 275 cm.");
        bmiForm.reportValidity();
        return;
      }
      heightMeters = heightCm / 100;
    }

    const weightKg = weightUnit.value === "kg"
      ? Number(weightKgInput.value)
      : Number(weightLbInput.value) * 0.45359237;
    if (!heightMeters || !weightKg) {
      bmiForm.reportValidity();
      return;
    }

    const bmi = weightKg / (heightMeters ** 2);
    let category;
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal range";
    else if (bmi < 30) category = "Overweight";
    else category = "Obesity";

    bmiValue.textContent = bmi.toFixed(1);
    bmiCategory.textContent = category;
    bmiMessage.textContent = "This is a general screening estimate, not a diagnosis. Consider your overall health and speak with a professional for personal advice.";
  });
}
