import { useTitle } from "../lib/hooks";
import NotLoggedIn from "../components/NotLoggedIn";
import AccountSettings from "../components/AccountSettings";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/auth.slice";

const Account = () => {
  const { user, loading } = useSelector(selectAuth);
  useTitle("Account");

  if (!user && !loading) {
    return <NotLoggedIn />;
  }

  return (
    <>
      <AccountSettings />
    </>
  );
};

export default Account;
