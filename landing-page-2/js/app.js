
//Defining the element with the id name of 'navbar__list' in a variable
const navbar = document.querySelector('#navbar__list');

//Creating an array of 4 string elements that will be placed in the navbar
const array = ['home', 'project', 'contact', 'blog'];

//Creating a new document fragment
const fragment = document.createDocumentFragment();

//For each element in the array doing the following
array.forEach(element => {
    const listItem = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.innerHTML = element;
    anchor.setAttribute('data-page', `${element}`);
    anchor.setAttribute('class', 'nav-link');
    anchor.style.cursor = 'pointer';
    listItem.appendChild(anchor);
    fragment.appendChild(listItem);
});

//Appending the newly created document fragment to the ul element
navbar.appendChild(fragment);



//Defining all elements with the class of 'nav-link' in a variable
const links = document.querySelectorAll('.nav-link');

//For each item in the node list creating an event listener
links.forEach(item => {
  item.addEventListener("click", () => {
    const el = document.getElementById(item.getAttribute("data-page"));
    el.scrollIntoView({behavior:"smooth", block:"center"});
  })
});



//Defining all elements with the tag name of 'section' in a variable
const sections = document.querySelectorAll('section');

//Defining the element with the class name of 'box' in a variable
const box = document.querySelector('.box');

//Defining a threshold for the observer to observe
const options = {
  threshold: 0.7
};

//Using the Intersection Observer API
let observer = new IntersectionObserver(callback, options);

//For each item in the node list observing the threshold set in the options variable
sections.forEach(section => {
  observer.observe(section);
});

//Callback function is invoked whenever the target meets a threshold specified for the IntersectionObserver
//The callback receives a list of IntersectionObserverEntry objects in it's 'entries' parameter
function callback(entries) {
  //For each entry do the following
  entries.forEach(entry => {
    //IntersectionObserverEntry interface's target property indicates which targeted Element has changed
    //its amount of intersection with the intersection root.
    const nameOfClass = entry.target.className;
    const activeAnchor = document.querySelector(`[data-page=${nameOfClass}]`);
    //.getBoundingClientRect() method returns a DOMRect object providing information about
    //the size of an element and its position relative to the viewport.
    const coordinates = activeAnchor.getBoundingClientRect();
    const directions = {
      height: coordinates.height,
      width: coordinates.width,
      top: coordinates.top,
      left: coordinates.left
    };
    //isIntersecting property is a Boolean value which is true if the target element intersects
    //with the intersection observer's root
    if(entry.isIntersecting) {
      box.style.setProperty('left', `${directions.left}px`);
      box.style.setProperty('top', `${directions.top}px`);
      box.style.setProperty('width', `${directions.width}px`);
      box.style.setProperty('height', `${directions.height}px`);
      box.style.border = `2px solid black`
    }
  });
}
