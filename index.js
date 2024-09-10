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

let eventHandlers = [];

const hooks = [];
let hookPointer = 0;

function useState(initialValue) {
  const currentIndex = hookPointer;
  if (!hooks[currentIndex]) hooks[currentIndex] = initialValue;
  const state = hooks[currentIndex];
  const setState = (_newState) => {
    let newState;
    if (typeof _newState === "function") {
      newState = _newState(state);
    } else {
      newState = _newState;
    }

    hooks[currentIndex] = newState;
    render();
  };
  hookPointer++;
  return [state, setState];
}

function Post({ post, addClap }) {
  const handleClick = () => addClap(post.id);

  eventHandlers.push({
    elementId: `claps-button-${post.id}`,
    type: "click",
    handler: handleClick,
  });

  return `
      <div class="post-header">
          <h1 class="title">${post.title}</h1>
          <div class="subtitle">
            ${post.subtitle}
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
                <div>${post.author}</div>
                <div>·</div>
                <div class="follow-button">Follow</div>
              </div>
              <div class="row secondary">
                <div>${post.readingTime}</div>
                <div>·</div>
                <div>${post.date}</div>
              </div>
            </div>
          </div>
          <div class="actions">
            <div class="claps">
              <div id="claps-button-${post.id}" class="claps-button">
                <img
                  src="assets/icons/hands-clapping-thin.svg"
                  height="24px"
                  width="24px"
                />
              </div>
              <div id="claps-counter" class="claps-counter">${post.claps}</div>
            </div>
          </div>
      </div>
      `;
}

function App() {
  const [state, setState] = useState(data);

  const addClap = (id) => {
    setState((prevState) => {
      const newState = [...prevState];
      const index = newState.findIndex((item) => item.id === id);
      const post = newState[index];
      newState[index] = { ...post, claps: post.claps + 1 };
      return newState;
    });
  };

  return `
    <div class="container">
      ${state.map((post) => Post({ post, addClap })).join("")}
    </div>
  `;
}

function render() {
  hookPointer = 0;
  eventHandlers = [];
  document.getElementById("app").innerHTML = App();
  eventHandlers.forEach(({ elementId, type, handler }) => {
    document.getElementById(elementId).addEventListener(type, handler);
  });
}

render();
