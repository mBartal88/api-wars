# Api-Wars

## Completed tasks:

### Index page
- Create a web server rendering a page that shows a table with all the planets in the Star Wars universe.
- The opening page of the website (/) shows the data of 10 planets.
- The data is represented in a table which is fully responsive (arranged into a list on smaller viewports).
- The columns of the table are name, diameter (shown in km), climate, terrain, surface water (shown as percentage), and population (formatted as 1,000,000 people).
- The column titles are proper table headers.
- There is a next button above the table, clicking it shows the next 10 planets, if any.
- There is a previous button above the table, clicking it shows the previous 10 planets, if any.
- Double clicking the next or previous buttons shows the next or previous 10 planets only once.
- Unknown values for surface water percentage and population are stated clearly and without any suffix (for example those for planet Coruscant and Hoth).

### Residents modal
- Display a button in each row if the planet has residents. These buttons open a modal and populate its data, containing the list of residents with more detailed information.
- In the planet table, there is a button in each row in a new column, showing the number of residents if the planet has any, otherwise the No known residents text is shown.
- Clicking the <n> residents button in the planet table, a modal is displayed, showing all the residents of the planet (every time).
- The modal has an HTML <table> element containing the data.
- The columns of the table are name, height (shown in meters), mass (shown in kg), skin color, hair color, eye color, birth year, and gender (with an icon representation).
- Data is loaded into the table without refreshing the page (with AJAX).
- There is an X icon in the top right corner and a Close button in the bottom right corner; clicking these closes the modal.

### Login system
- Create a simple user login system with a registration page, a login page, and a logout link in the header.
- There is a link in the header that leads to the registration page.
- On the registration page (/register route), a username and password pair can be created that gets stored in the database.
- Password storage and retrieval uses salted password hashing for maximum security.
- If either field is empty while clicking the Submit button on the registration page, the Please, fill in both fields. error message is displayed.
- If the username field contains a username that already exists in the database while clicking the Submit button on the registration page, the Username already exists, please choose another one! error message is displayed.
- On successful registration, the Successful registration. Log in to continue. text is displayed, and the user is redirected to the login page.
- There is a link in the header that leads to the login page.
- On the login page (/login route), visitors can log in using the previously created username and password.
- If the username and password pair does not match while clicking the Submit button on the login page, the Wrong username or password. error message is displayed.
- After logging in, the username is displayed in the top right corner with the text Signed in as <username> and a logout link is displayed in the header.
- Clicking the logout link (/logout route) logs the user out.

### Voting on planets
- If the user is logged in, display a button in each row with which the logged in user can vote on a planet. Save this vote in a database and inform the user that the vote is saved.
- If the user is logged in, a Vote button is displayed in the planet table in a new column.
- Clicking the vote button saves the vote in the database without refreshing the page (with AJAX).
- If the save is successful, after clicking the vote button, the Voted on planet <planetname> successfully. message is displayed.
- If the save fails after clicking the vote button, the There was an error during voting on planet <planetname>. error message is displayed.
- Users can vote on an unlimited number of planets and with an unlimited number of votes on a planet.

### Voting statistics
- Create a new modal window, accessible from the main page, where you display the statistics about voted planets.
- There is a link in the header that opens a modal showing voting statistics based on the user votes saved in the database.
- The modal is represented in a table which is fully responsive (arranged into a list on smaller viewports).
- The columns of the table are Planet name and Received votes.
- Data is loaded into the table without refreshing the page (with AJAX).
- There is an X icon in the top right corner and a Close button in the bottom right corner; clicking these closes the modal.
