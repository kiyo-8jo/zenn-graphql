import WithApollo from "./components/WithApollo";
import User from "./components/User";

export default function Home() {
  return (
    <main>
      <WithApollo>
        <User />
      </WithApollo>
    </main>
  );
}