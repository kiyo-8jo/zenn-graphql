import WithApollo from "./components/WithApollo";
import User from "./components/Container";

export default function Home() {
  return (
    <main>
      <WithApollo>
        <User />
      </WithApollo>
    </main>
  );
}