// get the order from localStorage, then display menu accordingly
let order;
let totalItem;
const Total1 = document.getElementById('total1');
const Total2 = document.getElementById('total2');
if (localStorage.getItem('order') == null) {
  order = [];
  totalItem = 0;
} else {
  order = JSON.parse(localStorage.getItem('order'));
  totalItem = order.reduce(
    (preValue, curValue) => preValue + Number(curValue.qty),
    0
  );

  Total1.innerText = Total2.innerText = Number(totalItem);
}
populateOrderPage();
showLastVisited();
// get the lastVisitedPageId from localStorage, and show that page
function showLastVisited() {
  const lastVisitedPageId = window.localStorage.getItem('lastVisited');

  if (lastVisitedPageId !== null) {
    const lastVisitedPage = document.getElementById(lastVisitedPageId);
    const lastVisitedNav = document.querySelectorAll(
      `a[href='#${lastVisitedPageId}']`
    )[0];
    lastVisitedPage.style.display = 'flex';
    lastVisitedNav.classList.add('active');
  }
}

// when a nav menu clicked, show the corresponding page
function showPage(event, pageId) {
  const navbarToggler = document.getElementById('navbarToggler');
  setTimeout(() => {
    navbarToggler.classList.toggle('show');
  }, 500);

  const divs = document.getElementsByClassName('page');
  const navLinks = document.getElementsByClassName('nav-link');
  for (let navLink of navLinks) {
    if (event.target === navLink) {
      navLink.classList.add('active');
    } else {
      navLink.classList.remove('active');
    }
  }
  for (let div of divs) {
    if (div.id === pageId) {
      div.style.display = 'flex';
      window.localStorage.setItem('lastVisited', div.id);
    } else {
      div.style.display = 'none';
    }
  }
}

// when customer add/reduce qty of ordered item on menu, add that item to order array

function addToCart(imgSrc, name, description, price, qty) {
  let flag = 0;
  let dish = { imgSrc, name, description, price, qty };

  for (let orderedItem of order) {
    if (orderedItem.name === name) {
      orderedItem.qty = qty;
      flag = 1;
      // console.log('item already in cart, add qty');
      break;
    }
  }
  if (!flag) {
    order.push(dish);
    // console.log('item was not in cart, add item');
  }

  // if qty==0, remove that ordered item from order array
  order = order.filter((orderedItem) => Number(orderedItem.qty) !== 0);
  localStorage.setItem('order', JSON.stringify(order));

  totalItem = order.reduce(
    (preValue, curValue) => preValue + Number(curValue.qty),
    0
  );
  Total1.innerText = Total2.innerText = Number(totalItem);
}

// main dish menu meta data
const menus = {
  mains: [
    {
      name: 'Butter Chicken',
      description:
        'Butter Chicken is one of the most popular curries at any Indian restaurant around the world',
      image:
        'https://images.freeimages.com/images/large-previews/a5c/dish-1329878.jpg',
      price: 19.9,
    },
    {
      name: 'Steam Baramundi',
      description:
        'The word fish translated in Chinese means wealth and prosperity, so whole fish is always served during Lunar New Year',
      image:
        'https://images.freeimages.com/images/large-previews/a5c/dish-1329878.jpg',
      price: 29.9,
    },
    {
      name: 'Palak Paneer',
      description:
        'Paneer (Indian cottage cheese) is cooked with spinach and spices in this creamy and flavorful curry',
      image:
        'https://images.freeimages.com/images/large-previews/a5c/dish-1329878.jpg',
      price: 24.9,
    },
    {
      name: 'Rogan Josh',
      description:
        'an Indian lamb curry with a heady combination of intense spices in a creamy tomato curry sauce',
      image:
        'https://images.freeimages.com/images/large-previews/a5c/dish-1329878.jpg',
      price: 34.9,
    },
    {
      name: 'Grilled Chicken with Fresh Cherry Salsa',
      description:
        'Juicy grilled chicken breasts, topped with a delicious ruby-red cherry salsa, made from the season’s best local cherries',
      image:
        'https://images.freeimages.com/images/large-previews/a5c/dish-1329878.jpg',
      price: 19.9,
    },
    {
      name: 'Bombay Grilled Chutney Sandwich',
      description:
        'a deliciously wholesome sandwich with generous amounts of lip-smacking fresh cilantro-mint chutney and thinly sliced veggies layered between slices of soft bread',
      image:
        'https://images.freeimages.com/images/large-previews/a5c/dish-1329878.jpg',
      price: 19.9,
    },
  ],
  drinks: [
    {
      name: 'Pineapple Express',
      description:
        'Fair Quinoa Vodka, Apple liqueur, Grapefruit, Pineapple and Dill',
      image: 'https://unsplash.com/photos/dLCyi3URVWI',
      price: 1.99,
    },
    {
      name: 'Coolcumber',
      description:
        'Hendrick’s Gin, Lillet Blanc, Lemon, Cucumber, Grapefruit bittersand Egg White',
      image: '../images/friends_logo.png',
      price: 3.99,
    },
    {
      name: 'Mrs Red',
      description:
        'Plantation 3 Stars Rum, Pama Pomegranate, Lime, Raspberry Sorbet and Egg white',
      image: 'https://unsplash.com/photos/dLCyi3URVWI',
      price: 1.99,
    },
    {
      name: 'Rendezvous',
      description:
        'Four Pillars Bloody Shiraz, Luxardo Maraschino, Coconut, Lemon and Orange Marmelade',
      image: 'https://unsplash.com/photos/dLCyi3URVWI',
      price: 3.99,
    },
    {
      name: 'Summer Reserve',
      description:
        'Woodford Reserve Bourbon, Peach Liqueur, Mint, Rosemary and Lemon',
      image: 'https://unsplash.com/photos/dLCyi3URVWI',
      price: 1.99,
    },
    {
      name: 'La Belle France',
      description:
        'Grey Goose Pear Vodka, Pavan Muscat, Passionfruit, Cucumber and Sparkling Wine',
      image: 'https://unsplash.com/photos/dLCyi3URVWI',
      price: 3.99,
    },
  ],
};

// populate the main dishes page
const MainRow = document.getElementById('mainRow');
menus.mains.forEach((main) => {
  const orderedMain = order.find(
    (orderedItem) => orderedItem.name === main.name
  );
  let qty;
  if (typeof orderedMain === 'object') {
    qty = Number(orderedMain.qty);
  } else {
    qty = 0;
  }

  const Item = addMenuItem(
    main.image,
    main.name,
    main.description,
    main.price,
    qty
  );
  MainRow.appendChild(Item);
});

// populate the drink page
const DrinkRow = document.getElementById('drinkRow');
menus.drinks.forEach((drink) => {
  const orderedDrink = order.find(
    (orderedItem) => orderedItem.name === drink.name
  );
  let qty;
  if (typeof orderedDrink === 'object') {
    qty = Number(orderedDrink.qty);
  } else {
    qty = 0;
  }
  const Item = addMenuItem(
    drink.image,
    drink.name,
    drink.description,
    drink.price,
    qty
  );
  DrinkRow.appendChild(Item);
});

// populate the order page
function populateOrderPage() {
  const OrderRow = document.getElementById('orderRow');
  let totalPrice = order.reduce(
    (preValue, curValue) => preValue + Number(curValue.qty * curValue.price),
    0
  );
  OrderRow.innerHTML = '';

  order.forEach((orderItem) => {
    const { Card: Item } = addCommonMenuItem(
      orderItem.imgSrc,
      orderItem.name,
      orderItem.price
    );
    Item.innerHTML += `<span>Ordered:${orderItem.qty}</span>`;
    OrderRow.appendChild(Item);
  });
  OrderRow.innerHTML += `<h2>Total Qty: ${totalItem}</h2> <h2>   Total Price:${totalPrice.toFixed(
    2
  )}</h2>`;
}
const OrderMenu = document.getElementById('orderMenu');
OrderMenu.addEventListener('click', () => {
  populateOrderPage();
});

// define the function that creates a menuItem element
function addMenuItem(imgSrc, name, description, price, qty) {
  const { Card, CardBody } = addCommonMenuItem(imgSrc, name, price);
  Card.style.position = 'relative';
  Card.style.padding = '20px';
  const Desc = document.createElement('p');
  Desc.classList.add('card-text');
  Desc.innerText = 'Description:' + description;

  const ControlBar = document.createElement('div');
  ControlBar.style.position = 'absolute';
  ControlBar.style.bottom = '10px';
  ControlBar.style.boxShadow = '3px 3px 10px grey';
  const AddButton = document.createElement('button');
  AddButton.classList.add('btn', 'btn-primary');
  AddButton.innerText = '+';
  AddButton.addEventListener('click', () => {
    AddButton.parentNode.querySelector('input[type=number]').stepUp();
    addToCart(imgSrc, name, description, price, QTY.value);
  });
  const QTY = document.createElement('input');
  QTY.type = 'number';
  QTY.value = qty;
  QTY.min = '0';
  QTY.addEventListener('change', () => {
    addToCart(imgSrc, name, description, price, QTY.value);
  });
  const ReduceButton = document.createElement('button');
  ReduceButton.classList.add('btn', 'btn-primary');
  ReduceButton.innerText = '-';
  ReduceButton.addEventListener('click', () => {
    ReduceButton.parentNode.querySelector('input[type=number]').stepDown();
    addToCart(imgSrc, name, description, price, QTY.value);
  });

  CardBody.appendChild(Desc);
  CardBody.appendChild(ControlBar);
  ControlBar.appendChild(ReduceButton);
  ControlBar.appendChild(QTY);
  ControlBar.appendChild(AddButton);

  return Card;
}

function addCommonMenuItem(imgSrc, name, price) {
  const Card = document.createElement('div');
  Card.classList.add('card', 'col-12', 'col-sm-12', 'col-md-6', 'col-lg-4');
  const Image = document.createElement('img');
  Image.classList.add('card-img-top');
  Image.src = imgSrc;
  const CardBody = document.createElement('div');
  CardBody.classList.add('card-body');
  Card.appendChild(Image);
  Card.appendChild(CardBody);
  const Name = document.createElement('h5');
  Name.classList.add('card-title');
  Name.innerText = name;
  const Price = document.createElement('span');
  Price.innerText = `Price: ${price}`;
  CardBody.appendChild(Name);
  CardBody.appendChild(Price);
  return { Card, CardBody, Name, Price };
}
