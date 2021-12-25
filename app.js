var express = require("express");
var path = require("path");

const mongo = require("./mongo");
// const userSchema = require('./schemas/User');
const userCart = require("./schemas/usercart");
const connectToMongo = async () => {
  await mongo().then(async (mongoose) => {
    try {
      console.log("Connected to MongoDB");
    } finally {
    }
  });
};
var currentUserName;

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// code to log-in
app.get("/", function (req, res) {
  res.render("login", { userNameFound: 1, passwordFound: 1 });
});
app.post("/home", async function (req, res) {
  connectToMongo();
  //I need to check that the req and res inside my
  var user = { username: req.body.username, password: req.body.password };
  //checking if the user is in my database
  const findUserName = await userCart.findOne({ username: req.body.username });
  const findPasswordAndUserName = await userCart.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  var userNameFound = 0;
  var passwordFound = 0;
  //If you found username but password is wrong
  if (findUserName != null) {
    userNameFound = 1;
  }
  if (findUserName != null && findPasswordAndUserName != null) {
    userNameFound = 1;
    passwordFound = 1;
  }
  if (findUserName == null) {
    userNameFound = 0;
    passwordFound = 0;
  }

  if (userNameFound == 1 && passwordFound == 1) {
    res.render("home", { userNameFound: 1, passwordFound: 1 });
    currentUserName = user.username;
  } else if (userNameFound == 1 && passwordFound == 0) {
    res.render("login", { userNameFound: 1, passwordFound: 0 });
  } else {
    res.render("login", { userNameFound: 0, passwordFound: 0 });
  }
});

// code to register

app.post("/register", async function (req, res) {
  //User Exists and Error mssgs left with ejs
  connectToMongo();
  var user = {
    username: req.body.username,
    password: req.body.password,
    items: [],
  };
  console.log(req.body.username);

  const result = await userCart.find({
    username: req.body.username,
  });
  // console.log(result+"SDSDSD");
  console.log(result.length);
  if (result.length < 1) {
    //Should Add it to mydatabase
    await userCart(user).save();
    res.render("home", { userNameFound: 1, passwordFound: 1 });
  } else {
    res.render("registration", { userTaken: 1 });
  }
});

//        ---Code For Each Item In Cart---

app.post("/iPhone_13_Pro", async function (req, res) {
  var result = "iPhone_13_Pro";
  connectToMongo();
  console.log(result);
  const cartOfUser = await userCart.findOne({ username: currentUserName });
  var x = 0;
  var savedIndex = -1;
  for (let i = 0; i < cartOfUser.items.length; i++) {
    // console.log(cartOfUser.items[i].name);
    if (cartOfUser.items[i].name == result) {
      savedIndex = i;
      x = 1;
      break;
    }
  }
  var imageFile = "iphone.jpg";
  var imageUrl = "/iphone";

  if (x != 1) {
    await userCart.findOneAndUpdate(
      {
        username: currentUserName,
      },
      {
        $addToSet: {
          items: { name: result, image: imageFile, url: imageUrl },
        },
      },
      {
        upsert: true,
      }
    );
    res.render("iphone", { itemExists: 0 });
  } else {
    res.render("iphone", { itemExists: 1 });
  }
});

app.post("/Galaxy_S21_Ultra", async function (req, res) {
  var result = "Galaxy_S21_Ultra";
  connectToMongo();
  console.log(result);
  const cartOfUser = await userCart.findOne({ username: currentUserName });
  var x = 0;
  var savedIndex = -1;
  for (let i = 0; i < cartOfUser.items.length; i++) {
    // console.log(cartOfUser.items[i].name);
    if (cartOfUser.items[i].name == result) {
      savedIndex = i;
      x = 1;
      break;
    }
  }
  var imageFile = "galaxy.jpg";
  var imageUrl = "/galaxy";

  if (x != 1) {
    await userCart.findOneAndUpdate(
      {
        username: currentUserName,
      },
      {
        $addToSet: {
          items: { name: result, image: imageFile, url: imageUrl },
        },
      },
      {
        upsert: true,
      }
    );
    res.render("galaxy", { itemExists: 0 });
  } else {
    res.render("galaxy", { itemExists: 1 });
  }
});

app.post("/Leaves_of_Grass", async function (req, res) {
  var result = "Leaves_of_Grass";
  connectToMongo();
  console.log(result);
  const cartOfUser = await userCart.findOne({ username: currentUserName });
  var x = 0;
  var savedIndex = -1;
  for (let i = 0; i < cartOfUser.items.length; i++) {
    // console.log(cartOfUser.items[i].name);
    if (cartOfUser.items[i].name == result) {
      savedIndex = i;
      x = 1;
      break;
    }
  }
  var imageFile = "leaves.jpg";
  var imageUrl = "/leaves";

  if (x != 1) {
    await userCart.findOneAndUpdate(
      {
        username: currentUserName,
      },
      {
        $addToSet: {
          items: { name: result, image: imageFile, url: imageUrl },
        },
      },
      {
        upsert: true,
      }
    );
    res.render("leaves", { itemExists: 0 });
  } else {
    res.render("leaves", { itemExists: 1 });
  }
});

app.post("/The_Sun_and_Her_Flowers", async function (req, res) {
  var result = "The_Sun_and_Her_Flowers";
  connectToMongo();
  console.log(result);
  const cartOfUser = await userCart.findOne({ username: currentUserName });
  var x = 0;
  var savedIndex = -1;
  for (let i = 0; i < cartOfUser.items.length; i++) {
    // console.log(cartOfUser.items[i].name);
    if (cartOfUser.items[i].name == result) {
      savedIndex = i;
      x = 1;
      break;
    }
  }
  var imageFile = "sun.jpg";
  var imageUrl = "/sun";

  if (x != 1) {
    await userCart.findOneAndUpdate(
      {
        username: currentUserName,
      },
      {
        $addToSet: {
          items: { name: result, image: imageFile, url: imageUrl },
        },
      },
      {
        upsert: true,
      }
    );
    res.render("sun", { itemExists: 0 });
  } else {
    res.render("sun", { itemExists: 1 });
  }
});

app.post("/Boxing_Bag", async function (req, res) {
  var result = "Boxing_Bag";
  connectToMongo();
  console.log(result);
  const cartOfUser = await userCart.findOne({ username: currentUserName });
  var x = 0;
  var savedIndex = -1;
  for (let i = 0; i < cartOfUser.items.length; i++) {
    // console.log(cartOfUser.items[i].name);
    if (cartOfUser.items[i].name == result) {
      savedIndex = i;
      x = 1;
      break;
    }
  }
  var imageFile = "boxing.jpg";
  var imageUrl = "/boxing";

  if (x != 1) {
    await userCart.findOneAndUpdate(
      {
        username: currentUserName,
      },
      {
        $addToSet: {
          items: { name: result, image: imageFile, url: imageUrl },
        },
      },
      {
        upsert: true,
      }
    );
    res.render("boxing", { itemExists: 0 });
  } else {
    res.render("boxing", { itemExists: 1 });
  }
});

app.post("/Tennis_Racket", async function (req, res) {
  var result = "Tennis_Racket";
  connectToMongo();
  console.log(result);
  const cartOfUser = await userCart.findOne({ username: currentUserName });
  var x = 0;
  var savedIndex = -1;
  for (let i = 0; i < cartOfUser.items.length; i++) {
    // console.log(cartOfUser.items[i].name);
    if (cartOfUser.items[i].name == result) {
      savedIndex = i;
      x = 1;
      break;
    }
  }
  var imageFile = "tennis.jpg";
  var imageUrl = "/tennis";

  if (x != 1) {
    await userCart.findOneAndUpdate(
      {
        username: currentUserName,
      },
      {
        $addToSet: {
          items: { name: result, image: imageFile, url: imageUrl },
        },
      },
      {
        upsert: true,
      }
    );
    res.render("tennis", { itemExists: 0 });
  } else {
    res.render("tennis", { itemExists: 1 });
  }
});

//        ---End Of Code For Each Item In Cart---

//    Code For Cart and Search
app.post("/cart", async function (req, res) {
  var object = await userCart.findOne({ username: currentUserName }); //
  var cart = object.items;
  // var temp = [];
  // if (cart.length == 0) {
  //   temp.push({
  //     name: "Your Cart is Empty",
  //     url: "",
  //     quantity: 0,
  //     image: "cart.png",
  //   });
  //   res.render("cart", { searchres: temp }); //object
  // }
  // else{
  res.render("cart", { searchres: cart }); //object
  //}
});

app.post("/search", function (req, res) {
  connectToMongo();
  var searchResult = req.body.Search; //sun
  var rs = searchResult;
  var y = JSON.stringify(searchResult).toLowerCase();
  var searchResult2 = JSON.parse(y);
  var items = [
    { name: "galaxy s21 ultra", url: "/galaxy", image: "galaxy.jpg" },
    { name: "iphone 13 pro", url: "/iphone", image: "iphone.jpg" },
    { name: "leaves of grass", url: "/leaves", image: "leaves.jpg" },
    { name: "boxing bag", url: "/boxing", image: "boxing.jpg" },
    { name: "the sun and her flowers", url: "/sun", image: "sun.jpg" },
    { name: "tennis racket", url: "/tennis", image: "tennis.jpg" },
  ];
  var result = filterIt(items, searchResult2);
  if (result.length == 0) {
    result.push({
      name: "Item not found",
      url: "/home",
      image: "item-not-found-feature.jpeg",
    });
  }
  res.render("searchresults", { searchres: result }); //object
});

function filterIt(arr, searchKey) {
  return arr.filter(function (obj) {
    return Object.keys(obj).some(function (key) {
      return obj[key].includes(searchKey);
    });
  });
}
//    -------------------

//    Rendering Pages
app.get("/registration", function (req, res) {
  res.render("registration", { userTaken: 0 });
});
app.get("/home", function (req, res) {
  res.render("home");
});
app.get("/phones", function (req, res) {
  res.render("phones",{itemExists:0});
});
app.get("/books", function (req, res) {
  res.render("books");
});
app.get("/sports", function (req, res) {
  res.render("sports");
});
app.get("/galaxy", function (req, res) {
  res.render("galaxy",{itemExists:0});
});
app.get("/iphone", function (req, res) {
  res.render("iphone",{itemExists:0});
});
app.get("/leaves", function (req, res) {
  res.render("leaves",{itemExists:0});
});
app.get("/sun", function (req, res) {
  res.render("sun",{itemExists:0});
});
app.get("/boxing", function (req, res) {
  res.render("boxing",{itemExists:0});
});
app.get("/tennis", function (req, res) {
  res.render("tennis",{itemExists:0});
});
app.get("/cart", function (req, res) {
  res.render("cart", { searchres: [] });
});

if (process.env.PORT) {
  app.listen(process.env.PORT, function () {
    console.log("Server started");
  });
} else {
  app.listen(3000, function () {
    console.log("Server started on PORT 3000");
  });
}
