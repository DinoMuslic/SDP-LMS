import MyModal from "@components/Modal/MyModal";

const HomePage = () => {
  return (
    <>
      <div className="font-xxxl my-center-container">Home Page</div>
      <MyModal type={"user"} action={"edit"} />
    </>
  );
};

export default HomePage;
