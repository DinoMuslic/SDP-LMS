import Datatable from "@components/Datatable/Datatable";

const DashboardPage = () => {
  const data = [
    {
      id: 1,
      first_name: "Dino",
      last_name: "Muslic",
      email: "dino@gmail.com",
    },
    {
      id: 2,
      first_name: "Ema",
      last_name: "Muslic",
      email: "ema@gmail.com",
    },
    {
      id: 3,
      first_name: "Ema",
      last_name: "Muslic",
      email: "ema@gmail.com",
    },
    {
      id: 4,
      first_name: "Ema",
      last_name: "Muslic",
      email: "ema@gmail.com",
    },
    {
      id: 5,
      first_name: "Ema",
      last_name: "Muslic",
      email: "ema@gmail.com",
    },
    {
      id: 6,
      first_name: "Ema",
      last_name: "Muslic",
      email: "ema@gmail.com",
    },
    {
      id: 7,
      first_name: "Ema",
      last_name: "Muslic",
      email: "ema@gmail.com",
    },
    {
      id: 8,
      first_name: "Ema",
      last_name: "Muslic",
      email: "ema@gmail.com",
    },
    {
      id: 9,
      first_name: "Ema",
      last_name: "Muslic",
      email: "ema@gmail.com",
    },
    {
      id: 10,
      first_name: "Ema",
      last_name: "Muslic",
      email: "ema@gmail.com",
    },
    {
      id: 11,
      first_name: "Ema",
      last_name: "Muslic",
      email: "ema@gmail.com",
    },
  ];

  return (
    <div className="p-5">
      <Datatable type={"users"} data={data} />
    </div>
  );
};

export default DashboardPage;
