## Instructions

add the following to every component that is created to have a uniform header banner for the project

<app-header [username]="username"></app-header>

If the component requires a search bar, cart, orders and profile links then add 
<app-search-bar-cart [loggedIn]=loggedIn></app-search-bar-cart>
