# README

Please see the following sections:

### Technologies

- html
- css
- javascript
- axios
- async
- node.js
- sequelize
- postgres
- hacker news api


### Create

In this phase I started with wireframing my models. I knew that I'd need this to be set up properly before moving forward in to coding. I ran through several iterations of this. I knew that this phase would determine how my coding process would go.

### Coding

In this phase I knew what had to be done because my models were planned out. I started with actually creating my models and then building routes. Initially, when I started I was unable to get data to go back and forth with my routes due to some small errors which was a good break for me to build out my ejs pages because after fixing my routes, I knew that I'd be able to render data from my database.

### Models/Table

- User
Name
Email
Password
- Category
name
- Story
userId
name

### Complications and Lessons Learned

I would say the biggest lesson learned here is that using console.log driven testing could have saved me a lot of frustration and time. I had some simple mistakes (primarily syntax related) that could have been avoided.

### Future Plans

In the future I want to build out more features like users being able to have favorited categories and favorited stories. I also would like to style this project to be more aesthetically pleasing. The majority of my time went to back end coding in this project. I also would like to implement pagenation so you can click through multiple pages of about 20 or so links. I was unable to get to this due to some complications along the way but this will be implemented eventually. Also, I'd like to make this optimized for mobile.

### Code to notice

I wanted to show this code in particular because it was my first time using async. It was challenging to get this to work but after some trials, I was able to finally get it working.

``` 
app.get('/', function(req, res) {
    axios.get(requestUrl).then( function(results) {
      let postData = results.data.splice(0,100);
      let storyRequests = postData.map( function(id) {
        return function(callback) {
          let storyUrl = 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json'
          axios.get(storyUrl).then( function(results) {
            let story = results.data
            callback(null, {title: story.title, url: story.url});
          })
        }
      })
    async.parallel(async.reflectAll(storyRequests), function(err, results) {
      res.render('index', {stories: results})
    })
  })
}); 
```

### References and sources

- Steve Peters
- Mike Shull
- Carlo Bruno
- Sean Cesmat
- w3schools
- mdnmozilla
