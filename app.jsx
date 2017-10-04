class Model {
  constructor() {
    this.index = 0;
    this.guests = [];
    this.inputValue = null;
    this.callback = null;
  }

  subscribe(render) {
    this.callback = render;
  }

  notify() {
    this.callback();
  }

  addGuests(name){
    this.guests.push({
      name:name,
      confirmed: false
    });
    console.log(this.guests);
    this.notify();
  }
}

const Header = () => {
  return (
    <header>
      <h1>RSVP</h1>
      <p> Registration App </p>
      <form id="registrar" onSubmit={e => {
          e.preventDefault();
          model.addGuests(model.inputValue);
        }}>
        <input type="text" name="name" placeholder="Invite Someone" onChange={e => (model.inputValue = e.target.value)}/>
        <button type="submit" name="submit" value="submit">Submit</button>
      </form>
    </header>
  );
}

const getGuestList = () => {
  return model.guests.map((guest, index) => {
    return (
      <li>
        {guest.name}
        <label htmlFor>
          Confirmed
          <input type="checkbox" />
        </label>
        <button>remove</button>
      </li>
    );
  })
}

const App = ({ title, model }) => {

  const Guests = () => {
    return (
      <ul id="invitedList">
        {getGuestList()}
      </ul>
    );
  }

  return (
    <div className="wrapper">
      <Header />
      <div className="main">
        <h2>Invitees</h2>
        <Guests />
      </div>
    </div>
  );

}

let model = new Model();
let counter = 1;
let render = () => {
  ReactDOM.render(
    <App title="InvitedList" model={model} />,
    document.getElementById('container')
  );
};

model.subscribe(render);
render(); 