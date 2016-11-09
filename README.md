## Website Performance Optimization portfolio project

### Getting started

### Optimizations in index.html

- All CSS rules have been added inline.
- Media query attribute has been added for print.css
- All references to JavaScript files have been moved to the bottom of the page
- The async attribute has been added to the appropriate script tags
- HTML, CSS and JavaScript files have been minified
- Images have been optimized

### Optimization in views/js/main.js (for pizza.html)

#### Optimization 1: Use getElementsByClassName() instead of querySelectorAll() for better performance
The original code used querySelectorAll() in several places. They have been replaced with getElementsByClassName(), which is supposed
to be more efficient.

Reference: https://www.nczonline.net/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall/

#### Optimization 2: Eliminate layout thrashing
The original code in main.js had the following snippet:

```javascript
for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
    var dx = determineDx(document.querySelectorAll(".randomPizzaContainer")[i], size);
    var newwidth = (document.querySelectorAll(".randomPizzaContainer")[i].offsetWidth + dx) + 'px';
    document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
}
```

This code had several issues. Firstly, it was invoking the querySelectorAll() method repeatedly, which can be avoided. Secondly, it was
causing layout thrashing by reading and updating style values repeatedly within the loop. This problem can be avoided if we calculate
dx and newwidth values before the loop (reading phase), and use these values inside the loop to update style (writing phase). Here is
the updated code:

```javascript
var selectedItems = document.getElementsByClassName("randomPizzaContainer");
var dx = 0;
var newwidth = 0;

if (selectedItems.length > 0) {
  dx = determineDx(selectedItems[0], size);
  newwidth = (selectedItems[0].offsetWidth + dx) + 'px';
}

for (var i = 0; i < selectedItems.length; i++) {
  selectedItems[i].style.width = newwidth;
}
```
Reference: https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing

#### Optimization 3: Eliminate redundant computation of phase values
The original JavaScript code contained the following code snippet:

```javascript
for (var i = 0; i < items.length; i++) {
  var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
  items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
}
```
If we examine closely, we will realize that there are only 5 possible phases in this case. These phase values can be computed once and reused, as shown in the following snippet:

```javascript
var c = document.body.scrollTop / 1250;
var phases = [];

for (var k = 0; k < 5; k++) {
    phases.push(Math.sin(c + k));
}

for (var i = 0; i < items.length; i++) {
  var phase = phases[i % 5];
  items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
}
```

#### Optimization 4: Reduce the number of animated pizzas
The original JavaScript code created and animated 200 pizzas. However, only a handful of these pizzas were actually visible on screen. This represented a significant performance bottleneck. We have avoided this problem by determining the number of animated pizzas from window height.

#### Optimization 5: Special CSS poperty value for improved performance
It has been suggested that following CSS rule improves animation performance:

```
transform: translate3d(0, 0, 0);
```

So we have used this as part of .mover class.

Reference: https://www.html5rocks.com/tutorials/speed/high-performance-animations/
