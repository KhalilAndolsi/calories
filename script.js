const searchBtn = document.getElementById("searchBtn");
const input = document.getElementById("input");
const dataFrame = document.getElementById("data");
const con = document.getElementById("con");
let per = 100;
const h3 = document.createElement("h3");
h3.append(document.createTextNode("Loading..."));

const getData = async (query) => {
  dataFrame.innerHTML = "";
  dataFrame.append(h3);
  const option = {
    method: "GET",
    headers: { "X-Api-Key": "chGPQVEfC9zwxsE8vf7glA==dWkj56O023VJMqZ2" },
    contentType: "application/json",
  };
  await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${query}`, option)
    .then((res) => res.json())
    .then((data) => {
      setData(data);
    })
    .catch((err) => console.error(err));
};

con.addEventListener("change", () => {
  per = con.value
  if (per < 0) {
    per *= -1
  } else if (per == 0) {
    per = 100
  }
  con.value = per
  getData(input.value)
})

const setData = (data) => {
  if (data.length !== 0) {
    dataFrame.innerHTML = "";
    data.map((d) => {
      dataFrame.innerHTML += `
        <table>
        <tr>
          <th>serving size</th>
          <td>${((d.serving_size_g / 100 ) * per).toFixed(2)} g</td>
        </tr>
        <tr>
          <th>calories</th>
          <td>${((d.calories / 100 ) * per).toFixed(2)} cal</td>
        </tr>
        <tr>
          <th>protein</th>
          <td>${((d.protein_g / 100 ) * per).toFixed(2)} g</td>
        </tr>
        <tr>
          <th>carbohydrates</th>
          <td>${((d.carbohydrates_total_g / 100 ) * per).toFixed(2)} g</td>
        </tr>
        <tr>
          <th>fats</th>
          <td>${((d.fat_total_g / 100 ) * per).toFixed(2)} g</td>
        </tr>
        <tr>
          <th>cholesterol</th>
          <td>${((d.cholesterol_mg / 100 ) * per).toFixed(2)} mg</td>
        </tr>
        <tr>
          <th>fiber</th>
          <td>${((d.fiber_g / 100 ) * per).toFixed(2)} g</td>
        </tr>
        <tr>
          <th>potassium</th>
          <td>${((d.potassium_mg / 100 ) * per).toFixed(2)} mg</td>
        </tr>
        <tr>
          <th>sodium</th>
          <td>${((d.sodium_mg / 100 ) * per).toFixed(2)} mg</td>
        </tr>
        <tr>
          <th>sugar</th>
          <td>${((d.sugar_g / 100) * per).toFixed(2)} g</td>
        </tr>
      </table>
    `;
    });
  } else {
    dataFrame.innerHTML = `<h3>no data about <span>"${input.value}"</span></h3>`;
  }
};

searchBtn.addEventListener("click", () => {
  if (input.value) {
    getData(input.value);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.code === "Enter") {
    if (input.value) {
      getData(input.value);
    }
  }
});

// https://api.spoonacular.com/recipes/716429/information?apiKey=226b4db26dda4b7da6e2a80dc09365d7&includeNutrition=true
