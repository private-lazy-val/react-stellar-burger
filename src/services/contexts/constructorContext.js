import {createContext} from "react";
export const ConstructorContext = createContext({
        bun: null,
        ingredients: []
    }
);
// the default value in createContext ensures that the context has an initial value,
// but it's common to override this default with actual state values once inside the component.