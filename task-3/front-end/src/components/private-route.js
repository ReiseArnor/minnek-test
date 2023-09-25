import { useAuth } from '../hooks/use-auth';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ children, ...rest }) => {
    let auth = useAuth();
    return (
        <Route
        {...rest}
        render={({ location }) =>
            auth.user ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: "/",
                state: { from: location }
                }}
            />
            )
        }
        />
    );
}
