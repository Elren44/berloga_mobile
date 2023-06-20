import {createContext, FC, PropsWithChildren, useState} from "react";
import {colors, ColorsType} from "./colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextProps = {
	isAuth: boolean;
	setIsAuth: (isAuth: boolean) => void;
	colors: ColorsType
}

AsyncStorage

export const AuthContext = createContext<AuthContextProps>({
	isAuth: false,
	setIsAuth: ()=> {},
	colors: colors
})

export const AuthContextProvider: FC<PropsWithChildren> = ({children}) => {
	const [isAuth, setIsAuth] = useState(false)

	const defaultValue = {
		isAuth,
		setIsAuth,
		colors
	}
	return (
		<AuthContext.Provider value={defaultValue}>
			{children}
		</AuthContext.Provider>
	)
}
