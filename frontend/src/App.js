import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Auth from "./components/Auth";
import BusLocation from "./components/BusLocation";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext); // Get the current user from context

  return (
    <Router>
      <Switch>
        {/* Route for login */}
        <Route path="/login">
          {user ? <Redirect to={user.role === "driver" ? "/driver-dashboard" : "/student-dashboard"} /> : <Auth isLogin={true} />}
        </Route>

        {/* Route for signup */}
        <Route path="/signup">
          {user ? <Redirect to={user.role === "driver" ? "/driver-dashboard" : "/student-dashboard"} /> : <Auth isLogin={false} />}
        </Route>

        {/* Route for student dashboard */}
        <Route path="/student-dashboard">
          {user && user.role === "student" ? <BusLocation /> : <Redirect to="/login" />}
        </Route>

        {/* Route for driver dashboard */}
        <Route path="/driver-dashboard">
          {user && user.role === "driver" ? <BusLocation /> : <Redirect to="/login" />}
        </Route>

        {/* Default route (Redirect to login if no match) */}
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
};

export default App;
