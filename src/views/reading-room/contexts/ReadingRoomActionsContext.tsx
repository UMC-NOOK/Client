// readingRoomActionsContext.tsx
import { createContext, useContext } from 'react';

type Actions = {
    create: () => void;
    edit: () => void;
    cancel: () => void;
};

const noop = () => {};
const ReadingRoomActionsContext = createContext<Actions>({
    create: noop,
    edit: noop,
    cancel: noop,
});

export const useReadingRoomActions = () => useContext(ReadingRoomActionsContext);

export const ReadingRoomActionsProvider = ReadingRoomActionsContext.Provider;
