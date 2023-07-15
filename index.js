async function getMenu(){
    response = await fetch(`https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json`);
    foodItems = await response.json();
    return foodItems;
}

fetchData();