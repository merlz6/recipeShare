# recipeShare
share recipes with friends


RecipeShare is a website for people share there favorite recipes for everyone to see and love!
RecipeShare was built by Merlz using Express.js, MongoDB, HTML, CSS, Javascript over a five day period by merlz working out of NYC.
The user must first log in prior to being able to access the other pages. 




login.ejs :

    <div class="container">
<a class="waves-effect waves-light btn " href="/sessions/new">Log In</a>
  </br>
    <a  class="waves-effect waves-light btn" href="/users/new">Sign Up</a></h2>
</br>
</div>




If the user has not signed up they can create an account by clicking on the sign up button, which redirects them to the 

users/new.ejs:

<div class="container">
        <h1>Create User</h1>
        <div class="row">
          <form class="col s12" action='/users' method='POST'>
            <div class="row">
              <div class="input-field col s6">
                <input placeholder="Placeholder" id="username" type="text" class="validate" name="username" required>
                <label for="username">User Name</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="password" type="password" class="validate" name="password" required>
                <label for="password">Password</label>
              </div>
            </div>
            <button class="btn waves-effect waves-light" type="submit" name="action">Submit
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
  
  
  the form post the data to the users collection with in the previous stated db of foodieBlog.
  
  
  Once the user signs into the site through the log in button, the user can see the recipes page, they have the option
  to click a link that will pick a random recipe for them and take them to that show page. They can see others posted recipes(and delete them), or they can click at the bottom to add a recipe. 
  
  
  
  
  if they choose to add a recipe to the collection it takes you to the 
  
  recipeNew.ejs page :
  
        <form class="col s12" action='/sessions' method='POST'>
          <div class="row">
            <div class="">
              <h4>Recipe Name</h4>
              <input placeholder="name" id="name" type="textarea" class="validate" name="name" required>

            </div>
          </div>
          <div class="row">
            <div class="">
              <h5>Picture</h5>
              <input placeholder="image" id="picture" type="textarea" class="validate" name="image" required>

            </div>
          </div>

          <div class="row">
            <div class=" ">
              <h5>Directions</h5>
              <input id="directions" type="textarea" class="validate" name="directions" required>

            </div>
          </div>
          <div class="row">
            <div class=" ">
              <h5>Ingredients</h5>
              <input id="ingredients" type="textarea" class="validate" name="ingredients" placeholder="Please seperate by commas" required>

            </div>
          </div>
          <button class="btn waves-effect waves-light" type="submit" name="action">Submit
            <i class="material-icons right">send</i>
          </button>
        </form>
  
  
  
  This was something new for me to learn. I had to create and access a second collection within a DB, something not previously covered. I felt learning to access a second one which we had no previous notes on really helped me grasp how to work with DBs. I had to create a new schema in the models page, create a new collection and get the form to actually post to the collection. 

controllers/sessions.js :

  sessions.post('/', (req, res)=>{
  Message.create(req.body, (err, createdMessage) => {
      })
      Message.find({}, (error, allMessages) => {
    res.render('./app/blog.ejs', {
      Messages: allMessages
    })

})
});
  
  
  
  From the blog page by clicking on the name of the recipe in red you can access show pages. From the show page you can edit the recipe or go back to the home page. 
  
  controllers/sessions.js:
  
  
  
  sessions.get('/:id', (req, res) => {
    Message.findById(req.params.id, (err, foundMessage) => {
        res.render('./app/show.ejs', {
            message: foundMessage
        });
    })
});
  
  sessions.put('/:id', (req, res) => {
  Message.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateModel) => {
        res.redirect('/sessions')
  })

})




sessions.get('/:id/edit', (req, res) => {
  Message.findById(req.params.id, (err, foundMessage) => {
    //db needs to be called before rendering page
    res.render('edit.ejs', {
      message: foundMessage
    })
  })

})



app/show.ejs :

      <h1><%=message.name%></h1>

      <div class='container'>
          <img src='<%=message.image%>'>


        <h4>Ingredients:</h4>
        <ul>

          <%let ingredientsString = message.ingredients %>
          <%let ingredientsString2 = ingredientsString.toString() %>
          <%let ingredientsArray = ingredientsString2.split(',') %>
          <%ingredientsArray.forEach(function(element){ %>
          <li>
            <%=element %>
          </li>
          <% }) %>
  </ul>

    <h4>Directions:</h4>
    <p>
      <%=message.directions %>
    </p>


Lastly if a user can't decide which to choose they can have one randomly selected for them by clicking the link above the recipes. 


Similar to the show page however an i variable is declared prior as a selector in Messages. 
/app/randomShow.ejs: 


      <% let i = Math.floor(Math.random() * Math.floor(Messages.length)) %>
      <h1><%=Messages[i].name%></h1>

      <div class='container'>
          <img src='<%=Messages[i].image%>'>


        <h4>Ingredients:</h4>
        <ul>

          <%let ingredientsString = Messages[i].ingredients %>
          <%let ingredientsString2 = ingredientsString.toString() %>
          <%let ingredientsArray = ingredientsString2.split(',') %>
          <%ingredientsArray.forEach(function(element){ %>
          <li>
            <%=element %>
          </li>
          <% }) %>
  </ul>

    <h4>Directions:</h4>
    <p>
      <%=Messages[i].directions %>
    </p>
  
  
  
  Challenges: working with a second collection was interesting and i felt important to my understandings of mongoDB.
  Keeping the project obtainable for the time period. When I began the idea I had a lot of ideas which I soon realized were not possible working within the time frame without risking not having a working product on due date.
  
  Improvements: I'd like to make it possible to rate or comment on each recipes show page, Need to figure out where comments would be stored? possibly comments array in schema in the model left blank on creation and can be "edited" from the showpage.
  
  
