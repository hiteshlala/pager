# <img src="favicon.png"> Pager

This is a pager component that can be embedded in a web page.



## HTML Requirements
- Embedding page must have a `<head>` tag.  Style sheets are attached to this node when the 
  component is initialized.
- An element is used to add the component to.


## How to Use

- Add a element node in which the pager instance will be added and get the `Pager` class using a script tag.
```html
  <!DOCTYPE html>
  <html lang="en">
    <head></head>
    <body>
      <div id="pager"></div>
      <script src="pager.js"></script>
    </body>
  </html>
```

- Instantiate the pager.
```html
  <script>
    let pager;
    const numberOfPages = 52;
    const pagesDisplayWindow = 6;
    function updatePageCallback(page) {
      console.log('Load something for page number', page);
    }
    window.onload = function() {
      pager = new Pager( numberOfPages, pagesDisplayWindow, updatePageCallback, 'pager');
    };
  </script>
```
  
- Adjust styles.
  - There are four CSS classes used to style this component.  These are `.pager`, 
`.pager-button`, `.clickable`, and `.selected`.  The `.clickable` also has a hover
rule added.  These class rules can be over-written by providing a JSON object as a
fifth argument when instantiating the pager.  
  - Each instance of a pager has its own set of styles that are sandboxed by adding a random string to the
CSS classes.
  - The format of the JSON is shown below:


```javascript
  const overideStyles = { 
    pager: '{ justify-content: center }',
    'pager-button': '{ border: 1px solid #6c9393; border-radius: 5px; background-color: white;}',
    clickable: '{ background-color: #d0d0d0; }',
    'clickable:hover': '{border: 1px solid #f2d2f3;}',
    selected: '{ color: #5353c6 }'
  };
  window.onload = function() {
    pager = new Pager( numberOfPages, pagesDisplayWindow, updatePageCallback, 'pager', overideStyles);
  };
```

## Extras

- The current selected page number can be obtained by referencing: `pager.page`
- To navigate to a particular page using javascript: `pager.setPage(5)`



## Example

An example instantiation of this pager with default and adjusted styling can be [seen here](https://hiteshlala.com/pager).




## Asset Attribution

- Card deck image from [pngfind.com](https://www.pngfind.com/mpng/hbJTwT_standard-52-card-deck-playing-card-card-game/).


## License

Free to use in any way you like!