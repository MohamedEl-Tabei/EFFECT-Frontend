import Components from "../imports/components";
const Dashboard = () => {
  return (
    <div>
      <Components.NavBarMain active="dashboard" />
      <div className="p-0 h-87vh overflow-y-scroll">
        <div style={{ transform: "scale(.93)" }}>
          <h5 className="text-center ff-m bg-m text-light p-1 py-2 rounded-5 d-none daily-hours-mobile-d-block">
            It is recommended to use a larger screen.
          </h5>
          <Components.DailyProgress />
          <Components.SleepBoard />
          <Components.SleepVsActivity />
          <Components.DayDetails />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
