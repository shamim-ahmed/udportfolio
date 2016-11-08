## Website Performance Optimization portfolio project

### Getting started

### Optimizations in index.html

-All CSS rules have been added inline.
-Media query attribute has been added for print.css
-All references to JavaScript files have been moved to the bottom of the page
-The async attribute has been added to the appropriate script tags.
-HTML, CSS and JavaScript files have been minified
-Images have been optimized

### Optimization in views/js/main.js (for pizza.html)

#### Optimization 1: Use getElementsByClassName() instead of querySelectorAll() for better performance
The original code used querySelectorAll() in several places. They have been replaced with getElementsByClassName(), which is supposed
to be more efficient.
Reference: http://ryanmorr.com/abstract-away-the-performance-faults-of-queryselectorall/

#### Optimization 2: Eliminate layout thrashing


Reference: https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing


#### Optimization 5: Special CSS poperty values for improved performance

Reference: https://www.html5rocks.com/tutorials/speed/high-performance-animations/



-
