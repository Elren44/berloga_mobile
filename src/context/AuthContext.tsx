import {createContext, FC, PropsWithChildren, useState} from "react";

type AuthContextProps = {
	isAuth: boolean;
	setIsAuth: (isAuth: boolean) => void;
	isExpired: boolean;
	setIsExpired: (isExpited:boolean) => void
}

export const AuthContext = createContext<AuthContextProps>({
	isAuth: false,
	setIsAuth: ()=> {},
	isExpired: true,
	setIsExpired: ()=> {}
})

export const AuthContextProvider: FC<PropsWithChildren> = ({children}) => {
	const [isAuth, setIsAuth] = useState(false)
	const [isExpired, setIsExpired] = useState(true)

	const defaultValue = {
		isAuth,
		setIsAuth,
		isExpired,
		setIsExpired
	}
	return (
		<AuthContext.Provider value={defaultValue}>
			{children}
		</AuthContext.Provider>
	)
}
