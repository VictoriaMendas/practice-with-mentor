import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/Container/Container";
import LogForm from "../../components/LogForm/LogForm";
import LogList from "../../components/LogList/LogList";
import Modal from "../../components/Modal/Modal";
import { useEffect } from "react";
import { fetchLogs } from "../../redux/logs/operations";
import { selectError, selectIsLoading } from "../../redux/logs/selectors";

export default function LogsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);
  return (
    <section>
      <Container>
        <h1>Журнал</h1>
        {isLoading && <div>Is Loading...</div>}
        {!isLoading && error && <div>{error}</div>}

        <LogForm />
        <LogList />
        <Modal />
      </Container>
    </section>
  );
}
