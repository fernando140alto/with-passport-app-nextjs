import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/layout";
import { useUser } from "../../lib/hooks";
import { alsoIncrement } from "../../store/redux/actions";
import { increment } from "../../store/redux/reducer";

function Protected() {
  useUser({ redirectTo: "/" });
  const count = useSelector((state) => state.counter);
  // console.log(count);
  const dispatch = useDispatch();


  return (
    <>
      <Layout>
        <h1>Protected</h1>
        <p>
          This is a protected page. You must be logged in to view this page.
        </p>
        <p>{count.value}</p>
        <button onClick={() => dispatch(increment())}>Increment with actions</button>
        <button onClick={() => dispatch(alsoIncrement())}>Increment with builder</button>
        <button onClick={() => dispatch(alsoIncrement('error'))}>Error dont increment</button>
        <strong>{count.error ? 'Error incrementing, we are sorry.' : ''}</strong>
        

        <style jsx>{`
          h1 {
            color: red;
          }
        `}</style>
      </Layout>
    </>
  );
}

export default Protected;
