import { useRouter } from "next/router";

export default function NoLayout () {
    const { query } = useRouter();
    console.log(query);

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
