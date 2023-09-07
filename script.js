const searchBtn = document.getElementById("searchBtn");
const input = document.getElementById("input");
const dataFrame = document.getElementById("data");
const h3 = document.createElement("h3")
h3.append(document.createTextNode("Loading..."))

const getData = async (query) => {
  dataFrame.innerHTML = ""
  dataFrame.append(h3)
  const option = {
    method: "GET",
    headers: { "X-Api-Key": "chGPQVEfC9zwxsE8vf7glA==dWkj56O023VJMqZ2" },
    contentType: "application/json",
  };
  await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${query}`, option)
    .then((res) => res.json())
    .then((data) => {
      setData(data)
    })
    .catch((err) => console.error(err));
};

const setData = (data) => {
  if (data.length !== 0) {
    dataFrame.innerHTML = ""
    data.map(d => {
      dataFrame.innerHTML += (`
        <table>
        <tr>
          <th>serving size</th>
          <td>${d.serving_size_g} g</td>
        </tr>
        <tr>
          <th>calories</th>
          <td>${d.calories} cal</td>
        </tr>
        <tr>
          <th>protein</th>
          <td>${d.protein_g} g</td>
        </tr>
        <tr>
          <th>carbohydrates</th>
          <td>${d.carbohydrates_total_g} g</td>
        </tr>
        <tr>
          <th>fats</th>
          <td>${d.fat_total_g} g</td>
        </tr>
        <tr>
          <th>cholesterol</th>
          <td>${d.cholesterol_mg} mg</td>
        </tr>
        <tr>
          <th>fiber</th>
          <td>${d.fiber_g} g</td>
        </tr>
        <tr>
          <th>potassium</th>
          <td>${d.potassium_mg} mg</td>
        </tr>
        <tr>
          <th>sodium</th>
          <td>${d.sodium_mg} mg</td>
        </tr>
        <tr>
          <th>sugar</th>
          <td>${d.sugar_g} g</td>
        </tr>
      </table>
    `)
    })
  } else {
    dataFrame.innerHTML = `<h3>no data about <span>"${input.value}"</span></h3>`
  }
}

searchBtn.addEventListener("click", () => {
  if (input.value) {
    getData(input.value);
  }
});

window.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    if (input.value) {
      getData(input.value);
    }
  }
});


// https://api.spoonacular.com/recipes/716429/information?apiKey=226b4db26dda4b7da6e2a80dc09365d7&includeNutrition=true
