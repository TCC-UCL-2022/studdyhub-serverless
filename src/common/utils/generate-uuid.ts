import { v4 as uuidv4 } from "uuid";
export const generateUuid = (): string => {
    const uuid = uuidv4();
    console.log("UUID GERADO: ", uuid);
    return uuid;
};
