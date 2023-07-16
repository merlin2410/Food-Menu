async function getMenu(){
    response = await fetch(`https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json`);
    foodItems = await response.json();
    renderMenu(foodItems);
    return foodItems;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function takeOrder(foodItems){
    console.log("Taking Orders...");
    await delay(2500);
    orders = [];
    
    for(i=0;i<3;i++){
        randomIndex = Math.floor(Math.random()*foodItems.length);
        orders.push(foodItems[randomIndex]);
    }

    console.log("Orders successfully taken",orders);

    return orders;
    
}

async function orderPrep(orderStatus){
    console.log("Preparing Order...");
    await delay(1500);
    orderStatus.order_status = true;
    console.log("Preparing Order: Done")
    console.log(orderStatus);
    return orderStatus;
}

async function payOrder(orderStatus){
    console.log("Payment Processing");
    await delay(1000);
    orderStatus.paid = true;
    console.log("Payment Processing Done")
    console.log(orderStatus)
    return orderStatus;
}

function thankyouFnc(orderStatus){
    
    if(orderStatus.paid===true){
        alert("Thank you for eating with us today!");
    }
}



function renderMenu(foodItems){
    menuItems = document.getElementById("menu-items");
    menuItems.innerHTML = ``;
    for(i in foodItems){
        food = foodItems[i];
        
        menuItems.innerHTML +=   `<div class="item" id="item">
                            <img src="${food.imgSrc}" alt="cheesburger">
                            <div class="item-subtitle">
                                <div class="item-details">
                                    <h5>${food.name}</h5>
                                    <p>$ ${food.price}</p>
                                </div>
                                <span class="material-symbols-outlined add">
                                    add
                                    </span>
                            </div>
                        </div>`
    }
    
}



async function orderFood(){
    
    orderStatus = {
        order_status: false,
        paid: false
    }
    foodItems = await getMenu();

    orders = await takeOrder(foodItems);
    

    await orderPrep(orderStatus);
    
    await payOrder(orderStatus);
    


    

    thankyouFnc(orderStatus);
    

}

orderFood();
