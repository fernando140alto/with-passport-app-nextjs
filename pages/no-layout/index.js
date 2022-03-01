import { useRouter } from "next/router";
import { useStoreContext } from "../../store/context/context";

export default function NoLayout () {
    // const { query } = useRouter();
    const { data } = useStoreContext();
    console.log(data);

    return (
        <>
            <h1>No Layout</h1>
            <p>
                This is a page without a layout.
            </p>
            <style jsx>{`
                h1 {
                    color: red;
                }
            `}</style>
        </>
    )
}

NoLayout.get
