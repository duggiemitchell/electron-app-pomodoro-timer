var remote = require('remote')
var Menu = remote.require('menu')
var MenuItem = remote.require('menu-item')

// Build our new menu
var menu = new Menu()
menu.append(new MenuItem({
  label: 'Delete',
  click: function() {
    // Trigger an alert when menu item is clicked
    alert('Deleted')
  }
}))
menu.append(new MenuItem({
  label: 'More Info...',
  click: function() {
    // Trigger an alert when menu item is clicked
    alert('Here is more information')
  }
}))

// Add the listener - Modified to not produce  error if the node list is empty.
document.addEventListener('DOMContentLoaded', function () {
  var nodeList = document.querySelectorAll('.js-context-menu')

  Array.prototype.forEach.call(nodeList, function (item) {
    item.addEventListener('contextmenu', function (event) {
      menu.popup(remote.getCurrentWindow());
    })
  })
})
