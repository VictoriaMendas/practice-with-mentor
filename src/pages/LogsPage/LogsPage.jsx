import Container from "../../components/Container/Container";
import LogForm from "../../components/LogForm/LogForm";
import LogList from "../../components/LogList/LogList";
import Modal from "../../components/Modal/Modal";

export default function LogsPage() {
  return (
    <section>
      <Container>
        <h1>Журнал</h1>
        {/* {isLoading && <div>Is Loading...</div>}
        {!isLoading && error && <div>{error}</div>} */}

        <LogForm />
        <LogList />
        <Modal />
      </Container>
    </section>
  );
}
