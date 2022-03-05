import Layout from "../../components/layout";

export default function Hello({ name }) {
  return (
    <Layout>
      <div>
        <h1>Hello {name}</h1>
        <style jsx>{`
          h1 {
            color: red;
          }
        `}</style>
      </div>
    </Layout>
  );
}
