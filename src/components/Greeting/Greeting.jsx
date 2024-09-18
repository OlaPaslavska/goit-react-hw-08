import css from "./Greeting.module.css";

const Greeting = () => {
  return (
    <div className={css.wrapper}>
      <div>
        <h1>Hello! We are happy to see you in our app 😃</h1>
        <p>
          Here, you can easily organize and store all your important contacts in
          one place. Let's get started!
        </p>
      </div>
    </div>
  );
};

export default Greeting;
