const data = [
  {
    id: 1,
    title: "My 2024 MacBook setup for Software Development",
    subtitle:
      "Here's an insight into my setup, workflow and tools to build software",
    author: "Anthony Gordon",
    readingTime: "5 min read",
    date: "Jun 21, 2024",
    claps: 0,
  },
  {
    id: 2,
    title: "Git + Bit: Code Meets Components",
    subtitle:
      "Keeping Git Branches and Bit Lanes in Sync for Seamless Development",
    author: "Ashan Fernando",
    readingTime: "6 min read",
    date: "Aug 29, 2024",
    claps: 0,
  },
  {
    id: 3,
    title: "Average Manager vs. Great Manager",
    subtitle: "Explained in 10 sketches",
    author: "Julie Zhuo",
    readingTime: "2 min read",
    date: "Aug 11, 2015",
    claps: 0,
  },
];

function Post(props) {
  return `
      <div class="post-header">
          <h1 class="title">${props.title}</h1>
          <div class="subtitle">
            ${props.subtitle}
          </div>
          <div class="author-card">
            <div class="avatar">
              <img
                src="assets/images/profile-picture.jpg"
                height="44px"
                width="44px"
              />
            </div>
            <div class="column">
              <div class="row">
                <div>${props.author}</div>
                <div>·</div>
                <div class="follow-button">Follow</div>
              </div>
              <div class="row secondary">
                <div>${props.readingTime}</div>
                <div>·</div>
                <div>${props.date}</div>
              </div>
            </div>
          </div>
          <div class="actions">
            <div class="claps">
              <div id="claps-button" class="claps-button" onclick="App.state.addClap(${props.id})">
                <img
                  src="assets/icons/hands-clapping-thin.svg"
                  height="24px"
                  width="24px"
                />
              </div>
              <div id="claps-counter" class="claps-counter">${props.claps}</div>
            </div>
          </div>
      </div>
      `;
}

function App() {
  if (!App.state.posts) {
    App.state.setPosts(data);
  }

  return `
    <div class="container">
      ${App.state.posts?.map((props) => Post(props)).join("")}
    </div>
  `;
}

App.state = {
  posts: undefined,
  setPosts: (posts) => {
    App.state.posts = posts;
  },
  addClap: (id) => {
    const post = App.state.posts.find((post) => post.id === id);
    post.claps = post.claps + 1;
    render();
  },
};

function render() {
  document.getElementById("app").innerHTML = App();
}

render();
