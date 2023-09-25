import { Switch } from 'react-router-dom';
import { NavigationBar } from './components/navbar';

function App() {
    return (<div className="columns is-centered">
        <Switch>
            <NavigationBar className="columns is-centered"/>
        </Switch>
    </div>);
}

export default App;
