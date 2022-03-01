import React from "react";

const StoreContext = React.createContext();

const defaultInitialData = { foo: "bar" };

function StoreProvider({ children, initialData = defaultInitialData }) {
    // const [state, dispatch] = React.useReducer(reducer, initialData);
    const [data, setData] = React.useState(initialData);

    // const value = { state, dispatch };
    const value = { data, setData };
    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

function useStoreContext () {
    const context = React.useContext(StoreContext);
    if (context === undefined) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return context;
}

export { StoreProvider, useStoreContext };
