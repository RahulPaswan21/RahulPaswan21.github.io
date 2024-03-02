const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");
const categorySelect = document.getElementById("category");
const submitButton = document.getElementById("submit");

const data = [
  {
    state: "West Bengal",
    cities: ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Malda"],
    categories: {
      Kolkata: ["Restaurant", "School", "Hospital"],
      Asansol: ["Restaurant", "School", "Hospital"],
      Siliguri: ["Restaurant", "School", "Hospital"],
      Durgapur: ["Restaurant", "School", "Hospital"],
      Malda: ["Restaurant", "School", "Hospital"],
    },
  },
  {
    state: "Jharkhand",
    cities: ["Ranchi", "Jamshedpur", "Dhanbad"],
    categories: {
      Ranchi: ["Restaurant", "School", "Hospital"],
      Jamshedpur: ["Restaurant", "School", "Hospital"],
      Dhanbad: ["Restaurant", "School", "Hospital"],
    },
  },
  {
    state: "Bihar",
    cities: ["Patna", "Gaya", "Bhagalpur"],
    categories: {
      Patna: ["Restaurant", "School", "Hospital"],
      Gaya: ["Restaurant", "School", "Hospital"],
      Bhagalpur: ["Restaurant", "School", "Hospital"],
    },
  },
];

function selectState() {
  const selectedState = data.find(
    (item) => item.state === stateSelect.value
  );

  citySelect.innerHTML = '<option value="" disabled selected>Select City</option>';
  selectedState.cities.forEach((city) => {
    const cityOption = document.createElement("option");
    cityOption.value = city;
    cityOption.innerText = city;
    citySelect.appendChild(cityOption);
  });

  citySelect.disabled = false;
}

function selectCity() {
  const selectedState = data.find(
    (item) => item.state === stateSelect.value
  );

  categorySelect.innerHTML = '<option value="" disabled selected>Select Category</option>';
  selectedState.categories[citySelect.value].forEach((category) => {
    const categoryOption = document.createElement("option");
    categoryOption.value = category;
    categoryOption.innerText = category;
    categorySelect.appendChild(categoryOption);
  });

  categorySelect.disabled = false;
  submitButton.disabled = false;
}

function fetchData() {
  const state = stateSelect.value;
  const city = citySelect.value;
  const category = categorySelect.value;

  fetch("Database.json")
    .then((response) => response.json())
    .then((data) => {
      const filteredData = data.filter(
        (item) =>
          item.state === state && item.city === city && item.category === category
      );

      localStorage.setItem("filteredData", JSON.stringify(filteredData));
      window.location.href = "result.html";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

if (window.location.pathname.includes("result.html")) {
  const resultDiv = document.getElementById("result");
  const filteredData = JSON.parse(localStorage.getItem("filteredData"));

  filteredData.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("result");
    const image = document.createElement("img");
    image.src = item.image;
    const title = document.createElement("h3");
    title.innerText = item.title;
    const ratings = document.createElement("h4");
    ratings.innerText = item.ratings;
    const stars = document.createElement("h4");
stars.classList.add("stars");
stars.classList.add("star-rating"); // add class for star rating
stars.innerText = item.stars;
    const address = document.createElement("p");
    address.innerText = item.address;
   
    const link = document.createElement("a");
        link.href = item.link;
    link.innerText = "view on maps"; 
    itemDiv.appendChild(image);
    itemDiv.appendChild(title);
    itemDiv.appendChild(address);
    itemDiv.appendChild(ratings);
    itemDiv.appendChild(link);
    itemDiv.appendChild(stars);

    resultDiv.appendChild(itemDiv);
  });
}

function goBack() {
    window.location.href = "cityinfo.html";
  }
