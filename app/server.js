require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

console.log(db.url);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log("Connected to the database!");
    const dropdowns = await db.dropdowns.find({}).exec();
    if (dropdowns.length === 0) {
      await db.dropdowns.insertMany([
        {name:'status',value:'To Do',active:true},
        {name:'status',value:'In Progress',active:true},
        {name:'status',value:'Done',active:true}
      ]);
    }
  
    const interviews = await db.interviews.find({}).exec();
    if (interviews.length === 0) {
      const interview = new db.interviews({
        title: "Test Title",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce faucibus luctus risus, eu posuere massa congue quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum elementum sapien eu ultricies consequat. Phasellus ut mollis elit, ac pulvinar ligula. Morbi ultrices elit lacus, sed volutpat mauris condimentum nec. Vivamus sed porta purus, sed facilisis nunc. Proin euismod libero suscipit erat lacinia iaculis. In fringilla laoreet facilisis. Curabitur vestibulum arcu quis malesuada mollis. Fusce consequat nulla eros, vitae viverra mauris vehicula in. Integer semper auctor neque. Morbi consectetur ultrices est sit amet bibendum. Nulla facilisi. Nullam id enim sagittis sem placerat cursus aliquet sed felis.",
        status: 'To Do',
        hide: false,
        comments: [],
        created_by: "System",
      });
      await interview.save()
    }
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

require("./app/routes/interview.routes")(app);
require("./app/routes/dropdown.routes")(app);

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
