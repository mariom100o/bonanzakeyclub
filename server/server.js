import cors from "cors";
import "dotenv/config";
import express from "express";
import bodyparser from "body-parser";
import ImageKit from "imagekit";

const app = express();
const port = process.env.PORT || 3000;

var imagekit = new ImageKit({
  publicKey: "public_RvcoddD/w2gu+um0O577FBGmtF4=",
  privateKey: "private_KGSrryFlrXbzPoAfaD+LQlWBWGE=",
  urlEndpoint: "https://ik.imagekit.io/bonanzahskeyclub",
});

const eventList = [];

const memberList = [];

const pollList = [
  // {
  //   id: 1,
  //   title: "Should we clean schools on Fridays?",
  //   res: [
  //     { id: 0, title: "Yes", votes: [] },
  //     { id: 1, title: "No", votes: [] },
  //   ],
  //   total: 0,
  // },
];

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/events", (req, res) => {
  res.send(eventList);
});
app.get("/members", (req, res) => {
  res.send(memberList);
});

// Delete member
app.delete("/members/:id", (req, res) => {
  const id = req.params.id;
  const member = memberList.find((member) => member.id === parseInt(id));
  if (member) {
    memberList.splice(memberList.indexOf(member), 1);
    res.send(memberList);
  } else {
    res.status(404).send("Member not found");
  }
});

// Get a specific member
app.get("/members/:id", (req, res) => {
  console.log(req.params.id);
  console.log(memberList);
  const member = memberList.find(
    (member) => member.id === parseInt(req.params.id)
  );

  res.send(member);
});

app.get("/polls", (req, res) => {
  res.send(pollList);
});

app.get("/imagekitAuth", function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.post("/profilePicture", (req, res) => {
  console.log(req.body);
  res.send("ok");
});

app.post("/events", (req, res) => {
  console.log(req.body);
  eventList.push(req.body);
  res.send("ok");
});

app.put("/events/:id", (req, res) => {
  console.log(req.body);
  const event = eventList.find((event) => event.id === req.params.id);
  if (!event) {
    res.send("Event not found");
  }
  event.title = req.body.title;
  event.time = req.body.time;
  event.location = req.body.location;
  event.description = req.body.description;
  event.map = req.body.map;
  event.type = req.body.type;
  event.directions = req.body.directions;
  res.send("ok");
});

// Delete event
app.delete("/events/:id", (req, res) => {
  const event = eventList.find((event) => event.id == req.params.id);
  if (!event) {
    res.send("Event not found");
  }
  eventList.splice(eventList.indexOf(event), 1);
  res.send("ok");
});

// Edit the member list
app.put("/members", (req, res) => {
  console.log(req.body);
  // Set the member list to the new list
  memberList.splice(0, memberList.length);
  for (let i = 0; i < req.body.members.length; i++) {
    memberList.push(req.body.members[i]);
  }
  res.send("ok");
});

// Add a member to the member list
app.post("/members", (req, res) => {
  console.log(req.body);

  memberList.push({ ...req.body, order: memberList.length });
  res.send("ok");
});

// Add a poll
app.post("/polls", (req, res) => {
  console.log(req.body);
  pollList.push(req.body);
  res.send("ok");
});

// Delete a poll
app.delete("/polls/:id", (req, res) => {
  const poll = pollList.find((poll) => poll.id == req.params.id);
  if (!poll) {
    res.send("Poll not found");
  }
  pollList.splice(pollList.indexOf(poll), 1);
  res.send("ok");
});

// Edit a poll
app.put("/polls/:id", (req, res) => {
  console.log(req.body);
  const poll = pollList.find((poll) => poll.id === req.params.id);
  if (!poll) {
    res.send("Poll not found");
  }
  poll.title = req.body.title;
  poll.description = req.body.description;
  poll.options = req.body.options;
  res.send("ok");
});

// Add vote to a poll
app.post("/vote/:pollid", (req, res) => {
  const poll = pollList.find((poll) => poll.id === parseInt(req.params.pollid));
  if (!poll) {
    res.send("Poll not found");
    return;
  }
  poll.res[req.body.option].votes.push(req.body.member);
  poll.total++;
  res.send("ok");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
