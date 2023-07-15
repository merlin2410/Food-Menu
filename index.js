async function getMenu(){
    response = await fetch(`https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json`);
    foodItems = await response.json();
    renderMenu(foodItems);
    return foodItems;
}

async function takeOrder(foodItems){
    orders = [];
    console.log("Taking Order....")
    setTimeout(()=>{
        for(i=0;i<3;i++){
            randomIndex = Math.floor(Math.random()*foodItems.length);
            orders.push(foodItems[randomIndex]);
        }
        //console.log(orders);
        
    },2500);

    return orders;
    
}

async function orderPrep(orderStatus){
    orderStatus = {};
    setTimeout(()=>{
        orderStatus.order_status = true;
    },1500);
}

async function payOrder(orderStatus){
    setTimeout(()=>{
        orderStatus.paid = true;
    },1000);
}

function thankyouFnc(){
    if(orderStatus.paid===true){
        alert("Thank you for eating with us today!")
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
    console.log(orders);

    await orderPrep(orderStatus);
    console.log(orderStatus);

    await payOrder(orderStatus);
    console.log(orderStatus);

    thankyouFnc(orderStatus);

}

orderFood();
