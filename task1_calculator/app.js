let angleMode = 'DEG'; // or 'RAD'

function appendValue(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = '';
}

function deleteLast() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function calculate() {
  let expression = document.getElementById("display").value;

  try {
    // Replace sin/cos/tan if in degrees
    if (angleMode === 'DEG') {
      expression = expression.replace(/Math\.sin\(/g, "Math.sin(toRadians(");
      expression = expression.replace(/Math\.cos\(/g, "Math.cos(toRadians(");
      expression = expression.replace(/Math\.tan\(/g, "Math.tan(toRadians(");
    }
    let result = eval(expression);
    document.getElementById("display").value = result;
  } catch (error) {
    document.getElementById("display").value = "Error";
  }
}

function toRadians(degree) {
  return degree * (Math.PI / 180);
}

function toggleAngleMode() {
  angleMode = angleMode === 'DEG' ? 'RAD' : 'DEG';
  document.querySelector("button[onclick='toggleAngleMode()']").textContent = angleMode;
}
