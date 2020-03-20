# HTML Tags

## `<template>`

- Mechanism for holding HTML that is not to be rendered immediately when a page is loaded but may be instantiated subsequently during runtime using JavaScript.
- JS framework such as Vue.js and React will totally replace this tag;
    - That's why Vue.js has `<template>` tag

```html
<table id="producttable">
  <thead>
    <tr>
      <td>UPC_Code</td>
      <td>Product_Name</td>
    </tr>
  </thead>
  <tbody>
    <!-- existing data could optionally be included here -->
  </tbody>
</table>

<template id="productrow">
  <tr>
    <td class="record"></td>
    <td></td>
  </tr>
</template> 

<script>
// Test to see if the browser supports the HTML template element by checking
// for the presence of the template element's content attribute.
if ('content' in document.createElement('template')) {

    // Instantiate the table with the existing HTML tbody
    // and the row with the template
    var template = document.querySelector('#productrow');

    // Clone the new row and insert it into the table
    var tbody = document.querySelector("tbody");
    var clone = template.content.cloneNode(true);
    var td = clone.querySelectorAll("td");
    td[0].textContent = "1235646565";
    td[1].textContent = "Stuff";

    tbody.appendChild(clone);

    // Clone the new row and insert it into the table
    var clone2 = template.content.cloneNode(true);
    td = clone2.querySelectorAll("td");
    td[0].textContent = "0384928528";
    td[1].textContent = "Acme Kidney Beans 2";

    tbody.appendChild(clone2);

} else {
  // Find another way to add the rows to the table because 
  // the HTML template element is not supported.
}
</script>
```

- Code above render this:

```html
<table id="producttable">
  <thead>
    <tr>
      <td>UPC_Code</td>
      <td>Product_Name</td>
    </tr>
  </thead>
  <tbody>
    <!-- existing data could optionally be included here -->
  
  <tr>
    <td class="record">1235646565</td>
    <td>Stuff</td>
  </tr>

  <tr>
    <td class="record">0384928528</td>
    <td>Acme Kidney Beans 2</td>
  </tr>
</tbody>
</table>
```