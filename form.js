export default function formChecker() {
    console.log("JS Loaded");
  const mail = document.querySelector("#mail");
  const country = document.querySelector("#country");
  const password = document.querySelector("#pwd");
  const postalCode = document.querySelector("#postal-code");
  const submitBtn = document.querySelector(".validate");

  const pwdRegExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!#$%^&*])[A-Za-z\d@!#$%^&*]{8,10}$/;

  const postalCodeChecker = {
    ph: [
      "^\\d{4}$",
      "Philippine postal codes must have exactly 4 digits: e.g. 1000",
    ],
    th: [
      "^\\d{5}$",
      "Thai postal codes must have exactly 5 digits: e.g. 10110",
    ],
    sg: [
      "^\\d{6}$",
      "Singapore postal codes must have exactly 6 digits: e.g. 238801",
    ],
    my: [
      "^\\d{5}$",
      "Malaysian postal codes must have exactly 5 digits: e.g. 50450",
    ],
    vn: [
      "^\\d{5,6}$",
      "Vietnamese postal codes must have 5 or 6 digits: e.g. 70000 or 700000",
    ],
    id: [
      "^\\d{5}$",
      "Indonesian postal codes must have exactly 5 digits: e.g. 10110",
    ],
  };

  let [pattern, message] = postalCodeChecker[country.value];
  let postalRegEx = new RegExp(pattern);

  country.addEventListener("change", () => {
    [pattern, message] = postalCodeChecker[country.value];
    postalRegEx = new RegExp(pattern);
    postalCode.setCustomValidity("");
    postalCode.dispatchEvent(new Event("input"));
  });

  mail.addEventListener("input", () => {
    if (mail.validity.valueMissing || mail.validity.typeMismatch) {
      mail.setCustomValidity("Please enter a valid email address.");
      toggleError(mail, true);
    } else {
      mail.setCustomValidity("");
      toggleError(mail, false);
    }
  });

  password.addEventListener("input", () => {
    if (password.validity.valueMissing) {
      password.setCustomValidity("Please enter password.");
      toggleError(password, true);
    } else if (password.validity.tooShort) {
      password.setCustomValidity("Minimum 8 characters.");
      toggleError(password, true);
    } else if (password.validity.tooLong) {
      password.setCustomValidity("Password is maximum 10 characters only.");
      toggleError(password, true);
    } else if (!pwdRegExp.test(password.value)) {
      password.setCustomValidity(
        "Password must be 8-10 characters, include at least one number, and one special character (@!#$%^&*)."
      );
      toggleError(password, true);
    } else {
      password.setCustomValidity("");
      toggleError(password, false);
    }
  });

  postalCode.addEventListener("input", () => {
    if (postalCode.validity.valueMissing) {
      postalCode.setCustomValidity("Please enter postal code.");
      toggleError(postalCode, true);
    } else if (!postalRegEx.test(postalCode.value)) {
      postalCode.setCustomValidity(message);
      toggleError(postalCode, true);
    } else {
      postalCode.setCustomValidity("");
      toggleError(postalCode, false);
    }
  });

  function toggleError(input, hasError) {
    if (hasError) input.classList.add("error");
    else input.classList.remove("error");
  }

  submitBtn.addEventListener("click", (e) => {
    const isValid =
      mail.checkValidity() &&
      password.checkValidity() &&
      postalCode.checkValidity();
    country.checkValidity();

    if (!isValid) {
      e.preventDefault();
      mail.reportValidity();
      password.reportValidity();
      postalCode.reportValidity();
    } else alert("Hi-five! Good Job!");
  });
}
