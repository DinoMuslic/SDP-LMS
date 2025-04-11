import Datatable from "@components/Datatable/Datatable";

const DashboardPage = () => {
  const userData = [
    {
      id: 1,
      first_name: "Dino",
      last_name: "Muslic",
      email: "dino@gmail.com",
      role: "student",
    },
    {
      id: 2,
      first_name: "Ema",
      last_name: "Muslic",
      email: "ema@gmail.com",
      role: "librarian",
    },
  ];

  return (
    <div className="p-5">
      <Datatable data={userData} />
    </div>
  );
};

export default DashboardPage;
