import { useTitle } from "../lib/hooks";
import NotLoggedIn from "../components/layouts/NotLoggedIn";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/auth.slice";
import AccountPage from "../components/account";

const Account = () => {
  const { user, loading } = useSelector(selectAuth);
  useTitle("Account");

  if (!user && !loading) {
    return <NotLoggedIn />;
  }

  return (
    <>
      <AccountPage />
    </>
  );
};

export default Account;
